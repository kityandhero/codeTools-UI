import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import { isInvalid, formatDatetime, searchFromList, refitCommonData } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/CustomForm/LoadDataTabContainer';
import DescriptionList from '@/components/DescriptionList';

import { fieldData } from '../Common/data';
import styles from './index.less';

const { Description } = DescriptionList;

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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      distributionId: null,
    };
  }

  getApiData = props => {
    const {
      distribution: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      distributionId: id,
      pageName: '申请人：',
      loadApiPath: 'distribution/get',
      backPath: `/order/distribution/list/key`,
    };

    return result;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { distributionId: distributionIdPre } = this.state;

    return distributionIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { distributionId: id };
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
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term={fieldData.isCloseShop}>
          {metaData === null ? '' : this.getMerchantSwitchName(metaData.isCloseShop)}
        </Description>
        <Description term={fieldData.userId}>
          {metaData === null ? '' : metaData.userId}
        </Description>
        <Description term={fieldData.amount}>
          {metaData === null ? '' : metaData.amount}
        </Description>
        <Description term={fieldData.weChatName}>
          {metaData === null ? '' : metaData.weChatName}
        </Description>
        <Description term={fieldData.bankName}>
          {metaData === null ? '' : metaData.bankName}
        </Description>
        <Description term={fieldData.bankNo}>
          {metaData === null ? '' : metaData.bankNo}
        </Description>
      </DescriptionList>
    );
  };
}

export default Edit;
