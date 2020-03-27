import React from 'react';
import { connect } from 'dva';
import { Card, Affix, Row, Col, Spin, BackTop } from 'antd';

import {
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
  formatDatetime,
} from '@/utils/tools';
import { constants } from '@/customConfig/config';
import accessWayCollection from '@/customConfig/accessWayCollection';
import HtmlBox from '@/customComponents/HtmlBox';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

@connect(({ errorLog, global, loading }) => ({
  errorLog,
  global,
  loading: loading.models.errorLog,
}))
class Index extends TabPageBase {
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

  buildInitialValues = (metaData) => {
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

  formContent = () => {
    const { dataLoading, processing, metaData } = this.state;

    return (
      <>
        <>
          <Card
            title="基本信息"
            className={styles.card}
            bordered={false}
            extra={
              <Affix offsetTop={20}>
                <div>{this.renderRefreshButton()}</div>
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Row gutter={24}>
                <Col span={24}>
                  <HtmlBox>{metaData === null ? '' : metaData.message || '无'}</HtmlBox>
                </Col>
              </Row>
            </Spin>
          </Card>

          <Card title="详细信息" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Row gutter={24}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  {this.renderFormTextAreaFormItem(
                    fieldData.content.label,
                    fieldData.content.name,
                    false,
                    buildFieldHelper(fieldData.content.helper),
                    null,
                    false,
                  )}
                </Col>
              </Row>
            </Spin>
          </Card>

          <Card title="其他信息" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFromCreateTimeField()}
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFromUpdateTimeField()}
                </Col>
              </Row>
            </Spin>
          </Card>
        </>
        <BackTop />
      </>
    );
  };
}

export default Index;
