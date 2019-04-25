import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import { formatDatetime } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/CustomForm/LoadDataTabContainer';
import DescriptionList from '@/components/DescriptionList';

import styles from './index.less';

const { Description } = DescriptionList;

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
      lineId: null,
    };
  }

  getApiData = props => {
    const {
      line: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      lineId: id,
      pageName: '线路名：',
      loadApiPath: 'line/get',
      backPath: `/logistics/line/list/key`,
    };

    return result;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { lineId: lineIdPre } = this.state;

    return lineIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { lineId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { lineId } = this.state;

    d.lineId = lineId;

    return d;
  };

  afterLoadSuccess = metaData => {
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
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="标识">{metaData === null ? '' : metaData.lineId}</Description>
        <Description term="司机姓名">{metaData === null ? '' : metaData.driverName}</Description>
        <Description term="司机电话">{metaData === null ? '' : metaData.phone}</Description>
        <Description term="备用电话">{metaData === null ? '' : metaData.phoneSpare}</Description>
        <Description term="车牌号">{metaData === null ? '' : metaData.carNo}</Description>
        <Description term="排序值">{metaData === null ? '' : metaData.sort}</Description>
        <Description term="归属地区">{metaData === null ? '' : metaData.cityId}</Description>
      </DescriptionList>
    );
  };
}

export default Edit;
