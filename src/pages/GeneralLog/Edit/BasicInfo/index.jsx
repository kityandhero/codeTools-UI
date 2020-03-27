import React from 'react';
import { connect } from 'dva';
import { Form, Card, Affix, Row, Col, Spin, BackTop } from 'antd';
import { ContactsOutlined, FormOutlined } from '@ant-design/icons';

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

@connect(({ generalLog, global, loading }) => ({
  generalLog,
  global,
  loading: loading.models.generalLog,
}))
class Index extends TabPageBase {
  componentAuthority = accessWayCollection.generalLog.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'generalLog/get',
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
      values[constants.ip.name] = metaData.ip || '';
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
        <Card
          title={this.renderBasicInfoTitle()}
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

        <Card
          title={
            <>
              <ContactsOutlined />
              <span className={styles.cardTitle}>{fieldData.content.label}</span>
            </>
          }
          className={styles.card}
          bordered={false}
        >
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col lg={24} md={12} sm={24}>
                <HtmlBox>{metaData === null ? '' : metaData.content || '无'}</HtmlBox>
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card title="其他信息" className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Form ref={this.formRef} layout="vertical">
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFormInputFormItem(
                    constants.ip.label,
                    constants.ip.name,
                    true,
                    buildFieldHelper(constants.ip.helper),
                    <FormOutlined />,
                    null,
                    false,
                  )}
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFormInputFormItem(
                    constants.channelNote.label,
                    constants.channelNote.name,
                    true,
                    buildFieldHelper(constants.channelNote.helper),
                    <FormOutlined />,
                    null,
                    false,
                  )}
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFromCreateTimeField()}
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFromUpdateTimeField()}
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <BackTop />
      </>
    );
  };
}

export default Index;
