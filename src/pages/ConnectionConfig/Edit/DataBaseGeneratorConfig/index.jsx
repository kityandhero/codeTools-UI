import React from 'react';
import { connect } from 'umi';
import { Card, Row, Col, Spin, Button, Switch, Divider, notification, message, Affix } from 'antd';
import { FormOutlined, FolderOpenOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  getDerivedStateFromPropsForUrlParams,
  stringIsNullOrWhiteSpace,
  buildFieldHelper,
} from '@/utils/tools';
import { whetherNumber, whetherString } from '@/utils/constants';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../../DataBaseGeneratorConfig/Common/data';

import styles from './index.less';

@connect(({ databaseGeneratorConfig, tools, global, loading }) => ({
  databaseGeneratorConfig,
  tools,
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
        projectFolderValue: '',
        hasProjectFolder: whetherString.no,
        useModelFolder: whetherString.no,
        useDaoFolder: whetherString.no,
        useMappingXmlFolder: whetherString.no,
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
        metaData.databaseGeneratorConfigId || whetherNumber.no;
      values[fieldData.connectionConfigId.name] = metaData.connectionConfigId || whetherNumber.no;

      values[fieldData.connectorJarFile.name] = metaData.connectorJarFile || '';
      values[fieldData.projectFolder.name] = metaData.projectFolder || '';
      values[fieldData.modelPackage.name] = metaData.modelPackage || '';
      values[fieldData.modelTargetFolder.name] = metaData.modelTargetFolder || '';
      values[fieldData.daoPackage.name] = metaData.daoPackage || '';
      values[fieldData.daoTargetFolder.name] = metaData.daoTargetFolder || '';
      values[fieldData.mappingXmlPackage.name] = metaData.mappingXmlPackage || '';
      values[fieldData.mappingXmlTargetFolder.name] = metaData.mappingXmlTargetFolder || '';
      values[fieldData.encoding.name] = `${metaData.encoding || whetherNumber.no}`;

      values[fieldData.offsetLimit.name] = `${metaData.offsetLimit || whetherNumber.no}`;
      values[fieldData.needToStringHashCodeEquals.name] = `${
        metaData.needToStringHashCodeEquals || whetherNumber.no
      }`;
      values[fieldData.needForUpdate.name] = `${metaData.needForUpdate || whetherNumber.no}`;
      values[fieldData.annotationDAO.name] = `${metaData.annotationDAO || whetherNumber.no}`;
      values[fieldData.annotation.name] = `${metaData.annotation || whetherNumber.no}`;
      values[fieldData.useDAOExtendStyle.name] = `${
        metaData.useDAOExtendStyle || whetherNumber.no
      }`;
      values[fieldData.useSchemaPrefix.name] = `${metaData.useSchemaPrefix || whetherNumber.no}`;
      values[fieldData.jsr310Support.name] = `${metaData.jsr310Support || whetherNumber.no}`;
      values[fieldData.overrideXML.name] = `${metaData.overrideXML || whetherNumber.no}`;
      values[fieldData.autoDelimitKeywords.name] = `${
        metaData.autoDelimitKeywords || whetherNumber.no
      }`;
      values[fieldData.comment.name] = `${metaData.comment || whetherNumber.no}`;

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const { projectFolder, modelFolder, daoFolder, mappingXmlFolder } = metaData;

    this.setState({
      projectFolderValue: projectFolder || '',
      hasProjectFolder: stringIsNullOrWhiteSpace(projectFolder)
        ? whetherString.no
        : whetherString.yes,
      useModelFolder: stringIsNullOrWhiteSpace(modelFolder) ? whetherString.no : whetherString.yes,
      useDaoFolder: stringIsNullOrWhiteSpace(daoFolder) ? whetherString.no : whetherString.yes,
      useMappingXmlFolder: stringIsNullOrWhiteSpace(mappingXmlFolder)
        ? whetherString.no
        : whetherString.yes,
    });
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

  openProjectFolder = () => {
    const { dispatch } = this.props;
    const { projectFolderValue } = this.state;

    if (stringIsNullOrWhiteSpace(projectFolderValue || '')) {
      message.error('缺少文件夹信息');

      return;
    }

    dispatch({
      type: 'tools/openFolder',
      payload: {
        folder: projectFolderValue || '',
      },
    }).then(() => {
      const {
        tools: { data },
      } = this.props;

      const { dataSuccess } = data;

      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '打开项目文件夹成功',
          });
        });
      }
    });
  };

  onProjectFolderChange = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      projectFolderValue: value,
      hasProjectFolder: stringIsNullOrWhiteSpace(value) ? whetherString.no : whetherString.yes,
    });
  };

  onUseModelFolderChange = (e) => {
    this.setState({ useModelFolder: e ? whetherString.yes : whetherString.no });

    const values = {};

    values[fieldData.modelTargetFolder.name] = '';

    this.setFormFieldsValue(values);
  };

  onUseDaoFolderChange = (e) => {
    this.setState({ useDaoFolder: e ? whetherString.yes : whetherString.no });

    const values = {};

    values[fieldData.daoTargetFolder.name] = '';

    this.setFormFieldsValue(values);
  };

  onUseMappingXmlFolderChange = (e) => {
    this.setState({ useMappingXmlFolder: e ? whetherString.yes : whetherString.no });

    const values = {};

    values[fieldData.mappingXmlTargetFolder.name] = '';

    this.setFormFieldsValue(values);
  };

  formContent = () => {
    const {
      dataLoading,
      processing,
      hasProjectFolder,
      useModelFolder,
      useDaoFolder,
      useMappingXmlFolder,
    } = this.state;

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
                  fieldData.connectionConfigId.helper,
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
                  fieldData.connectorJarFile.helper,
                  <FormOutlined />,
                  {},
                  false,
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card
          title="文件夹与包"
          className={styles.card}
          bordered={false}
          extra={buildFieldHelper('设置项目文件夹以及包信息')}
        >
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.projectFolder.label,
                  fieldData.projectFolder.name,
                  true,
                  fieldData.projectFolder.helper,
                  <FormOutlined />,
                  {
                    onChange: (e) => {
                      this.onProjectFolderChange(e);
                    },
                    addonAfter: (
                      <Button
                        style={{
                          border: '0px solid #d9d9d9',
                          backgroundColor: '#fafafa',
                          height: '30px',
                        }}
                        disabled={`${hasProjectFolder || whetherString.no}` === whetherString.no}
                        onClick={this.openProjectFolder}
                      >
                        <FolderOpenOutlined
                          onClick={(e) => {
                            this.openProjectFolder(e);
                          }}
                        />
                        打开
                      </Button>
                    ),
                  },
                )}
              </Col>
              <Col lg={6} md={24} sm={24} xs={24}>
                {this.renderFormFileEncodingSelectFormItem()}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.modelPackage.label,
                  fieldData.modelPackage.name,
                  true,
                  fieldData.modelPackage.helper,
                  <FormOutlined />,
                  {
                    addonAfter: (
                      <>
                        <span>文件夹：</span>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          onChange={(e) => {
                            this.onUseModelFolderChange(e);
                          }}
                        />
                      </>
                    ),
                  },
                )}
              </Col>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.modelTargetFolder.label,
                  fieldData.modelTargetFolder.name,
                  false,
                  fieldData.modelTargetFolder.helper,
                  <FormOutlined />,
                  {
                    disabled: `${useModelFolder || whetherString.no}` === whetherString.no,
                  },
                )}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.daoPackage.label,
                  fieldData.daoPackage.name,
                  true,
                  fieldData.daoPackage.helper,
                  <FormOutlined />,
                  {
                    addonAfter: (
                      <>
                        <span>文件夹：</span>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          onChange={(e) => {
                            this.onUseDaoFolderChange(e);
                          }}
                        />
                      </>
                    ),
                  },
                )}
              </Col>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.daoTargetFolder.label,
                  fieldData.daoTargetFolder.name,
                  false,
                  fieldData.daoTargetFolder.helper,
                  <FormOutlined />,
                  {
                    disabled: `${useDaoFolder || whetherString.no}` === whetherString.no,
                  },
                )}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.mappingXmlPackage.label,
                  fieldData.mappingXmlPackage.name,
                  true,
                  fieldData.mappingXmlPackage.helper,
                  <FormOutlined />,
                  {
                    addonAfter: (
                      <>
                        <span>文件夹：</span>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          onChange={(e) => {
                            this.onUseMappingXmlFolderChange(e);
                          }}
                        />
                      </>
                    ),
                  },
                )}
              </Col>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.mappingXmlTargetFolder.label,
                  fieldData.mappingXmlTargetFolder.name,
                  false,
                  fieldData.mappingXmlTargetFolder.helper,
                  <FormOutlined />,
                  {
                    disabled: `${useMappingXmlFolder || whetherString.no}` === whetherString.no,
                  },
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card
          title="其他配置"
          className={styles.card}
          bordered={false}
          extra={buildFieldHelper('选择生成时的各项选项')}
        >
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelectFormItem(
                  fieldData.autoDelimitKeywords.label,
                  fieldData.autoDelimitKeywords.name,
                  fieldData.autoDelimitKeywords.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelectFormItem(
                  fieldData.useSchemaPrefix.label,
                  fieldData.useSchemaPrefix.name,
                  fieldData.useSchemaPrefix.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelectFormItem(
                  fieldData.comment.label,
                  fieldData.comment.name,
                  fieldData.comment.helper,
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
