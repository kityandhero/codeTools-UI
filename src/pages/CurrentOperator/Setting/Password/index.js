import React from 'react';
import { Form, Input, Button, Icon, Spin, notification, message } from 'antd';
import { connect } from 'dva';

import { refitFieldDecoratorOption, buildFieldDescription } from '@/utils/tools';
import UpdateForm from '@/customComponents/Framework/CustomForm/UpdateForm';

import styles from './index.less';

const FormItem = Form.Item;

const fieldLabels = {
  originalWord: '原密码',
  newWord: '新密码',
  reNewWord: '确认新密码',
};

@connect(({ currentOperator, loading }) => ({
  currentOperator,
  loading: loading.models.currentOperator,
}))
@Form.create()
class Password extends UpdateForm {
  getApiData = props => {
    const {
      currentOperator: { data },
    } = props;

    return data;
  };

  initState = () => ({
    loadDataAfterMount: false,
  });

  initState = () => {
    const result = {
      loadDataAfterMount: false,
      submitApiPath: 'currentOperator/changeCurrentPassword',
    };

    return result;
  };

  getViewDom = ref => {
    this.view = ref;
  };

  checkSubmitRequestParams = o => {
    if (o.newWord.length < 6) {
      message.error('新密码长度太短，请输入6~32位的新密码！');
      return false;
    }

    if (o.reNewWord !== o.newWord) {
      message.error('两次密码输入不一致！');
      return false;
    }

    return true;
  };

  afterCheckSubmitRequestParams = o => {
    const d = o;

    delete d.reNewWord;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = data => {
    const { form } = this.props;

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
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { processing } = this.state;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Spin spinning={processing}>
            <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
              <FormItem label={fieldLabels.originalWord}>
                {getFieldDecorator(
                  'originalWord',
                  refitFieldDecoratorOption('', false, '', {
                    rules: [
                      {
                        required: true,
                        message: buildFieldDescription(fieldLabels.originalWord),
                      },
                    ],
                  })
                )(
                  <Input
                    addonBefore={<Icon type="key" />}
                    style={{ maxWidth: 220 }}
                    placeholder={buildFieldDescription(fieldLabels.originalWord)}
                  />
                )}
              </FormItem>
              <FormItem label={fieldLabels.newWord}>
                {getFieldDecorator(
                  'newWord',
                  refitFieldDecoratorOption('', false, '', {
                    rules: [
                      {
                        required: true,
                        message: buildFieldDescription(fieldLabels.newWord),
                      },
                    ],
                  })
                )(
                  <Input
                    addonBefore={<Icon type="key" />}
                    placeholder={buildFieldDescription(fieldLabels.newWord)}
                  />
                )}
              </FormItem>
              <FormItem label={fieldLabels.reNewWord}>
                {getFieldDecorator(
                  'reNewWord',
                  refitFieldDecoratorOption('', false, '', {
                    rules: [
                      {
                        required: true,
                        message: buildFieldDescription(fieldLabels.reNewWord),
                      },
                    ],
                  })
                )(
                  <Input
                    addonBefore={<Icon type="key" />}
                    placeholder={buildFieldDescription(fieldLabels.reNewWord)}
                  />
                )}
              </FormItem>
              <Button
                type="primary"
                icon="save"
                onClick={this.validate}
                loading={processing}
                disabled={processing}
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
