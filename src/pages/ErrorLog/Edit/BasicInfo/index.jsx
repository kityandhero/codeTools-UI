import React from 'react';
import { connect } from 'umi';
import { Card, Affix, Row, Col, Spin } from 'antd';

import { getDerivedStateFromPropsForUrlParams, formatDatetime } from '@/utils/tools';
import { constants } from '@/customConfig/config';
import accessWayCollection from '@/customConfig/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

@connect(({ errorLog, global, loading }) => ({
  errorLog,
  global,
  loading: loading.models.errorLog,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.errorLog.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'errorLog/get',
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    if (metaData != null) {
      values[constants.channelNote.name] = metaData.channelNote || '';
      values[constants.createTime.name] =
        formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
      values[constants.updateTime.name] =
        formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';
    }

    return values;
  };

  getFormLayout = () => {
    return 'horizontal';
  };

  formContent = () => {
    const { dataLoading, processing, metaData } = this.state;

    return (
      <>
        <Card
          title={this.renderBasicInfoTitle()}
          className={styles.card}
          bordered={false}
          bodyStyle={{ paddingBottom: 0 }}
          extra={
            <Affix offsetTop={20}>
              <div>{this.renderRefreshButton()}</div>
            </Affix>
          }
        >
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col span={24}>
                {this.renderFormDisplay(
                  fieldData.message.label,
                  metaData == null ? '无' : metaData.message || '无',
                )}
              </Col>
              <Col span={24}>
                {this.renderFormDisplay(
                  fieldData.causeMessage.label,
                  metaData == null ? '无' : metaData.causeMessage || '无',
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card title="其他信息" className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col span={24}>
                {this.renderFormDisplay(
                  fieldData.uri.label,
                  metaData == null ? '无' : metaData.uri || '无',
                )}
              </Col>
              <Col span={24}>
                {this.renderFormDisplay(
                  fieldData.exceptionTypeName.label,
                  metaData == null ? '无' : metaData.exceptionTypeName || '无',
                )}
              </Col>
              <Col span={24}>
                {this.renderFormDisplay(
                  fieldData.scene.label,
                  metaData == null ? '无' : metaData.scene || '无',
                )}
              </Col>
              <Col span={24}>
                {this.renderFormDisplay(
                  fieldData.otherLog.label,
                  metaData == null ? '无' : metaData.otherLog || '无',
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card title="其他信息" className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  fieldData.host.label,
                  metaData == null ? '无' : metaData.host || '无',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  fieldData.port.label,
                  metaData == null ? '无 | 默认' : metaData.port || '无 | 默认',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  fieldData.sendNotification.label,
                  metaData == null
                    ? '否'
                    : (metaData.sendNotification || 0) === 0
                    ? '否'
                    : '是' || '否',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  fieldData.sendResult.label,
                  metaData == null ? '否' : (metaData.sendResult || 0) === 0 ? '否' : '是' || '否',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  fieldData.sendUnixTime.label,
                  metaData == null
                    ? '无'
                    : `${metaData.sendUnixTime || 0}` === '0'
                    ? '无'
                    : metaData.sendUnixTime || '无',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  fieldData.degreeNote.label,
                  metaData == null ? '无' : metaData.degreeNote || '无',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  fieldData.resolveNote.label,
                  metaData == null ? '无' : metaData.resolveNote || '无',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  constants.statusNote.label,
                  metaData == null ? '无' : metaData.statusNote || '无',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  constants.channelNote.label,
                  metaData == null ? '无' : metaData.channelNote || '无',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  constants.ip.label,
                  metaData == null ? '无' : metaData.ip || '无',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  constants.createTime.label,
                  metaData == null ? '无' : metaData.createTime || '无',
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDisplay(
                  constants.updateTime.label,
                  metaData == null ? '无' : metaData.updateTime || '无',
                )}
              </Col>
            </Row>
          </Spin>
        </Card>
      </>
    );
  };
}

export default BasicInfo;
