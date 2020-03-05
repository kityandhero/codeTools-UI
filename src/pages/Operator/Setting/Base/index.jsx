import React from 'react';
import { Form, Upload, Button, Spin, notification } from 'antd';
import { connect } from 'dva';
import { UploadOutlined, SaveOutlined, FormOutlined } from '@ant-design/icons';

import { buildFieldHelper } from '../../../../utils/tools';
import UpdateForm from '../../../../customComponents/Framework/CustomForm/UpdateForm';

import styles from './index.less';
// import GeographicView from '../Geographic';
// import PhoneView from '../Phone';
// import { getTimeDistance } from '@/utils/utils';

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon={<UploadOutlined />}>更换头像</Button>
      </div>
    </Upload>
  </>
);

const fieldData = {
  userName: '登录名',
  userNameHelper: '登录名不可修改',
  name: '姓名',
  nameHelper: '设置账户姓名',
  email: '邮箱',
  emailHelper: '设置账户邮箱',
  phone: '联系方式',
  phoneHelper: '设置联系方式',
  cityCode: '地区代码',
  cityCodeHelper: '设置地区代码',
  cityName: '所属地区',
  cityNameHelper: '设置所属地区',
  description: '简介描述',
  descriptionHelper: '设置账户得简介描述',
};

@connect(({ operator, global, loading }) => ({
  operator,
  global,
  loading: loading.models.operator,
}))
class BaseView extends UpdateForm {
  formRef = React.createRef();

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

  getTargetForm = () => {
    return this.formRef.current;
  };

  getApiData = props => {
    const {
      operator: { data },
    } = props;

    return data;
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

  getViewDom = ref => {
    this.view = ref;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {
      userName: metaData === null ? '' : metaData.userName || '',
      name: metaData === null ? '' : metaData.name || '',
      cityName: metaData === null ? '' : metaData.cityName || '',
      cityCode: metaData === null ? 0 : metaData.cityCode || 0,
      email: metaData === null ? '' : metaData.email || '',
      phone: metaData === null ? '' : metaData.phone || '',
      description: metaData === null ? '' : metaData.description || '',
    };

    const form = this.getTargetForm();

    form.setFieldsValue(values);
  };

  render() {
    const { metaData, dataLoading, processing, loadSuccess } = this.state;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Spin spinning={dataLoading || processing}>
            <Form ref={this.formRef} layout="vertical">
              {this.renderFormInputFormItem(
                fieldData.userName,
                'userName',
                true,
                buildFieldHelper(fieldData.userNameHelper),
                <FormOutlined />,
                null,
                false,
              )}
              {this.renderFormInputFormItem(
                fieldData.name,
                'name',
                true,
                buildFieldHelper(fieldData.nameHelper),
                <FormOutlined />,
              )}
              {/* {this.renderFormInputFormItem(
                fieldData.cityName,
                'cityName',
                true,
                buildFieldHelper(fieldData.cityNameHelper),
                <FormOutlined />,
              )} */}
              {this.renderFormInputFormItem(
                fieldData.email,
                'email',
                true,
                buildFieldHelper(fieldData.emailHelper),
                <FormOutlined />,
              )}
              {this.renderFormInputFormItem(
                fieldData.phone,
                'phone',
                true,
                buildFieldHelper(fieldData.phoneHelper),
                <FormOutlined />,
              )}
              {this.renderFormTextAreaFormItem(
                fieldData.description,
                'description',
                false,
                buildFieldHelper(fieldData.descriptionHelper),
              )}
              <Button
                type="primary"
                icon={<SaveOutlined />}
                disabled={dataLoading || processing || !loadSuccess}
                onClick={e => {
                  this.validate(e);
                }}
                loading={processing}
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
