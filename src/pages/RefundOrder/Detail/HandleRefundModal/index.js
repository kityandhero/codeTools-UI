import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Icon } from 'antd';

import { refitFieldDecoratorOption, buildFieldDescription } from '@/utils/tools';
import ModalBase from '@/customComponents/CustomForm/ModalBase';

import { fieldData } from '../../Common/data';

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

@connect(({ refundOrder, global, loading }) => ({
  refundOrder,
  global,
  loading: loading.models.refundOrder,
}))
@Form.create()
class HandleRefundModal extends ModalBase {
  clientMessage = '';

  amount = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      refundOrderId: null,
      refundAmount: 0,
    };
  }

  getApiData = props => {
    const {
      refundOrder: { data },
    } = props;

    return data;
  };

  initState = () => {
    const result = {
      pageName: '修改退款金额',
      submitApiPath: 'refundOrder/changeRefundAmount',
      dataLoading: false,
    };

    return result;
  };

  doOtherWhenChangeVisible = nextProps => {
    const { refundOrderId, refundAmount } = nextProps;

    this.setState({ refundOrderId, refundAmount });
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { refundOrderId } = this.state;

    d.refundOrderId = refundOrderId;

    const { amount } = d;

    this.amount = amount;

    return d;
  };

  afterSubmitSuccess = o => {
    const { afterOK } = this.props;

    this.setState({ visible: false });

    const data = o;
    data.clientMessage = `操作成功：实付金额已经变更为 ${this.amount}`;

    afterOK(data);
  };

  formContent = () => {
    const { form } = this.props;
    const { refundAmount } = this.state;
    const { getFieldDecorator } = form;

    return (
      <Fragment>
        <FormItem {...formItemLayout} label={fieldData.refundAmount}>
          {getFieldDecorator(
            'amount',
            refitFieldDecoratorOption(
              refundAmount || '0',
              refundAmount || '0',
              refundAmount || '0',
              {
                rules: [
                  {
                    required: true,
                    message: buildFieldDescription(fieldData.refundAmount, '输入'),
                  },
                ],
              }
            )
          )(
            <Input
              addonBefore={<Icon type="money-collect" />}
              placeholder={buildFieldDescription(fieldData.refundAmount)}
            />
          )}
        </FormItem>
      </Fragment>
    );
  };
}

export default HandleRefundModal;
