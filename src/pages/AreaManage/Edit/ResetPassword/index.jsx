import React from 'react';
import { connect } from 'dva';

import { Card, Form, Spin, notification, Icon, Input, Button } from 'antd';

import {
  refitFieldDecoratorOption,
  buildFieldDescription,
  getDerivedStateFromPropsForUrlParams,
} from '../../../../utils/tools';
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

@connect(({ areaManage, global, loading }) => ({
  areaManage,
  global,
  loading: loading.models.areaManage,
}))
@Form.create()
class ResetPassword extends UpdateFormTab {
  componentAuthority = accessWayCollection.areaManage.resetPassword;

  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        submitApiPath: 'areaManage/resetPassword',
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
      areaManage: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { areaManageId } = this.state;

    d.areaManageId = areaManageId;

    return d;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { areaManageId } = this.state;

    d.areaManageId = areaManageId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
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
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { processing, dataLoading } = this.state;

    return (
      <>
        <Card
          title={
            <>
              <Icon type="contacts" />
              <span className={styles.cardTitle}>重置密码</span>
            </>
          }
          className={styles.card}
          bordered={false}
        >
          <Spin spinning={dataLoading || processing}>
            <Form layout="horizontal" className={styles.customForm}>
              <FormItem {...formItemLayout} label={fieldData.password}>
                {getFieldDecorator(
                  'password',
                  refitFieldDecoratorOption('', null, '', {
                    rules: [
                      {
                        required: false,
                        message: buildFieldDescription(fieldData.password),
                      },
                    ],
                  }),
                )(
                  <Input
                    addonBefore={<Icon type="form" />}
                    type="password"
                    placeholder={buildFieldDescription(fieldData.password)}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={fieldData.rePassword}>
                {getFieldDecorator(
                  'rePassword',
                  refitFieldDecoratorOption('', null, '', {
                    rules: [
                      {
                        required: false,
                        message: buildFieldDescription(fieldData.rePassword),
                      },
                    ],
                  }),
                )(
                  <Input
                    addonBefore={<Icon type="form" />}
                    type="password"
                    placeholder={buildFieldDescription(fieldData.rePassword)}
                  />,
                )}
              </FormItem>
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
                  icon="save"
                  disabled={
                    processing || !this.checkAuthority(accessWayCollection.areaManage.resetPassword)
                  }
                  loading={processing}
                  onClick={this.validate}
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
