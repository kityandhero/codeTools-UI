import React from 'react';
import { Modal, Spin, Form, message } from 'antd';

import { defaultFormState, pretreatmentRequestParams, isFunction } from '@/utils/tools';
import CustomAuthorization from '@/customComponents/Framework/CustomAuthorization';

class ModalBase extends CustomAuthorization {
  constructor(props) {
    super(props);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      visible: false,
      loadDataAfterMount: false,
      width: 520,
      bodyStyle: {},
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;

    return { visible, externalData };
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visible && !visiblePre) {
      const { form } = this.props;

      form.resetFields();

      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {};

  supplementLoadRequestParams = o => o;

  supplementSubmitRequestParams = o => o;

  // eslint-disable-next-line no-unused-vars
  checkSubmitRequestParams = o => true;

  handleOk = e => {
    e.preventDefault();
    const {
      dispatch,
      form,
      //  afterOk
    } = this.props;
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

                // if (isFunction(afterOk)) {
                //   afterOk();
                // }
              }
            }
          });
        }
      }
    });
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = data => {
    this.setState({ visible: false });
  };

  handleCancel = e => {
    e.preventDefault();

    const { afterCancel } = this.props;

    this.setState({ visible: false });

    if (isFunction(afterCancel)) {
      afterCancel();
    }
  };

  formContent = () => null;

  render() {
    const { width, bodyStyle, pageName, visible, processing, dataLoading } = this.state;

    return (
      <Modal
        title={pageName}
        width={width}
        bodyStyle={bodyStyle}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Spin spinning={processing || dataLoading}>
          <Form>{this.formContent()}</Form>
        </Spin>
      </Modal>
    );
  }
}

export default ModalBase;
