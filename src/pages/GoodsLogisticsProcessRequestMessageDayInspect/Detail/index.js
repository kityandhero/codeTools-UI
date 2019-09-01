import React from 'react';
import { connect } from 'dva';
import { Row, Col, Descriptions } from 'antd';

import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';
import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ goodsLogisticsProcessRequestMessageDayInspect, global, loading }) => ({
  goodsLogisticsProcessRequestMessageDayInspect,
  global,
  loading: loading.models.goodsLogisticsProcessRequestMessageDayInspect,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.goodsLogisticsProcessRequestMessageDayInspect.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(
        accessWayCollection.goodsLogisticsProcessRequestMessageDayInspect.get,
      ),
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '出库处理：',
        loadApiPath: 'goodsLogisticsProcessRequestMessageDayInspect/get',
        backPath: `/goodsLogisticsProcessRequestMessageDayInspect/list/key`,
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
      goodsLogisticsProcessRequestMessageDayInspect: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { goodsLogisticsProcessRequestMessageId } = this.state;

    d.goodsLogisticsProcessRequestMessageId = goodsLogisticsProcessRequestMessageId;

    return d;
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
          {metaData === null ? '' : metaData.goodsLogisticsProcessRequestMessageId}
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
