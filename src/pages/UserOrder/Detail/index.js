import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import {
  isInvalid,
  formatDatetime,
  isNumber,
  isMoney,
  searchFromList,
  refitCommonData,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/CustomForm/LoadDataTabContainer';
import DescriptionList from '@/components/DescriptionList';

import styles from './index.less';

const { Description } = DescriptionList;

@connect(({ userOrder, global, loading }) => ({
  userOrder,
  global,
  loading: loading.models.userOrder,
}))
class Detail extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.userOrder.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.userOrder.get),
      tab: '基本信息',
    },
    {
      key: 'operationRecord/list',
      show: this.checkAuthority(accessWayCollection.userOrder.listOperationRecord),
      tab: '操作记录',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      userOrderId: null,
    };
  }

  getApiData = props => {
    const {
      userOrder: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      userOrderId: id,
      pageName: '订单号：',
      loadApiPath: 'userOrder/get',
      backPath: `/order/payment/list/key`,
    };

    return result;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { userOrderId: userOrderIdPre } = this.state;

    return userOrderIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { userOrderId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { userOrderId } = this.state;

    d.userOrderId = userOrderId;

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
          <div className={styles.textSecondary}>当前状态</div>
          <div className={styles.heading}>
            {this.getOrderStatusName(metaData === null ? '' : metaData.state, '--')}
          </div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="下单用户">{metaData === null ? '' : metaData.userName}</Description>
        <Description term="购买总数量">
          {isNumber(metaData === null ? '' : metaData.totalCount) ? `${metaData.totalCount}` : ''}
        </Description>
        <Description term="配送费">
          {isMoney(metaData === null ? '' : metaData.courierPrice)
            ? `￥${metaData === null ? '' : metaData.courierPrice}`
            : ''}
        </Description>
        <Description term="收货人">{metaData === null ? '' : metaData.consignee}</Description>
        <Description term="合计金额">
          {isMoney(metaData === null ? '' : metaData.totalAmount)
            ? `￥${metaData === null ? '' : metaData.totalAmount}`
            : ''}
        </Description>
        <Description term="收货地址">{metaData === null ? '' : metaData.address}</Description>
      </DescriptionList>
    );
  };
}

export default Detail;
