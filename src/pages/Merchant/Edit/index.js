import React from 'react';
import { connect } from 'dva';
import { Row, Col, Avatar } from 'antd';

import { isInvalid, formatDatetime, searchFromList, refitCommonData } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/CustomForm/LoadDataTabContainer';
import DescriptionList from '@/components/DescriptionList';

import styles from './index.less';

const { Description } = DescriptionList;

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
      key: 'auditInfo',
      show:
        this.checkAuthority(accessWayCollection.userOrder.pass) ||
        this.checkAuthority(accessWayCollection.userOrder.refuse),
      tab: '审核信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      merchantId: null,
    };
  }

  getApiData = props => {
    const {
      merchant: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      merchantId: id,
      pageName: '站点：',
      loadApiPath: 'merchant/get',
      backPath: `/person/merchant/list/key`,
      customTabActiveKey: true,
    };

    return result;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { merchantId: merchantIdPre } = this.state;

    return merchantIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { merchantId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { merchantId } = this.state;

    d.merchantId = merchantId;

    return d;
  };

  afterLoadSuccess = metaData => {
    this.setState({
      pageName: `站点：${metaData === null ? '' : metaData.mName || ''}`,
    });
  };

  merchantStatusList = () => {
    const { global } = this.props;
    return refitCommonData(global.merchantStatusList);
  };

  getMerchantStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantStatusList());
    return item == null ? '未知' : item.name;
  };

  getTabActiveKey = () => {
    const { stateCode } = this.state;

    return `${stateCode}`;
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
              '--'
            )}
          </div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="站长姓名">
          {metaData === null ? '' : metaData.realName || ''}
        </Description>
        <Description term="联系电话">{metaData === null ? '' : metaData.phone || ''}</Description>
        <Description term="紧急联系电话">
          {metaData === null ? '' : metaData.phoneSpare || ''}
        </Description>
        <Description term="身份证号">{metaData === null ? '' : metaData.idCard || ''}</Description>
        <Description term="开户银行">
          {metaData === null ? '' : metaData.bankName || ''}
        </Description>
        <Description term="银行卡号">{metaData === null ? '' : metaData.bankNo || ''}</Description>
      </DescriptionList>
    );
  };
}

export default Edit;
