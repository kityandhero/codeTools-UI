import React from 'react';
import { Form, Select, Input, Icon } from 'antd';

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

class Index extends CustomCommonCore {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  renderSearchInputFormItem = (
    label,
    name,
    value = '',
    iconType = 'form',
    inputProps = {},
    canOperate = true,
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: <Icon type={iconType} />,
        placeholder: buildFieldDescription(title, '输入'),
      },
      ...(inputProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem label={title}>
          <Input {...otherInputProps} value={value} />
        </FormItem>
      );
    }

    return (
      <FormItem label={title}>{getFieldDecorator(name)(<Input {...otherInputProps} />)}</FormItem>
    );
  };

  rankList = (withUnlimited = true) => {
    const { global } = this.props;

    const rankList = global.rankList || [];

    if (withUnlimited) {
      return refitCommonData(rankList, {
        key: '-10000',
        name: '不限',
        rankId: '-10000',
      });
    }

    return refitCommonData(rankList);
  };

  getRankName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('rankId', v, this.rankList(false));
    return item == null ? '未知' : item.name;
  };

  renderRankOption = (withUnlimited = true) => {
    const rankData = this.rankList(withUnlimited);
    const rankOption = [];

    if (rankData.length > 0) {
      rankData.forEach(item => {
        const { name, rankId } = item;
        rankOption.push(
          <Option key={rankId} value={rankId}>
            {name}
          </Option>,
        );
      });

      return rankOption;
    }

    return null;
  };

  renderSearchRankFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '商品品类',
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
          </Select>,
        )}
      </FormItem>
    );
  };

  brandList = (withUnlimited = true) => {
    const { global } = this.props;

    const brandList = global.brandList || [];

    if (withUnlimited) {
      return refitCommonData(brandList, {
        key: '-10000',
        name: '不限',
        brandId: '-10000',
      });
    }

    return refitCommonData(brandList);
  };

  getBrandName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('brandId', v, this.brandList(false));
    return item == null ? '未知' : item.name;
  };

  renderBrandOption = (withUnlimited = true) => {
    const brandData = this.brandList(withUnlimited);
    const brandOption = [];

    if (brandData.length > 0) {
      brandData.forEach(item => {
        const { name, brandId } = item;
        brandOption.push(
          <Option key={brandId} value={brandId}>
            {name}
          </Option>,
        );
      });

      return brandOption;
    }

    return null;
  };

  renderSearchBrandFormItem = (
    withUnlimited = true,
    initialValue = '-10000',
    label = '商品品牌',
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
          </Select>,
        )}
      </FormItem>
    );
  };

  saleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const saleTypeList = global.saleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(saleTypeList, {
        key: -10000,
        name: '不限',
        flag: -10000,
      });
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

  renderSaleTypeOption = (withUnlimited = true) => {
    const saleTypeData = this.saleTypeList(withUnlimited);
    const saleTypeOption = [];

    if (saleTypeData.length > 0) {
      saleTypeData.forEach(item => {
        const { name, flag } = item;
        saleTypeOption.push(
          <Option key={flag} value={flag}>
            {name}
          </Option>,
        );
      });

      return saleTypeOption;
    }

    return null;
  };

  renderSearchSaleTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '销售类型',
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
          </Select>,
        )}
      </FormItem>
    );
  };

  productStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const productStateList = global.productStateList || [];

    if (withUnlimited) {
      return refitCommonData(productStateList, {
        key: -10000,
        name: '不限',
        flag: -10000,
      });
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

  renderProductStateOption = (withUnlimited = true) => {
    const productStateData = this.productStateList(withUnlimited);
    const productStateOption = [];

    if (productStateData.length > 0) {
      productStateData.forEach(item => {
        const { name, flag } = item;
        productStateOption.push(
          <Option key={flag} value={flag}>
            {name}
          </Option>,
        );
      });

      return productStateOption;
    }

    return null;
  };

  renderSearchProductStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '产品状态',
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
          </Select>,
        )}
      </FormItem>
    );
  };

  productBuyTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const productBuyTypeList = global.productBuyTypeList || [];

    if (withUnlimited) {
      return refitCommonData(productBuyTypeList, {
        key: -10000,
        name: '不限',
        flag: -10000,
      });
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

  renderProductBuyTypeOption = (withUnlimited = true) => {
    const productBuyTypeData = this.productBuyTypeList(withUnlimited);
    const productBuyTypeOption = [];

    if (productBuyTypeData.length > 0) {
      productBuyTypeData.forEach(item => {
        const { name, flag } = item;
        productBuyTypeOption.push(
          <Option key={flag} value={flag}>
            {name}
          </Option>,
        );
      });

      return productBuyTypeOption;
    }

    return null;
  };

  renderSearchProductBuyTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '售卖方式',
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
          </Select>,
        )}
      </FormItem>
    );
  };

  productSaleTimeModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const productSaleTimeModeList = global.productSaleTimeModeList || [];

    if (withUnlimited) {
      return refitCommonData(productSaleTimeModeList, {
        key: -10000,
        name: '不限',
        flag: -10000,
      });
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

  renderProductSaleTimeModeOption = (withUnlimited = true) => {
    const productSaleTimeModeData = this.productSaleTimeModeList(withUnlimited);
    const productSaleTimeModeOption = [];

    if (productSaleTimeModeData.length > 0) {
      productSaleTimeModeData.forEach(item => {
        const { name, flag } = item;
        productSaleTimeModeOption.push(
          <Option key={flag} value={flag}>
            {name}
          </Option>,
        );
      });

      return productSaleTimeModeOption;
    }

    return null;
  };

  renderSearchProductSaleTimeModeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '定时上下架模式',
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
          </Select>,
        )}
      </FormItem>
    );
  };

  renderFormProductSaleTimeModeFormItem = (value, onChangeCallback, label = '定时上下架模式') => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '定时上下架模式';

    return (
      <FormItem label={title}>
        {getFieldDecorator(
          'saleTimeMode',
          refitFieldDecoratorOption(value, value, 0, {
            rules: [
              {
                required: false,
                message: buildFieldDescription(title, '选择'),
              },
            ],
          }),
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
          </Select>,
        )}
      </FormItem>
    );
  };

  planSaleStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const planSaleStateList = global.planSaleStateList || [];

    if (withUnlimited) {
      return refitCommonData(planSaleStateList, {
        key: -10000,
        name: '不限',
        flag: -10000,
      });
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

  renderPlanSaleStateOption = (withUnlimited = true) => {
    const planSaleStateData = this.planSaleStateList(withUnlimited);
    const planSaleStateOption = [];

    if (planSaleStateData.length > 0) {
      planSaleStateData.forEach(item => {
        const { name, flag } = item;
        planSaleStateOption.push(
          <Option key={flag} value={flag}>
            {name}
          </Option>,
        );
      });

      return planSaleStateOption;
    }

    return null;
  };

  renderSearchPlanSaleStateFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '预售状态',
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
          </Select>,
        )}
      </FormItem>
    );
  };
}

export default Index;
