import React from 'react';
import { connect, history } from 'umi';
import { Card, Row, Col, Switch, Spin, notification, Affix } from 'antd';

import {
  getDerivedStateFromPropsForUrlParams,
  formatDatetime,
  checkDevelopment,
} from '@/utils/tools';
import { formNameCollection } from '@/customConfig/config';
import accessWayCollection from '@/customConfig/accessWayCollection';
import BaseAddForm from '@/customComponents/Framework/DataForm/BaseAddForm';

import { fieldData, connectionType } from '../Common/data';

import styles from './index.less';

@connect(({ connectionConfig, global, loading }) => ({
  connectionConfig,
  global,
  loading: loading.models.connectionConfig,
}))
class Add extends BaseAddForm {
  componentAuthority = accessWayCollection.connectionConfig.add;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '增加数据连接',
        submitApiPath: 'connectionConfig/addBasicInfo',
        selectConnectionType: connectionType.TCP_IP,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  buildInitialValues = () => {
    const initialValues = {};

    if (checkDevelopment()) {
      // 用于测试
      initialValues[fieldData.name.name] = 'test';
      initialValues[fieldData.databaseType.name] = `${100}`;
      initialValues[fieldData.host.name] = '127.0.0.1';
      initialValues[fieldData.port.name] = 3306;
      initialValues[fieldData.userName.name] = 'root';
      initialValues[fieldData.password.name] = 'root';
      initialValues[fieldData.schema.name] = 'test';
      initialValues[fieldData.encoding.name] = `${100}`;
    } else {
      initialValues[fieldData.port.name] = 0;
    }

    initialValues[formNameCollection.createTime.name] = formatDatetime(
      new Date(),
      'YYYY-MM-DD HH:mm',
    );

    return initialValues;
  };

  getApiData = (props) => {
    const {
      connectionConfig: { data },
    } = props;

    return data;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { selectConnectionType } = this.state;

    d.connectionType = selectConnectionType;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extraData, responseOriginalData, submitData) => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行下一步操作。',
      });
    });

    const { connectionConfigId } = singleData;

    const location = {
      pathname: `/connectionConfig/edit/load/${connectionConfigId}/key/basicInfo`,
    };

    history.replace(location);
  };

  onConnectionTypeChange = (o) => {
    this.setState({ selectConnectionType: o ? connectionType.SSH : connectionType.TCP_IP });
  };

  formContent = () => {
    const { processing, selectConnectionType } = this.state;

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
              <Col lg={12} md={12} sm={24} xs={24}>
                {this.renderFormInput(
                  fieldData.name.label,
                  fieldData.name.name,
                  true,
                  fieldData.name.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDatabaseDatabaseTypeSelectSelect()}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInputNumber(
                  fieldData.port.label,
                  fieldData.port.name,
                  false,
                  fieldData.port.helper,
                )}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={18} md={12} sm={24} xs={24}>
                {this.renderFormInput(
                  fieldData.host.label,
                  fieldData.host.name,
                  true,
                  fieldData.host.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInput(
                  fieldData.schema.label,
                  fieldData.schema.name,
                  true,
                  fieldData.schema.helper,
                )}
              </Col>
            </Row>
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
                {this.renderFormPassword(
                  fieldData.password.label,
                  fieldData.password.name,
                  true,
                  fieldData.password.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormDatabaseEncodingSelect()}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card
          title="SSH信息"
          className={styles.card}
          bodyStyle={selectConnectionType !== connectionType.SSH ? { padding: 0 } : {}}
          bordered={false}
          extra={
            <>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                defaultChecked={selectConnectionType === connectionType.SSH}
                onChange={(o) => {
                  this.onConnectionTypeChange(o);
                }}
              />
            </>
          }
        >
          <Spin spinning={processing}>
            {selectConnectionType === connectionType.SSH ? (
              <>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInput(
                      fieldData.sshHost.label,
                      fieldData.sshHost.name,
                      true,
                      fieldData.sshHost.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputNumber(
                      fieldData.sshPort.label,
                      fieldData.sshPort.name,
                      true,
                      fieldData.sshPort.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputNumber(
                      fieldData.localPort.label,
                      fieldData.localPort.name,
                      true,
                      fieldData.localPort.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputNumber(
                      fieldData.remotePort.label,
                      fieldData.remotePort.name,
                      true,
                      fieldData.remotePort.helper,
                    )}
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInput(
                      fieldData.sshUser.label,
                      fieldData.sshUser.name,
                      true,
                      fieldData.sshUser.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormPassword(
                      fieldData.sshPassword.label,
                      fieldData.sshPassword.name,
                      true,
                      fieldData.sshPassword.helper,
                    )}
                  </Col>
                </Row>
              </>
            ) : null}
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
