import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Row, Col, Input, Spin, BackTop, Affix } from 'antd';
import { FormOutlined, SaveOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  buildFieldDescription,
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
} from '../../../../utils/tools';
import accessWayCollection from '../../../../customConfig/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

const FormItem = Form.Item;

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class Index extends TabPageBase {
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

  formContent = () => {
    const { dataLoading, processing, metaData } = this.state;

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title="基本信息"
            className={styles.card}
            bordered={false}
            extra={
              <Affix offsetTop={20}>
                <>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    disabled={dataLoading || processing}
                    onClick={this.validate}
                    loading={processing}
                  >
                    保存
                  </Button>
                </>
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={12} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.name,
                      'title',
                      metaData === null ? '' : metaData.title || '',
                      true,
                      buildFieldHelper(fieldData.nameHelper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.contactInformation,
                      'contactInformation',
                      metaData === null ? '' : metaData.contactInformation || '',
                      true,
                      buildFieldHelper(fieldData.contactInformationHelper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.sort,
                      'sort',
                      metaData === null ? '' : metaData.sort || '',
                      true,
                      buildFieldHelper(fieldData.sortHelper),
                    )}
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>

          <Card title="其他信息" className={styles.card} bordered={false}>
            <Spin spinning={processing}>
              <Form layout="vertical">
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
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.inTime}>
                      <Input
                        addonBefore={<FormOutlined />}
                        value={formatDatetime(new Date(), 'YYYY-MM-DD HH:mm')}
                        disabled
                        placeholder={buildFieldDescription(fieldData.url)}
                      />
                    </FormItem>
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

export default Index;
