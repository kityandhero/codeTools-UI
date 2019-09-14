import React from 'react';
import { connect } from 'dva';
import { Form, Radio, InputNumber, message } from 'antd';

import { refitFieldDecoratorOption, isNumber, buildFieldDescription } from '@/utils/tools';
import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';

import { fieldData } from '../Common/data';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class ChangeStoreCountModal extends ModalBase {
  clientMessage = '';

  storeChangeCount = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '变更商品库存',
        submitApiPath: 'product/updateStoreCount',
        dataLoading: false,
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

  getApiData = props => {
    const {
      product: { data },
    } = props;
    return data;
  };

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.clientMessage = '';
    this.storeChangeCount = 0;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { externalData } = this.state;

    let productId = '';

    if ((externalData || null) != null) {
      productId = externalData.productId || '';
    }

    d.productId = productId;

    return d;
  };

  afterSubmitSuccess = o => {
    const { afterOK, externalData } = this.props;

    this.setState({ visible: false });

    const data = o;
    const { title } = externalData;
    data.clientMessage = `操作成功：商品 ${title} 库存即将 ${this.getProductStoreChangeTypeName(
      this.changeType,
    )}${this.storeChangeCount}`;

    message.warn(
      '商品库存变更已经提交处理，需要一定时间生效，如未见数据变化，请稍后刷新查看，请勿重复操作！',
    );

    afterOK(data);
  };

  checkSubmitRequestParams = o => {
    if (!isNumber(o.storeChangeCount)) {
      message.error('请输入大于0的数字!');
      return false;
    }

    if (o.storeChangeCount <= 0) {
      message.error('库存变更数量必须大于0!');
      return false;
    }

    return true;
  };

  formContent = () => {
    const { form, externalData } = this.props;
    const { getFieldDecorator } = form;

    return (
      <>
        <FormItem {...formItemLayout} label={fieldData.title}>
          {externalData || '' ? externalData.title : ''}
        </FormItem>
        <FormItem {...formItemLayout} label={fieldData.changeType}>
          {getFieldDecorator(
            'changeType',
            refitFieldDecoratorOption(2, 2, 2, {
              rules: [
                {
                  required: false,
                  message: buildFieldDescription(fieldData.isUpStore, '选择'),
                },
              ],
            }),
          )(<RadioGroup>{this.renderProductStoreChangeTypeRadio(false)}</RadioGroup>)}
        </FormItem>
        <FormItem {...formItemLayout} label={fieldData.storeChangeCount}>
          {getFieldDecorator(
            'storeChangeCount',
            refitFieldDecoratorOption(0, 0, 0, {
              rules: [
                {
                  required: false,
                  message: buildFieldDescription(fieldData.storeChangeCount),
                },
              ],
            }),
          )(
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder={buildFieldDescription(fieldData.storeChangeCount)}
            />,
          )}
        </FormItem>
      </>
    );
  };
}

export default ChangeStoreCountModal;
