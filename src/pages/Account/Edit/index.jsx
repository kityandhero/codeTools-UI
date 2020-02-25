import React from 'react';
import { connect } from 'dva';

import { Row, Col, Descriptions } from 'antd';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import LoadDataTabContainer from '../../../customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData } from '../Common/data';

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ account, global, loading }) => ({
  account,
  global,
  loading: loading.models.account,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.account.get;

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
        pageName: '账户名：',
        loadApiPath: 'account/get',
        backPath: `/account/account/list/key`,
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
      account: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const { name } = metaData;

    this.setState({ pageName: `账户名：${name}` });
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>{fieldData.inTime}</div>
          <div className={styles.heading}>
            {formatDatetime(metaData === null ? '' : metaData.inTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.inTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>{fieldData.state}</div>
          <div className={styles.heading}>
            {metaData === null ? '' : this.getAccountStateName(metaData.state)}
          </div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label={fieldData.accountId}>
          {metaData === null ? '' : metaData.accountId}
        </Description>
        <Description label={fieldData.name}>{metaData === null ? '' : metaData.name}</Description>
        <Description label={fieldData.phone}>{metaData === null ? '' : metaData.phone}</Description>
      </Descriptions>
    );
  };
}

export default Edit;
