import React from 'react';
import { Modal, Spin, Form, message } from 'antd';

import { defaultFormState, pretreatmentRequestParams } from '@/utils/tools';
import CustomBase from '@/customComponents/CustomBase';

class ModalBase extends CustomBase {
  constructor(props) {
    super(props);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      visible: false,
      changeVisible: false,
      loadDataAfterMount: false,
    };
  }

  preInit = () => {
    const { visible } = this.props;

    this.setState(this.extendState(), () => {
      this.init();
    });

    this.setState({ visible });
  };

  componentWillReceiveProps(nextProps) {
    const { visible: visiblePre } = this.state;
    const { visible } = nextProps;

    this.setState({ visible: visible || false, changeVisible: visible && !visiblePre }, () => {
      this.doWorkWhenWillReceive(nextProps);
    });
  }

  doWorkWhenWillReceive = nextProps => {
    const { changeVisible } = this.state;

    if (changeVisible) {
      const { form } = nextProps;

      form.resetFields();

      this.doOtherWhenChangeVisible(nextProps);
    }
  };

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = nextProps => {};

  supplementLoadRequestParams = o => o;

  supplementSubmitRequestParams = o => o;

  // eslint-disable-next-line no-unused-vars
  checkSubmitRequestParams = o => true;

  handleOk = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { submitApiPath } = this.state;

    form.validateFields((err, values) => {
      if (!err) {
        let submitData = pretreatmentRequestParams(values, d => {
          const o = d;

          return o;
        });

        submitData = this.supplementSubmitRequestParams(submitData);

        const checkResult = this.checkSubmitRequestParams(submitData);

        if ((submitApiPath || '') === '') {
          message.error(`缺少 submitApiPath 配置！`);
          return;
        }

        if (checkResult) {
          this.setState({ processing: true });

          dispatch({
            type: submitApiPath,
            payload: submitData,
          }).then(() => {
            if (this.mounted) {
              const data = this.getApiData(this.props);

              const { dataSuccess } = data;

              this.setState({ processing: false });
              if (dataSuccess) {
                this.afterSubmitSuccess(data);
              }
            }
          });
        }
      }
    });
  };

  handleCancel = e => {
    e.preventDefault();

    const { afterCancel } = this.props;

    this.setState({ visible: false });

    afterCancel();
  };

  formContent = () => null;

  render() {
    const { pageName, visible, processing, dataLoading } = this.state;

    return (
      <Modal title={pageName} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <Spin spinning={processing || dataLoading}>
          <Form>{this.formContent()}</Form>
        </Spin>
      </Modal>
    );
  }
}

export default ModalBase;
