import React from 'react';
import { Form, Select, Radio, Input, InputNumber, Icon, DatePicker } from 'antd';

import {
  getDerivedStateFromPropsForUrlParams,
  buildFieldDescription,
  refitFieldDecoratorOption,
  isFunction,
  formatDatetime,
  stringToMoment,
} from '@/utils/tools';
import CustomCommonBase from '@/customComponents/Framework/CustomCommonBase';

const { Item: FormItem } = Form;
const { Option } = Select;
const { TextArea } = Input;

class Index extends CustomCommonBase {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  renderFromCreateTimeField = (
    date = new Date(),
    helper = null,
    label = '添加时间',
    formItemLayout = null
  ) => {
    const value = date || new Date();
    const title = label || '添加时间';

    return (
      <FormItem {...(formItemLayout || {})} label={title} extra={helper}>
        <Input
          addonBefore={<Icon type="form" />}
          value={formatDatetime(value, 'YYYY-MM-DD HH:mm')}
          disabled
          placeholder={buildFieldDescription(title)}
        />
      </FormItem>
    );
  };

  renderFromRadioCore = (listDataSource, adjustListDataCallback = null) => {
    let listData = listDataSource || [];

    if (isFunction(adjustListDataCallback)) {
      listData = adjustListDataCallback(listData);
    }

    const list = [];

    if (listData.length > 0) {
      listData.forEach(item => {
        const { name, flag } = item;
        list.push(
          <Radio key={flag} value={flag}>
            {name}
          </Radio>
        );
      });

      return list;
    }

    return null;
  };

  renderFormOptionCore = (listDataSource, adjustListDataCallback = null) => {
    let listData = listDataSource || [];

    if (isFunction(adjustListDataCallback)) {
      listData = adjustListDataCallback(listData);
    }

    const list = [];

    if (listData.length > 0) {
      listData.forEach(item => {
        const { name, flag } = item;
        list.push(
          <Option key={`${flag}_${name}`} value={flag}>
            {name}
          </Option>
        );
      });

      return list;
    }

    return null;
  };

  renderSearchInputFormItem = (
    label,
    name,
    value = '',
    helper = null,
    iconType = 'form',
    inputProps = {},
    canOperate = true
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
        <FormItem label={title} extra={helper}>
          <Input {...otherInputProps} value={value} />
        </FormItem>
      );
    }

    return (
      <FormItem label={title} extra={helper}>
        {getFieldDecorator(name)(<Input {...otherInputProps} />)}
      </FormItem>
    );
  };

  renderFormInputFormItem = (
    label,
    name,
    value = '',
    required = false,
    helper = null,
    iconType = 'form',
    inputProps = {},
    canOperate = true,
    formItemLayout = {}
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
        <FormItem {...formItemLayout} label={title} extra={helper}>
          <Input {...otherInputProps} value={value} />
        </FormItem>
      );
    }

    return (
      <FormItem {...formItemLayout} label={title} extra={helper}>
        {getFieldDecorator(
          name,
          refitFieldDecoratorOption(value, value, value, {
            rules: [
              {
                required,
                message: buildFieldDescription(title),
              },
            ],
          })
        )(<Input {...otherInputProps} />)}
      </FormItem>
    );
  };

  renderFormOnlyShowInputFormItem = (
    label,
    value = '',
    helper = null,
    iconType = 'form',
    inputProps = {},
    formItemLayout = {}
  ) => {
    return this.renderFormInputFormItem(
      label,
      '',
      value,
      false,
      helper,
      iconType,
      inputProps,
      false,
      formItemLayout
    );
  };

  renderFormInputNumberFormItem = (
    label,
    name,
    value = '',
    required = false,
    helper = null,
    inputNumberProps = {},
    canOperate = true,
    formItemLayout = {}
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label;

    const otherInputNumberProps = {
      ...{
        style: { width: '100%' },
        min: 0,
        placeholder: buildFieldDescription(title, '输入'),
      },
      ...(inputNumberProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem {...formItemLayout} label={title} extra={helper}>
          <InputNumber {...otherInputNumberProps} value={value} />
        </FormItem>
      );
    }

    return (
      <FormItem {...formItemLayout} label={title} extra={helper}>
        {getFieldDecorator(
          name,
          refitFieldDecoratorOption(value, value, null, {
            rules: [
              {
                required,
                message: buildFieldDescription(title),
              },
            ],
          })
        )(<InputNumber {...otherInputNumberProps} />)}
      </FormItem>
    );
  };

  renderFormTextAreaFormItem = (
    label,
    name,
    value = '',
    required = false,
    helper = null,
    textAreaProps = {},
    canOperate = true,
    formItemLayout = {}
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label;

    const otherTextAreaProps = {
      ...{
        placeholder: buildFieldDescription(title, '输入'),
      },
      ...(textAreaProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem {...formItemLayout} label={title} extra={helper}>
          <TextArea {...otherTextAreaProps} value={value} />
        </FormItem>
      );
    }

    return (
      <FormItem {...formItemLayout} label={title} extra={helper}>
        {getFieldDecorator(
          name,
          refitFieldDecoratorOption(value, value, value, {
            rules: [
              {
                required,
                message: buildFieldDescription(title),
              },
            ],
          })
        )(<TextArea {...otherTextAreaProps} />)}
      </FormItem>
    );
  };

  renderFormDatePickerFormItem = (
    label,
    name,
    value = null,
    required = false,
    helper = null,
    datePickerProps = {},
    canOperate = true,
    formItemLayout = {}
  ) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const title = label;

    const otherDatePickerProps = {
      ...{
        style: { width: '100%' },
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        inputReadOnly: true,
        placeholder: buildFieldDescription(title, '输入'),
      },
      ...(datePickerProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem {...formItemLayout} label={title} extra={helper}>
          <DatePicker {...otherDatePickerProps} value={value} />
        </FormItem>
      );
    }

    return (
      <FormItem {...formItemLayout} label={title} extra={helper}>
        {getFieldDecorator(
          name,
          refitFieldDecoratorOption(
            value,
            value,
            null,
            {
              rules: [
                {
                  required,
                  message: buildFieldDescription(title),
                },
              ],
            },
            v => stringToMoment(v)
          )
        )(<DatePicker {...otherDatePickerProps} />)}
      </FormItem>
    );
  };
}

export default Index;
