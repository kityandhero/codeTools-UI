import React from 'react';
import { Row, Col, Form, Modal, Spin, message } from 'antd';
import { CloseCircleOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons';

import { defaultFormState, pretreatmentRequestParams, isFunction, recordText } from '@/utils/tools';

import AuthorizationWrapper from '../../AuthorizationWrapper';

import styles from './index.less';

class Base extends AuthorizationWrapper {
  formRef = React.createRef();

  loadDataAfterMount = false;

  reloadWhenShow = true;

  submitWithForm = true;

  goToUpdateWhenProcessed = false;

  constructor(props) {
    super(props);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      ...{
        visible: false,
        dataLoading: false,

        width: 520,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;
    return { visible, externalData: externalData || {} };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visible && !visiblePre) {
      const form = this.getTargetForm();

      if (form != null) {
        form.resetFields();
      }

      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {};

  supplementLoadRequestParams = (o) => o;

  supplementSubmitRequestParams = (o) => o;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkSubmitRequestParams = (o) => true;

  afterCheckSubmitRequestParams = (o) => o;

  setFormFieldsValue = (v) => {
    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSetFieldsValue = (v) => {};

  getTargetForm = () => {
    return this.formRef.current;
  };

  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.fillForm(metaData);

    this.doOtherAfterLoadSuccess(metaData, metaListData, metaExtra, metaOriginalData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {};

  fillForm = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const initialValues = this.buildInitialValues(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    );

    if (initialValues != null) {
      this.setFormFieldsValue(initialValues);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => null;

  handleOk = (e) => {
    if (this.submitWithForm) {
      this.handleOkWithForm(e);
    } else {
      this.handleOkWithoutForm(e);
    }
  };

  handleOkWithoutForm = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { submitApiPath } = this.state;

    if ((submitApiPath || '') === '') {
      message.error(`缺少 submitApiPath 配置！`);
      return;
    }

    let submitData = pretreatmentRequestParams({});

    submitData = this.supplementSubmitRequestParams(submitData);

    const checkResult = this.checkSubmitRequestParams(submitData);

    submitData = this.afterCheckSubmitRequestParams(submitData);

    if (checkResult) {
      this.setState({ processing: true });

      dispatch({
        type: submitApiPath,
        payload: submitData,
      }).then(() => {
        if (this.mounted) {
          const remoteData = this.getApiData(this.props);

          const { dataSuccess } = remoteData;

          if (dataSuccess) {
            const { list: metaListData, data: metaData, extra: metaExtra } = remoteData;

            this.afterSubmitSuccess(
              metaData || null,
              metaListData || [],
              metaExtra || null,
              remoteData,
              submitData,
            );
          }

          // eslint-disable-next-line react/no-unused-state
          this.setState({ processing: false });
        }
      });
    }
  };

  handleOkWithForm = (e) => {
    e.preventDefault();

    const {
      dispatch,
      //  afterOk
    } = this.props;
    const { submitApiPath } = this.state;

    if ((submitApiPath || '') === '') {
      message.error(`缺少 submitApiPath 配置！`);
      return;
    }

    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    const { validateFields } = form;

    validateFields()
      .then((values) => {
        let submitData = pretreatmentRequestParams(values);

        submitData = this.supplementSubmitRequestParams(submitData);

        const checkResult = this.checkSubmitRequestParams(submitData);

        submitData = this.afterCheckSubmitRequestParams(submitData);

        if (checkResult) {
          this.setState({ processing: true });

          dispatch({
            type: submitApiPath,
            payload: submitData,
          }).then(() => {
            if (this.mounted) {
              const remoteData = this.getApiData(this.props);

              const { dataSuccess } = remoteData;

              if (dataSuccess) {
                const { list: metaListData, data: metaData, extra: metaExtra } = remoteData;

                this.afterSubmitSuccess(
                  metaData || null,
                  metaListData || [],
                  metaExtra || null,
                  remoteData,
                  submitData,
                );
              }

              // eslint-disable-next-line react/no-unused-state
              this.setState({ processing: false }, () => {
                if (this.goToUpdateWhenProcessed) {
                  this.reloadByUrl();
                }
              });
            }
          });
        }
      })
      .catch((error) => {
        recordText(error);
        const { errorFields } = error;

        const m = [];

        Object.values(errorFields).forEach((o) => {
          m.push(o.errors[0]);
        });

        const maxLength = 5;
        let beyondMax = false;

        if (m.length > maxLength) {
          m.length = maxLength;

          beyondMax = true;
        }

        let errorMessage = m.join(', ');

        if (beyondMax) {
          errorMessage += ' ...';
        }

        message.warn(errorMessage);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extraData, responseOriginalData, submitData) => {
    this.setState({ visible: false });
  };

  handleCancel = (e) => {
    e.preventDefault();

    const { afterCancel } = this.props;

    this.setState({ visible: false });

    if (isFunction(afterCancel)) {
      afterCancel();
    }
  };

  getFormClassName = () => {
    return null;
  };

  buildFormLayout = () => {
    return 'horizontal';
  };

  formContent = () => null;

  renderModalInner = () => {
    const { metaData, metaListData, metaExtra, metaOriginalData } = this.state;

    const initialValues = this.buildInitialValues(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    );

    const otherFormProps = this.buildOtherFormProps();

    return (
      <Form
        ref={this.formRef}
        layout={this.buildFormLayout()}
        initialValues={initialValues}
        className={this.getFormClassName()}
        {...otherFormProps}
      >
        {this.formContent()}
      </Form>
    );
  };

  getSaveButtonDisabled = () => {
    const { dataLoading, processing, loadSuccess } = this.state;

    return dataLoading || processing || !loadSuccess;
  };

  buildOkButtonProps = () => {
    if (this.reloadWhenShow) {
      const buttonDisabled = this.getSaveButtonDisabled() || this.getOtherButtonDisabled();

      return {
        disabled: buttonDisabled,
      };
    }

    return {};
  };

  buildOkText = (saveButtonText = '') => {
    const buttonProcessing = this.getSaveButtonProcessing();

    return (
      <>
        {buttonProcessing ? <LoadingOutlined /> : this.getSaveButtonIcon()}
        <span className={styles.buttonText}>{saveButtonText || '保存'}</span>
      </>
    );
  };

  buildCancelButtonProps = () => {
    if (this.reloadWhenShow) {
      const buttonDisabled = this.getSaveButtonDisabled() || this.getOtherButtonDisabled();

      return {
        disabled: buttonDisabled,
      };
    }

    return {};
  };

  buildCancelText = (saveButtonText = '') => {
    return (
      <>
        <CloseCircleOutlined />
        <span className={styles.buttonText}>{saveButtonText || '取消'}</span>
      </>
    );
  };

  buildModalBodyStyle = () => {
    return {};
  };

  buildTitleIcon = () => {
    return <EditOutlined />;
  };

  buildTitleText = () => {
    const { pageName } = this.state;

    return pageName;
  };

  buildTitle = () => {
    return (
      <Row gutter={6}>
        <Col>{this.buildTitleIcon()}</Col>
        <Col flex="auto">{this.buildTitleText()}</Col>
      </Row>
    );
  };

  render() {
    const { width, visible, processing, dataLoading } = this.state;

    return (
      <Modal
        title={this.buildTitle()}
        width={width}
        bodyStyle={this.buildModalBodyStyle()}
        visible={visible}
        zIndex={1001}
        okButtonProps={this.buildOkButtonProps()}
        onOk={(e) => {
          this.handleOk(e);
        }}
        okText={this.buildOkText()}
        cancelButtonProps={this.buildCancelButtonProps()}
        cancelText={this.buildCancelText()}
        onCancel={this.handleCancel}
      >
        <Spin spinning={processing || dataLoading}>{this.renderModalInner()}</Spin>
      </Modal>
    );
  }
}

export default Base;
