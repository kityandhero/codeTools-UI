import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Row, Col, Spin, BackTop, Affix } from 'antd';
import { ReloadOutlined, FormOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
  formatDatetime,
} from '../../../../utils/tools';
import { constants } from '../../../../customConfig/config';
import accessWayCollection from '../../../../customConfig/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class Index extends TabPageBase {
  componentAuthority = accessWayCollection.accessWay.get;

  formRef = React.createRef();

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

  getTargetForm = () => {
    return this.formRef.current;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    values[fieldData.name.name] = metaData === null ? '' : metaData.name || '';
    values[fieldData.description.name] = metaData === null ? '' : metaData.description || '';
    values[fieldData.tag.name] = metaData === null ? '' : metaData.tag || '';
    values[fieldData.relativePath.name] = metaData === null ? '' : metaData.relativePath || '';
    values[constants.createTime.name] =
      metaData === null ? '' : formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
    values[constants.updateTime.name] =
      metaData === null ? '' : formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';

    const form = this.getTargetForm();

    form.setFieldsValue(values);
  };

  formContent = () => {
    const { dataLoading, processing } = this.state;

    return (
      <>
        <div className={styles.containorBox}>
          <Form ref={this.formRef} layout="vertical">
            <Card
              title="基本信息"
              className={styles.card}
              bordered={false}
              extra={
                <Affix offsetTop={20}>
                  <>
                    <Button
                      type="default"
                      icon={<ReloadOutlined />}
                      disabled={dataLoading || processing}
                      onClick={() => {
                        this.reloadData();
                      }}
                      loading={processing}
                    >
                      刷新
                    </Button>
                  </>
                </Affix>
              }
            >
              <Spin spinning={dataLoading || processing}>
                <Row gutter={24}>
                  <Col lg={12} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.name.label,
                      fieldData.name.name,
                      true,
                      buildFieldHelper(fieldData.name.helper),
                      <FormOutlined />,
                      null,
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.tag.label,
                      fieldData.tag.name,
                      true,
                      buildFieldHelper(fieldData.tag.helper),
                      <FormOutlined />,
                      null,
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.relativePath.label,
                      fieldData.relativePath.name,
                      true,
                      buildFieldHelper(fieldData.relativePath.helper),
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
                    {this.renderFormTextAreaFormItem(
                      fieldData.description.label,
                      fieldData.description.name,
                      false,
                      buildFieldHelper(fieldData.description.helper),
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
          </Form>
        </div>
        <BackTop />
      </>
    );
  };
}

export default Index;
