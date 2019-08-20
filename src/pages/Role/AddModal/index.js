import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, message } from 'antd';

import { refitFieldDecoratorOption, stringIsEmpty, buildFieldDescription } from '@/utils/tools';
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

@connect(({ role, global, loading }) => ({
  role,
  global,
  loading: loading.models.role,
}))
@Form.create()
class AddModal extends AddFormModalBase {
  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '新增角色',
    submitApiPath: 'role/addBasicInfo',
  });

  checkSubmitRequestParams = o => {
    if (stringIsEmpty(o.name)) {
      message.error('请输入角色名称！');
      return false;
    }

    return true;
  };

  afterSubmitSuccess = o => {
    const { afterOK } = this.props;

    this.setState({ visible: false });

    const data = o;
    data.clientMessage = `操作成功：已成功添加角色 ，请继续设定拥有的模块 `;

    afterOK(data);
  };

  formContent = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <>
        <FormItem {...formItemLayout} label={fieldData.name}>
          {getFieldDecorator(
            'name',
            refitFieldDecoratorOption('', '', '', {
              rules: [
                {
                  required: false,
                  message: buildFieldDescription(fieldData.name),
                },
              ],
            })
          )(
            <Input
              addonBefore={<Icon type="form" />}
              placeholder={buildFieldDescription(fieldData.name)}
            />
          )}
        </FormItem>
      </>
    );
  };
}

export default AddModal;
