import React from 'react';
import { Form, Select, Radio, DatePicker } from 'antd';

import {
  getDerivedStateFromPropsForUrlParams,
  refitCommonData,
  isInvalid,
  searchFromList,
  buildFieldDescription,
  refitFieldDecoratorOption,
  isFunction,
} from '@/utils/tools';
import CustomCommonCore from '@/customComponents/Framework/CustomCommonCore';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;

const unlimitedWithNumberFlag = {
  key: -10000,
  name: '不限',
  flag: -10000,
};

const unlimitedWithStringFlag = {
  key: '-10000',
  name: '不限',
  flag: '-10000',
};

class Index extends CustomCommonCore {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  renderSearchBatchDateFormItem = (label = '出库批次') => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '出库批次';

    return (
      <FormItem label={title}>
        {getFieldDecorator('batchDate', {
          rules: [
            {
              required: false,
              message: buildFieldDescription(title, '选择'),
            },
          ],
        })(
          <DatePicker
            placeholder={buildFieldDescription(title, '选择')}
            format="YYYY-MM-DD"
            onChange={this.onBatchDateChange}
            style={{ width: '100%' }}
          />
        )}
      </FormItem>
    );
  };

  rankList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = (global.rankList || []).map(o => {
      const d = o;
      d.flag = d.rankId;

      return d;
    });

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getRankName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('rankId', v, this.rankList(false));
    return item == null ? '未知' : item.name;
  };

  renderRankOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.rankList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchRankFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '商品品类'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品品类';

    return (
      <FormItem label={title}>
        {getFieldDecorator('rankId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRankOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  brandList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = (global.brandList || []).map(o => {
      const d = o;
      d.flag = d.brandId;

      return d;
    });

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getBrandName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('brandId', v, this.brandList(false));
    return item == null ? '未知' : item.name;
  };

  renderBrandOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.brandList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchBrandFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '商品品牌'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品品牌';

    return (
      <FormItem label={title}>
        {getFieldDecorator('brandId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderBrandOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  simpleTicketRankList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = (global.simpleTicketRankList || []).map(o => {
      const d = o;
      d.flag = d.simpleTicketRankId;

      return d;
    });

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getSimpleTicketRankName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('simpleTicketRankId', v, this.simpleTicketRankList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketRankOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketRankList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketRankFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '票务品类'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '票务品类';

    return (
      <FormItem label={title}>
        {getFieldDecorator('simpleTicketRankId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketRankOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketRankFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '所属品类',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '所属品类';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'simpleTicketRankId',
          refitFieldDecoratorOption(
            value === null ? undefined : value.simpleTicketRankId || undefined,
            value === null ? undefined : value.simpleTicketRankId || undefined,
            undefined,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            }
          )
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderSimpleTicketRankOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  saleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const saleTypeList = global.saleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(saleTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(saleTypeList);
  };

  getSaleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.saleTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderSaleTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.saleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSaleTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '销售类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '销售类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('saleType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSaleTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  productStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const productStateList = global.productStateList || [];

    if (withUnlimited) {
      return refitCommonData(productStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(productStateList);
  };

  getProductStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '产品状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '产品状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormProductStateFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '商品状态',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品状态';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'state',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderProductStateOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  productBuyTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const productBuyTypeList = global.productBuyTypeList || [];

    if (withUnlimited) {
      return refitCommonData(productBuyTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(productBuyTypeList);
  };

  getProductBuyTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productBuyTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductBuyTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productBuyTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductBuyTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '售卖方式'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '售卖方式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('buyType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductBuyTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  productSaleTimeModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const productSaleTimeModeList = global.productSaleTimeModeList || [];

    if (withUnlimited) {
      return refitCommonData(productSaleTimeModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(productSaleTimeModeList);
  };

  getProductSaleTimeModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productSaleTimeModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductSaleTimeModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productSaleTimeModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductSaleTimeModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '定时上下架模式'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '定时上下架模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('saleTimeMode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductSaleTimeModeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormProductSaleTimeModeFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '定时上下架模式',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '定时上下架模式';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'saleTimeMode',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderProductSaleTimeModeOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  planSaleStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const planSaleStateList = global.planSaleStateList || [];

    if (withUnlimited) {
      return refitCommonData(planSaleStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(planSaleStateList);
  };

  getPlanSaleStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.planSaleStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderPlanSaleStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.planSaleStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPlanSaleStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '预售状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '预售状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPlanSaleStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  statisticModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const statisticModeList = global.statisticModeList || [];

    if (withUnlimited) {
      return refitCommonData(statisticModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(statisticModeList);
  };

  getStatisticModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.statisticModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderStatisticModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.statisticModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchStatisticModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '统计模式'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '统计模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('mode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderStatisticModeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  merchantSaleStatisticShowModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantSaleStatisticShowModeList = global.merchantSaleStatisticShowModeList || [];

    if (withUnlimited) {
      return refitCommonData(merchantSaleStatisticShowModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantSaleStatisticShowModeList);
  };

  getMerchantSaleStatisticShowModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantSaleStatisticShowModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantSaleStatisticShowModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.merchantSaleStatisticShowModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantSaleStatisticShowModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '显示模式'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '显示模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('showMode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantSaleStatisticShowModeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  discountActivitiesGoodsTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const discountActivitiesGoodsTypeList = global.discountActivitiesGoodsTypeList || [];

    if (withUnlimited) {
      return refitCommonData(discountActivitiesGoodsTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(discountActivitiesGoodsTypeList);
  };

  getDiscountActivitiesGoodsTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.discountActivitiesGoodsTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderDiscountActivitiesGoodsTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.discountActivitiesGoodsTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchDiscountActivitiesGoodsTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '商品类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('goodsType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDiscountActivitiesGoodsTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormDiscountActivitiesGoodsTypeFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '商品类型',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '商品类型';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'goodsType',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderDiscountActivitiesGoodsTypeOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  discountActivitiesStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const discountActivitiesStateList = global.discountActivitiesStateList || [];

    if (withUnlimited) {
      return refitCommonData(discountActivitiesStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(discountActivitiesStateList);
  };

  getDiscountActivitiesStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.discountActivitiesStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderDiscountActivitiesStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.discountActivitiesStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchDiscountActivitiesStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '活动状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '活动状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDiscountActivitiesStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormDiscountActivitiesStateFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'state',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderDiscountActivitiesStateOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  orderStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const orderStatusList = global.orderStatusList || [];

    if (withUnlimited) {
      return refitCommonData(orderStatusList, unlimitedWithNumberFlag);
    }

    return refitCommonData(orderStatusList);
  };

  getOrderStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderOrderStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.orderStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchOrderStatusFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '订单状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '订单状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderOrderStatusOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  payTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const payTypeList = global.payTypeList || [];

    if (withUnlimited) {
      return refitCommonData(payTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(payTypeList);
  };

  getPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.payTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderPayTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.payTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPayTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '付款方式'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '付款方式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('payType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPayTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  userOrderOutboundHistoryTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const userOrderOutboundHistoryTypeList = global.userOrderOutboundHistoryTypeList || [];

    if (withUnlimited) {
      return refitCommonData(userOrderOutboundHistoryTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userOrderOutboundHistoryTypeList);
  };

  getUserOrderOutboundHistoryTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userOrderOutboundHistoryTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserOrderOutboundHistoryTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.userOrderOutboundHistoryTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchUserOrderOutboundHistoryTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '出库类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '出库类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserOrderOutboundHistoryTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  regUserTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const regUserTypeList = global.regUserTypeList || [];

    if (withUnlimited) {
      return refitCommonData(regUserTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(regUserTypeList);
  };

  getRegUserTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.regUserTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderRegUserTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.regUserTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchRegUserTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '用户类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '用户类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRegUserTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormRegUserTypeFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '用户类型',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '用户类型';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'type',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderRegUserTypeOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  userOrderClientTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const userOrderClientTypeList = global.userOrderClientTypeList || [];

    if (withUnlimited) {
      return refitCommonData(userOrderClientTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userOrderClientTypeList);
  };

  getUserOrderClientTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userOrderClientTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserOrderClientTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.userOrderClientTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchUserOrderClientTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '终端类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '终端类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('clientType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserOrderClientTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  roleStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const roleStateList = global.roleStateList || [];

    if (withUnlimited) {
      return refitCommonData(roleStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(roleStateList);
  };

  getRoleStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.roleStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderRoleStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.roleStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchRoleStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '角色状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '角色状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRoleStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  replenishmentReasonTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const replenishmentReasonTypeList = global.replenishmentReasonTypeList || [];

    if (withUnlimited) {
      return refitCommonData(replenishmentReasonTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(replenishmentReasonTypeList);
  };

  getReplenishmentReasonTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentReasonTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentReasonTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentReasonTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentReasonTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '原因类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '原因类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('reasonType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderReplenishmentReasonTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  orderTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const orderTypeList = global.orderTypeList || [];

    if (withUnlimited) {
      return refitCommonData(orderTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(orderTypeList);
  };

  getOrderTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderOrderTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.orderTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchOrderTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '订单类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '订单类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderOrderTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  saleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const saleTypeList = global.saleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(saleTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(saleTypeList);
  };

  getSaleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.saleTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderSaleTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.saleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSaleTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '销售类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '销售类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('saleType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSaleTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormSaleTypeFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '销售类型',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '销售类型';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'saleType',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderSaleTypeOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  replenishmentTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const replenishmentTypeList = global.replenishmentTypeList || [];

    if (withUnlimited) {
      return refitCommonData(replenishmentTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(replenishmentTypeList);
  };

  getReplenishmentTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '售后类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '售后类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderReplenishmentTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  replenishmentStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const replenishmentStateList = global.replenishmentStateList || [];

    if (withUnlimited) {
      return refitCommonData(replenishmentStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(replenishmentStateList);
  };

  getReplenishmentStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '售后状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '售后状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderReplenishmentStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  userSexList = (withUnlimited = true) => {
    const { global } = this.props;

    const userSexList = global.userSexList || [];

    if (withUnlimited) {
      return refitCommonData(userSexList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userSexList);
  };

  getUserSexName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userSexList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserSexOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.userSexList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchUserSexFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '用户性别'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '用户性别';

    return (
      <FormItem label={title}>
        {getFieldDecorator('sex', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserSexOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  productUnitList = (withUnlimited = true) => {
    const { global } = this.props;

    const productUnitList = global.productUnitList || [];

    if (withUnlimited) {
      return refitCommonData(productUnitList, unlimitedWithStringFlag);
    }

    return refitCommonData(productUnitList);
  };

  getProductUnitName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productUnitList(false));
    return item == null ? '未知' : item.name;
  };

  renderProductUnitOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.productUnitList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchProductUnitFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '计量单位'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '计量单位';

    return (
      <FormItem label={title}>
        {getFieldDecorator('unit', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderProductUnitOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormProductUnitFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '计量单位',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '计量单位';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'unit',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderProductUnitOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  simpleTicketUnitList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketUnitList = global.simpleTicketUnitList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketUnitList, unlimitedWithStringFlag);
    }

    return refitCommonData(simpleTicketUnitList);
  };

  getSimpleTicketUnitName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketUnitList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketUnitOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketUnitList(withUnlimited);

    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketUnitFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '计量单位'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '计量单位';

    return (
      <FormItem label={title}>
        {getFieldDecorator('unit', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketUnitOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketUnitFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '计量单位',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '计量单位';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'unit',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderSimpleTicketUnitOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  refundOrderHandleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const refundOrderHandleTypeList = global.refundOrderHandleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(refundOrderHandleTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(refundOrderHandleTypeList);
  };

  getRefundOrderHandleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderHandleTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderRefundOrderHandleTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderHandleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRefundOrderHandleTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderHandleTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchRefundOrderHandleTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '处理类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '处理类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('handleType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRefundOrderHandleTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  refundOrderStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const refundOrderStateList = global.refundOrderStateList || [];

    if (withUnlimited) {
      return refitCommonData(refundOrderStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(refundOrderStateList);
  };

  getRefundOrderStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderRefundOrderStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchRefundOrderStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '退款状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '退款状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRefundOrderStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  merchantPayList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantPayList = global.merchantPayList || [];

    if (withUnlimited) {
      return refitCommonData(merchantPayList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantPayList);
  };

  getMerchantPayName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantPayList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantPayOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantPayList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantPayFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否缴费'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否缴费';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isPay', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantPayOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormMerchantPayFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '是否缴费',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否缴费';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isPay',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderMerchantPayOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  webChannelList = (withUnlimited = true) => {
    const { global } = this.props;

    const webChannelList = global.webChannelList || [];

    if (withUnlimited) {
      return refitCommonData(webChannelList, unlimitedWithNumberFlag);
    }

    return refitCommonData(webChannelList);
  };

  getWebChannelName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.webChannelList(false));
    return item == null ? '未知' : item.name;
  };

  renderWebChannelOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.webChannelList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchWebChannelFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '系统名'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '系统名';

    return (
      <FormItem label={title}>
        {getFieldDecorator('channel', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderWebChannelOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  areaDistributionPayTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaDistributionPayTypeList = global.areaDistributionPayTypeList || [];

    if (withUnlimited) {
      return refitCommonData(areaDistributionPayTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaDistributionPayTypeList);
  };

  getAreaDistributionPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaDistributionPayTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaDistributionPayTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaDistributionPayTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaDistributionPayTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '转款类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '转款类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('payType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaDistributionPayTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  areaDistributionStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaDistributionStateList = global.areaDistributionStateList || [];

    if (withUnlimited) {
      return refitCommonData(areaDistributionStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaDistributionStateList);
  };

  getAreaDistributionStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaDistributionStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaDistributionStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaDistributionStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaDistributionStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '审核状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '审核状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaDistributionStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  areaAccountRecordTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaAccountRecordTypeList = global.areaAccountRecordTypeList || [];

    if (withUnlimited) {
      return refitCommonData(areaAccountRecordTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaAccountRecordTypeList);
  };

  getAreaAccountRecordTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAccountRecordTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaAccountRecordTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaAccountRecordTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaAccountRecordTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变动原因'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变动原因';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaAccountRecordTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  areaManageStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaManageStateList = global.areaManageStateList || [];

    if (withUnlimited) {
      return refitCommonData(areaManageStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaManageStateList);
  };

  getAreaManageStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaManageStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaManageStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaManageStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaManageStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '账户状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '账户状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaManageStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  distributionStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const distributionStateList = global.distributionStateList || [];

    if (withUnlimited) {
      return refitCommonData(distributionStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(distributionStateList);
  };

  getDistributionStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.distributionStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderDistributionStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.distributionStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchDistributionStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDistributionStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  orderMessageList = (withUnlimited = true) => {
    const { global } = this.props;

    const orderMessageList = global.orderMessageList || [];

    if (withUnlimited) {
      return refitCommonData(orderMessageList, unlimitedWithNumberFlag);
    }

    return refitCommonData(orderMessageList);
  };

  getOrderMessageName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderMessageList(false));
    return item == null ? '未知' : item.name;
  };

  renderOrderMessageOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.orderMessageList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchOrderMessageFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '订单消息'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '订单消息';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isReceiveOTMsg', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderOrderMessageOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  administrationAuthorityList = (withUnlimited = true) => {
    const { global } = this.props;

    const administrationAuthorityList = global.administrationAuthorityList || [];

    if (withUnlimited) {
      return refitCommonData(administrationAuthorityList, unlimitedWithNumberFlag);
    }

    return refitCommonData(administrationAuthorityList);
  };

  getAdministrationAuthorityName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.administrationAuthorityList(false));
    return item == null ? '未知' : item.name;
  };

  renderAdministrationAuthorityOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.administrationAuthorityList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAdministrationAuthorityFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '管理权限'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '管理权限';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isManage', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAdministrationAuthorityOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  refundOrderReturnStoreList = (withUnlimited = true) => {
    const { global } = this.props;

    const refundOrderReturnStoreList = global.refundOrderReturnStoreList || [];

    if (withUnlimited) {
      return refitCommonData(refundOrderReturnStoreList, unlimitedWithNumberFlag);
    }

    return refitCommonData(refundOrderReturnStoreList);
  };

  getRefundOrderReturnStoreName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderReturnStoreList(false));
    return item == null ? '未知' : item.name;
  };

  renderRefundOrderReturnStoreOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderReturnStoreList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRefundOrderReturnStoreRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.refundOrderReturnStoreList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchRefundOrderReturnStoreFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '返还库存'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '返还库存';

    return (
      <FormItem label={title}>
        {getFieldDecorator('returnStore', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderRefundOrderReturnStoreOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageTypeList =
      global.goodsLogisticsProcessRequestMessageTypeList || [];

    if (withUnlimited) {
      return refitCommonData(goodsLogisticsProcessRequestMessageTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(goodsLogisticsProcessRequestMessageTypeList);
  };

  getGoodsLogisticsProcessRequestMessageTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.goodsLogisticsProcessRequestMessageTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.goodsLogisticsProcessRequestMessageTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchGoodsLogisticsProcessRequestMessageTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '请求类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '请求类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageModeList =
      global.goodsLogisticsProcessRequestMessageModeList || [];

    if (withUnlimited) {
      return refitCommonData(goodsLogisticsProcessRequestMessageModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(goodsLogisticsProcessRequestMessageModeList);
  };

  getGoodsLogisticsProcessRequestMessageModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.goodsLogisticsProcessRequestMessageModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.goodsLogisticsProcessRequestMessageModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchGoodsLogisticsProcessRequestMessageModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '请求模式'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '请求模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('mode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageModeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageStateList =
      global.goodsLogisticsProcessRequestMessageStateList || [];

    if (withUnlimited) {
      return refitCommonData(goodsLogisticsProcessRequestMessageStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(goodsLogisticsProcessRequestMessageStateList);
  };

  getGoodsLogisticsProcessRequestMessageStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      v,
      this.goodsLogisticsProcessRequestMessageStateList(false)
    );
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.goodsLogisticsProcessRequestMessageStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchGoodsLogisticsProcessRequestMessageStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '处理状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '处理状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList = (
    withUnlimited = true
  ) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList =
      global.goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList || [];

    if (withUnlimited) {
      return refitCommonData(
        goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList,
        {
          key: -10000,
          name: '不限',
          flag: -10000,
        }
      );
    }

    return refitCommonData(
      goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList
    );
  };

  getGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultName = (
    v,
    defaultValue = ''
  ) => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      v,
      this.goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList(false)
    );
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption = (
    withUnlimited = true
  ) => {
    const goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultData = this.goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList(
      withUnlimited
    );
    const goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption = [];

    if (goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultData.length > 0) {
      goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultData.forEach(item => {
        const { name, flag } = item;
        goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption.push(
          <Option key={flag} value={flag}>
            {name}
          </Option>
        );
      });

      return goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption;
    }

    return null;
  };

  renderSearchGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '缺失操作'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '缺失操作';

    return (
      <FormItem label={title}>
        {getFieldDecorator('operationLossCheckResult', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultOption(
              withUnlimited
            )}
          </Select>
        )}
      </FormItem>
    );
  };

  goodsLogisticsProcessRequestMessageDayInspectStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const goodsLogisticsProcessRequestMessageDayInspectStateList =
      global.goodsLogisticsProcessRequestMessageDayInspectStateList || [];

    if (withUnlimited) {
      return refitCommonData(
        goodsLogisticsProcessRequestMessageDayInspectStateList,
        unlimitedWithNumberFlag
      );
    }

    return refitCommonData(goodsLogisticsProcessRequestMessageDayInspectStateList);
  };

  getGoodsLogisticsProcessRequestMessageDayInspectStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      v,
      this.goodsLogisticsProcessRequestMessageDayInspectStateList(false)
    );
    return item == null ? '未知' : item.name;
  };

  renderGoodsLogisticsProcessRequestMessageDayInspectStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.goodsLogisticsProcessRequestMessageDayInspectStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchGoodsLogisticsProcessRequestMessageDayInspectStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderGoodsLogisticsProcessRequestMessageDayInspectStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  merchantStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantStatusList = global.merchantStatusList || [];

    if (withUnlimited) {
      return refitCommonData(merchantStatusList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantStatusList);
  };

  getMerchantStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantStatusFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantStatusOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  advertisementClassList = (withUnlimited = true) => {
    const { global } = this.props;

    const advertisementClassList = global.advertisementClassList || [];

    if (withUnlimited) {
      return refitCommonData(advertisementClassList, unlimitedWithNumberFlag);
    }

    return refitCommonData(advertisementClassList);
  };

  getAdvertisementClassName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.advertisementClassList(false));
    return item == null ? '未知' : item.name;
  };

  renderAdvertisementClassOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.advertisementClassList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAdvertisementClassFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '所属类别'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '所属类别';

    return (
      <FormItem label={title}>
        {getFieldDecorator('classId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAdvertisementClassOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormAdvertisementClassFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '所属类型',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '所属类型';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'classId',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderAdvertisementClassOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  accessWayTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const accessWayTypeList = global.accessWayTypeList || [];

    if (withUnlimited) {
      return refitCommonData(accessWayTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(accessWayTypeList);
  };

  getAccessWayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.accessWayTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAccessWayTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.accessWayTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAccessWayTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '类别'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '类别';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAccessWayTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  areaRankSaleStatisticTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaRankSaleStatisticTypeList = global.areaRankSaleStatisticTypeList || [];

    if (withUnlimited) {
      return refitCommonData(areaRankSaleStatisticTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaRankSaleStatisticTypeList);
  };

  getAreaRankSaleStatisticTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaRankSaleStatisticTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaRankSaleStatisticTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaRankSaleStatisticTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaRankSaleStatisticTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '类别'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '类别';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaRankSaleStatisticTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  replenishmentStateModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const replenishmentStateModeList = global.replenishmentStateModeList || [];

    if (withUnlimited) {
      return refitCommonData(replenishmentStateModeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(replenishmentStateModeList);
  };

  getReplenishmentStateModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentStateModeList(false));
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentStateModeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentStateModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderReplenishmentStateModeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.replenishmentStateModeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentStateModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '模式'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('mode', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderReplenishmentStateModeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  merchantDisplayList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantDisplayList = global.merchantDisplayList || [];

    if (withUnlimited) {
      return refitCommonData(merchantDisplayList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantDisplayList);
  };

  getMerchantDisplayName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantDisplayList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantDisplayOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantDisplayList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantDisplayFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否显示'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否显示';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isDisplay', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantDisplayOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormMerchantDisplayFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '是否显示',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否显示';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isDisplay',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderMerchantDisplayOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  lineList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = (global.lineList || []).map(o => {
      const d = o;
      d.flag = d.lineId;

      return d;
    });

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getLineName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('lineId', v, this.lineList(false));
    return item == null ? '未知' : item.name;
  };

  renderLineOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.lineList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchLineFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '线路标识'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '线路标识';

    return (
      <FormItem label={title}>
        {getFieldDecorator('lineId', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderLineOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormLineFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '线路标识',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '线路标识';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'lineId',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderLineOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  merchantSwitchList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantSwitchList = global.merchantSwitchList || [];

    if (withUnlimited) {
      return refitCommonData(merchantSwitchList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantSwitchList);
  };

  getMerchantSwitchName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantSwitchList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantSwitchOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantSwitchList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantSwitchFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否闭店'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否闭店';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isCloseShop', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantSwitchOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormMerchantSwitchFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '是否闭店',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否闭店';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isCloseShop',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderMerchantSwitchOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  areaAccountRecordIsHandleList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaAccountRecordIsHandleList = global.areaAccountRecordIsHandleList || [];

    if (withUnlimited) {
      return refitCommonData(areaAccountRecordIsHandleList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaAccountRecordIsHandleList);
  };

  getAreaAccountRecordIsHandleName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAccountRecordIsHandleList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaAccountRecordIsHandleOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.areaAccountRecordIsHandleList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaAccountRecordIsHandleFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '处理状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '处理状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isHandle', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaAccountRecordIsHandleOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  merchantPurchaseList = (withUnlimited = true) => {
    const { global } = this.props;

    const merchantPurchaseList = global.merchantPurchaseList || [];

    if (withUnlimited) {
      return refitCommonData(merchantPurchaseList, unlimitedWithNumberFlag);
    }

    return refitCommonData(merchantPurchaseList);
  };

  getMerchantPurchaseName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantPurchaseList(false));
    return item == null ? '未知' : item.name;
  };

  renderMerchantPurchaseOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.merchantPurchaseList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchMerchantPurchaseFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '允许采购'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '允许采购';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isClose', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderMerchantPurchaseOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormMerchantPurchaseFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '允许采购',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '允许采购';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isClose',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderMerchantPurchaseOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  isUpStoreList = (withUnlimited = true) => {
    const { global } = this.props;

    const isUpStoreList = global.isUpStoreList || [];

    if (withUnlimited) {
      return refitCommonData(isUpStoreList, unlimitedWithNumberFlag);
    }

    return refitCommonData(isUpStoreList);
  };

  getIsUpStoreName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.isUpStoreList(false));
    return item == null ? '未知' : item.name;
  };

  renderIsUpStoreOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.isUpStoreList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchIsUpStoreFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '采购端可见'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '采购端可见';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isUpStore', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderIsUpStoreOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormIsUpStoreFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '采购端可见',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '采购端可见';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isUpStore',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderIsUpStoreOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  isUpAppList = (withUnlimited = true) => {
    const { global } = this.props;

    const isUpAppList = global.isUpAppList || [];

    if (withUnlimited) {
      return refitCommonData(isUpAppList, unlimitedWithNumberFlag);
    }

    return refitCommonData(isUpAppList);
  };

  getIsUpAppName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.isUpAppList(false));
    return item == null ? '未知' : item.name;
  };

  renderIsUpAppOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.isUpAppList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchIsUpAppFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = 'App端可见'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || 'App端可见';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isUpApp', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderIsUpAppOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormIsUpAppFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = 'App端可见',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || 'App端可见';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isUpApp',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderIsUpAppOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  isUpWxList = (withUnlimited = true) => {
    const { global } = this.props;

    const isUpWxList = global.isUpWxList || [];

    if (withUnlimited) {
      return refitCommonData(isUpWxList, unlimitedWithNumberFlag);
    }

    return refitCommonData(isUpWxList);
  };

  getIsUpWxName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.isUpWxList(false));
    return item == null ? '未知' : item.name;
  };

  renderIsUpWxOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.isUpWxList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchIsUpWxFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '微信端可见'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '微信端可见';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isUpWx', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderIsUpWxOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormIsUpWxFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '微信端可见',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '微信端可见';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isUpWx',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderIsUpWxOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  storeChangeTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const storeChangeTypeList = global.storeChangeTypeList || [];

    if (withUnlimited) {
      return refitCommonData(storeChangeTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(storeChangeTypeList);
  };

  getStoreChangeTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.storeChangeTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderStoreChangeTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.storeChangeTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderStoreChangeTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.storeChangeTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchStoreChangeTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变更类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变更类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('changeType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderStoreChangeTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormStoreChangeTypeSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '变更库存',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变更库存';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'changeType',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderStoreChangeTypeOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormStoreChangeTypeFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '变更库存',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变更库存';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'changeType',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: true,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <RadioGroup
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderStoreChangeTypeRadio(false)}
          </RadioGroup>
        )}
      </FormItem>
    );
  };

  peopleAccountLogTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const peopleAccountLogTypeList = global.peopleAccountLogTypeList || [];

    if (withUnlimited) {
      return refitCommonData(peopleAccountLogTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(peopleAccountLogTypeList);
  };

  getPeopleAccountLogTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.peopleAccountLogTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderPeopleAccountLogTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.peopleAccountLogTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPeopleAccountLogTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '变动类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '变动类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('type', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPeopleAccountLogTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  peopleAccountLogIsOutInList = (withUnlimited = true) => {
    const { global } = this.props;

    const peopleAccountLogIsOutInList = global.peopleAccountLogIsOutInList || [];

    if (withUnlimited) {
      return refitCommonData(peopleAccountLogIsOutInList, unlimitedWithNumberFlag);
    }

    return refitCommonData(peopleAccountLogIsOutInList);
  };

  getPeopleAccountLogIsOutInName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.peopleAccountLogIsOutInList(false));
    return item == null ? '未知' : item.name;
  };

  renderPeopleAccountLogIsOutInOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.peopleAccountLogIsOutInList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPeopleAccountLogIsOutInFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '收支类行'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '收支类行';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isOutIn', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPeopleAccountLogIsOutInOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  peopleAccountLogInTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const peopleAccountLogInTypeList = global.peopleAccountLogInTypeList || [];

    if (withUnlimited) {
      return refitCommonData(peopleAccountLogInTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(peopleAccountLogInTypeList);
  };

  getPeopleAccountLogInTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.peopleAccountLogInTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderPeopleAccountLogInTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.peopleAccountLogInTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchPeopleAccountLogInTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '收入来源'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '收入来源';

    return (
      <FormItem label={title}>
        {getFieldDecorator('inType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderPeopleAccountLogInTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  areaAccountRecordRevenueExpensesList = (withUnlimited = true) => {
    const { global } = this.props;

    const areaAccountRecordRevenueExpensesList = global.areaAccountRecordRevenueExpensesList || [];

    if (withUnlimited) {
      return refitCommonData(areaAccountRecordRevenueExpensesList, unlimitedWithNumberFlag);
    }

    return refitCommonData(areaAccountRecordRevenueExpensesList);
  };

  getAreaAccountRecordRevenueExpensesName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAccountRecordRevenueExpensesList(false));
    return item == null ? '未知' : item.name;
  };

  renderAreaAccountRecordRevenueExpensesOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.areaAccountRecordRevenueExpensesList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchAreaAccountRecordRevenueExpensesFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '收支类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '收支类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('revenueExpenses', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderAreaAccountRecordRevenueExpensesOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  simpleTicketStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketStateList = global.simpleTicketStateList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketStateList);
  };

  getSimpleTicketStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '票务状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '票务状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketStateFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '票务状态',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '票务状态';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'state',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderSimpleTicketStateOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  simpleTicketIsCanRefundList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketIsCanRefundList = global.simpleTicketIsCanRefundList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketIsCanRefundList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketIsCanRefundList);
  };

  getSimpleTicketIsCanRefundName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketIsCanRefundList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketIsCanRefundOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketIsCanRefundList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketIsCanRefundFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '是否可退'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否可退';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isCanRefund', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketIsCanRefundOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketIsCanRefundFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '是否可退',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '是否可退';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isCanRefund',
          refitFieldDecoratorOption(
            value === null ? 0 : value.isCanRefund || '',
            value === null ? 0 : value.isCanRefund || '',
            0,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            }
          )
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderSimpleTicketIsCanRefundOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  simpleTicketIsNeedAppointmentList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketIsNeedAppointmentList = global.simpleTicketIsNeedAppointmentList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketIsNeedAppointmentList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketIsNeedAppointmentList);
  };

  getSimpleTicketIsNeedAppointmentName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketIsNeedAppointmentList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketIsNeedAppointmentOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.simpleTicketIsNeedAppointmentList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketIsNeedAppointmentFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '需要预约'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '需要预约';

    return (
      <FormItem label={title}>
        {getFieldDecorator('isNeedAppointment', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketIsNeedAppointmentOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketIsNeedAppointmentFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '需要预约',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '需要预约';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'isNeedAppointment',
          refitFieldDecoratorOption(
            value === null ? 0 : value.isNeedAppointment || '',
            value === null ? 0 : value.isNeedAppointment || '',
            0,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            }
          )
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderSimpleTicketIsNeedAppointmentOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  simpleTicketOnlyNewCustomerList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketOnlyNewCustomerList = global.simpleTicketOnlyNewCustomerList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketOnlyNewCustomerList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketOnlyNewCustomerList);
  };

  getSimpleTicketOnlyNewCustomerName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketOnlyNewCustomerList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketOnlyNewCustomerOption = (
    withUnlimited = true,
    adjustListDataCallback = null
  ) => {
    const listData = this.simpleTicketOnlyNewCustomerList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketOnlyNewCustomerFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '新用户专享'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '新用户专享';

    return (
      <FormItem label={title}>
        {getFieldDecorator('onlyNewCustomer', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketOnlyNewCustomerOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketOnlyNewCustomerFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '新用户专享',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '新用户专享';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'onlyNewCustomer',
          refitFieldDecoratorOption(
            value === null ? 0 : value.onlyNewCustomer || '',
            value === null ? 0 : value.onlyNewCustomer || '',
            0,
            {
              rules: [
                {
                  required: true,
                  message: buildFieldDescription(title, '选择'),
                },
              ],
            }
          )
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderSimpleTicketOnlyNewCustomerOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  simpleTicketDetailStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const simpleTicketDetailStateList = global.simpleTicketDetailStateList || [];

    if (withUnlimited) {
      return refitCommonData(simpleTicketDetailStateList, unlimitedWithNumberFlag);
    }

    return refitCommonData(simpleTicketDetailStateList);
  };

  getSimpleTicketDetailStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.simpleTicketDetailStateList(false));
    return item == null ? '未知' : item.name;
  };

  renderSimpleTicketDetailStateOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.simpleTicketDetailStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchSimpleTicketDetailStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '套餐状态'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '套餐状态';

    return (
      <FormItem label={title}>
        {getFieldDecorator('state', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderSimpleTicketDetailStateOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormSimpleTicketDetailStateFormItemSelect = (
    value,
    helper = null,
    onChangeCallback,
    label = '套餐状态',
    formItemLayout = null
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '套餐状态';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        {getFieldDecorator(
          'state',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          })
        )(
          <Select
            placeholder={buildFieldDescription(title, '选择')}
            style={{ width: '100%' }}
            onChange={e => {
              if (isFunction(onChangeCallback)) {
                onChangeCallback(e);
              }
            }}
          >
            {this.renderSimpleTicketDetailStateOption(false)}
          </Select>
        )}
      </FormItem>
    );
  };

  userOrderSaleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const userOrderSaleTypeList = global.userOrderSaleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(userOrderSaleTypeList, unlimitedWithNumberFlag);
    }

    return refitCommonData(userOrderSaleTypeList);
  };

  getUserOrderSaleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userOrderSaleTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderUserOrderSaleTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.userOrderSaleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSearchUserOrderSaleTypeSelectFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '售卖方式'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '售卖方式';

    return (
      <FormItem label={title}>
        {getFieldDecorator('saleType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderUserOrderSaleTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };
}

export default Index;
