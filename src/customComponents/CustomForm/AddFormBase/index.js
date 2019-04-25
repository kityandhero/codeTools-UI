import React from 'react';
import { BackTop, Popover, Icon, Avatar } from 'antd';

import { defaultFormState, pretreatmentRequestParams } from '@/utils/tools';
import CustomBase from '@/customComponents/CustomBase';
import PageHeaderWrapperCustom from '@/customComponents/PageHeaderWrapperCustom';

import styles from './index.less';

class AddFormBase extends CustomBase {
  constructor(props) {
    super(props);

    const defaultState = defaultFormState();

    defaultState.dataLoading = false;

    this.state = {
      ...defaultState,
    };
  }

  preInit = () => {
    this.setState(this.extendState(), () => {
      this.init();
    });
  };

  init = () => {
    this.setState(this.initState());
  };

  initState = () => ({});

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = metaData => {};

  handleFormReset = () => {
    const { form } = this.props;

    form.resetFields();

    this.reloadData();
  };

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;

    const { errorFieldName } = this.state;

    const errors = getFieldsError();

    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }

    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };

    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{errorFieldName}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  supplementSubmitRequestParams = o => o;

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = data => {};

  // eslint-disable-next-line no-unused-vars
  checkSubmitRequestParams = o => true;

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;

    const { submitApiPath } = this.state;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        let submitData = pretreatmentRequestParams(values);

        submitData = this.supplementSubmitRequestParams(submitData);

        const checkResult = this.checkSubmitRequestParams(submitData);

        if (checkResult) {
          this.setState({ processing: true });

          dispatch({
            type: submitApiPath,
            payload: submitData,
          }).then(() => {
            if (this.mounted) {
              const data = this.getApiData(this.props);

              const { dataSuccess } = data;

              if (dataSuccess) {
                this.afterSubmitSuccess(data);
              }

              // eslint-disable-next-line react/no-unused-state
              this.setState({ processing: false });
            }
          });
        }
      }
    });
  };

  pageHeaderLogo = () => <Avatar shape="square" icon="plus" />;

  formContent = () => null;

  render() {
    const { pageName } = this.state;

    return (
      <PageHeaderWrapperCustom title={pageName} logo={this.pageHeaderLogo()}>
        <div className={styles.containorBox}>
          {this.formContent()}
          {this.renderOther()}
        </div>
        <BackTop />
      </PageHeaderWrapperCustom>
    );
  }
}

export default AddFormBase;
