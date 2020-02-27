import React from 'react';
import { connect } from 'dva';
import { ContactsOutlined, FormOutlined, SaveOutlined } from '@ant-design/icons';

import { Form, Card, Spin, notification, Button } from 'antd';

import { getDerivedStateFromPropsForUrlParams, buildFieldHelper } from '../../../../utils/tools';
import accessWayCollection from '../../../../customConfig/accessWayCollection';
import UpdateFormTab from '../../../../customComponents/Framework/CustomForm/UpdateFormTab';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
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

  getApiData = props => {
    const {
      account: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = data => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  formContent = () => {
    const { processing, dataLoading } = this.state;

    return (
      <>
        <Card
          title={
            <>
              <ContactsOutlined />
              <span className={styles.cardTitle}>重置密码</span>
            </>
          }
          className={styles.card}
          bordered={false}
        >
          <Spin spinning={dataLoading || processing}>
            <Form layout="horizontal" className={styles.customForm}>
              {this.renderFormPasswordFormItem(
                fieldData.password,
                'password',
                true,
                buildFieldHelper(fieldData.passwordHelper),
                <FormOutlined />,
                {},
                true,
                formItemLayout,
              )}

              {this.renderFormPasswordFormItem(
                fieldData.rePassword,
                'rePassword',
                true,
                buildFieldHelper(fieldData.rePasswordHelper),
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
                  onClick={e => {
                    this.validate(e);
                  }}
                >
                  保存
                </Button>
              </FormItem>
            </Form>
          </Spin>
        </Card>
      </>
    );
  };
}

export default ResetPassword;