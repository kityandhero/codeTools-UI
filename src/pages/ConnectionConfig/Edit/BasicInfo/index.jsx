import React from 'react';
import { connect } from 'umi';
import { Card, Row, Col, Spin, Switch, Divider, notification, Affix } from 'antd';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';

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

  buildInitialValues = (metaData) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.connectionConfigId.name] = metaData.connectionConfigId || '';
      values[fieldData.name.name] = metaData.name || '';
      values[fieldData.connectionType.name] = `${metaData.connectionType || ''}`;
      values[fieldData.databaseType.name] = `${metaData.databaseType || ''}`;
      values[fieldData.host.name] = metaData.host || '';
      values[fieldData.port.name] = metaData.port || '';
      values[fieldData.userName.name] = metaData.userName || '';
      values[fieldData.password.name] = metaData.password || '';
      values[fieldData.schema.name] = metaData.schema || '';
      values[fieldData.encoding.name] = `${metaData.encoding || ''}`;
      values[fieldData.sshHost.name] = metaData.sshHost || '';
      values[fieldData.sshPort.name] = metaData.sshPort || '';
      values[fieldData.localPort.name] = metaData.localPort || '';
      values[fieldData.remotePort.name] = metaData.remotePort || '';
      values[fieldData.sshUser.name] = metaData.sshUser || '';
      values[fieldData.sshPassword.name] = metaData.sshPassword || '';
      values[fieldData.description.name] = metaData.description || '';
      values[constants.createTime.name] =
        formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
      values[constants.updateTime.name] =
        formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';
    }

    return values;
  };

  afterSetFieldsValue = (metaData) => {
    this.setState({
      selectConnectionType:
        metaData === null
          ? connectionType.TCP_IP
          : metaData.connectionType || connectionType.TCP_IP,
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { connectionConfigId, metaData } = this.state;
    const { databaseGeneratorConfigId } = metaData;

    d.databaseGeneratorConfigId = databaseGeneratorConfigId;
    d.connectionConfigId = connectionConfigId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extraData, responseOriginalData, submitData) => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  onConnectionTypeChange = (o) => {
    this.setState({ selectConnectionType: o ? connectionType.SSH : connectionType.TCP_IP });
  };

  formContent = () => {
    const { dataLoading, processing, selectConnectionType } = this.state;

    return (
      <>
        <Card
          title={this.renderBasicInfoTitle()}
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              <div>
                {this.renderRefreshButton()}
                <Divider type="vertical" />
                {this.renderSaveButton()}
              </div>
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
                  fieldData.name.helper,
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
                  fieldData.host.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInputNumberFormItem(
                  fieldData.port.label,
                  fieldData.port.name,
                  true,
                  fieldData.port.helper,
                )}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.userName.label,
                  fieldData.userName.name,
                  true,
                  fieldData.userName.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormPasswordFormItem(
                  fieldData.password.label,
                  fieldData.password.name,
                  true,
                  fieldData.password.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.schema.label,
                  fieldData.schema.name,
                  true,
                  fieldData.schema.helper,
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
                onChange={(o) => {
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
                      fieldData.sshHost.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.sshPort.label,
                      fieldData.sshPort.name,
                      true,
                      fieldData.sshPort.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.localPort.label,
                      fieldData.localPort.name,
                      true,
                      fieldData.localPort.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.remotePort.label,
                      fieldData.remotePort.name,
                      true,
                      fieldData.remotePort.helper,
                    )}
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.sshUser.label,
                      fieldData.sshUser.name,
                      true,
                      fieldData.sshUser.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormPasswordFormItem(
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
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col lg={24} md={24} sm={24} xs={24}>
                {this.renderFormTextAreaFormItem(
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
      </>
    );
  };
}

export default Index;
