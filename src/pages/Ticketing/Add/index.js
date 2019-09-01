import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Button, Form, Row, Col, Input, Spin, Select, notification, Icon, Affix } from 'antd';

import {
  refitFieldDecoratorOption,
  buildFieldDescription,
  // getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
} from '@/utils/tools';
// import accessWayCollection from '@/utils/accessWayCollection';
import AddFormBase from '@/customComponents/Framework/CustomForm/AddFormBase';

// import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

import styles from './index.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ ticketing, global, loading }) => ({
  ticketing,
  global,
  loading: loading.models.ticketing,
}))
@Form.create()
class Edit extends AddFormBase {
  // componentAuthority = accessWayCollection.ticketing.add;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadDataAfterMount: false,
        pageName: '发布套餐',
        // submitApiPath: 'product/addBasicInfo',
      },
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return getDerivedStateFromPropsForUrlParams(
  //     nextProps,
  //     prevState,
  //     { id: '' },
  //     parseUrlParamsForSetState,
  //   );
  // }

  getApiData = props => {
    const {
      ticketing: { data },
    } = props;

    return data;
  };

  afterSubmitSuccess = data => {
    const { dispatch } = this.props;

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '商品已经保存成功，请进行下一步操作。',
      });
    });

    const {
      data: { productId },
    } = data;

    const location = {
      pathname: `/product/edit/load/${productId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
  };

  formContent = () => {
    const { form } = this.props;
    const { processing } = this.state;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.containorBox}>
        <Card
          title="套餐信息"
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              {this.getErrorInfo()}
              <Button
                type="primary"
                icon="save"
                disabled={processing}
                onClick={this.validate}
                loading={processing}
              >
                保存并进行下一步
              </Button>
            </Affix>
          }
        >
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={8} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.comboName,
                    'comboName',
                    '',
                    true,
                    buildFieldHelper(fieldData.comboTitleAddHelper),
                  )}
                </Col>
                <Col lg={6} md={12} sm={24} />
              </Row>
              <Row gutter={24}>
                <Col lg={8} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.merchantProductId,
                    'merchantProductId',
                    '',
                    true,
                    buildFieldHelper(fieldData.merchantProductIdHelper),
                  )}
                </Col>
                <Col lg={6} md={12} sm={24} />
              </Row>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.productCategory}>
                    {getFieldDecorator(
                      'productCategory',
                      refitFieldDecoratorOption(fieldData.productFirst, '', '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.productCategory),
                          },
                        ],
                      }),
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.productCategory, '选择')}
                      >
                        <Option value={fieldData.productFirst}>{fieldData.productFirst}</Option>
                        <Option value={fieldData.productSecond}>{fieldData.productSecond}</Option>
                        <Option value={fieldData.productThree}>{fieldData.productThree}</Option>
                        <Option value={fieldData.productFour}>{fieldData.productFour}</Option>
                      </Select>,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.phone}>
                    {getFieldDecorator(
                      'phone',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.phone),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="phone" />}
                        placeholder={buildFieldDescription(fieldData.phone)}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label={fieldData.comboFeature}>
                    {getFieldDecorator(
                      'comboFeature',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.comboFeature),
                          },
                        ],
                      }),
                    )(
                      <TextArea
                        placeholder={fieldData.comboFeatureHelper}
                        autosize={{ minRows: 2, maxRows: 3 }}
                        maxLength="50"
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card title="预定须知" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label={fieldData.comboFeature}>
                    {getFieldDecorator(
                      'comboFeature',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.comboFeature),
                          },
                        ],
                      }),
                    )(<Input addonAfter="ss" placeholder={fieldData.comboFeatureHelper} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label={fieldData.comboFeature}>
                    {getFieldDecorator(
                      'comboFeature',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.comboFeature),
                          },
                        ],
                      }),
                    )(<Input addonAfter="ss" placeholder={fieldData.comboFeatureHelper} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label={fieldData.comboFeature}>
                    {getFieldDecorator(
                      'comboFeature',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.comboFeature),
                          },
                        ],
                      }),
                    )(<Input addonAfter="ss" placeholder={fieldData.comboFeatureHelper} />)}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card title="分享设置" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form className="ant-advanced-search-form">
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="分享标题">
                    {getFieldDecorator(
                      'keywords',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.keywords),
                          },
                        ],
                      }),
                    )(
                      <TextArea
                        placeholder="请输入分享标题"
                        autosize={{ minRows: 3, maxRows: 5 }}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="分享描述">
                    {getFieldDecorator(
                      'description',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.description),
                          },
                        ],
                      }),
                    )(
                      <TextArea
                        placeholder="请输入分享描述"
                        autosize={{ minRows: 3, maxRows: 5 }}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  };
}

export default Edit;
