import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Avatar,
  //  Button
} from 'antd';

import { isInvalid, formatDatetime, searchFromList, refitCommonData } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/CustomForm/LoadDataTabContainer';
import DescriptionList from '@/components/DescriptionList';

import styles from './index.less';

const { Description } = DescriptionList;
// const ButtonGroup = Button.Group;

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.merchant.get;

  tabList = [
    {
      key: '1',
      tab: '待出库',
    },
    {
      key: '3',
      tab: '出库中',
    },
    {
      key: '2',
      tab: '配送中',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      stateCode: -10000,
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
    const { id, state: stateCode } = params;

    const result = {
      merchantId: id,
      stateCode,
      pageName: '社区站点：',
      loadApiPath: 'merchant/get',
    };

    return result;
  };

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    const { stateCode } = this.state;

    const pathname = `${match.url}/basicInfo`.replace(
      `/${stateCode}/basicInfo`,
      `/${key}/basicInfo`
    );

    dispatch(routerRedux.replace({ pathname }));
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id, state: stateCode },
      },
    } = nextProps;

    return { merchantId: id, stateCode };
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

  supplementLoadRequestParams = o => {
    const d = o;
    const { merchantId } = this.state;

    d.merchantId = merchantId;

    return d;
  };

  afterLoadSuccess = metaData => {
    this.setState({
      pageName: `社区站点：${metaData === null ? '' : metaData.mName || ''}`,
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
