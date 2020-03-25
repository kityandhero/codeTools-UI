import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Row, Col, Spin, Divider, BackTop, notification, Affix } from 'antd';
import { SaveOutlined, ReloadOutlined, FormOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
  recordLog,
} from '../../../../utils/tools';
import { zeroInt } from '../../../../utils/constants';
import accessWayCollection from '../../../../customConfig/accessWayCollection';
import { constants } from '../../../../customConfig/config';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../../DataBaseGeneratorConfig/Common/data';

import styles from './index.less';

@connect(({ dataBaseGeneratorConfig, global, loading }) => ({
  dataBaseGeneratorConfig,
  global,
  loading: loading.models.dataBaseGeneratorConfig,
}))
class Index extends TabPageBase {
  componentAuthority = accessWayCollection.dataBaseGeneratorConfig.get;

  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'dataBaseGeneratorConfig/getByConnectionId',
        submitApiPath: 'dataBaseGeneratorConfig/set',
        connectionConfigId: null,
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

  getApiData = props => {
    const {
      dataBaseGeneratorConfig: { data },
    } = props;

    return data;
  };

  getTargetForm = () => {
    return this.formRef.current;
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { connectionConfigId } = this.state;

    d.connectionConfigId = connectionConfigId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.dataBaseGeneratorConfigId.name] =
        metaData.dataBaseGeneratorConfigId || zeroInt;
      values[fieldData.connectionConfigId.name] = metaData.connectionConfigId || zeroInt;

      values[fieldData.connectorJarPath.name] = metaData.connectorJarPath || '';
      values[fieldData.projectFolder.name] = metaData.projectFolder || '';
      values[fieldData.modelPackage.name] = metaData.modelPackage || '';
      values[fieldData.modelTargetFolder.name] = metaData.modelTargetFolder || '';
      values[fieldData.daoPackage.name] = metaData.daoPackage || '';
      values[fieldData.daoTargetFolder.name] = metaData.daoTargetFolder || '';
      values[fieldData.mappingXMLPackage.name] = metaData.mappingXMLPackage || '';
      values[fieldData.mappingXMLTargetFolder.name] = metaData.mappingXMLTargetFolder || '';
      values[fieldData.generateKeys.name] = metaData.generateKeys || '';
      values[fieldData.encoding.name] = metaData.encoding || '';

      values[fieldData.offsetLimit.name] = `${metaData.offsetLimit || zeroInt}`;
      values[fieldData.needToStringHashCodeEquals.name] = `${metaData.needToStringHashCodeEquals ||
        zeroInt}`;
      values[fieldData.needForUpdate.name] = `${metaData.needForUpdate || zeroInt}`;
      values[fieldData.annotationDAO.name] = `${metaData.annotationDAO || zeroInt}`;
      values[fieldData.annotation.name] = `${metaData.annotation || zeroInt}`;
      values[fieldData.useActualColumnNames.name] = `${metaData.useActualColumnNames || zeroInt}`;
      values[fieldData.useExample.name] = `${metaData.useExample || zeroInt}`;
      values[fieldData.useTableNameAlias.name] = `${metaData.useTableNameAlias || zeroInt}`;
      values[fieldData.useDAOExtendStyle.name] = `${metaData.useDAOExtendStyle || zeroInt}`;
      values[fieldData.useSchemaPrefix.name] = `${metaData.useSchemaPrefix || zeroInt}`;
      values[fieldData.jsr310Support.name] = `${metaData.jsr310Support || zeroInt}`;
      values[fieldData.overrideXML.name] = `${metaData.overrideXML || zeroInt}`;

      values[constants.createTime.name] =
        formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
      values[constants.updateTime.name] =
        formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';

      const form = this.getTargetForm();

      form.setFieldsValue(values);

      recordLog(values);
    }
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { metaData } = this.state;
    const { dataBaseGeneratorConfigId, connectionConfigId } = metaData;

    d.connectionConfigId = connectionConfigId;
    d.dataBaseGeneratorConfigId = dataBaseGeneratorConfigId || '';

    return d;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { dataBaseGeneratorConfigId } = this.state;

    d.dataBaseGeneratorConfigId = dataBaseGeneratorConfigId;

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

  formContent = () => {
    const { loadSuccess, dataLoading, processing } = this.state;

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
                  <div>
                    <Button
                      icon={<ReloadOutlined />}
                      disabled={dataLoading || processing || !loadSuccess}
                      onClick={this.reloadData}
                      loading={processing}
                    >
                      刷新
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      disabled={dataLoading || processing}
                      onClick={this.validate}
                      loading={processing}
                    >
                      保存
                    </Button>
                  </div>
                </Affix>
              }
            >
              <Spin spinning={dataLoading || processing}>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.connectionConfigId.label,
                      fieldData.connectionConfigId.name,
                      true,
                      buildFieldHelper(fieldData.connectionConfigId.helper),
                      <FormOutlined />,
                      {},
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.connectorJarPath.label,
                      fieldData.connectorJarPath.name,
                      true,
                      buildFieldHelper(fieldData.connectorJarPath.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.projectFolder.label,
                      fieldData.projectFolder.name,
                      true,
                      buildFieldHelper(fieldData.projectFolder.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.modelPackage.label,
                      fieldData.modelPackage.name,
                      true,
                      buildFieldHelper(fieldData.modelPackage.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.modelTargetFolder.label,
                      fieldData.modelTargetFolder.name,
                      true,
                      buildFieldHelper(fieldData.modelTargetFolder.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.daoPackage.label,
                      fieldData.daoPackage.name,
                      true,
                      buildFieldHelper(fieldData.daoPackage.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.daoTargetFolder.label,
                      fieldData.daoTargetFolder.name,
                      true,
                      buildFieldHelper(fieldData.daoTargetFolder.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.mappingXMLPackage.label,
                      fieldData.mappingXMLPackage.name,
                      true,
                      buildFieldHelper(fieldData.mappingXMLPackage.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.mappingXMLTargetFolder.label,
                      fieldData.mappingXMLTargetFolder.name,
                      true,
                      buildFieldHelper(fieldData.mappingXMLTargetFolder.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.generateKeys.label,
                      fieldData.generateKeys.name,
                      true,
                      buildFieldHelper(fieldData.generateKeys.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormInputFormItem(
                      fieldData.encoding.label,
                      fieldData.encoding.name,
                      true,
                      buildFieldHelper(fieldData.encoding.helper),
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.offsetLimit.label,
                      fieldData.offsetLimit.name,
                      fieldData.offsetLimit.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.needToStringHashCodeEquals.label,
                      fieldData.needToStringHashCodeEquals.name,
                      fieldData.needToStringHashCodeEquals.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.needForUpdate.label,
                      fieldData.needForUpdate.name,
                      fieldData.needForUpdate.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.annotationDAO.label,
                      fieldData.annotationDAO.name,
                      fieldData.annotationDAO.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.annotation.label,
                      fieldData.annotation.name,
                      fieldData.annotation.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.useActualColumnNames.label,
                      fieldData.useActualColumnNames.name,
                      fieldData.useActualColumnNames.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.useExample.label,
                      fieldData.useExample.name,
                      fieldData.useExample.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.useTableNameAlias.label,
                      fieldData.useTableNameAlias.name,
                      fieldData.useTableNameAlias.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.useDAOExtendStyle.label,
                      fieldData.useDAOExtendStyle.name,
                      fieldData.useDAOExtendStyle.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.jsr310Support.label,
                      fieldData.jsr310Support.name,
                      fieldData.jsr310Support.helper,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {this.renderFormWhetherSelectFormItem(
                      fieldData.overrideXML.label,
                      fieldData.overrideXML.name,
                      fieldData.overrideXML.helper,
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