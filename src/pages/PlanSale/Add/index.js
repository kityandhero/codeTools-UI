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
  DatePicker,
  Affix,
  message,
} from 'antd';

import {
  refitFieldDecoratorOption,
  buildFieldDescription,
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
  stringToMoment,
  getMomentNow,
  formatDatetime,
  stringIsNullOrWhiteSpace,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import AddFormBase from '@/customComponents/Framework/CustomForm/AddFormBase';

import SourceDrawer from '../SourceDrawer';
import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData as fieldDataProduct } from '../../Product/Common/data';
import { fieldData } from '../Common/data';

import styles from './index.less';

const FormItem = Form.Item;

@connect(({ planSale, product, global, loading }) => ({
  planSale,
  product,
  global,
  loading: loading.models.planSale,
}))
@Form.create()
class Edit extends AddFormBase {
  componentAuthority = accessWayCollection.planSale.addBasicInfo;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadDataAfterMount: false,
        pageName: '发布预售活动',
        submitApiPath: 'planSale/addBasicInfo',
        selectProduct: null,
        sourceDrawerVisible: false,
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
      planSale: { data },
    } = props;

    return data;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { selectProduct } = this.state;

    let productId = '';

    if ((selectProduct || null) != null) {
      productId = selectProduct.productId || '';
    }

    d.productId = productId;

    return d;
  };

  checkSubmitRequestParams = o => {
    const { productId } = o;

    if (stringIsNullOrWhiteSpace(productId)) {
      message.warn('请选择预售商品');

      return false;
    }

    return true;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = data => {
    const { dispatch } = this.props;

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '预售已经添加成功。',
      });
    });

    const location = {
      pathname: '/marketing/planSale/list/no',
    };

    dispatch(routerRedux.replace(location));
  };

  showSourceDrawer = () => {
    this.setState({
      sourceDrawerVisible: true,
    });
  };

  afterSourceDrawerClose = () => {
    this.setState({ sourceDrawerVisible: false });
  };

  afterSourceDrawerSelectSuccess = o => {
    if ((o || null) == null) {
      message.warn('请选择商品');

      return;
    }

    this.setState({ selectProduct: o });
  };

  renderOther = () => {
    if (this.checkAuthority(accessWayCollection.product.list)) {
      const { sourceDrawerVisible } = this.state;

      return (
        <SourceDrawer
          visible={sourceDrawerVisible || false}
          width={1200}
          afterSelectSuccess={this.afterSourceDrawerSelectSuccess}
          afterClose={this.afterSourceDrawerClose}
        />
      );
    }

    return null;
  };

  formContent = () => {
    const { form } = this.props;
    const { processing, selectProduct } = this.state;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.containorBox}>
        <Card
          title="商品信息"
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
                立即发布
              </Button>
            </Affix>
          }
        >
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.title}
                    extra={buildFieldHelper(fieldData.titleAddHelper)}
                  >
                    <Input
                      addonBefore={<Icon type="shop" />}
                      value={selectProduct ? selectProduct.title : ''}
                      readOnly
                      placeholder={buildFieldDescription(fieldData.title, '选择')}
                      addonAfter={
                        <Button
                          icon="form"
                          style={{
                            border: '0px solid #d9d9d9',
                            backgroundColor: '#fafafa',
                            height: '30px',
                          }}
                          disabled={processing}
                          title="选择预售商品"
                          onClick={e => this.showSourceDrawer(e)}
                        >
                          选择
                        </Button>
                      }
                    />
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldDataProduct.spec}>
                    <Input
                      addonBefore={<Icon type="form" />}
                      value={(selectProduct || null) != null ? selectProduct.spec || '' : ''}
                      readOnly={(selectProduct || null) != null}
                      disabled={(selectProduct || null) == null}
                      placeholder="选择商品后显示"
                    />
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldDataProduct.salePrice}>
                    <Input
                      addonBefore={<Icon type="money-collect" />}
                      value={(selectProduct || null) != null ? selectProduct.salePrice || '' : ''}
                      readOnly={(selectProduct || null) != null}
                      disabled={(selectProduct || null) == null}
                      placeholder="选择商品后显示"
                    />
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldDataProduct.storeCount}>
                    <Input
                      addonBefore={<Icon type="form" />}
                      value={(selectProduct || null) != null ? selectProduct.storeCount || '' : ''}
                      readOnly={(selectProduct || null) != null}
                      disabled={(selectProduct || null) == null}
                      placeholder="选择商品后显示"
                    />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card title="预售设置" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.beginPlanSaleTime}
                    extra={buildFieldHelper(fieldData.beginPlanSaleTimeHelper)}
                  >
                    {getFieldDecorator(
                      'beginPlanSaleTime',
                      refitFieldDecoratorOption(
                        null,
                        true,
                        null,
                        {
                          rules: [
                            {
                              required: true,
                              message: buildFieldDescription(fieldData.beginPlanSaleTime),
                            },
                          ],
                        },
                        v => stringToMoment(v),
                      ),
                    )(
                      <DatePicker
                        style={{ width: '100%' }}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
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
                        placeholder={buildFieldDescription(fieldData.beginPlanSaleTime, '选择')}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.endPlanSaleTime}
                    extra={buildFieldHelper(fieldData.endPlanSaleTimeHelper)}
                  >
                    {getFieldDecorator(
                      'endPlanSaleTime',
                      refitFieldDecoratorOption(
                        null,
                        true,
                        null,
                        {
                          rules: [
                            {
                              required: true,
                              message: buildFieldDescription(fieldData.endPlanSaleTime),
                            },
                          ],
                        },
                        v => stringToMoment(v),
                      ),
                    )(
                      <DatePicker
                        style={{ width: '100%' }}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
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
                        placeholder={buildFieldDescription(fieldData.endPlanSaleTime, '选择')}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.outTime}
                    extra={buildFieldHelper(fieldData.outTimeHelper)}
                  >
                    {getFieldDecorator(
                      'outTime',
                      refitFieldDecoratorOption(
                        null,
                        true,
                        null,
                        {
                          rules: [
                            {
                              required: true,
                              message: buildFieldDescription(fieldData.outTime),
                            },
                          ],
                        },
                        v => stringToMoment(v),
                      ),
                    )(
                      <DatePicker
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD"
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
                        placeholder={buildFieldDescription(fieldData.outTime, '选择')}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem
                    label={fieldData.state}
                    extra={buildFieldHelper(fieldData.stateAddHelper)}
                  >
                    <Input disabled value="待开始" />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card title="其他信息" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem label={fieldData.inTime}>
                    <Input
                      addonBefore={<Icon type="form" />}
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
    );
  };
}

export default Edit;
