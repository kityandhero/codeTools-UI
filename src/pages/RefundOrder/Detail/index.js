import React from 'react';
import { connect } from 'dva';
import { Row, Col, Descriptions } from 'antd';

import {
  isInvalid,
  formatDatetime,
  isNumber,
  isMoney,
  searchFromList,
  refitCommonData,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ refundOrder, global, loading }) => ({
  refundOrder,
  global,
  loading: loading.models.refundOrder,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.refundOrder.get;

  tabList = [
    // {
    //   key: 'orderInfo',
    //   tab: '订单信息',
    // },
    {
      key: 'refundInfo',
      show: this.checkAuthority(accessWayCollection.refundOrder.get),
      tab: '退款处理',
    },
    {
      key: 'operationRecord/list',
      show: this.checkAuthority(accessWayCollection.refundOrder.listOperationRecord),
      tab: '操作记录',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      refundOrderId: null,
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
      refundOrder: { data },
    } = props;

    return data;
  };

  initState = () => {
    const result = {
      pageName: '订单号：',
      loadApiPath: 'refundOrder/get',
      backPath: `/order/refund/list/key`,
    };

    return result;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { refundOrderId } = this.state;

    d.refundOrderId = refundOrderId;

    return d;
  };

  afterLoadSuccess = metaData => {
    this.setState({
      pageName: `订单号：${metaData === null ? '' : metaData.tradeNo || ''}`,
    });
  };

  orderStatusList = () => {
    const { global } = this.props;
    return refitCommonData(global.orderStatusList);
  };

  getOrderStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderStatusList());
    return item == null ? '未知' : item.name;
  };

  refundOrderStatusList = () => {
    const { global } = this.props;
    return refitCommonData(global.refundOrderStateList);
  };

  getRefundOrderStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderStatusList());
    return item == null ? '未知' : item.name;
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>下单日期</div>
          <div className={styles.heading}>
            {formatDatetime(metaData === null ? '' : metaData.beginTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.beginTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>处理状态</div>
          <div className={styles.heading}>
            {this.getRefundOrderStatusName(metaData === null ? '' : metaData.refundState, '--')}
          </div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label="下单用户">{metaData === null ? '' : metaData.userName}</Description>
        <Description label="购买总数量">
          {isNumber(metaData === null ? '' : metaData.totalCount) ? `${metaData.totalCount}` : ''}
        </Description>
        <Description label="配送费">
          {isMoney(metaData === null ? '' : metaData.courierPrice)
            ? `￥${metaData === null ? '' : metaData.courierPrice}`
            : ''}
        </Description>
        <Description label="收货人">{metaData === null ? '' : metaData.consignee}</Description>
        <Description label="合计金额">
          {isMoney(metaData === null ? '' : metaData.totalAmount)
            ? `￥${metaData === null ? '' : metaData.totalAmount}`
            : ''}
        </Description>
        <Description label="收货地址">{metaData === null ? '' : metaData.address}</Description>
      </Descriptions>
    );
  };
}

export default Edit;
