import React from 'react';
import { connect } from 'dva';
import { Row, Col, Avatar, Descriptions } from 'antd';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ qRCode, global, loading }) => ({
  qRCode,
  global,
  loading: loading.models.qRCode,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.qRCode.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.qRCode.get),
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '名称：',
        loadApiPath: 'qRCode/get',
        backPath: `/qRCode/list/key`,
        qRCodeId: null,
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
      qRCode: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { qRCodeId } = this.state;

    d.qRCodeId = qRCodeId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    this.setState({
      pageName: `名称：${metaData === null ? '' : metaData.title || ''}`,
    });
  };

  pageHeaderLogo = () => {
    const { metaData } = this.state;

    return (
      <Avatar
        size="large"
        src={metaData === null ? '' : metaData.imageUrl || '/noImageSmall.png'}
      />
    );
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>创建日期</div>
          <div className={styles.heading}>
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
        <Description label="标识">{metaData === null ? '' : metaData.qRCodeId}</Description>
        <Description label="排序值">{metaData === null ? '' : metaData.sort}</Description>
        <Description label="链接地址">{metaData === null ? '' : metaData.url}</Description>
      </Descriptions>
    );
  };
}

export default Edit;
