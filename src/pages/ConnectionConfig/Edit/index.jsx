import React from 'react';
import { connect } from 'umi';
import { notification, message } from 'antd';
import { FolderOpenOutlined, BuildOutlined, LinkOutlined } from '@ant-design/icons';

import { toDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import { zeroInt, zeroString } from '@/utils/constants';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import DataTabContainer from '@/customComponents/Framework/DataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ connectionConfig, databaseGeneratorConfig, global, loading }) => ({
  connectionConfig,
  databaseGeneratorConfig,
  global,
  loading: loading.models.connectionConfig,
}))
class Edit extends DataTabContainer {
  defaultAvatarIcon = (<LinkOutlined />);

  componentAuthority = accessWayCollection.connectionConfig.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.connectionConfig.get),
      tab: '基本信息',
    },
    {
      key: 'databaseGeneratorConfig',
      show: this.checkAuthority(accessWayCollection.databaseGeneratorConfig.getByConnectionId),
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
        pageName: '',
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

  pageHeaderTitlePrefix = () => {
    return fieldData.name.label;
  };

  getApiData = (props) => {
    const {
      connectionConfig: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { connectionConfigId } = this.state;

    d.connectionConfigId = connectionConfigId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.setState({
      pageName: metaData === null ? '' : metaData.name || '',
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      default:
        break;
    }
  };

  openProjectFolder = () => {
    const { dispatch } = this.props;
    const { metaData } = this.state;

    const { connectionConfigId } = metaData || { connectionConfigId: 0 };

    if (connectionConfigId <= 0) {
      message.error('参数错误');

      return;
    }

    dispatch({
      type: 'databaseGeneratorConfig/openProjectFolder',
      payload: {
        connectionConfigId,
      },
    }).then(() => {
      const {
        databaseGeneratorConfig: { data },
      } = this.props;

      const { dataSuccess } = data;

      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '打开项目文件夹成功',
          });
        });
      }
    });
  };

  generate = () => {
    const { dispatch } = this.props;
    const { connectionConfigId } = this.state;

    if (`${connectionConfigId || zeroInt}` === zeroString) {
      message.error('缺少参数');

      return;
    }

    this.setState({ processing: true });

    dispatch({
      type: 'databaseGeneratorConfig/generate',
      payload: {
        connectionConfigId,
      },
    }).then(() => {
      const {
        databaseGeneratorConfig: { data },
      } = this.props;

      const { dataSuccess } = data;

      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '生成操作结果',
            description: `全部生成成功`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  pageHeaderActionExtraGroup = () => {
    const { metaData, dataLoading, processing } = this.state;
    const buttons = [];
    const menuItems = [];

    if (metaData == null) {
      return null;
    }

    buttons.push({
      key: 'openProjectFolder',
      loading: processing,
      icon: <FolderOpenOutlined />,
      buttonProps: {
        disabled: dataLoading || processing || metaData == null,
        onClick: () => {
          this.openProjectFolder();
        },
      },

      text: '打开文件夹',
    });

    if (this.checkAuthority(accessWayCollection.databaseGeneratorConfig.generate)) {
      buttons.push({
        key: 'generate',
        loading: processing,
        icon: <BuildOutlined />,
        buttonProps: {
          disabled: dataLoading || processing || metaData == null,
          onClick: () => {
            this.generate();
          },
        },

        text: '生成全部',
      });
    }

    const menu = {
      props: {
        onClick: (e) => {
          this.handleMenuClick(e, metaData);
        },
      },
      items: menuItems,
    };

    return {
      buttons,
      menu,
    };
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
