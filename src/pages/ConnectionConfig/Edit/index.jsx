import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';

import { toDatetime, getDerivedStateFromPropsForUrlParams } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import { constants } from '../../../customConfig/config';
import LoadDataTabContainer from '../../../customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ connectionConfig, global, loading }) => ({
  connectionConfig,
  global,
  loading: loading.models.connectionConfig,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.connectionConfig.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.connectionConfig.get),
      tab: '基本信息',
    },
    {
      key: 'dataBaseGeneratorConfig',
      show: this.checkAuthority(accessWayCollection.dataBaseGeneratorConfig.getByConnectionId),
      tab: '生成配置',
    },
    {
      key: 'dataTable/pageList',
      show: this.checkAuthority(accessWayCollection.dataTable.pageList),
      tab: '数据库表',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: `${fieldData.name.label}：`,
        loadApiPath: 'connectionConfig/get',
        backPath: `/connectionConfig/pageList/key`,
        connectionConfigId: null,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  getApiData = props => {
    const {
      connectionConfig: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { connectionConfigId } = this.state;

    d.connectionConfigId = connectionConfigId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.setState({
      pageName: `${fieldData.name.label}：${metaData === null ? '' : metaData.name || ''}`,
    });
  };

  pageHeaderLogo = () => {
    const { metaData } = this.state;

    return (
      <Avatar
        size="large"
        src={metaData === null ? '' : metaData.imageUrl || '/noImageSmall.png'}
      />
    );
  };

  pageHeaderExtraContentData = () => {
    const { metaData } = this.state;

    return {
      textLabel: constants.statusNote.label,
      text: metaData === null ? '' : metaData.statusNote,
      timeLabel: constants.createTime.label,
      time: metaData === null ? null : toDatetime(metaData.createTime),
    };
  };

  pageHeaderContentData = () => {
    const { metaData } = this.state;

    const list = [];

    list.push({
      label: fieldData.connectionConfigId.label,
      value: metaData === null ? '' : metaData.connectionConfigId,
      canCopy: true,
    });

    list.push({
      label: fieldData.schema.label,
      value: metaData === null ? '' : metaData.schema,
      canCopy: false,
    });

    list.push({
      label: fieldData.connectionType.label,
      value: this.getDatabaseConnectionTypeName(
        metaData === null ? '' : `${metaData.connectionType || ''}`,
      ),
      canCopy: false,
    });

    list.push({
      label: fieldData.databaseType.label,
      value: this.getDatabaseDatabaseTypeName(
        metaData === null ? '' : `${metaData.databaseType || ''}`,
      ),
    });

    list.push({
      label: fieldData.encoding.label,
      value: this.getDatabaseEncodingName(metaData === null ? '' : `${metaData.encoding || ''}`),
    });

    return list;
  };
}

export default Edit;
