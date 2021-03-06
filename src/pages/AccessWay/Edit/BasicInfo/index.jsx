import React from 'react';
import { connect } from 'umi';
import { Card, Row, Col, Spin, Affix } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { getDerivedStateFromPropsForUrlParams, formatDatetime } from '@/utils/tools';
import { constants } from '@/customConfig/config';
import accessWayCollection from '@/customConfig/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.accessWay.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'accessWay/get',
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
      values[fieldData.name.name] = metaData.name || '';
      values[fieldData.description.name] = metaData.description || '';
      values[fieldData.tag.name] = metaData.tag || '';
      values[fieldData.relativePath.name] = metaData.relativePath || '';
      values[constants.createTime.name] =
        formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
      values[constants.updateTime.name] =
        formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';
    }

    return values;
  };

  formContent = () => {
    const { dataLoading, processing } = this.state;

    return (
      <>
        <Card
          title={this.renderMainTitle()}
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
              <Col lg={12} md={12} sm={24} xs={24}>
                {this.renderFormInput(
                  fieldData.name.label,
                  fieldData.name.name,
                  true,
                  fieldData.name.helper,
                  <FormOutlined />,
                  null,
                  false,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInput(
                  fieldData.tag.label,
                  fieldData.tag.name,
                  true,
                  fieldData.tag.helper,
                  <FormOutlined />,
                  null,
                  false,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInputNumber(
                  fieldData.relativePath.label,
                  fieldData.relativePath.name,
                  true,
                  fieldData.relativePath.helper,
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
              <Col span={24}>
                {this.renderFormTextArea(
                  fieldData.description.label,
                  fieldData.description.name,
                  false,
                  fieldData.description.helper,
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
    );
  };
}

export default BasicInfo;
