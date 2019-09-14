import React from 'react';
import { connect } from 'dva';

import { Row, Col, Descriptions, Tag } from 'antd';

import { formatDatetime, isMoney, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';

// import { fieldData } from '../Common/data';
import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
class Index extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.product.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.product.get),
      tab: '基本信息',
    },
    {
      key: 'imageContentInfo',
      show: this.checkAuthority(accessWayCollection.product.get),
      tab: '图片详情描述',
    },
    // {
    //   key: 'contentInfo',
    //   show: this.checkAuthority(accessWayCollection.product.get),
    //   tab: '详细描述',
    // },
    {
      key: 'planSale/list',
      show: this.checkAuthority(accessWayCollection.product.listPlanSale),
      tab: '预售设置',
    },
    {
      key: 'operateLog/list',
      show: this.checkAuthority(accessWayCollection.product.listLog),
      tab: '操作日志',
    },
    {
      key: 'storeChange/list',
      show: this.checkAuthority(accessWayCollection.product.listStoreChange),
      tab: '库存变动日志',
    },
    {
      key: 'saleRecord/list',
      show: this.checkAuthority(accessWayCollection.product.listSaleRecord),
      tab: '销售记录',
    },
    {
      key: 'refundRecord/list',
      show: this.checkAuthority(accessWayCollection.product.listRefundRecord),
      tab: '退款记录',
    },
    {
      key: 'replenishmentRecord/list',
      show: this.checkAuthority(accessWayCollection.product.listReplenishmentRecord),
      tab: '售后记录',
    },
    {
      key: 'goodsOutboundLineRecord/list',
      show: this.checkAuthority(accessWayCollection.goodsOutboundLineRecord.list),
      tab: '线路出库记录',
    },
    {
      key: 'goodsOutboundMerchantRecord/list',
      show: this.checkAuthority(accessWayCollection.goodsOutboundMerchantRecord.list),
      tab: '社区出库记录',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '品名：',
        loadApiPath: 'product/get',
        backPath: `/product/list/key`,
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
      product: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { productId } = this.state;

    d.productId = productId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const {
      title,
      //  md5
    } = metaData;

    // this.setState({
    //   pageName: `品名：${title || ''}${
    //     md5 === '' ? '' : ` [http://liangzi.daiyazy.com/Community/Detail.aspx?pid=${md5}]`
    //   }`,
    // });

    this.setState({
      pageName: `品名：${title || ''}`,
    });

    // const that = this;
    // window.queueOutbound.push(() => {
    //   that.reloadData();
    // });
  };

  pageHeaderTag = () => {
    const { metaData } = this.state;

    if (metaData != null) {
      if (metaData.planSaleSwitch) {
        return <Tag color="green">预售进行中</Tag>;
      }
    }

    return <Tag color="cyan">正常售卖</Tag>;
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>发布日期</div>
          <div className={styles.heading}>
            {' '}
            {formatDatetime(metaData === null ? '' : metaData.inTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.inTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>当前状态</div>
          <div className={styles.heading}>
            {this.getProductStateName(metaData === null ? '' : metaData.state, '--')}
          </div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label="编号">{metaData === null ? '' : metaData.no}</Description>
        <Description label="规格">{metaData === null ? '' : metaData.spec}</Description>
        <Description label="进货价格">
          {isMoney(metaData === null ? '' : metaData.costPrice)
            ? `￥${metaData === null ? '' : metaData.costPrice}`
            : ''}
        </Description>
        <Description label="服务站价格">
          {isMoney(metaData === null ? '' : metaData.stockPrice)
            ? `￥${metaData === null ? '' : metaData.stockPrice}`
            : ''}
        </Description>
        <Description label="销售价格">
          {isMoney(metaData === null ? '' : metaData.salePrice)
            ? `￥${metaData === null ? '' : metaData.salePrice}`
            : ''}
        </Description>
        <Description label="快递费">
          {isMoney(metaData === null ? '' : metaData.expressPrice)
            ? `￥${metaData === null ? '' : metaData.expressPrice}`
            : ''}
        </Description>
        <Description label="分享链接">
          {metaData === null
            ? ''
            : `http://liangzi.daiyazy.com/Community/Detail.aspx?pid=${metaData.md5}`}
        </Description>
      </Descriptions>
    );
  };
}

export default Index;
