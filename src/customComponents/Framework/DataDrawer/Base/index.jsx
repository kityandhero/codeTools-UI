import React from 'react';
import { Layout, Drawer, Form, Button, message, Row, Col, Affix } from 'antd';
import { FormOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { defaultFormState, pretreatmentRequestParams, isFunction } from '@/utils/tools';

import AuthorizationWrapper from '../../AuthorizationWrapper';

import styles from './index.less';

const { Footer, Content } = Layout;

class Base extends AuthorizationWrapper {
  formRef = React.createRef();

  loadDataAfterMount = false;

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

  execSubmitApi = (values = {}, afterSubmitCallback) => {
    const { dispatch } = this.props;

    const { submitApiPath } = this.state;

    if ((submitApiPath || '') === '') {
      message.error(`缺少 submitApiPath 配置！`);
      return;
    }

    let submitData = pretreatmentRequestParams(values || {});

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
            if (isFunction(afterSubmitCallback)) {
              afterSubmitCallback();
            }
          });
        }
      });
    }
  };

  handleOk = (e) => {
    e.preventDefault();

    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    const { validateFields } = form;

    validateFields()
      .then((values) => {
        this.execSubmitApi(values);
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

  renderButton = () => {
    const { dataLoading, processing } = this.state;

    return (
      <>
        <Button
          type="default"
          disabled={dataLoading || processing}
          onClick={(e) => {
            this.onClose(e);
          }}
        >
          <CloseCircleOutlined />
          关闭
        </Button>
      </>
    );
  };

  renderBottomBar = () => {
    return (
      <Footer>
        <Affix offsetBottom={0}>
          <div className={styles.bottomBar}>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                {this.renderButton()}
              </Col>
            </Row>
          </div>
        </Affix>
      </Footer>
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
      >
        <div className={styles.mainContainor}>
          <Layout>
            {/* <Header>Header</Header> */}
            <Content>{this.renderContentContainor()}</Content>
            {showBottomBar ? this.renderBottomBar() : null}
          </Layout>
        </div>
      </Drawer>
    );
  }
}

export default Base;
