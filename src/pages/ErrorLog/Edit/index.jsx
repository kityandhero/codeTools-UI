import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';

import { getDerivedStateFromPropsForUrlParams, toDatetime } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ errorLog, global, loading }) => ({
  errorLog,
  global,
  loading: loading.models.errorLog,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.errorLog.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.errorLog.get),
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: `${fieldData.message}：`,
        loadApiPath: 'errorLog/get',
        backPath: `/errorLog/pageList/key`,
        errorLogId: null,
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

  getApiData = (props) => {
    const {
      errorLog: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { errorLogId } = this.state;

    d.errorLogId = errorLogId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    if ((metaData || null) != null) {
      const { message } = metaData || { message: '' };

      this.setState({
        pageName: `${fieldData.message}：${message}`,
      });
    }
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
      label: fieldData.errorLogId.label,
      value: metaData === null ? '' : metaData.errorLogId,
      canCopy: true,
    });

    list.push({
      label: constants.channelNote.label,
      value: metaData === null ? '' : metaData.channelNote,
    });

    list.push({
      label: constants.createTime.label,
      value: metaData === null ? '' : metaData.createTime,
    });

    list.push({
      label: constants.updateTime.label,
      value: metaData === null ? '' : metaData.createTime,
    });

    return list;
  };
}

export default Edit;
