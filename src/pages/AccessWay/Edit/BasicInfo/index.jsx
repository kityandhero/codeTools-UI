import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Row, Col, Spin, BackTop, Affix } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
  toDatetime,
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

  formContent = () => {
    const { dataLoading, processing, metaData } = this.state;

    const initialValues = {
      name: metaData === null ? '' : metaData.name || '',
      description: metaData === null ? '' : metaData.description || '',
      tag: metaData === null ? '' : metaData.tag || '',
      relativePath: metaData === null ? '' : metaData.relativePath || '',
    };

    initialValues[constants.createTimeName] =
      metaData === null ? '' : toDatetime(metaData.createTime) || '';
    initialValues[constants.updateTimeName] =
      metaData === null ? '' : toDatetime(metaData.updateTime) || '';

    return (
      <>
        <div className={styles.containorBox}>
          <Form ref={this.formRef} initialValues={initialValues} layout="vertical">
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
                  <Col lg={12} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.name,
                      'name',
                      true,
                      buildFieldHelper(fieldData.nameHelper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.tag,
                      'tag',
                      true,
                      buildFieldHelper(fieldData.tagHelper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.relativePath,
                      'relativePath',
                      true,
                      buildFieldHelper(fieldData.relativePathHelper),
                    )}
                  </Col>
                </Row>
              </Spin>
            </Card>

            <Card title="其他信息" className={styles.card} bordered={false}>
              <Spin spinning={processing}>
                <Row gutter={24}>
                  <Col span={24}>
                    {this.renderFormTextAreaFormItem(
                      fieldData.description,
                      'description',
                      metaData === null ? '' : metaData.description || '',
                      false,
                      buildFieldHelper(fieldData.descriptionHelper),
                      {
                        autoSize: { minRows: 3, maxRows: 5 },
                      },
                    )}
                  </Col>
                </Row>
              </Spin>
            </Card>

            <Card title="其他信息" className={styles.card} bordered={false}>
              <Spin spinning={processing}>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFromCreateTimeField()}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
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
