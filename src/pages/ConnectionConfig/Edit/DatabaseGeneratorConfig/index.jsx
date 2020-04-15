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
import { whetherNumber } from '@/utils/constants';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import { customFieldCollection } from '@/customSpecialComponents/CustomCommonSupplement/customConstants';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../../DatabaseGeneratorConfig/Common/data';

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
        modelTargetFolderValue: '',
        daoTargetFolderValue: '',
        mappingXmlTargetFolderValue: '',
        serviceTargetFolderValue: '',
        useModelTargetFolder: false,
        useDaoTargetFolder: false,
        useMappingXmlTargetFolder: false,
        useServiceTargetFolder: false,
        hasProjectFolder: false,
        hasModelTargetFolder: false,
        hasDaoTargetFolder: false,
        hasMappingXmlTargetFolder: false,
        hasServiceTargetFolder: false,
        modelTargetFolderRelativeMode: whetherNumber.yes,
        daoTargetFolderRelativeMode: whetherNumber.yes,
        mappingXmlTargetFolderRelativeMode: whetherNumber.yes,
        serviceTargetFolderRelativeMode: whetherNumber.yes,
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

    const daoTypeList = this.daoTypeList(false) || [];

    const daoTypeFirstFlag = daoTypeList.length > 0 ? daoTypeList[0].flag : '';

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
      values[customFieldCollection.daoType.name] = `${metaData.daoType || daoTypeFirstFlag}`;
      values[fieldData.mappingXmlPackage.name] = metaData.mappingXmlPackage || '';
      values[fieldData.mappingXmlTargetFolder.name] = metaData.mappingXmlTargetFolder || '';
      values[fieldData.servicePackage.name] = metaData.servicePackage || '';
      values[fieldData.serviceTargetFolder.name] = metaData.serviceTargetFolder || '';
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
    const {
      projectFolder,
      modelTargetFolder,
      daoTargetFolder,
      mappingXmlTargetFolder,
      serviceTargetFolder,
      modelTargetFolderRelativeMode,
      daoTargetFolderRelativeMode,
      mappingXmlTargetFolderRelativeMode,
      serviceTargetFolderRelativeMode,
    } = metaData;

    const hasProjectFolder = !stringIsNullOrWhiteSpace(projectFolder);
    const hasModelTargetFolder = !stringIsNullOrWhiteSpace(modelTargetFolder);
    const hasDaoTargetFolder = !stringIsNullOrWhiteSpace(daoTargetFolder);
    const hasMappingXmlTargetFolder = !stringIsNullOrWhiteSpace(mappingXmlTargetFolder);
    const hasServiceTargetFolder = !stringIsNullOrWhiteSpace(serviceTargetFolder);

    this.setState({
      projectFolderValue: projectFolder || '',
      modelTargetFolderValue: modelTargetFolder || '',
      daoTargetFolderValue: daoTargetFolder || '',
      mappingXmlTargetFolderValue: mappingXmlTargetFolder || '',
      serviceTargetFolderValue: serviceTargetFolder || '',
      useModelTargetFolder: hasModelTargetFolder,
      useDaoTargetFolder: hasDaoTargetFolder,
      useMappingXmlTargetFolder: hasMappingXmlTargetFolder,
      useServiceTargetFolder: hasServiceTargetFolder,
      hasProjectFolder,
      hasModelTargetFolder,
      hasDaoTargetFolder,
      hasMappingXmlTargetFolder,
      hasServiceTargetFolder,
      modelTargetFolderRelativeMode,
      daoTargetFolderRelativeMode,
      mappingXmlTargetFolderRelativeMode,
      serviceTargetFolderRelativeMode,
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const {
      metaData,
      modelTargetFolderRelativeMode,
      daoTargetFolderRelativeMode,
      mappingXmlTargetFolderRelativeMode,
      serviceTargetFolderRelativeMode,
    } = this.state;
    const { databaseGeneratorConfigId, connectionConfigId } = metaData;

    d.connectionConfigId = connectionConfigId;
    d.databaseGeneratorConfigId = databaseGeneratorConfigId || '';
    d.modelTargetFolderRelativeMode = modelTargetFolderRelativeMode;
    d.daoTargetFolderRelativeMode = daoTargetFolderRelativeMode;
    d.mappingXmlTargetFolderRelativeMode = mappingXmlTargetFolderRelativeMode;
    d.serviceTargetFolderRelativeMode = serviceTargetFolderRelativeMode;

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

  openFolder = (folder) => {
    const { dispatch } = this.props;

    if (stringIsNullOrWhiteSpace(folder || '')) {
      message.error('缺少文件夹信息');

      return;
    }

    dispatch({
      type: 'tools/openFolder',
      payload: {
        folder: folder || '',
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

  openProjectFolder = () => {
    const { projectFolderValue } = this.state;

    this.openFolder(projectFolderValue);
  };

  openModelTargetFolder = () => {
    const { modelTargetFolderValue } = this.state;

    this.openFolder(modelTargetFolderValue);
  };

  openDaoTargetFolder = () => {
    const { daoTargetFolderValue } = this.state;

    this.openFolder(daoTargetFolderValue);
  };

  openMappingXmlTargetFolder = () => {
    const { mappingXmlTargetFolderValue } = this.state;

    this.openFolder(mappingXmlTargetFolderValue);
  };

  openServiceTargetFolder = () => {
    const { serviceTargetFolderValue } = this.state;

    this.openFolder(serviceTargetFolderValue);
  };

  onProjectFolderChange = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      projectFolderValue: value,
      hasProjectFolder: stringIsNullOrWhiteSpace(value),
    });
  };

  onUseModelTargetFolderChange = (e) => {
    if (!e) {
      this.setState({
        useModelTargetFolder: e,
        modelTargetFolderValue: '',
        hasModelTargetFolder: false,
        modelTargetFolderRelativeMode: whetherNumber.yes,
      });

      const values = {};

      values[fieldData.modelTargetFolder.name] = '';

      this.setFormFieldsValue(values);
    } else {
      this.setState({
        useModelTargetFolder: e,
      });
    }
  };

  onModelTargetFolderChange = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      modelTargetFolderValue: value,
      hasModelTargetFolder: !stringIsNullOrWhiteSpace(value),
    });
  };

  onUseDaoTargetFolderChange = (e) => {
    if (!e) {
      this.setState({
        useDaoTargetFolder: e,
        daoTargetFolderValue: '',
        hasDaoTargetFolder: false,
        daoTargetFolderRelativeMode: whetherNumber.yes,
      });

      const values = {};

      values[fieldData.daoTargetFolder.name] = '';

      this.setFormFieldsValue(values);
    } else {
      this.setState({
        useDaoTargetFolder: e,
      });
    }
  };

  onDaoTargetFolderChange = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      daoTargetFolderValue: value,
      hasDaoTargetFolder: !stringIsNullOrWhiteSpace(value),
    });
  };

  onUseMappingXmlTargetFolderChange = (e) => {
    if (!e) {
      this.setState({
        useMappingXmlTargetFolder: e,
        mappingXmlTargetFolderValue: '',
        hasMappingXmlTargetFolder: false,
        mappingXmlTargetFolderRelativeMode: whetherNumber.yes,
      });

      const values = {};

      values[fieldData.mappingXmlTargetFolder.name] = '';

      this.setFormFieldsValue(values);
    } else {
      this.setState({
        useMappingXmlTargetFolder: e,
      });
    }
  };

  onMappingXmlTargetFolderChange = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      mappingXmlTargetFolderValue: value,
      hasMappingXmlTargetFolder: !stringIsNullOrWhiteSpace(value),
    });
  };

  onUseServiceTargetFolderChange = (e) => {
    if (!e) {
      this.setState({
        useServiceTargetFolder: e,
        serviceTargetFolderValue: '',
        hasServiceTargetFolder: false,
        serviceTargetFolderRelativeMode: whetherNumber.yes,
      });

      const values = {};

      values[fieldData.serviceTargetFolder.name] = '';

      this.setFormFieldsValue(values);
    } else {
      this.setState({
        useServiceTargetFolder: e,
      });
    }
  };

  onServiceTargetFolderChange = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      serviceTargetFolderValue: value,
      hasServiceTargetFolder: !stringIsNullOrWhiteSpace(value),
    });
  };

  onModelTargetFolderRelativeModeChange = (e) => {
    this.setState({
      modelTargetFolderRelativeMode: e ? whetherNumber.yes : whetherNumber.no,
    });
  };

  onDaoTargetFolderRelativeModeChange = (e) => {
    this.setState({
      daoTargetFolderRelativeMode: e ? whetherNumber.yes : whetherNumber.no,
    });
  };

  onMappingXmlTargetFolderRelativeModeChange = (e) => {
    this.setState({
      mappingXmlTargetFolderRelativeMode: e ? whetherNumber.yes : whetherNumber.no,
    });
  };

  onServiceTargetFolderRelativeModeChange = (e) => {
    this.setState({
      serviceTargetFolderRelativeMode: e ? whetherNumber.yes : whetherNumber.no,
    });
  };

  formContent = () => {
    const {
      dataLoading,
      processing,
      useModelTargetFolder,
      useDaoTargetFolder,
      useMappingXmlTargetFolder,
      useServiceTargetFolder,
      hasProjectFolder,
      hasModelTargetFolder,
      hasDaoTargetFolder,
      hasMappingXmlTargetFolder,
      hasServiceTargetFolder,
      modelTargetFolderRelativeMode,
      daoTargetFolderRelativeMode,
      mappingXmlTargetFolderRelativeMode,
      serviceTargetFolderRelativeMode,
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
                        disabled={!hasProjectFolder}
                        onClick={this.openProjectFolder}
                      >
                        <FolderOpenOutlined />
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
                          checked={useModelTargetFolder}
                          onChange={(e) => {
                            this.onUseModelTargetFolderChange(e);
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
                    disabled: !useModelTargetFolder,
                    onChange: (e) => {
                      this.onModelTargetFolderChange(e);
                    },
                    addonAfter: (
                      <>
                        <span>相对路径：</span>
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          disabled={!useModelTargetFolder}
                          checked={modelTargetFolderRelativeMode === whetherNumber.yes}
                          onChange={(e) => {
                            this.onModelTargetFolderRelativeModeChange(e);
                          }}
                        />
                        <Divider type="vertical" />
                        <Button
                          style={{
                            border: '0px solid #d9d9d9',
                            backgroundColor: '#fafafa',
                            height: '30px',
                          }}
                          disabled={!useModelTargetFolder || !hasModelTargetFolder}
                          onClick={this.openModelTargetFolder}
                        >
                          <FolderOpenOutlined />
                          打开
                        </Button>
                      </>
                    ),
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
                          checked={useDaoTargetFolder}
                          onChange={(e) => {
                            this.onUseDaoTargetFolderChange(e);
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
                    disabled: !useDaoTargetFolder,
                    onChange: (e) => {
                      this.onDaoTargetFolderChange(e);
                    },
                    addonAfter: (
                      <>
                        <span>相对路径：</span>
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          disabled={!useDaoTargetFolder}
                          checked={daoTargetFolderRelativeMode === whetherNumber.yes}
                          onChange={(e) => {
                            this.onDaoTargetFolderRelativeModeChange(e);
                          }}
                        />
                        <Divider type="vertical" />
                        <Button
                          style={{
                            border: '0px solid #d9d9d9',
                            backgroundColor: '#fafafa',
                            height: '30px',
                          }}
                          disabled={!useDaoTargetFolder || !hasDaoTargetFolder}
                          onClick={this.openDaoTargetFolder}
                        >
                          <FolderOpenOutlined />
                          打开
                        </Button>
                      </>
                    ),
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
                          checked={useMappingXmlTargetFolder}
                          onChange={(e) => {
                            this.onUseMappingXmlTargetFolderChange(e);
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
                    disabled: !useMappingXmlTargetFolder,
                    onChange: (e) => {
                      this.onMappingXmlTargetFolderChange(e);
                    },
                    addonAfter: (
                      <>
                        <span>相对路径：</span>
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          disabled={!useMappingXmlTargetFolder}
                          checked={mappingXmlTargetFolderRelativeMode === whetherNumber.yes}
                          onChange={(e) => {
                            this.onMappingXmlTargetFolderRelativeModeChange(e);
                          }}
                        />
                        <Divider type="vertical" />
                        <Button
                          style={{
                            border: '0px solid #d9d9d9',
                            backgroundColor: '#fafafa',
                            height: '30px',
                          }}
                          disabled={!useMappingXmlTargetFolder || !hasMappingXmlTargetFolder}
                          onClick={this.openMappingXmlTargetFolder}
                        >
                          <FolderOpenOutlined />
                          打开
                        </Button>
                      </>
                    ),
                  },
                )}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.servicePackage.label,
                  fieldData.servicePackage.name,
                  true,
                  fieldData.servicePackage.helper,
                  <FormOutlined />,
                  {
                    addonAfter: (
                      <>
                        <span>文件夹：</span>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          checked={useServiceTargetFolder}
                          onChange={(e) => {
                            this.onUseServiceTargetFolderChange(e);
                          }}
                        />
                      </>
                    ),
                  },
                )}
              </Col>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.serviceTargetFolder.label,
                  fieldData.serviceTargetFolder.name,
                  false,
                  fieldData.serviceTargetFolder.helper,
                  <FormOutlined />,
                  {
                    disabled: !useServiceTargetFolder,
                    onChange: (e) => {
                      this.onServiceTargetFolderChange(e);
                    },
                    addonAfter: (
                      <>
                        <span>相对路径：</span>
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          disabled={!useServiceTargetFolder}
                          checked={serviceTargetFolderRelativeMode === whetherNumber.yes}
                          onChange={(e) => {
                            this.onServiceTargetFolderRelativeModeChange(e);
                          }}
                        />
                        <Divider type="vertical" />
                        <Button
                          style={{
                            border: '0px solid #d9d9d9',
                            backgroundColor: '#fafafa',
                            height: '30px',
                          }}
                          disabled={!useServiceTargetFolder || !hasServiceTargetFolder}
                          onClick={this.openServiceTargetFolder}
                        >
                          <FolderOpenOutlined />
                          打开
                        </Button>
                      </>
                    ),
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
                {this.renderFormDaoTypeSelectFormItem()}
              </Col>

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

        <Card title="个性化设置" className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.mapperExtensionName.label,
                  fieldData.mapperExtensionName.name,
                  false,
                  fieldData.mapperExtensionName.helper,
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
