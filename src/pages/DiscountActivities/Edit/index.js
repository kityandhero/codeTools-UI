import React from 'react';
import { connect } from 'dva';

import { Row, Col, Descriptions, Tag } from 'antd';

import { formatDatetime, isMoney, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';

import { fieldData } from '../Common/data';

// import { fieldData } from '../Common/data';
import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ discountActivities, global, loading }) => ({
  discountActivities,
  global,
  loading: loading.models.discountActivities,
}))
class Index extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.discountActivities.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.discountActivities.get),
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '品名：',
        loadApiPath: 'discountActivities/get',
        backPath: `/marketing/discount/list/key`,
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
      discountActivities: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { discountActivitiesId } = this.state;

    d.discountActivitiesId = discountActivitiesId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const { activitiesTitle } = metaData;

    this.setState({
      pageName: `活动名称：${activitiesTitle || ''}`,
    });
  };

  pageHeaderTag = () => {
    const { metaData } = this.state;

    return metaData == null ? null : <Tag color="volcano">抢购活动</Tag>;
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>发布日期</div>
          <div className={styles.heading}>
            {' '}
            {formatDatetime(metaData == null ? '' : metaData.inTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData == null ? '' : metaData.inTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>当前状态</div>
          <div className={styles.heading}>
            {this.getProductStateName(metaData == null ? '' : metaData.state, '--')}
          </div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label={fieldData.discountActivitiesId}>
          {metaData == null ? '' : metaData.discountActivitiesId}
        </Description>
        <Description label={fieldData.goodsTitle}>
          {metaData == null ? '' : metaData.goods != null ? metaData.goods.title : ''}
        </Description>
        <Description label={fieldData.goodsType}>
          {metaData == null ? '' : this.getDiscountActivitiesGoodsTypeName(metaData.goodsType)}
        </Description>
        <Description label={fieldData.activitiesSalePrice}>
          {isMoney(metaData == null ? '' : metaData.activitiesSalePrice)
            ? `￥${metaData == null ? '' : metaData.activitiesSalePrice}`
            : ''}
        </Description>
        <Description label={fieldData.stockPrice}>
          {isMoney(metaData == null ? '' : metaData.stockPrice)
            ? `￥${metaData == null ? '' : metaData.stockPrice}`
            : ''}
        </Description>
        <Description label={fieldData.activitiesStoreCount}>
          {metaData == null ? '' : metaData.activitiesStoreCount}
        </Description>
        <Description label={fieldData.saleStartTime}>
          {formatDatetime(
            metaData == null ? '' : metaData.saleStartTime,
            'YYYY-MM-DD HH:mm:ss',
            '--',
          )}
        </Description>
        <Description label={fieldData.saleEndTime}>
          {formatDatetime(
            metaData == null ? '' : metaData.saleEndTime,
            'YYYY-MM-DD HH:mm:ss',
            '--',
          )}
        </Description>
      </Descriptions>
    );
  };
}

export default Index;
