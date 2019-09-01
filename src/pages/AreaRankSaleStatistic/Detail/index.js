import React from 'react';
import { connect } from 'dva';
import { Row, Col, Descriptions } from 'antd';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState } from '../Assist/config';

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ areaRankSaleStatistic, global, loading }) => ({
  areaRankSaleStatistic,
  global,
  loading: loading.models.areaRankSaleStatistic,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.areaRankSaleStatistic.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.areaRankSaleStatistic.get),
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '销售分类分时统计：',
        loadApiPath: 'areaRankSaleStatistic/get',
        backPath: `/statistic/areaRankSale/list/key`,
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
      areaRankSaleStatistic: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { areaRankSaleStatisticId } = this.state;

    d.areaRankSaleStatisticId = areaRankSaleStatisticId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    let title = '统计时段';

    switch (metaData.mode) {
      case 0:
        title = `${title} [${`${formatDatetime(metaData.startTime, 'YYYY-MM-DD HH:mm', '--')}`}]`;
        break;
      case 2:
        title = `${title} [${`${formatDatetime(metaData.startTime, 'YYYY-MM-DD', '--')}`}]`;
        break;
      case 3:
        title = `${title} [${`${formatDatetime(
          metaData.startTime,
          'YYYY-MM-DD',
          '--',
        )} ~ ${formatDatetime(metaData.endTime, 'YYYY-MM-DD', '--')}`}]`;
        break;
      case 4:
        title = `${title} [${`${formatDatetime(metaData.startTime, 'YYYY-MM', '--')}`}]`;
        break;
      case 5:
        title = `${title} [${`${formatDatetime(metaData.startTime, 'YYYY', '--')}`}]`;
        break;
      default:
        title = '';
        break;
    }

    this.setState({
      pageName: `销售分类分时统计：${title}`,
    });
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>统计日期</div>
          <div className={styles.heading}>
            {' '}
            {formatDatetime(metaData === null ? '' : metaData.createTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.createTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>统计状态</div>
          <div className={styles.heading}>{metaData === null ? '' : metaData.stateNote}</div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label="数据标识">
          {metaData === null ? '' : metaData.areaRankSaleStatisticId}
        </Description>
        <Description label="统计地区">
          {metaData === null ? '' : metaData.additional.areaAgentName || '未知'}
        </Description>
        <Description label="统计来源">
          {metaData === null ? '' : metaData.channelNote || '--'}
        </Description>
        <Description label="统计模式">
          {metaData === null ? '' : metaData.modeNote || ''}
        </Description>
        {metaData === null ? null : (
          <>
            <Description label="统计时段">
              {metaData.mode === 0
                ? `${formatDatetime(metaData.startTime, 'YYYY-MM-DD HH:mm', '--')}`
                : null}
              {metaData.mode === 2
                ? `${formatDatetime(metaData.startTime, 'YYYY-MM-DD', '--')}`
                : null}
              {metaData.mode === 3
                ? `${formatDatetime(metaData.startTime, 'YYYY-MM-DD', '--')} ~ ${formatDatetime(
                    metaData.endTime,
                    'YYYY-MM-DD',
                    '--',
                  )}`
                : null}
              {metaData.mode === 4
                ? `${formatDatetime(metaData.startTime, 'YYYY-MM', '--')}`
                : null}
              {metaData.mode === 5 ? `${formatDatetime(metaData.startTime, 'YYYY', '--')}` : null}
            </Description>
          </>
        )}
      </Descriptions>
    );
  };
}

export default Edit;
