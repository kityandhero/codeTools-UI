import React from 'react';
import { connect } from 'dva';
import { Card, Form, Row, Col, Spin, BackTop, Table, Select, Icon } from 'antd';

import {
  refitCommonData,
  formatDatetime,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import FromDisplayItem from '@/customComponents/FromDisplayItem';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { parseUrlParamsForSetState } from '../../Assist/config';
import TabPageBase from '../../TabPageBase';
import { fieldData } from '../../Common/data';

import styles from './index.less';

@connect(({ areaRankSaleStatistic, global, loading }) => ({
  areaRankSaleStatistic,
  global,
  loading: loading.models.areaRankSaleStatistic,
}))
class BasicInfo extends TabPageBase {
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
      loadApiPath: 'areaRankSaleStatistic/get',
      backPath: `/statistic/areaRankSale/list/key`,
    };

    return result;
  };

  areaRankSaleStatisticTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.areaRankSaleStatisticTypeList);
  };

  sexList = () => {
    const { global } = this.props;
    return refitCommonData(global.sexList);
  };

  orderMessageList = () => [{ flag: 0, name: '不接受' }, { flag: 1, name: '接受' }];

  administrationAuthorityList = () => [{ flag: 0, name: '关闭' }, { flag: 1, name: '开启' }];

  render() {
    const { metaData, processing, dataLoading } = this.state;

    const areaRankSaleStatisticTypeData = this.areaRankSaleStatisticTypeList();
    const areaRankSaleStatisticTypeOption = [];

    areaRankSaleStatisticTypeData.forEach(item => {
      const { name, flag } = item;
      areaRankSaleStatisticTypeOption.push(
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

    let listOnline = [];

    if (metaData != null) {
      listOnline = metaData.onLineRankList || [];
    }

    listOnline = listOnline.map((item, index) => {
      const o = item;

      o.key = `online_${index}`;

      return o;
    });

    const columns = [
      {
        title: '品类',
        dataIndex: 'rankName',
        width: 200,
        align: 'left',
      },
      {
        title: '销售额（元）',
        dataIndex: 'saleAmount',
        width: 200,
        align: 'center',
      },
      {
        title: '销售占比（百分比）',
        dataIndex: 'saleProportion',
        width: 100,
        align: 'center',
        render: val => (
          <>
            <EllipsisCustom tooltip lines={1} removeChildren extraContent={<>{`${val * 100}%`}</>}>
              {`${val * 100}%`}
            </EllipsisCustom>
          </>
        ),
      },
      {
        title: '时段',
        dataIndex: 'rankId',
        width: 100,
        align: 'right',
        render: () => (
          <span style={{ fontWeight: 600 }}>
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
            {metaData.mode === 4 ? `${formatDatetime(metaData.startTime, 'YYYY-MM', '--')}` : null}
            {metaData.mode === 5 ? `${formatDatetime(metaData.startTime, 'YYYY', '--')}` : null}
          </span>
        ),
      },
    ];

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
                    <FromDisplayItem
                      name={fieldData.areaAgentName}
                      value={metaData === null ? '' : metaData.additional.areaAgentName || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.onlineSaleAmount}
                      value={metaData === null ? '' : metaData.onlineSaleAmount || '0'}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.modeNote}
                      value={metaData === null ? '' : metaData.modeNote || ''}
                    />
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>

          <Card
            title={
              <>
                <Icon type="project" />
                <span className={styles.cardTitle}>品类数据</span>
              </>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Table columns={columns} dataSource={listOnline} pagination={false} />
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
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.createTime}
                      value={metaData === null ? '' : metaData.createTime || ''}
                    />
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
        </div>
        <BackTop />
      </>
    );
  }
}

export default BasicInfo;
