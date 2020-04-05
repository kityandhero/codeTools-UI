import React from 'react';
import { connect } from 'umi';
import { Card, Row, Col, Spin, Divider, notification, Affix } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
} from '@/utils/tools';
import { zeroInt } from '@/utils/constants';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../../DatabaseGeneratorConfig/Common/data';

import styles from './index.less';

@connect(({ databaseGeneratorConfig, global, loading }) => ({
  databaseGeneratorConfig,
  global,
  loading: loading.models.databaseGeneratorConfig,
}))
class Index extends TabPageBase {
  componentAuthority = accessWayCollection.databaseGeneratorConfig.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'databaseGeneratorConfig/getByConnectionId',
        submitApiPath: 'databaseGeneratorConfig/set',
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

  buildInitialValues = (metaData) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.databaseGeneratorConfigId.name] =
        metaData.databaseGeneratorConfigId || zeroInt;
      values[fieldData.connectionConfigId.name] = metaData.connectionConfigId || zeroInt;

      values[fieldData.connectorJarFile.name] = metaData.connectorJarFile || '';
      values[fieldData.projectFolder.name] = metaData.projectFolder || '';
      values[fieldData.modelPackage.name] = metaData.modelPackage || '';
      values[fieldData.modelTargetFolder.name] = metaData.modelTargetFolder || '';
      values[fieldData.daoPackage.name] = metaData.daoPackage || '';
      values[fieldData.daoTargetFolder.name] = metaData.daoTargetFolder || '';
      values[fieldData.mappingXmlPackage.name] = metaData.mappingXmlPackage || '';
      values[fieldData.mappingXmlTargetFolder.name] = metaData.mappingXmlTargetFolder || '';
      values[fieldData.encoding.name] = `${metaData.encoding || zeroInt}`;

      values[fieldData.offsetLimit.name] = `${metaData.offsetLimit || zeroInt}`;
      values[fieldData.needToStringHashCodeEquals.name] = `${
        metaData.needToStringHashCodeEquals || zeroInt
      }`;
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
    }

    return values;
  };

  getApiData = (props) => {
    const {
      databaseGeneratorConfig: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { connectionConfigId } = this.state;

    d.connectionConfigId = connectionConfigId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { metaData } = this.state;
    const { databaseGeneratorConfigId, connectionConfigId } = metaData;

    d.connectionConfigId = connectionConfigId;
    d.databaseGeneratorConfigId = databaseGeneratorConfigId || '';

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extraData, responseOriginalData, submitData) => {
    this.setState({ metaData: singleData });

    this.fillForm(singleData);

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  formContent = () => {
    const { dataLoading, processing } = this.state;

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
                  fieldData.connectorJarFile.label,
                  fieldData.connectorJarFile.name,
                  true,
                  buildFieldHelper(fieldData.connectorJarFile.helper),
                  <FormOutlined />,
                  {},
                  false,
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
                  fieldData.mappingXmlPackage.label,
                  fieldData.mappingXmlPackage.name,
                  true,
                  buildFieldHelper(fieldData.mappingXmlPackage.helper),
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.mappingXmlTargetFolder.label,
                  fieldData.mappingXmlTargetFolder.name,
                  true,
                  buildFieldHelper(fieldData.mappingXmlTargetFolder.helper),
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormFileEncodingSelectFormItem()}
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
      </>
    );
  };
}

export default Index;
