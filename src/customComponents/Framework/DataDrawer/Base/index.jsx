import React from 'react';
import { Drawer, Form, message, Row, Col, Affix } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { defaultFormState, pretreatmentRequestParams, isFunction } from '@/utils/tools';

import AuthorizationWrapper from '../../AuthorizationWrapper';

import styles from './index.less';

class Base extends AuthorizationWrapper {
  formRef = React.createRef();

  goToUpdateWhenProcessed = false;

  constructor(props) {
    super(props);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      ...{
        title: '',
        width: 820,
        visible: false,
        dataLoading: false,
        showBottomBar: false,
        submitApiPath: '',
        placement: 'right',
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;

    return { visible, externalData };
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

  getTargetForm = () => {
    return this.formRef.current;
  };

  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.fillForm(metaData);

    this.doOtherAfterLoadSuccess(metaData, metaListData, metaExtra, metaOriginalData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  setFormFieldsValue = (v) => {
    const form = this.getTargetForm();

    form.setFieldsValue(v);

    this.afterSetFieldsValue(v);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSetFieldsValue = (v) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => null;

  handleOk = (e) => {
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
              this.setState({ processing: false });
            }
          });
        }
      })
      .catch((error) => {
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

  afterSubmitSuccess = (singleData, listData, extraData, responseOriginalData, submitData) => {
    this.setState({ visible: false });

    this.doOtherAfterSubmitSuccess(
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    );
  };

  doOtherAfterSubmitSuccess = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pageListData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData,
  ) => {};

  onClose = (e) => {
    e.preventDefault();

    const { afterClose } = this.props;

    this.setState({ visible: false });

    if (isFunction(afterClose)) {
      afterClose();
    }
  };

  renderTitleIcon = () => <FormOutlined />;

  renderTitle = () => null;

  getFormLayout = () => {
    return 'vertical';
  };

  getFormClassName = () => {
    return null;
  };

  renderForm = () => {
    const { metaData, metaListData, metaExtra, metaOriginalData } = this.state;

    const initialValues = this.buildInitialValues(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    );

    return (
      <Form
        ref={this.formRef}
        initialValues={initialValues}
        className={this.getFormClassName()}
        layout={this.getFormLayout()}
      >
        {this.formContent()}
      </Form>
    );
  };

  formContent = () => null;

  renderContentContainor = () => {
    return <div className={styles.contentContainor}>{this.renderForm()}</div>;
  };

  renderBottomBar = () => {
    return (
      <Affix offsetBottom={0}>
        <div className={styles.bottomBar}>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              {this.renderButton()}
            </Col>
          </Row>
        </div>
      </Affix>
    );
  };

  render() {
    const { visible, width, showBottomBar, placement } = this.state;

    const titleIcon = this.renderTitleIcon();

    return (
      <Drawer
        title={
          <span>
            {titleIcon}
            {titleIcon ? (
              <>
                <span className={styles.titleText} /> {this.renderTitle()}
              </>
            ) : (
              this.renderTitle()
            )}
          </span>
        }
        destroyOnClose={false}
        width={width}
        placement={placement}
        visible={visible || false}
        maskClosable={false}
        onClose={this.onClose}
        bodyStyle={{
          padding: 0,
        }}
        // style={{
        //   height: 'calc(100% - 55px)',
        // }}
      >
        {this.renderContentContainor()}
        {showBottomBar ? this.renderBottomBar() : null}
      </Drawer>
    );
  }
}

export default Base;
