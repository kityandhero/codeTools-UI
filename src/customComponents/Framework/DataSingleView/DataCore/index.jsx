import React from 'react';
import { Form, Tooltip, Button, Avatar, BackTop, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  LoadingOutlined,
  ReloadOutlined,
  PlusOutlined,
  RollbackOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import AuthorizationWrapper from '@/customComponents/Framework/AuthorizationWrapper';
import { buildButtonGroup } from '@/customComponents/FunctionComponent';

import styles from './index.less';

class DataCore extends AuthorizationWrapper {
  enableActionBack = true;

  reloadByUrlOp = false;

  needSetFormValueAfterLoad = true;

  actionBackProps = {};

  formRef = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

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
    if (this.loadDataAfterMount) {
      if (this.needSetFormValueAfterLoad) {
        message.error('buildInitialValues 方法需要重新实现。');

        return {};
      }

      return {};
    }

    return {};
  };

  getFormLayout = () => {
    return 'vertical';
  };

  getFormClassName = () => {
    return null;
  };

  renderMainTitleIcon = () => {
    return <ContactsOutlined />;
  };

  renderMainTitleText = () => {
    return '基本信息';
  };

  renderMainTitle = () => {
    return (
      <>
        {this.renderMainTitleIcon()}
        <span className={styles.cardTitle}> {this.renderMainTitleText()}</span>
      </>
    );
  };

  renderFormWrapper = () => {
    return this.renderForm();
  };

  renderFormOutContainor = () => {
    return <div className={styles.containorBox}>{this.renderForm()}</div>;
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
      <Form
        ref={this.formRef}
        initialValues={initialValues}
        className={this.getFormClassName()}
        layout={this.getFormLayout()}
        {...otherFormProps}
      >
        {this.formContent()}
      </Form>
    );
  };

  formContent = () => null;

  render() {
    const { pageName } = this.state;

    return (
      <PageHeaderWrapper title={pageName} logo={this.pageHeaderLogo()}>
        <div className={styles.containorBox}>
          {this.renderFormWrapper()}
          {this.renderOther()}
        </div>
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default DataCore;
