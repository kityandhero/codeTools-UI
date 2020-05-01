import React from 'react';
import { Form, BackTop, Avatar, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { defaultFormState, pretreatmentRequestParams, formatDatetime } from '@/utils/tools';
import { formNameCollection } from '@/customConfig/config';
import CustomAuthorization from '@/customComponents/Framework/CustomAuthorization';

import styles from './index.less';

class AddFormBase extends CustomAuthorization {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      ...{
        dataLoading: false,
        loadDataAfterMount: false,
      },
    };
  }

  adjustWhenDidMount = () => {
    this.fillForm();
  };

  getTargetForm = () => {
    return this.formRef.current;
  };

  fillForm = () => {
    const initialValues = this.buildInitialValues();

    if (initialValues == null) {
      const form = this.getTargetForm();

      if (form != null) {
        form.setFieldsValue(initialValues);

        this.afterSetFieldsValue(initialValues);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterFillForm = (initialValues) => {};

  setFormFieldsValue = (v) => {
    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSetFieldsValue = (v) => {};

  handleFormReset = () => {
    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    form.resetFields();

    this.reloadData();
  };

  supplementSubmitRequestParams = (o) => o;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extraData, responseOriginalData, submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkSubmitRequestParams = (o) => true;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate = (e) => {
    const { dispatch } = this.props;

    const form = this.getTargetForm();

    const { validateFields } = form;

    const { submitApiPath } = this.state;

    validateFields()
      .then((values) => {
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

  pageHeaderLogo = () => <Avatar shape="square" icon={<PlusOutlined />} />;

  buildInitialValues = () => {
    const initialValues = {};

    initialValues[formNameCollection.createTime.name] = formatDatetime(
      new Date(),
      'YYYY-MM-DD HH:mm',
    );

    return initialValues;
  };

  getSaveButtonDisabled = () => {
    const { processing } = this.state;

    return processing;
  };

  getSaveButtonLoading = () => {
    const { processing } = this.state;

    return processing;
  };

  renderForm = () => {
    const initialValues = this.buildInitialValues();

    return (
      <div className={styles.containorBox}>
        <Form ref={this.formRef} initialValues={initialValues} layout="vertical">
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

export default AddFormBase;
