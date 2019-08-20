import React from 'react';
import { connect } from 'dva';
import { Card, Form, Row, Col, Spin, BackTop, Select, Icon } from 'antd';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import styles from './index.less';

@connect(({ goodsLogisticsProcessRequestMessageDayInspect, global, loading }) => ({
  goodsLogisticsProcessRequestMessageDayInspect,
  global,
  loading: loading.models.goodsLogisticsProcessRequestMessageDayInspect,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.goodsLogisticsProcessRequestMessageDayInspect.get;

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  initState = () => {
    const result = {
      loadApiPath: 'goodsLogisticsProcessRequestMessageDayInspectId/get',
      submitApiPath: 'goodsLogisticsProcessRequestMessageDayInspectId/updateBasicInfo',
    };

    return result;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { goodsLogisticsProcessRequestMessageDayInspectId } = this.state;

    d.goodsLogisticsProcessRequestMessageDayInspectId = goodsLogisticsProcessRequestMessageDayInspectId;

    return d;
  };

  formContent = () => {
    const { metaData, processing, dataLoading } = this.state;

    const goodsLogisticsProcessRequestMessageDayInspectTypeData = this.goodsLogisticsProcessRequestMessageDayInspectTypeList();
    const goodsLogisticsProcessRequestMessageDayInspectTypeOption = [];

    goodsLogisticsProcessRequestMessageDayInspectTypeData.forEach(item => {
      const { name, flag } = item;
      goodsLogisticsProcessRequestMessageDayInspectTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    const sexData = this.sexList();
    const sexOption = [];

    sexData.forEach(item => {
      const { name, flag } = item;
      sexOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    const orderMessageData = this.orderMessageList();
    const orderMessageOption = [];

    orderMessageData.forEach(item => {
      const { name, flag } = item;
      orderMessageOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    const administrationAuthorityData = this.administrationAuthorityList();
    const administrationAuthorityOption = [];

    administrationAuthorityData.forEach(item => {
      const { name, flag } = item;
      administrationAuthorityOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title={
              <>
                <Icon type="contacts" />
                <span className={styles.cardTitle}>基本信息</span>
              </>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.areaAgentName}：${
                        metaData === null ? '' : metaData.additional.areaAgentName || '未知'
                      }`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.incomeAmount}：￥${
                        metaData === null ? '0' : metaData.incomeAmount || '0'
                      }`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.modeNote}：${metaData === null ? '' : metaData.modeNote || ''}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.timeFrame}：`}
                      {metaData === null ? (
                        ''
                      ) : (
                        <span>
                          {metaData.mode === 0
                            ? `${formatDatetime(metaData.startTime, 'YYYY-MM-DD HH:mm', '--')}`
                            : null}
                          {metaData.mode === 2
                            ? `${formatDatetime(metaData.startTime, 'YYYY-MM-DD', '--')}`
                            : null}
                          {metaData.mode === 3
                            ? `${formatDatetime(
                                metaData.startTime,
                                'YYYY-MM-DD',
                                '--',
                              )} ~ ${formatDatetime(metaData.endTime, 'YYYY-MM-DD', '--')}`
                            : null}
                          {metaData.mode === 4
                            ? `${formatDatetime(metaData.startTime, 'YYYY-MM', '--')}`
                            : null}
                          {metaData.mode === 5
                            ? `${formatDatetime(metaData.startTime, 'YYYY', '--')}`
                            : null}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card
            title={
              <>
                <Icon type="project" />
                <span className={styles.cardTitle}>附属信息</span>
              </>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.channelNote}：${
                        metaData === null ? '' : metaData.channelNote || ''
                      }`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.ip}：${metaData === null ? '' : metaData.ip || ''}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.createTime}：${
                        metaData === null ? '' : metaData.createTime || ''
                      }`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.autoRemark}：${
                        metaData === null ? '' : metaData.autoRemark || ''
                      }`}
                    </div>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
        </div>
        <BackTop />
      </>
    );
  };
}

export default BasicInfo;
