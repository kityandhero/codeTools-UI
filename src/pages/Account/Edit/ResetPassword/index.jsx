import React from 'react';
import { connect } from 'umi';
import { FormOutlined, SaveOutlined } from '@ant-design/icons';

import { Form, Card, Spin, notification, Button } from 'antd';

import { getDerivedStateFromPropsForUrlParams, buildFieldHelper } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import UpdateFormTab from '@/customComponents/Framework/CustomForm/UpdateFormTab';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    xs: {
      span: 14,
    },
  },
};

@connect(({ account, global, loading }) => ({
  account,
  global,
  loading: loading.models.account,
}))
class ResetPassword extends UpdateFormTab {
  componentAuthority = accessWayCollection.account.resetPassword;

  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        submitApiPath: 'account/resetPassword',
        dataLoading: false,
        loadDataAfterMount: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  getApiData = (props) => {
    const {
      account: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (data) => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  getFormLayout = () => {
    return 'horizontal';
  };

  getFormClassName = () => {
    return styles.card;
  };

  renderBasicInfoTitleText = () => {
    return '重置密码';
  };

  formContent = () => {
    const { processing, dataLoading } = this.state;

    return (
      <>
        <Card title={this.renderBasicInfoTitle()} className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            {this.renderFormPasswordFormItem(
              fieldData.password.label,
              fieldData.password.name,
              true,
              buildFieldHelper(fieldData.password.helper),
              <FormOutlined />,
              {},
              true,
              formItemLayout,
            )}

            {this.renderFormPasswordFormItem(
              fieldData.rePassword.label,
              fieldData.rePassword.name,
              true,
              buildFieldHelper(fieldData.rePassword.helper),
              <FormOutlined />,
              {},
              true,
              formItemLayout,
            )}

            <FormItem
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: {
                  span: formItemLayout.wrapperCol.span,
                  offset: formItemLayout.labelCol.span,
                },
              }}
              label=""
            >
              <Button
                type="primary"
                icon={<SaveOutlined />}
                disabled={
                  processing || !this.checkAuthority(accessWayCollection.account.resetPassword)
                }
                loading={processing}
                onClick={(e) => {
                  this.validate(e);
                }}
              >
                保存
              </Button>
            </FormItem>
          </Spin>
        </Card>
      </>
    );
  };
}

export default ResetPassword;
