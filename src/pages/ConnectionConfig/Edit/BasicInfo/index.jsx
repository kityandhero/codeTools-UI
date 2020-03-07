import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Row, Col, Spin, Switch, BackTop, notification, Affix } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
} from '../../../../utils/tools';
import accessWayCollection from '../../../../customConfig/accessWayCollection';
import { constants } from '../../../../customConfig/config';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData, connectionType } from '../../Common/data';

import styles from './index.less';

@connect(({ connectionConfig, global, loading }) => ({
  connectionConfig,
  global,
  loading: loading.models.connectionConfig,
}))
class Index extends TabPageBase {
  componentAuthority = accessWayCollection.connectionConfig.get;

  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'connectionConfig/get',
        submitApiPath: 'connectionConfig/updateBasicInfo',
        connectionConfigId: null,
        selectConnectionType: connectionType.TCP_IP,
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

  getTargetForm = () => {
    return this.formRef.current;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    values[fieldData.connectionConfigId.name] =
      metaData === null ? '' : metaData.connectionConfigId || '';
    values[fieldData.name.name] = metaData === null ? '' : metaData.name || '';
    values[fieldData.connectionType.name] = metaData === null ? '' : metaData.connectionType || '';
    values[fieldData.databaseType.name] = metaData === null ? '' : metaData.databaseType || '';
    values[fieldData.host.name] = metaData === null ? '' : metaData.host || '';
    values[fieldData.port.name] = metaData === null ? '' : metaData.port || '';
    values[fieldData.userName.name] = metaData === null ? '' : metaData.userName || '';
    values[fieldData.password.name] = metaData === null ? '' : metaData.password || '';
    values[fieldData.schema.name] = metaData === null ? '' : metaData.schema || '';
    values[fieldData.encoding.name] = metaData === null ? '' : metaData.encoding || '';
    values[fieldData.sshHost.name] = metaData === null ? '' : metaData.sshHost || '';
    values[fieldData.sshPort.name] = metaData === null ? '' : metaData.sshPort || '';
    values[fieldData.localPort.name] = metaData === null ? '' : metaData.localPort || '';
    values[fieldData.remotePort.name] = metaData === null ? '' : metaData.remotePort || '';
    values[fieldData.sshUser.name] = metaData === null ? '' : metaData.sshUser || '';
    values[fieldData.sshPassword.name] = metaData === null ? '' : metaData.sshPassword || '';
    values[fieldData.description.name] = metaData === null ? '' : metaData.description || '';
    values[constants.createTime.name] =
      metaData === null ? '' : formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
    values[constants.updateTime.name] =
      metaData === null ? '' : formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';

    const form = this.getTargetForm();

    form.setFieldsValue(values);

    this.setState({
      selectConnectionType:
        metaData === null
          ? connectionType.TCP_IP
          : metaData.connectionType || connectionType.TCP_IP,
    });
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { connectionConfigId } = this.state;

    d.connectionConfigId = connectionConfigId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  formContent = () => {
    const { dataLoading, processing, selectConnectionType } = this.state;

    return (
      <>
        <div className={styles.containorBox}>
          <Form ref={this.formRef} layout="vertical">
            <Card
              title="基本信息"
              className={styles.card}
              bordered={false}
              extra={
                <Affix offsetTop={20}>
                  <>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      disabled={dataLoading || processing}
                      onClick={this.validate}
                      loading={processing}
                    >
                      保存
                    </Button>
                  </>
                </Affix>
              }
            >
              <Spin spinning={dataLoading || processing}>
                <Row gutter={24}>
                  <Col lg={18} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.name.label,
                      fieldData.name.name,
                      true,
                      buildFieldHelper(fieldData.name.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormDatabaseDatabaseTypeSelectFormItem()}
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={18} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.host.label,
                      fieldData.host.name,
                      true,
                      buildFieldHelper(fieldData.host.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.port.label,
                      fieldData.port.name,
                      true,
                      buildFieldHelper(fieldData.port.helper),
                    )}
                  </Col>
                </Row>
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
                    {this.renderFormPasswordFormItem(
                      fieldData.password.label,
                      fieldData.password.name,
                      true,
                      buildFieldHelper(fieldData.password.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.schema.label,
                      fieldData.schema.name,
                      true,
                      buildFieldHelper(fieldData.schema.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormDatabaseEncodingSelectFormItem()}
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
                    onChange={o => {
                      this.onConnectionTypeChange(o);
                    }}
                  />
                </>
              }
            >
              <Spin spinning={dataLoading || processing}>
                {selectConnectionType === connectionType.SSH ? (
                  <>
                    <Row gutter={24}>
                      <Col lg={6} md={12} sm={24} xs={24}>
                        {this.renderFormInputFormItem(
                          fieldData.sshHost.label,
                          fieldData.sshHost.name,
                          true,
                          buildFieldHelper(fieldData.sshHost.helper),
                        )}
                      </Col>
                      <Col lg={6} md={12} sm={24} xs={24}>
                        {this.renderFormInputNumberFormItem(
                          fieldData.sshPort.label,
                          fieldData.sshPort.name,
                          true,
                          buildFieldHelper(fieldData.sshPort.helper),
                        )}
                      </Col>
                      <Col lg={6} md={12} sm={24} xs={24}>
                        {this.renderFormInputNumberFormItem(
                          fieldData.localPort.label,
                          fieldData.localPort.name,
                          true,
                          buildFieldHelper(fieldData.localPort.helper),
                        )}
                      </Col>
                      <Col lg={6} md={12} sm={24} xs={24}>
                        {this.renderFormInputNumberFormItem(
                          fieldData.remotePort.label,
                          fieldData.remotePort.name,
                          true,
                          buildFieldHelper(fieldData.remotePort.helper),
                        )}
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col lg={6} md={12} sm={24} xs={24}>
                        {this.renderFormInputFormItem(
                          fieldData.sshUser.label,
                          fieldData.sshUser.name,
                          true,
                          buildFieldHelper(fieldData.sshUser.helper),
                        )}
                      </Col>
                      <Col lg={6} md={12} sm={24} xs={24}>
                        {this.renderFormPasswordFormItem(
                          fieldData.sshPassword.label,
                          fieldData.sshPassword.name,
                          true,
                          buildFieldHelper(fieldData.sshPassword.helper),
                        )}
                      </Col>
                    </Row>
                  </>
                ) : null}
              </Spin>
            </Card>

            <Card title="描述信息" className={styles.card} bordered={false}>
              <Spin spinning={dataLoading || processing}>
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
              <Spin spinning={dataLoading || processing}>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFromCreateTimeField()}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFromUpdateTimeField()}
                  </Col>
                </Row>
              </Spin>
            </Card>
          </Form>
        </div>
        <BackTop />
      </>
    );
  };
}

export default Index;
