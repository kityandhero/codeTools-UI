import React from 'react';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Upload, Button, Spin, notification } from 'antd';
import { connect } from 'dva';

import { refitFieldDecoratorOption, buildFieldDescription } from '@/utils/tools';
import UpdateForm from '@/customComponents/Framework/CustomForm/UpdateForm';

import styles from './index.less';
// import GeographicView from '../Geographic';
// import PhoneView from '../Phone';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon={<LegacyIcon type="upload" />}>更换头像</Button>
      </div>
    </Upload>
  </>
);

// const validatorGeographic = (rule, value, callback) => {
//   const { province, city } = value;
//   if (!province.key) {
//     callback('Please input your province!');
//   }
//   if (!city.key) {
//     callback('Please input your city!');
//   }
//   callback();
// };

// const validatorPhone = (rule, value, callback) => {
//   const values = value.split('-');
//   if (!values[0]) {
//     callback('Please input your area code!');
//   }
//   if (!values[1]) {
//     callback('Please input your phone number!');
//   }
//   callback();
// };

const fieldLabels = {
  loginName: '账户名',
  name: '姓名',
  email: '邮箱',
  phone: '手机号码',
  cityId: '地区代码',
  cityName: '所属地区',
  description: '个人描述',
};

@connect(({ operator, global, loading }) => ({
  operator,
  global,
  loading: loading.models.operator,
}))
@Form.create()
class BaseView extends UpdateForm {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'operator/getCurrentBasicInfo',
        submitApiPath: 'operator/updateCurrentBasicInfo',
      },
    };
  }

  getApiData = props => {
    const {
      operator: { data },
    } = props;

    return data;
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

  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { metaData, dataLoading, processing, loadSuccess } = this.state;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Spin spinning={dataLoading || processing}>
            <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
              <FormItem label={fieldLabels.loginName}>
                <Input
                  disabled
                  addonBefore={<LegacyIcon type="user" />}
                  style={{ maxWidth: 220 }}
                  value={metaData === null ? '' : metaData.loginName || ''}
                />
              </FormItem>
              <FormItem label={fieldLabels.name}>
                {getFieldDecorator(
                  'name',
                  refitFieldDecoratorOption(
                    metaData === null ? '' : metaData.name || '',
                    metaData === null ? '' : metaData.name || '',
                    '',
                    {
                      rules: [
                        {
                          required: false,
                          message: buildFieldDescription(fieldLabels.name),
                        },
                      ],
                    }
                  )
                )(
                  <Input
                    addonBefore={<LegacyIcon type="form" />}
                    style={{ maxWidth: 220 }}
                    placeholder={buildFieldDescription(fieldLabels.name)}
                  />
                )}
              </FormItem>
              <FormItem label={fieldLabels.cityName}>
                <Input
                  disabled
                  addonBefore={<LegacyIcon type="environment" />}
                  style={{ maxWidth: 220 }}
                  value={metaData === null ? '' : metaData.cityName || ''}
                />
              </FormItem>
              <FormItem label={fieldLabels.email}>
                {getFieldDecorator(
                  'email',
                  refitFieldDecoratorOption(
                    metaData === null ? '' : metaData.email || '',
                    metaData === null ? '' : metaData.email || '',
                    '',
                    {
                      rules: [
                        {
                          required: false,
                          message: buildFieldDescription(fieldLabels.email),
                        },
                      ],
                    }
                  )
                )(
                  <Input
                    addonBefore={<LegacyIcon type="form" />}
                    placeholder={buildFieldDescription(fieldLabels.email)}
                  />
                )}
              </FormItem>
              <FormItem label={fieldLabels.phone}>
                {getFieldDecorator(
                  'phone',
                  refitFieldDecoratorOption(
                    metaData === null ? '' : metaData.phone || '',
                    metaData === null ? '' : metaData.phone || '',
                    '',
                    {
                      rules: [
                        {
                          required: false,
                          message: buildFieldDescription(fieldLabels.phone),
                        },
                      ],
                    }
                  )
                )(
                  <Input
                    addonBefore={<LegacyIcon type="form" />}
                    placeholder={buildFieldDescription(fieldLabels.phone)}
                  />
                )}
              </FormItem>
              <FormItem label={fieldLabels.description}>
                {getFieldDecorator(
                  'description',
                  refitFieldDecoratorOption(
                    metaData === null ? '' : metaData.description || '',
                    metaData === null ? '' : metaData.description || '',
                    '',
                    {
                      rules: [
                        {
                          required: false,
                          message: buildFieldDescription(fieldLabels.description),
                        },
                      ],
                    }
                  )
                )(
                  <Input.TextArea
                    rows={4}
                    placeholder={buildFieldDescription(fieldLabels.description)}
                  />
                )}
              </FormItem>
              {/* <FormItem label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.geographic-message' }, {}),
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.address' })}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                  },
                  { validator: validatorPhone },
                ],
              })(<PhoneView />)}
            </FormItem> */}
              <Button
                type="primary"
                icon={<LegacyIcon type="save" />}
                onClick={this.validate}
                loading={dataLoading || processing || !loadSuccess}
                disabled={dataLoading || processing || !loadSuccess}
              >
                更新基本信息
              </Button>
            </Form>
          </Spin>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={metaData === null ? '/user.png' : metaData.avatar || '/user.png'} />
        </div>
      </div>
    );
  }
}

export default BaseView;
