import React from 'react';
import { connect } from 'dva';
import { Row, Col, Avatar, Descriptions } from 'antd';

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

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ regUser, global, loading }) => ({
  regUser,
  global,
  loading: loading.models.regUser,
}))
class Detail extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.regUser.get;

  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      regUserId: null,
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
      regUser: { data },
    } = props;

    return data;
  };

  initState = () => {
    const result = {
      pageName: '用户：',
      loadApiPath: 'regUser/get',
      backPath: `/person/regUser/list/key`,
    };

    return result;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { regUserId } = this.state;

    d.regUserId = regUserId;

    return d;
  };

  afterLoadSuccess = metaData => {
    this.setState({
      pageName: `用户：${metaData === null ? '' : metaData.nickname || ''}`,
    });
  };

  regUserTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.regUserTypeList);
  };

  getRegUserTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.regUserTypeList());
    return item == null ? '未知' : item.name;
  };

  sexList = () => {
    const { global } = this.props;
    return refitCommonData(global.sexList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getSexName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.sexList());
    return item == null ? '未知' : item.name;
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
          <div className={styles.textSecondary}>注册日期</div>
          <div className={styles.heading}>
            {' '}
            {formatDatetime(metaData === null ? '' : metaData.inTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.inTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>当前状态</div>
          <div className={styles.heading}>正常</div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label="性别">
          {this.getSexName(metaData === null ? '' : metaData.sex, '')}
        </Description>
        <Description label="代理商级别">
          {this.getRegUserTypeName(metaData === null ? '' : metaData.type, '')}
        </Description>
        <Description label="联系电话">{metaData === null ? '' : metaData.phone}</Description>
        <Description label="身份证号">{metaData === null ? '' : metaData.noId}</Description>
        <Description label="邮箱">{metaData === null ? '' : metaData.email}</Description>
        <Description label="详细地址">{metaData === null ? '' : metaData.address}</Description>
      </Descriptions>
    );
  };
}

export default Detail;
