import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Button, Form, Input, Spin, notification, Icon } from 'antd';

import { refitFieldDecoratorOption, buildFieldDescription } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import AddFormBase from '../../../customComponents/Framework/CustomForm/AddFormBase';

import { fieldData } from '../Common/data';
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
class Add extends AddFormBase {
  componentAuthority = accessWayCollection.areaManage.add;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '增加账户',
        submitApiPath: 'areaManage/addBasicInfo',
      },
    };
  }

  getApiData = props => {
    const {
      areaManage: { data },
    } = props;

    return data;
  };

  afterSubmitSuccess = data => {
    const { dispatch } = this.props;

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行下一步操作。',
      });
    });

    const {
      data: { areaManageId },
    } = data;

    const location = {
      pathname: `/account/areaManage/edit/load/${areaManageId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
  };

  formContent = () => {
    const { form } = this.props;
    const { processing } = this.state;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.containorBox}>
        <Card title="基本信息" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form layout="horizontal" className={styles.customForm}>
              <FormItem {...formItemLayout} label={fieldData.loginName}>
                {getFieldDecorator(
                  'loginName',
                  refitFieldDecoratorOption('', null, '', {
                    rules: [
                      {
                        required: false,
                        message: buildFieldDescription(fieldData.loginName),
                      },
                    ],
                  }),
                )(
                  <Input
                    addonBefore={<Icon type="form" />}
                    placeholder={buildFieldDescription(fieldData.loginName)}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={fieldData.name}>
                {getFieldDecorator(
                  'name',
                  refitFieldDecoratorOption('', null, '', {
                    rules: [
                      {
                        required: false,
                        message: buildFieldDescription(fieldData.name),
                      },
                    ],
                  }),
                )(
                  <Input
                    addonBefore={<Icon type="form" />}
                    placeholder={buildFieldDescription(fieldData.name)}
                  />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={fieldData.phone}>
                {getFieldDecorator(
                  'phone',
                  refitFieldDecoratorOption('', null, '', {
                    rules: [
                      {
                        required: false,
                        message: buildFieldDescription(fieldData.phone),
                      },
                    ],
                  }),
                )(
                  <Input
                    addonBefore={<Icon type="form" />}
                    placeholder={buildFieldDescription(fieldData.phone)}
                  />,
                )}
              </FormItem>
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
                  disabled={processing}
                  loading={processing}
                  onClick={this.validate}
                >
                  保存
                </Button>
              </FormItem>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  };
}

export default Add;
