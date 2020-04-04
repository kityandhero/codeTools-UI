import React from 'react';
import { Drawer, Form, message, Row, Col, Affix, Button, Divider } from 'antd';
import {
  SaveOutlined,
  FormOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { defaultFormState, pretreatmentRequestParams, isFunction } from '@/utils/tools';
import CustomAuthorization from '@/customComponents/Framework/CustomAuthorization';

import styles from './index.less';

class Index extends CustomAuthorization {
  formRef = React.createRef();

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
        loadDataAfterMount: false,
        submitApiPath: '',
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.fillForm(metaData);
  };

  fillForm = (metaData) => {
    const form = this.getTargetForm();

    const initialValues = this.buildInitialValues(metaData);

    form.setFieldsValue(initialValues);
  };

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
    listData,
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
    return (
      <Form ref={this.formRef} className={this.getFormClassName()} layout={this.getFormLayout()}>
        {this.formContent()}
      </Form>
    );
  };

  formContent = () => null;

  renderButton = () => {
    const { dataLoading, processing } = this.state;

    return (
      <>
        <Button
          type="primary"
          disabled={dataLoading || processing}
          onClick={(e) => {
            this.handleOk(e);
          }}
        >
          {processing ? <LoadingOutlined /> : <SaveOutlined />}
          保存
        </Button>
        <Divider type="vertical" />
        <Button
          type="default"
          disabled={dataLoading || processing}
          onClick={() => {
            this.onClose();
          }}
        >
          <CloseCircleOutlined />
          关闭
        </Button>
      </>
    );
  };

  render() {
    const { visible, width } = this.state;

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
        placement="right"
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
        <div className={styles.contentContainor}>{this.renderForm()}</div>
        <Affix offsetBottom={0}>
          <div className={styles.bottomBar}>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                {this.renderButton()}
              </Col>
            </Row>
          </div>
        </Affix>
      </Drawer>
    );
  }
}

export default Index;
