import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Radio, InputNumber, message } from 'antd';

import {
  refitFieldDecoratorOption,
  searchFromList,
  refitCommonData,
  isInvalid,
  isNumber,
  buildFieldDescription,
} from '@/utils/tools';
import ModalBase from '@/customComponents/CustomForm/ModalBase';

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
      productId: null,
    };
  }

  getApiData = props => {
    const {
      product: { data },
    } = props;
    return data;
  };

  initState = () => {
    const { productData } = this.props;

    const result = {
      pageName: '变更商品库存',
      submitApiPath: 'product/updateStoreCount',
      dataLoading: false,
    };

    if (productData != null) {
      const { productId } = productData;
      result.productId = productId;
    }

    return result;
  };

  doOtherWhenChangeVisible = nextProps => {
    const { productData } = nextProps;

    if (productData != null) {
      const { productId } = productData;

      this.setState({ productId });

      this.clientMessage = '';
      this.storeChangeCount = 0;
    }
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { productId } = this.state;

    d.productId = productId;
    const { changeType, storeChangeCount } = d;
    this.changeType = changeType;
    this.storeChangeCount = storeChangeCount;

    return d;
  };

  afterSubmitSuccess = o => {
    const { afterOK, productData } = this.props;

    this.setState({ visible: false });

    const data = o;
    const { title } = productData;
    data.clientMessage = `操作成功：商品 ${title} 库存即将 ${this.getChangeTypeName(
      this.changeType
    )}${this.storeChangeCount}`;

    message.warn(
      '商品库存变更已经提交处理，需要一定时间生效，如未见数据变化，请稍后刷新查看，请勿重复操作！'
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

  changeTypeList = () => {
    const { global } = this.props;

    return refitCommonData(global.productStoreChangeTypeList);
  };

  getChangeTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }
    const item = searchFromList('flag', v, this.changeTypeList());
    return item == null ? '未知' : item.name;
  };

  formContent = () => {
    const { form, productData } = this.props;
    const { getFieldDecorator } = form;

    const changeTypeData = this.changeTypeList();
    const changeTypeOption = [];

    changeTypeData.forEach(item => {
      const { name, flag } = item;
      changeTypeOption.push(
        <Radio key={flag} value={flag}>
          {name}
        </Radio>
      );
    });

    return (
      <Fragment>
        <FormItem {...formItemLayout} label={fieldData.title}>
          {productData || '' ? productData.title : ''}
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
            })
          )(<RadioGroup>{changeTypeOption}</RadioGroup>)}
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
            })
          )(
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder={buildFieldDescription(fieldData.storeChangeCount)}
            />
          )}
        </FormItem>
      </Fragment>
    );
  };
}

export default ChangeStoreCountModal;
