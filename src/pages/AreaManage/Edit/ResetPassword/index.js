import React, { Fragment } from 'react';
import { connect } from 'dva';

import { Card, Form, Spin, notification, Icon, Input, Button } from 'antd';

import {
  isInvalid,
  searchFromList,
  refitCommonData,
  refitFieldDecoratorOption,
  buildFieldDescription,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import UpdateFormTab from '@/customComponents/CustomForm/UpdateFormTab';

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

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      areaManageId: id,
      submitApiPath: 'areaManage/resetPassword',
      dataLoading: false,
      loadDataAfterMount: false,
    };

    return result;
  };

  getApiData = props => {
    const {
      areaManage: { data },
    } = props;

    return data;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { areaManageId: areaManageIdPre } = this.state;

    return areaManageIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { areaManageId: id };
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

  areaManageStateList = () => {
    const { global } = this.props;

    return refitCommonData(global.areaManageStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getAreaManageStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaManageStateList());
    return item == null ? '未知' : item.name;
  };

  formContent = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { processing, dataLoading } = this.state;

    return (
      <Fragment>
        <Card
          title={
            <Fragment>
              <Icon type="contacts" />
              <span className={styles.cardTitle}>重置密码</span>
            </Fragment>
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
                  })
                )(
                  <Input
                    addonBefore={<Icon type="form" />}
                    type="password"
                    placeholder={buildFieldDescription(fieldData.password)}
                  />
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
                  })
                )(
                  <Input
                    addonBefore={<Icon type="form" />}
                    type="password"
                    placeholder={buildFieldDescription(fieldData.rePassword)}
                  />
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
      </Fragment>
    );
  };
}

export default ResetPassword;
