import React from 'react';
import { connect } from 'dva';
import { Form, DatePicker, Input, message } from 'antd';

import {
  stringToMoment,
  stringIsNullOrWhiteSpace,
  refitFieldDecoratorOption,
  buildFieldDescription,
  isFunction,
  getMomentNow,
} from '@/utils/tools';
import AddFormModalBase from '@/customComponents/Framework/CustomForm/AddFormModalBase';

import { fieldData } from '../Common/data';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

@connect(({ planSale, global, loading }) => ({
  planSale,
  global,
  loading: loading.models.planSale,
}))
@Form.create()
class Index extends AddFormModalBase {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, originalData } = nextProps;
    const { visible: visiblePre } = prevState;

    let needReset = false;

    if (visiblePre === false && visible === true) {
      needReset = true;
    }

    return { visible, needReset, originalData };
  }

  getApiData = props => {
    const {
      planSale: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '新增预售信息',
    submitApiPath: 'planSale/addBasicInfo',
  });

  supplementSubmitRequestParams = o => {
    const d = o;
    const { originalData } = this.state;

    let productId = '';

    if ((originalData || null) != null) {
      productId = originalData.productId || '';
    }

    d.productId = productId;

    return d;
  };

  checkSubmitRequestParams = o => {
    const { productId } = o;

    if (stringIsNullOrWhiteSpace(productId)) {
      message.warn('缺少产品数据标识');

      return false;
    }

    return true;
  };

  afterSubmitSuccess = o => {
    const { afterOK } = this.props;

    this.setState({ visible: false });

    const data = o;
    data.clientMessage = `操作成功：已成功添加待开始预售 ，请继续进行其他设置 `;

    if (isFunction(afterOK)) {
      afterOK(data);
    }
  };

  formContent = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <>
        <FormItem {...formItemLayout} label={fieldData.beginPlanSaleTime}>
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
        <FormItem {...formItemLayout} label={fieldData.endPlanSaleTime}>
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
        <FormItem {...formItemLayout} label={fieldData.outTime}>
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
              placeholder={buildFieldDescription(fieldData.outTime, '选择')}
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={fieldData.state}>
          <Input disabled value="待开始" />
        </FormItem>
      </>
    );
  };
}

export default Index;
