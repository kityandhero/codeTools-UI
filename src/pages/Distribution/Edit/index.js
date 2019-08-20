import React from 'react';
import { connect } from 'dva';
import { Row, Col, Descriptions } from 'antd';

import {
  isInvalid,
  formatDatetime,
  searchFromList,
  refitCommonData,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData } from '../Common/data';

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ distribution, global, loading }) => ({
  distribution,
  global,
  loading: loading.models.distribution,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.distribution.get;

  tabList = [
    {
      key: 'applyInfo',
      show: this.checkAuthority(accessWayCollection.distribution.get),
      tab: '申请信息',
    },
    {
      key: 'operationRecord/list',
      show: this.checkAuthority(accessWayCollection.distribution.listOperationRecord),
      tab: '操作记录',
    },
  ];

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
      distribution: { data },
    } = props;

    return data;
  };

  initState = () => {
    const result = {
      pageName: '申请人：',
      loadApiPath: 'distribution/get',
      backPath: `/order/distribution/list/key`,
    };

    return result;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { distributionId } = this.state;

    d.distributionId = distributionId;

    return d;
  };

  afterLoadSuccess = metaData => {
    this.setState({
      pageName: `申请人：${metaData === null ? '' : metaData.name || ''}`,
    });
  };

  distributionStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.distributionStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getDistributionStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.distributionStateList());
    return item == null ? '未知' : item.name;
  };

  distributionSwitchList = () => {
    const { global } = this.props;
    return refitCommonData(global.distributionSwitchList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getMerchantSwitchName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.distributionSwitchList());
    return item == null ? '未知' : item.name;
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>申请日期</div>
          <div className={styles.heading}>
            {' '}
            {formatDatetime(metaData === null ? '' : metaData.applyTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.applyTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>当前状态</div>
          <div className={styles.heading}>
            {metaData === null ? '' : this.getDistributionStateName(metaData.state)}
          </div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label={fieldData.isCloseShop}>
          {metaData === null ? '' : this.getMerchantSwitchName(metaData.isCloseShop)}
        </Description>
        <Description label={fieldData.userId}>
          {metaData === null ? '' : metaData.userId}
        </Description>
        <Description label={fieldData.amount}>
          {metaData === null ? '' : metaData.amount}
        </Description>
        <Description label={fieldData.weChatName}>
          {metaData === null ? '' : metaData.weChatName}
        </Description>
        <Description label={fieldData.bankName}>
          {metaData === null ? '' : metaData.bankName}
        </Description>
        <Description label={fieldData.bankNo}>
          {metaData === null ? '' : metaData.bankNo}
        </Description>
      </Descriptions>
    );
  };
}

export default Edit;
