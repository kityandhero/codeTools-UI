import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Card, Button, Row, Col, Switch, Spin, notification, Affix } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import { buildFieldHelper, formatDatetime } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import { constants } from '../../../customConfig/config';
import AddFormBase from '../../../customComponents/Framework/CustomForm/AddFormBase';

import { fieldData, connectionType } from '../Common/data';
import styles from './index.less';

@connect(({ connectionConfig, global, loading }) => ({
  connectionConfig,
  global,
  loading: loading.models.connectionConfig,
}))
class Index extends AddFormBase {
  componentAuthority = accessWayCollection.connectionConfig.add;

  formRef = React.createRef();

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
    const { dispatch } = this.props;

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行下一步操作。',
      });
    });

    const { connectionConfigId } = singleData;

    const location = {
      pathname: `/connectionConfig/edit/load/${connectionConfigId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
  };

  onConnectionTypeChange = o => {
    this.setState({ selectConnectionType: o ? connectionType.SSH : connectionType.TCP_IP });
  };

  getTargetForm = () => {
    return this.formRef.current;
  };

  formContent = () => {
    const { processing, selectConnectionType } = this.state;

    const initialValues = {};

    initialValues[constants.createTime.name] = formatDatetime(new Date(), 'YYYY-MM-DD HH:mm');

    return (
      <div className={styles.containorBox}>
        <Form ref={this.formRef} initialValues={initialValues} layout="vertical">
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
                    disabled={processing}
                    onClick={e => {
                      this.validate(e);
                    }}
                    loading={processing}
                  >
                    保存
                  </Button>
                </>
              </Affix>
            }
          >
            <Spin spinning={processing}>
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
            <Spin spinning={processing}>
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

export default Index;
