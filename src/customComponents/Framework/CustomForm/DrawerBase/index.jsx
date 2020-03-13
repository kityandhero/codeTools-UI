import React from 'react';
import { Drawer, message, Row, Col, Affix, Button, Divider } from 'antd';
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { defaultFormState, pretreatmentRequestParams, isFunction } from '@/utils/tools';
import CustomAuthorization from '@/customComponents/Framework/CustomAuthorization';

import styles from './index.less';

class Index extends CustomAuthorization {
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

      if (form == null) {
        return;
      }

      form.resetFields();

      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {};

  supplementLoadRequestParams = o => o;

  supplementSubmitRequestParams = o => o;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkSubmitRequestParams = o => true;

  getTargetForm = () => {
    message.error('需要重载getTargetForm');

    return null;
  };

  handleOk = e => {
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
      .then(values => {
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
      .catch(error => {
        const { errorFields } = error;

        const m = [];

        Object.values(errorFields).forEach(o => {
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
  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
    this.setState({ visible: false });
  };

  onClose = e => {
    e.preventDefault();

    const { afterClose } = this.props;

    this.setState({ visible: false });

    if (isFunction(afterClose)) {
      afterClose();
    }
  };

  renderTitleIcon = () => null;

  renderTitle = () => null;

  renderContent = () => null;

  renderButton = () => {
    const { dataLoading, processing } = this.state;

    return (
      <>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          loading={dataLoading || processing}
          disabled={dataLoading || processing}
          onClick={e => {
            this.handleOk(e);
          }}
        >
          保存
        </Button>
        <Divider type="vertical" />
        <Button
          type="default"
          icon={<CloseCircleOutlined />}
          disabled={dataLoading || processing}
          onClick={() => {
            this.onClose();
          }}
        >
          关闭
        </Button>
      </>
    );
  };

  render() {
    const { visible, width } = this.state;

    return (
      <Drawer
        title={
          <span>
            {this.renderTitleIcon()}
            {this.renderTitle()}
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
        <div className={styles.contentContainor}>{this.renderContent()}</div>
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
