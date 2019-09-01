import React from 'react';
import { connect } from 'dva';
import { Form, Input, Icon } from 'antd';

import { refitFieldDecoratorOption, buildFieldDescription } from '@/utils/tools';
import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';

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
      ...{
        pageName: '修改退款金额',
        submitApiPath: 'refundOrder/changeRefundAmount',
        dataLoading: false,
        refundOrderId: null,
        refundAmount: 0,
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  getApiData = props => {
    const {
      refundOrder: { data },
    } = props;

    return data;
  };

  supplementSubmitRequestParams = o => {
    const d = o;

    const {
      externalData: { refundOrderId },
    } = this.state;

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
    const { getFieldDecorator } = form;

    const { externalData } = this.state;

    const { refundAmount } = externalData || { refundAmount: 0 };

    return (
      <>
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
              },
            ),
          )(
            <Input
              addonBefore={<Icon type="money-collect" />}
              placeholder={buildFieldDescription(fieldData.refundAmount)}
            />,
          )}
        </FormItem>
      </>
    );
  };
}

export default HandleRefundModal;
