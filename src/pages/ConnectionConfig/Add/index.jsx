import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Button, Form, Row, Col, Switch, Spin, notification, Affix } from 'antd';

import { buildFieldHelper } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import AddFormBase from '../../../customComponents/Framework/CustomForm/AddFormBase';

import { fieldData, connectionType } from '../Common/data';
import styles from './index.less';

@connect(({ connectionConfig, global, loading }) => ({
  connectionConfig,
  global,
  loading: loading.models.connectionConfig,
}))
@Form.create()
class Index extends AddFormBase {
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

  getApiData = props => {
    const {
      connectionConfig: { data },
    } = props;

    return data;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { selectConnectionType } = this.state;

    d.connectionType = selectConnectionType;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
    const { dispatch } = this.props;

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行下一步操作。',
      });
    });

    const { connectionId } = singleData;

    const location = {
      pathname: `/connectionConfig/edit/load/${connectionId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
  };

  onConnectionTypeChange = o => {
    this.setState({ selectConnectionType: o ? connectionType.SSH : connectionType.TCP_IP });
  };

  formContent = () => {
    const { processing, selectConnectionType } = this.state;

    return (
      <div className={styles.containorBox}>
        <Card
          title="基本信息"
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              <>
                <Button
                  type="primary"
                  icon="save"
                  disabled={processing}
                  onClick={this.validate}
                  loading={processing}
                >
                  保存
                </Button>
              </>
            </Affix>
          }
        >
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={18} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.name,
                    'name',
                    '',
                    true,
                    buildFieldHelper(fieldData.nameHelper)
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormDatabaseTypeSelectFormItem()}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={18} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.host,
                    'host',
                    '',
                    true,
                    buildFieldHelper(fieldData.hostHelper)
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormInputNumberFormItem(
                    fieldData.port,
                    'port',
                    '',
                    true,
                    buildFieldHelper(fieldData.portHelper)
                  )}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.userName,
                    'userName',
                    '',
                    true,
                    buildFieldHelper(fieldData.userNameHelper)
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormPasswordFormItem(
                    fieldData.password,
                    'password',
                    '',
                    true,
                    buildFieldHelper(fieldData.passwordHelper)
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.schema,
                    'schema',
                    '',
                    true,
                    buildFieldHelper(fieldData.schemaHelper)
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormDatabaseEncodingSelectFormItem()}
                </Col>
              </Row>
            </Form>
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
          <Spin spinning={processing}>
            {selectConnectionType === connectionType.SSH ? (
              <Row layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.sshHost,
                      'sshHost',
                      '',
                      true,
                      buildFieldHelper(fieldData.sshHostHelper)
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.sshPort,
                      'sshPort',
                      '',
                      true,
                      buildFieldHelper(fieldData.sshPortHelper)
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.localPort,
                      'localPort',
                      '',
                      true,
                      buildFieldHelper(fieldData.localPortHelper)
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.remotePort,
                      'remotePort',
                      '',
                      true,
                      buildFieldHelper(fieldData.remotePortHelper)
                    )}
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.sshUser,
                      'sshUser',
                      '',
                      true,
                      buildFieldHelper(fieldData.sshUserHelper)
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormPasswordFormItem(
                      fieldData.sshPassword,
                      'sshPassword',
                      '',
                      true,
                      buildFieldHelper(fieldData.sshPasswordHelper)
                    )}
                  </Col>
                </Row>
              </Row>
            ) : null}
          </Spin>
        </Card>

        <Card title="其他信息" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFromCreateTimeField()}
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  };
}

export default Index;
