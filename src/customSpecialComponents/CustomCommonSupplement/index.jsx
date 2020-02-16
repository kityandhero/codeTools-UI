import React from 'react';
import { Form, Select } from 'antd';

import {
  getDerivedStateFromPropsForUrlParams,
  refitCommonData,
  isInvalid,
  searchFromList,
  buildFieldDescription,
} from '../../utils/tools';
import CustomCommonCore from '../../customComponents/Framework/CustomCommonCore';

const FormItem = Form.Item;

const unlimitedWithStringFlag = {
  key: '-10000',
  name: '不限',
  flag: '-10000',
};

/**
 * 该类作为特有项目的补充，视具体项目进行增部方法
 *
 * @class Index
 * @extends {CustomCommonCore}
 */
class Index extends CustomCommonCore {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  databaseTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const databaseTypeList = global.databaseTypeList || [];

    if (withUnlimited) {
      return refitCommonData(databaseTypeList, unlimitedWithStringFlag);
    }

    return refitCommonData(databaseTypeList);
  };

  getDatabaseTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.databaseTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderDatabaseTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDatabaseTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDatabaseTypeFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '数据库类型'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '数据库类型';

    return (
      <FormItem label={title}>
        {getFieldDecorator('databaseType', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDatabaseTypeOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormDatabaseTypeSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '数据库类型',
    formItemLayout = null,
    required = true,
    name = 'databaseType',
    otherProps = null
  ) => {
    const title = label || '数据库类型';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderDatabaseTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps
    );
  };

  renderFormDatabaseTypeFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '数据库类型',
    formItemLayout = null,
    required = true,
    name = 'databaseType',
    otherProps = null
  ) => {
    const title = label || '数据库类型';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderDatabaseTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps
    );
  };

  databaseEncodingList = (withUnlimited = true) => {
    const { global } = this.props;

    const databaseEncodingList = global.databaseEncodingList || [];

    if (withUnlimited) {
      return refitCommonData(databaseEncodingList, unlimitedWithStringFlag);
    }

    return refitCommonData(databaseEncodingList);
  };

  getDatabaseEncodingName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.databaseEncodingList(false));
    return item == null ? '未知' : item.name;
  };

  renderDatabaseEncodingOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseEncodingList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDatabaseEncodingRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseEncodingList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDatabaseEncodingFormItem = (
    withUnlimited = true,
    initialValue = -10000,
    label = '数据库编码'
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label || '数据库编码';

    return (
      <FormItem label={title}>
        {getFieldDecorator('databaseEncoding', {
          rules: [{ required: false, message: buildFieldDescription(title, '选择') }],
          initialValue,
        })(
          <Select placeholder={buildFieldDescription(title, '选择')} style={{ width: '100%' }}>
            {this.renderDatabaseEncodingOption(withUnlimited)}
          </Select>
        )}
      </FormItem>
    );
  };

  renderFormDatabaseEncodingSelectFormItem = (
    value,
    helper = null,
    onChangeCallback,
    label = '数据库编码',
    formItemLayout = null,
    required = true,
    name = 'encoding',
    otherProps = null
  ) => {
    const title = label || '数据库编码';

    return this.renderFormSelectFormItem(
      title,
      name,
      value,
      () => {
        return this.renderDatabaseEncodingOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps
    );
  };

  renderFormDatabaseEncodingFormItemRadio = (
    value,
    helper = null,
    onChangeCallback,
    label = '数据库编码',
    formItemLayout = null,
    required = true,
    name = 'encoding',
    otherProps = null
  ) => {
    const title = label || '数据库编码';

    return this.renderFormRadioFormItem(
      title,
      name,
      value,
      () => {
        return this.renderDatabaseEncodingOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps
    );
  };
}

export default Index;
