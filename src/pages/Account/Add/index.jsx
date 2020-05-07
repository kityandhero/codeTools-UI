import React from 'react';
import { connect, history } from 'umi';
import { Affix, Row, Col, Card, Spin, notification } from 'antd';

import accessWayCollection from '@/customConfig/accessWayCollection';
import BaseAddForm from '@/customComponents/Framework/DataForm/BaseAddForm';

import { fieldData } from '../Common/data';

import styles from './index.less';

@connect(({ account, global, loading }) => ({
  account,
  global,
  loading: loading.models.account,
}))
class Add extends BaseAddForm {
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
                {this.renderFormInput(
                  fieldData.userName.label,
                  fieldData.userName.name,
                  true,
                  fieldData.userName.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInput(
                  fieldData.name.label,
                  fieldData.name.name,
                  true,
                  fieldData.name.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormPassword(
                  fieldData.password.label,
                  fieldData.password.name,
                  true,
                  fieldData.password.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormPassword(
                  fieldData.rePassword.label,
                  fieldData.rePassword.name,
                  true,
                  fieldData.rePassword.helper,
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card title="描述信息" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Row gutter={24}>
              <Col lg={24} md={24} sm={24} xs={24}>
                {this.renderFormTextArea(
                  fieldData.description.label,
                  fieldData.description.name,
                  false,
                  fieldData.description.helper,
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
