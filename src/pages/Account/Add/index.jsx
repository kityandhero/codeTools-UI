import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Affix, Row, Col, Card, Spin, notification } from 'antd';

import { buildFieldHelper } from '@/utils/tools';
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

    return (
      <>
        <Card
          title="基本信息"
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              <div>{this.renderSaveButton()}</div>
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
      </>
    );
  };
}

export default Add;
