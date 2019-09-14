import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Button, Form, Row, Col, Input, Spin, Select, notification, Icon, Affix } from 'antd';

import {
  refitFieldDecoratorOption,
  buildFieldDescription,
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import AddFormBase from '@/customComponents/Framework/CustomForm/AddFormBase';

import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

import styles from './index.less';

const { TextArea } = Input;
const FormItem = Form.Item;

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class Edit extends AddFormBase {
  componentAuthority = accessWayCollection.product.add;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadDataAfterMount: false,
        pageName: '发布新品',
        submitApiPath: 'product/addBasicInfo',
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

  getApiData = props => {
    const {
      product: { data },
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
          title="基本信息"
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
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.title}>
                    {getFieldDecorator(
                      'title',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.title),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.title)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.no}>
                    {getFieldDecorator(
                      'no',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.no),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.no)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <FormItem label={fieldData.subtitle}>
                    {getFieldDecorator(
                      'subtitle',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.subtitle),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.subtitle)}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.habitat}>
                    {getFieldDecorator(
                      'habitat',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.habitat),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.habitat)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.spec}>
                    {getFieldDecorator(
                      'spec',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.spec),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.spec)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.feature}>
                    {getFieldDecorator(
                      'feature',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.feature),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.feature)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormProductSaleTimeModeFormItem('')}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.rankId}>
                    {getFieldDecorator(
                      'rankId',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.rankId),
                          },
                        ],
                      }),
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.rankId, '选择')}
                        // onChange={handleChange}
                      >
                        {this.renderRankOption()}
                      </Select>,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormSaleTypeFormItem()}
                </Col>
                <Col lg={6} md={12} sm={24} />
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card title="库存、价格、提成与积分" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.storeCount}
                    extra={buildFieldHelper(fieldData.storeCountAddHelper)}
                  >
                    {getFieldDecorator(
                      'storeCount',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.storeCount),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.storeCount)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.costPrice}>
                    {getFieldDecorator(
                      'costPrice',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.costPrice),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.costPrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.stockPrice}>
                    {getFieldDecorator(
                      'stockPrice',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.stockPrice),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.stockPrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.salePrice}>
                    {getFieldDecorator(
                      'salePrice',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.salePrice),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.salePrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.appSalePrice}>
                    {getFieldDecorator(
                      'appSalePrice',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.appSalePrice),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.appSalePrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.marketPrice}>
                    {getFieldDecorator(
                      'marketPrice',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.marketPrice),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.marketPrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.expressPrice}>
                    {getFieldDecorator(
                      'expressPrice',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.expressPrice),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.expressPrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.returnPrice}>
                    {getFieldDecorator(
                      'returnPrice',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.returnPrice),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.returnPrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.score}>
                    {getFieldDecorator(
                      'score',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.score),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.score)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormIsUpStoreFormItem(0)}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormIsUpAppFormItem(0)}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormIsUpWxFormItem(0)}
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
