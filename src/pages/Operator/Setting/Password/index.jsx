import React from 'react';
import { Form, Button, Spin, notification, message } from 'antd';
import { connect } from 'umi';
import { FormOutlined, SaveOutlined } from '@ant-design/icons';

import { buildFieldHelper } from '@/utils/tools';
import UpdateForm from '@/customComponents/Framework/CustomForm/UpdateForm';

import styles from './index.less';

const fieldData = {
  originalPassword: '原密码',
  originalPasswordHelper: '输入原密码',
  password: '新密码',
  passwordHelper: '输入新密码',
  rePassword: '确认密码',
  rePasswordHelper: '输入确认原密码',
};

@connect(({ operator, loading }) => ({
  operator,
  loading: loading.models.operator,
}))
class Password extends UpdateForm {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadDataAfterMount: false,
        submitApiPath: 'operator/changeCurrentPassword',
      },
    };
  }

  getTargetForm = () => {
    return this.formRef.current;
  };

  getApiData = (props) => {
    const {
      operator: { data },
    } = props;

    return data;
  };

  getViewDom = (ref) => {
    this.view = ref;
  };

  checkSubmitRequestParams = (o) => {
    if (o.password.length < 6) {
      message.error('新密码长度太短，请输入6~32位的新密码！');
      return false;
    }

    if (o.rePassword !== o.password) {
      message.error('两次密码输入不一致！');
      return false;
    }

    return true;
  };

  afterCheckSubmitRequestParams = (o) => {
    const d = o;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (data) => {
    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    form.resetFields();

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '密码修改成功。',
      });
    });
  };

  render() {
    const { processing } = this.state;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Spin spinning={processing}>
            <Form ref={this.formRef} layout="vertical">
              {this.renderFormPasswordFormItem(
                fieldData.originalPassword,
                'originalPassword',
                true,
                buildFieldHelper(fieldData.originalPasswordHelper),
                <FormOutlined />,
              )}
              {this.renderFormPasswordFormItem(
                fieldData.password,
                'password',
                true,
                buildFieldHelper(fieldData.passwordHelper),
                <FormOutlined />,
              )}
              {this.renderFormPasswordFormItem(
                fieldData.rePassword,
                'rePassword',
                true,
                buildFieldHelper(fieldData.rePasswordHelper),
                <FormOutlined />,
              )}

              <Button
                type="primary"
                icon={<SaveOutlined />}
                disabled={processing}
                onClick={(e) => {
                  this.validate(e);
                }}
              >
                更新密码
              </Button>
            </Form>
          </Spin>
        </div>
      </div>
    );
  }
}

export default Password;
