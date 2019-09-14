import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Input,
  Spin,
  notification,
  Icon,
  Select,
  InputNumber,
  Affix,
  message,
  DatePicker,
} from 'antd';

import {
  refitFieldDecoratorOption,
  buildFieldDescription,
  buildFieldHelper,
  stringIsNullOrWhiteSpace,
  getDerivedStateFromPropsForUrlParams,
  stringToMoment,
  getMomentNow,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import AddFormBase from '@/customComponents/Framework/CustomForm/AddFormBase';
import { goodsTypeCollection } from '@/utils/customConfig';

import ProductDrawer from '../ProductDrawer';
import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData as fieldDataProduct } from '../../Product/Common/data';
import { fieldData } from '../Common/data';

import styles from './index.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ discountActivities, global, loading }) => ({
  discountActivities,
  global,
  loading: loading.models.discountActivities,
}))
@Form.create()
class Edit extends AddFormBase {
  componentAuthority = accessWayCollection.discountActivities.add;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadDataAfterMount: false,
        pageName: '发布新品',
        submitApiPath: 'discountActivities/addBasicInfo',
        selectGoods: null,
        productDrawerVisible: false,
        goodsTypeSelected: undefined,
        goodsType: null,
        businessId: null,
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
      discountActivities: { data },
    } = props;

    return data;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { goodsType, businessId } = this.state;

    d.goodsType = goodsType;
    d.businessId = businessId;

    return d;
  };

  checkSubmitRequestParams = o => {
    const { goodsType, businessId } = o;

    if ((goodsType || null) == null) {
      message.warn('请选择预售商品');

      return false;
    }

    if (stringIsNullOrWhiteSpace(businessId)) {
      message.warn('请选择预售商品');

      return false;
    }

    return true;
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
      data: { discountActivitiesId },
    } = data;

    const location = {
      pathname: `/marketing/discount/edit/load/${discountActivitiesId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
  };

  showProductDrawer = () => {
    this.setState({
      productDrawerVisible: true,
    });
  };

  afterProductDrawerClose = o => {
    if ((o || null) == null) {
      this.setState({ productDrawerVisible: false });
    } else {
      const { goodsType, businessId } = o;

      this.setState({
        productDrawerVisible: false,
        goodsTypeSelected: goodsTypeCollection.product,
        goodsType,
        businessId,
      });
    }
  };

  afterProductDrawerSelectSuccess = o => {
    if ((o || null) == null) {
      message.warn('请选择商品');

      return;
    }

    this.setState({ selectGoods: o });
  };

  afterGoodsTypeSelect = v => {
    if (v === goodsTypeCollection.product) {
      this.showProductDrawer();
      return;
    }

    // if (v === goodsTypeCollection.simpleTicket) {
    //   this.showProductDrawer();

    //   return;
    // }

    // if (v === goodsTypeCollection.lineTicket) {
    //   this.showProductDrawer();

    //   return;
    // }

    message.warn('无效的选择');
  };

  renderOther = () => {
    const { productDrawerVisible } = this.state;

    if (
      this.checkAuthority(accessWayCollection.discountActivities.listSource) &&
      this.checkAuthority(accessWayCollection.discountActivities.selectFromSource)
    ) {
      return (
        <ProductDrawer
          visible={productDrawerVisible || false}
          width={1200}
          onClose={this.hideProductDrawer}
          afterOperateSuccess={this.afterOperateSuccess}
          afterSelectSuccess={this.afterProductDrawerSelectSuccess}
          afterClose={this.afterProductDrawerClose}
        />
      );
    }

    return null;
  };

  formContent = () => {
    const { form } = this.props;
    const { processing, selectGoods, goodsTypeSelected } = this.state;
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
                <Col lg={12} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.activitiesTitle,
                    'activitiesTitle',
                    '',
                    true,
                    buildFieldHelper(fieldData.activitiesTitleAddHelper),
                  )}
                </Col>
                <Col lg={6} md={12} sm={24} />
              </Row>
              <Row gutter={24}>
                <Col lg={12} md={12} sm={24}>
                  <FormItem
                    label={fieldData.goodsTitle}
                    extra={buildFieldHelper(fieldData.goodsTitleAddHelper)}
                  >
                    <Input
                      addonBefore={<Icon type="shop" />}
                      value={selectGoods ? selectGoods.goodsTitle : ''}
                      readOnly
                      placeholder={buildFieldDescription(fieldData.goodsTitle, '选择')}
                      addonAfter={
                        <Select
                          value={(selectGoods || null) == null ? undefined : goodsTypeSelected}
                          style={{ width: 100 }}
                          placeholder="选择商品"
                          onSelect={v => {
                            this.afterGoodsTypeSelect(v);
                          }}
                        >
                          <Option value={goodsTypeCollection.product}>实物商品</Option>
                          {/* <Option value={goodsTypeCollection.simpleTicket}>简单票务</Option>
                          <Option value={goodsTypeCollection.lineTicket}>复杂票务</Option> */}
                        </Select>
                      }
                    />
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {goodsTypeSelected === goodsTypeCollection.product ? (
                    <FormItem label={fieldDataProduct.spec}>
                      <Input
                        addonBefore={<Icon type="form" />}
                        value={(selectGoods || null) != null ? selectGoods.spec || '' : ''}
                        readOnly={(selectGoods || null) != null}
                        disabled={(selectGoods || null) == null}
                        placeholder="选择商品后显示"
                      />
                    </FormItem>
                  ) : null}
                </Col>
                <Col lg={6} md={12} sm={24} />
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card title="售卖设置" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.activitiesStoreCount}
                    extra={buildFieldHelper(fieldData.activitiesStoreCountAddHelper)}
                  >
                    {getFieldDecorator(
                      'activitiesStoreCount',
                      refitFieldDecoratorOption(0, 0, 0, {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.activitiesStoreCount),
                          },
                        ],
                      }),
                    )(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder={buildFieldDescription(fieldData.activitiesStoreCount)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.activitiesSalePrice}
                    extra={buildFieldHelper(fieldData.activitiesSalePriceAddHelper)}
                  >
                    {getFieldDecorator(
                      'activitiesSalePrice',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.activitiesSalePrice),
                          },
                        ],
                      }),
                    )(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        step={0.01}
                        placeholder={buildFieldDescription(fieldData.activitiesSalePrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.stockPrice}
                    extra={buildFieldHelper(fieldData.stockPriceAddHelper)}
                  >
                    {getFieldDecorator(
                      'stockPrice',
                      refitFieldDecoratorOption(null, null, null, {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.stockPrice),
                          },
                        ],
                      }),
                    )(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        step={0.01}
                        placeholder={buildFieldDescription(fieldData.stockPrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.inviterRewardPrice}
                    extra={buildFieldHelper(fieldData.inviterRewardPriceAddHelper)}
                  >
                    {getFieldDecorator(
                      'inviterRewardPrice',
                      refitFieldDecoratorOption(0, null, 0, {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.inviterRewardPrice),
                          },
                        ],
                      }),
                    )(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        step={0.01}
                        placeholder={buildFieldDescription(fieldData.inviterRewardPrice)}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.orderExpireMinute}
                    extra={buildFieldHelper(fieldData.orderExpireMinuteAddHelper)}
                  >
                    {getFieldDecorator(
                      'orderExpireMinute',
                      refitFieldDecoratorOption(20, 20, 20, {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.orderExpireMinute),
                          },
                        ],
                      }),
                    )(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder={buildFieldDescription(fieldData.orderExpireMinute)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.isCanRefund}
                    extra={buildFieldHelper(fieldData.isCanRefundAddHelper)}
                  >
                    {getFieldDecorator(
                      'isCanRefund',
                      refitFieldDecoratorOption(0, 0, 0, {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.isCanRefund, '选择'),
                          },
                        ],
                      }),
                    )(
                      <Select
                        placeholder={buildFieldDescription(fieldData.isCanRefund, '选择')}
                        style={{ width: '100%' }}
                      >
                        <Option value={1}>是</Option>
                        <Option value={0}>否</Option>
                      </Select>,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.limitCustomerByCount}
                    extra={buildFieldHelper(fieldData.limitCustomerByCountAddHelper)}
                  >
                    {getFieldDecorator(
                      'limitCustomerByCount',
                      refitFieldDecoratorOption(0, 0, 0, {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.limitCustomerByCount),
                          },
                        ],
                      }),
                    )(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder={buildFieldDescription(fieldData.limitCustomerByCount)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.limitMerchantByCount}
                    extra={buildFieldHelper(fieldData.limitMerchantByCountAddHelper)}
                  >
                    {getFieldDecorator(
                      'limitMerchantByCount',
                      refitFieldDecoratorOption(0, 0, 0, {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.limitMerchantByCount),
                          },
                        ],
                      }),
                    )(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder={buildFieldDescription(fieldData.limitMerchantByCount)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.saleStartTime}
                    extra={buildFieldHelper(fieldData.saleStartTimeAddHelper)}
                  >
                    {getFieldDecorator(
                      'saleStartTime',
                      refitFieldDecoratorOption(
                        null,
                        true,
                        null,
                        {
                          rules: [
                            {
                              required: true,
                              message: buildFieldDescription(fieldData.saleStartTime),
                            },
                          ],
                        },
                        v => stringToMoment(v),
                      ),
                    )(
                      <DatePicker
                        style={{ width: '100%' }}
                        showTime={{
                          minuteStep: 60,
                          secondStep: 60,
                        }}
                        format="YYYY-MM-DD HH:00:00"
                        inputReadOnly
                        disabledDate={current => {
                          return (
                            current &&
                            current <
                              getMomentNow()
                                .add('day', -1)
                                .endOf('day') -
                                1
                          );
                        }}
                        placeholder={buildFieldDescription(fieldData.saleStartTime, '选择')}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.saleEndTime}
                    extra={buildFieldHelper(fieldData.saleEndTimeHelper)}
                  >
                    {getFieldDecorator(
                      'saleEndTime',
                      refitFieldDecoratorOption(
                        null,
                        true,
                        null,
                        {
                          rules: [
                            {
                              required: true,
                              message: buildFieldDescription(fieldData.saleEndTime),
                            },
                          ],
                        },
                        v => stringToMoment(v),
                      ),
                    )(
                      <DatePicker
                        style={{ width: '100%' }}
                        showTime={{
                          minuteStep: 60,
                          secondStep: 60,
                        }}
                        format="YYYY-MM-DD HH:00:00"
                        inputReadOnly
                        disabledDate={current => {
                          return (
                            current &&
                            current <
                              getMomentNow()
                                .add('day', -1)
                                .endOf('day')
                          );
                        }}
                        placeholder={buildFieldDescription(fieldData.saleEndTime, '选择')}
                      />,
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
                  <FormItem label={fieldData.shareTitle}>
                    {getFieldDecorator(
                      'shareTitle',
                      refitFieldDecoratorOption(
                        goodsTypeSelected === goodsTypeCollection.product && selectGoods != null
                          ? selectGoods.keywords
                          : '',
                        goodsTypeSelected === goodsTypeCollection.product && selectGoods != null
                          ? selectGoods.keywords
                          : '',
                        '',
                        {
                          rules: [
                            {
                              required: false,
                              message: buildFieldDescription(fieldData.shareTitle),
                            },
                          ],
                        },
                      ),
                    )(
                      <TextArea
                        placeholder={buildFieldDescription(fieldData.shareTitle)}
                        autosize={{ minRows: 3, maxRows: 5 }}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label={fieldData.shareDescription}>
                    {getFieldDecorator(
                      'shareDescription',
                      refitFieldDecoratorOption(
                        goodsTypeSelected === goodsTypeCollection.product && selectGoods != null
                          ? selectGoods.description
                          : '',
                        goodsTypeSelected === goodsTypeCollection.product && selectGoods != null
                          ? selectGoods.description
                          : '',
                        '',
                        {
                          rules: [
                            {
                              required: false,
                              message: buildFieldDescription(fieldData.shareDescription),
                            },
                          ],
                        },
                      ),
                    )(
                      <TextArea
                        placeholder={buildFieldDescription(fieldData.shareDescription)}
                        autosize={{ minRows: 3, maxRows: 5 }}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card
          title="宣传海报"
          className={styles.card}
          bordered={false}
          extra="暂不可设置，即将开放"
        >
          <Spin spinning={processing}>
            <Form className="ant-advanced-search-form">
              <Row gutter={24}>
                <Col lg={24} md={24} sm={24}>
                  <FormItem label={fieldData.posterImageUrl}>
                    {getFieldDecorator(
                      'posterImageUrl',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.posterImageUrl),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        disabled
                        placeholder={buildFieldDescription(fieldData.posterImageUrl)}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card title="系统备注信息" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={24} md={12} sm={24}>
                  <FormItem label={fieldData.note} extra={buildFieldHelper(fieldData.noteHelper)}>
                    {getFieldDecorator(
                      'note',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.note),
                          },
                        ],
                      }),
                    )(
                      <TextArea
                        placeholder={buildFieldDescription(fieldData.note)}
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
