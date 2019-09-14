import React from 'react';
import { connect } from 'dva';
import { Form, DatePicker, Input, message } from 'antd';

import {
  stringToMoment,
  refitFieldDecoratorOption,
  buildFieldDescription,
  stringIsNullOrWhiteSpace,
  getMomentNow,
  isFunction,
  buildFieldHelper,
} from '@/utils/tools';
import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';

import { fieldData } from '../../../../PlanSale/Common/data';

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
class Index extends ModalBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '更新预售信息',
        loadApiPath: 'planSale/get',
        submitApiPath: 'planSale/updateBasicInfo',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;
    const { visible: visiblePre } = prevState;

    let needReset = false;

    if (visiblePre === false && visible === true) {
      needReset = true;
    }

    return { visible, needReset, externalData };
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.reloadData();
  };

  getApiData = props => {
    const {
      planSale: { data },
    } = props;

    return data;
  };

  getPlanSaleIdFromOriginalData = () => {
    const { externalData } = this.state;

    let planSaleId = '';

    if ((externalData || null) != null) {
      planSaleId = externalData.planSaleId || '';
    }

    return planSaleId;
  };

  supplementLoadRequestParams = o => {
    const d = o;

    d.planSaleId = this.getPlanSaleIdFromOriginalData();

    return d;
  };

  supplementSubmitRequestParams = o => {
    const d = o;

    d.planSaleId = this.getPlanSaleIdFromOriginalData();

    return d;
  };

  checkLoadRequestParams = o => {
    const { planSaleId } = o;

    if (stringIsNullOrWhiteSpace(planSaleId)) {
      message.warn('缺少预售数据标识');

      return false;
    }

    return true;
  };

  afterSubmitSuccess = o => {
    const { afterOK } = this.props;

    const data = o;
    data.clientMessage = `操作成功：已成功更新预售信息 ，请继续进行其他设置 `;

    if (isFunction(afterOK)) {
      afterOK(data);
    }
  };

  formContent = () => {
    const { form } = this.props;
    const { metaData } = this.state;
    const { getFieldDecorator } = form;

    return (
      <>
        <FormItem
          {...formItemLayout}
          label={fieldData.beginPlanSaleTime}
          extra={buildFieldHelper(fieldData.beginPlanSaleTimeHelper)}
        >
          {getFieldDecorator(
            'beginPlanSaleTime',
            refitFieldDecoratorOption(
              (metaData || null) == null
                ? null
                : stringToMoment(metaData.beginPlanSaleTime || '') || null,
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
              placeholder={buildFieldDescription(fieldData.beginPlanSaleTime, '选择')}
            />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={fieldData.endPlanSaleTime}
          extra={buildFieldHelper(fieldData.endPlanSaleTimeHelper)}
        >
          {getFieldDecorator(
            'endPlanSaleTime',
            refitFieldDecoratorOption(
              (metaData || null) == null
                ? null
                : stringToMoment(metaData.endPlanSaleTime || '') || null,
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
              placeholder={buildFieldDescription(fieldData.endPlanSaleTime, '选择')}
            />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={fieldData.outTime}
          extra={buildFieldHelper(fieldData.outTimeHelper)}
        >
          {getFieldDecorator(
            'outTime',
            refitFieldDecoratorOption(
              (metaData || null) == null ? null : stringToMoment(metaData.outTime || '') || null,
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
        <FormItem
          {...formItemLayout}
          label={fieldData.state}
          extra={buildFieldHelper(fieldData.stateUpdateHelper)}
        >
          <Input
            disabled
            value={
              (metaData || null) == null ? '' : this.getPlanSaleStateName(metaData.state) || ''
            }
          />
        </FormItem>
      </>
    );
  };
}

export default Index;
