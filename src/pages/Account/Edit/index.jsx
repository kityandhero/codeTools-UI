import React from 'react';
import { connect } from 'umi';
import { UserOutlined } from '@ant-design/icons';

import { getDerivedStateFromPropsForUrlParams, toDatetime } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import DataTabContainer from '@/customComponents/Framework/DataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ account, global, loading }) => ({
  account,
  global,
  loading: loading.models.account,
}))
class Edit extends DataTabContainer {
  componentAuthority = accessWayCollection.account.get;

  defaultAvatarIcon = (<UserOutlined />);

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.account.get),
      tab: '基本信息',
    },
    {
      key: 'resetPassword',
      show: this.checkAuthority(accessWayCollection.account.resetPassword),
      tab: '重置密码',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '',
        loadApiPath: 'account/get',
        backPath: `/account/account/pageList/key`,
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
      account: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    if ((metaData || null) != null) {
      const { userName } = metaData || { userName: '' };

      this.setState({ pageName: `${userName}` });
    }
  };

  pageHeaderTitlePrefix = () => {
    return fieldData.userName.label;
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
      label: fieldData.accountId.label,
      value: metaData === null ? '' : metaData.accountId,
      canCopy: true,
    });

    list.push({
      label: fieldData.userName.label,
      value: metaData === null ? '' : metaData.userName,
      canCopy: false,
    });

    list.push({
      label: fieldData.name.label,
      value: metaData === null ? '' : metaData.name,
      canCopy: false,
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
