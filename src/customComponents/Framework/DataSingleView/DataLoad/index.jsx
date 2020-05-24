import React from 'react';
import { Form, BackTop, Button, Avatar, Tooltip, message } from 'antd';
import {
  PlusOutlined,
  RollbackOutlined,
  ReloadOutlined,
  LoadingOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { getDerivedStateFromPropsForUrlParams, defaultFormState } from '@/utils/tools';
import { buildButtonGroup } from '@/customComponents/FunctionComponent';

import DataCore from '../DataCore';

import styles from './index.less';

class DataLoad extends DataCore {
  enableActionBack = true;

  reloadByUrlOp = false;

  actionBackProps = {};

  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      ...{
        showReloadButton: true,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParamsPrev } = preState;

    if ((urlParams || null) == null || (urlParamsPrev || null) == null) {
      return;
    }

    const { op } = urlParams;

    const { op: prevOp } = urlParamsPrev;

    const { dataLoading } = this.state;

    if (!dataLoading) {
      if (
        (prevOp === 'load' && op === 'update') ||
        this.checkNeedUpdate(preProps, preState, snapshot)
      ) {
        if (this.reloadByUrlOp) {
          this.reloadData();
        }
      }
    }
  };

  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.fillForm(metaData, metaListData, metaExtra, metaOriginalData);

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

    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(initialValues);

      this.afterFillForm(metaData, metaListData, metaExtra, metaOriginalData);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterFillForm = (metaData, metaListData, metaExtra, metaOriginalData) => {};

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

  pageHeaderLogo = () => <Avatar shape="square" icon={<PlusOutlined />} />;

  pageHeaderActionExtraGroup = () => null;

  pageHeaderActionBack = () => {
    const { backPath } = this.state;

    if (!this.enableActionBack) {
      return null;
    }

    if ((backPath || '') === '') {
      return null;
    }

    const props = {
      ...{ icon: <RollbackOutlined />, type: 'dashed' },
      ...(this.actionBackProps || {}),
    };

    return (
      <Tooltip placement="top" title="返回列表页">
        <Button
          {...props}
          onClick={(e) => {
            this.backToList(e);
          }}
        >
          列表页
        </Button>
      </Tooltip>
    );
  };

  pageHeaderAction = () => {
    const { dataLoading, reloading, refreshing, showReloadButton } = this.state;

    const buttonGroupData = this.pageHeaderActionExtraGroup();

    return (
      <>
        <div className={styles.buttonBox}>
          {buildButtonGroup(buttonGroupData)}

          {this.pageHeaderActionBack()}

          {showReloadButton ? (
            <Tooltip placement="top" title="刷新">
              <Button
                disabled={dataLoading || reloading || refreshing}
                className={styles.reloadButton}
                type="dashed"
                onClick={() => {
                  this.reloadData();
                }}
              >
                {reloading || refreshing ? <LoadingOutlined /> : <ReloadOutlined />}
              </Button>
            </Tooltip>
          ) : null}
        </div>
      </>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => {
    message.error('buildInitialValues 方法需要重新实现。');

    return {};
  };

  getFormLayout = () => {
    return 'vertical';
  };

  getFormClassName = () => {
    return null;
  };

  renderBasicInfoTitleIcon = () => {
    return <ContactsOutlined />;
  };

  renderBasicInfoTitleText = () => {
    return '基本信息';
  };

  renderBasicInfoTitle = () => {
    return (
      <>
        {this.renderBasicInfoTitleIcon()}
        <span className={styles.cardTitle}> {this.renderBasicInfoTitleText()}</span>
      </>
    );
  };

  renderForm = () => {
    const { metaData, metaListData, metaExtra, metaOriginalData } = this.state;

    const initialValues = this.buildInitialValues(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    );

    const otherFormProps = this.buildOtherFormProps();

    return (
      <div className={styles.containorBox}>
        <Form
          ref={this.formRef}
          initialValues={initialValues}
          className={this.getFormClassName()}
          layout={this.getFormLayout()}
          {...otherFormProps}
        >
          {this.formContent()}
        </Form>
      </div>
    );
  };

  formContent = () => null;

  render() {
    const { pageName } = this.state;

    return (
      <PageHeaderWrapper title={pageName} logo={this.pageHeaderLogo()}>
        <div className={styles.containorBox}>
          {this.renderForm()}
          {this.renderOther()}
        </div>
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default DataLoad;
