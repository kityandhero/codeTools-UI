import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Affix, Form, Row, Col, Card, Button, Spin, notification } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import { buildFieldHelper, formatDatetime } from '@/utils/tools';
import { formNameCollection } from '@/utils/constants';
import accessWayCollection from '@/customConfig/accessWayCollection';
import AddFormBase from '@/customComponents/Framework/CustomForm/AddFormBase';

import { fieldData } from '../Common/data';

import styles from './index.less';

@connect(({ account, global, loading }) => ({
  account,
  global,
  loading: loading.models.account,
}))
class Add extends AddFormBase {
  componentAuthority = accessWayCollection.account.add;

  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '增加账户',
        submitApiPath: 'account/addBasicInfo',
      },
    };
  }

  getTargetForm = () => {
    return this.formRef.current;
  };

  getApiData = (props) => {
    const {
      account: { data },
    } = props;

    return data;
  };

  afterSubmitSuccess = (data) => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行下一步操作。',
      });
    });

    const {
      data: { accountId },
    } = data;

    const location = {
      pathname: `/account/account/edit/load/${accountId}/1/basicInfo`,
    };

    history.replace(location);
  };

  formContent = () => {
    const { processing } = this.state;

    const initialValues = {};

    initialValues[formNameCollection.createTime] = formatDatetime(new Date(), 'YYYY-MM-DD HH:mm');

    return (
      <div className={styles.containorBox}>
        <Form ref={this.formRef} initialValues={initialValues} layout="vertical">
          <Card
            title="基本信息"
            className={styles.card}
            bordered={false}
            extra={
              <Affix offsetTop={20}>
                <div>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    disabled={processing}
                    onClick={(e) => {
                      this.validate(e);
                    }}
                    loading={processing}
                  >
                    保存
                  </Button>
                </div>
              </Affix>
            }
          >
            <Spin spinning={processing}>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFormInputFormItem(
                    fieldData.userName.label,
                    fieldData.userName.name,
                    true,
                    buildFieldHelper(fieldData.userName.helper),
                  )}
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFormInputFormItem(
                    fieldData.name.label,
                    fieldData.name.name,
                    true,
                    buildFieldHelper(fieldData.name.helper),
                  )}
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFormPasswordFormItem(
                    fieldData.password.label,
                    fieldData.password.name,
                    true,
                    buildFieldHelper(fieldData.password.helper),
                  )}
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFormPasswordFormItem(
                    fieldData.rePassword.label,
                    fieldData.rePassword.name,
                    true,
                    buildFieldHelper(fieldData.rePassword.helper),
                  )}
                </Col>
              </Row>
            </Spin>
          </Card>

          <Card title="描述信息" className={styles.card} bordered={false}>
            <Spin spinning={processing}>
              <Row gutter={24}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  {this.renderFormTextAreaFormItem(
                    fieldData.description.label,
                    fieldData.description.name,
                    false,
                    buildFieldHelper(fieldData.description.helper),
                  )}
                </Col>
              </Row>
            </Spin>
          </Card>

          <Card title="其他信息" className={styles.card} bordered={false}>
            <Spin spinning={processing}>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24} xs={24}>
                  {this.renderFromCreateTimeField()}
                </Col>
              </Row>
            </Spin>
          </Card>
        </Form>
      </div>
    );
  };
}

export default Add;
