import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Button, Form, Row, Col, Input, Spin, Select, notification, Icon, Affix } from 'antd';

import { refitFieldDecoratorOption, buildFieldDescription, refitCommonData } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import AddFormBase from '@/customComponents/CustomForm/AddFormBase';

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

  getApiData = props => {
    const {
      product: { data },
    } = props;

    return data;
  };

  initState = () => {
    const result = {
      pageName: '发布新品',
      submitApiPath: 'product/addBasicInfo',
    };

    return result;
  };

  buyTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.buyTypeList);
  };

  rankList = () => {
    const { global } = this.props;
    return refitCommonData(global.rankList);
  };

  saleTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.saleTypeList);
  };

  unitList = () => {
    const { global } = this.props;
    return refitCommonData(global.unitList);
  };

  isUpStoreList = () => {
    const { global } = this.props;
    return refitCommonData(global.isUpStoreList);
  };

  isUpAppList = () => {
    const { global } = this.props;
    return refitCommonData(global.isUpAppList);
  };

  isUpWxList = () => {
    const { global } = this.props;
    return refitCommonData(global.isUpWxList);
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

    const buyTypeData = this.buyTypeList();
    const buyTypeOption = [];

    buyTypeData.forEach(item => {
      const { name, flag } = item;
      buyTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const rankData = this.rankList();
    const rankOption = [];

    rankData.forEach(item => {
      const { name, flag } = item;
      rankOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const saleTypeData = this.saleTypeList();
    const saleTypeOption = [];

    saleTypeData.forEach(item => {
      const { name, flag } = item;
      saleTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const unitData = this.unitList();
    const unitOption = [];

    unitData.forEach(item => {
      const { name, flag } = item;
      unitOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const isUpStoreData = this.isUpStoreList();
    const isUpStoreOption = [];

    isUpStoreData.forEach(item => {
      const { name, flag } = item;
      isUpStoreOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const isUpAppData = this.isUpAppList();
    const isUpAppOption = [];

    isUpAppData.forEach(item => {
      const { name, flag } = item;
      isUpAppOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const isUpWxData = this.isUpWxList();
    const isUpWxOption = [];

    isUpWxData.forEach(item => {
      const { name, flag } = item;
      isUpWxOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.title)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.no)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.subtitle)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.habitat)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.spec)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.feature)}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.unit}>
                    {getFieldDecorator(
                      'unit',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.unit, '选择'),
                          },
                        ],
                      })
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.unit, '选择')}
                        // onChange={handleChange}
                      >
                        {unitOption}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.buyType}>
                    {getFieldDecorator(
                      'buyType',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.buyType, '选择'),
                          },
                        ],
                      })
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.buyType, '选择')}
                        // onChange={handleChange}
                      >
                        {buyTypeOption}
                      </Select>
                    )}
                  </FormItem>
                </Col>
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
                      })
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.rankId, '选择')}
                        // onChange={handleChange}
                      >
                        {rankOption}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.saleType}>
                    {getFieldDecorator(
                      'saleType',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.saleType, '选择'),
                          },
                        ],
                      })
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.saleType, '选择')}
                        // onChange={handleChange}
                      >
                        {saleTypeOption}
                      </Select>
                    )}
                  </FormItem>
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
                  <FormItem label={fieldData.storeCount}>
                    {getFieldDecorator(
                      'storeCount',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.storeCount),
                          },
                        ],
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.storeCount)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.costPrice)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.stockPrice)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.salePrice)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.appSalePrice)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.marketPrice)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.expressPrice)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.returnPrice)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.score)}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.isUpStore}>
                    {getFieldDecorator(
                      'isUpStore',
                      refitFieldDecoratorOption(0, null, 0, {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.isUpStore, '选择'),
                          },
                        ],
                      })
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.isUpStore, '选择')}
                        // onChange={handleChange}
                      >
                        {isUpStoreOption}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.isUpApp}>
                    {getFieldDecorator(
                      'isUpApp',
                      refitFieldDecoratorOption(0, null, 0, {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.isUpApp, '选择'),
                          },
                        ],
                      })
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.isUpApp, '选择')}
                        // onChange={handleChange}
                      >
                        {isUpAppOption}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.isUpWx}>
                    {getFieldDecorator(
                      'isUpWx',
                      refitFieldDecoratorOption(0, null, 0, {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.isUpWx, '选择'),
                          },
                        ],
                      })
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.isUpWx, '选择')}
                        // onChange={handleChange}
                      >
                        {isUpWxOption}
                      </Select>
                    )}
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
                      })
                    )(
                      <TextArea
                        placeholder="请输入分享标题"
                        autosize={{ minRows: 3, maxRows: 5 }}
                      />
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
                      })
                    )(
                      <TextArea
                        placeholder="请输入分享描述"
                        autosize={{ minRows: 3, maxRows: 5 }}
                      />
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
