import React from 'react';
import { connect } from 'dva';

import { Row, Col } from 'antd';

import { isInvalid, formatDatetime, isMoney, searchFromList, refitCommonData } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/CustomForm/LoadDataTabContainer';
import DescriptionList from '@/components/DescriptionList';

// import { fieldData } from '../Common/data';
import styles from './index.less';

const { Description } = DescriptionList;

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
class Edit extends LoadDataTabContainer {
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
    //   show: this.checkAuthority(accessWayCollection.product.list),
    //   tab: '详细描述',
    // },
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
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      productId: null,
    };
  }

  getApiData = props => {
    const {
      product: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      productId: id,
      pageName: '品名：',
      loadApiPath: 'product/get',
      backPath: `/product/list/key`,
    };

    return result;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { productId: productIdPre } = this.state;

    return productIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { productId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { productId } = this.state;

    d.productId = productId;

    return d;
  };

  afterLoadSuccess = metaData => {
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
  };

  productStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.productStateList);
  };

  getProductStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productStateList());
    return item == null ? '未知' : item.name;
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
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="编号">{metaData === null ? '' : metaData.no}</Description>
        <Description term="规格">{metaData === null ? '' : metaData.spec}</Description>
        <Description term="进货价格">
          {isMoney(metaData === null ? '' : metaData.costPrice)
            ? `￥${metaData === null ? '' : metaData.costPrice}`
            : ''}
        </Description>
        <Description term="服务站价格">
          {isMoney(metaData === null ? '' : metaData.stockPrice)
            ? `￥${metaData === null ? '' : metaData.stockPrice}`
            : ''}
        </Description>
        <Description term="销售价格">
          {isMoney(metaData === null ? '' : metaData.salePrice)
            ? `￥${metaData === null ? '' : metaData.salePrice}`
            : ''}
        </Description>
        <Description term="快递费">
          {isMoney(metaData === null ? '' : metaData.expressPrice)
            ? `￥${metaData === null ? '' : metaData.expressPrice}`
            : ''}
        </Description>
      </DescriptionList>
    );
  };
}

export default Edit;
