import React from 'react';
import { connect } from 'dva';
import { Row, Col, Descriptions } from 'antd';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ line, global, loading }) => ({
  line,
  global,
  loading: loading.models.line,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.line.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.line.get),
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '线路名：',
        loadApiPath: 'line/get',
        backPath: `/logistics/line/list/key`,
        lineId: null,
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
      line: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { lineId } = this.state;

    d.lineId = lineId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    this.setState({
      pageName: `线路名：${metaData === null ? '' : metaData.name || ''}`,
    });
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>添加日期</div>
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
        <Description label="标识">{metaData === null ? '' : metaData.lineId}</Description>
        <Description label="司机姓名">{metaData === null ? '' : metaData.driverName}</Description>
        <Description label="司机电话">{metaData === null ? '' : metaData.phone}</Description>
        <Description label="备用电话">{metaData === null ? '' : metaData.phoneSpare}</Description>
        <Description label="车牌号">{metaData === null ? '' : metaData.carNo}</Description>
        <Description label="排序值">{metaData === null ? '' : metaData.sort}</Description>
        <Description label="归属地区">{metaData === null ? '' : metaData.cityId}</Description>
      </Descriptions>
    );
  };
}

export default Edit;
