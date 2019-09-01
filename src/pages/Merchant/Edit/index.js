import React from 'react';
import { connect } from 'dva';
import { Row, Col, Avatar, Descriptions } from 'antd';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.merchant.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.merchant.get),
      tab: '编辑基本信息',
    },
    {
      key: 'updateParent',
      show: this.checkAuthority(accessWayCollection.merchant.updateParentId),
      tab: '变更上级',
    },
    {
      key: 'auditInfo',
      show:
        this.checkAuthority(accessWayCollection.userOrder.pass) ||
        this.checkAuthority(accessWayCollection.userOrder.refuse),
      tab: '审核信息',
    },
    {
      key: 'peopleAccountLogRecord',
      show: this.checkAuthority(accessWayCollection.peopleAccountLog.listByMerchant),
      tab: '账户信息变动',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '站点：',
        loadApiPath: 'merchant/get',
        backPath: `/person/merchant/list/key`,
        customTabActiveKey: true,
        merchantId: null,
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
      merchant: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { merchantId } = this.state;

    d.merchantId = merchantId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    this.setState({
      pageName: `站点：${metaData === null ? '' : metaData.mName || ''}`,
    });
  };

  pageHeaderLogo = () => {
    const { metaData } = this.state;

    return (
      <Avatar size="large" src={metaData === null ? '' : metaData.image || '/noImageSmall.png'} />
    );
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>入驻日期</div>
          <div className={styles.heading}>
            {' '}
            {formatDatetime(metaData === null ? '' : metaData.inTime || '', 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.inTime || '', 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>当前状态</div>
          <div className={styles.heading}>
            {this.getMerchantStatusName(
              metaData === null ? -1 : metaData.state === null ? -1 : metaData.state,
              '--',
            )}
          </div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label="站长姓名">
          {metaData === null ? '' : metaData.realName || ''}
        </Description>
        <Description label="联系电话">{metaData === null ? '' : metaData.phone || ''}</Description>
        <Description label="紧急联系电话">
          {metaData === null ? '' : metaData.phoneSpare || ''}
        </Description>
        <Description label="身份证号">{metaData === null ? '' : metaData.idCard || ''}</Description>
        <Description label="开户银行">
          {metaData === null ? '' : metaData.bankName || ''}
        </Description>
        <Description label="银行卡号">{metaData === null ? '' : metaData.bankNo || ''}</Description>
      </Descriptions>
    );
  };
}

export default Edit;
