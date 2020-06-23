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
import { customFieldCollection } from '@/customSpecialComponents/Supplement/customConstants';

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
class DataBaseGeneratorConfig extends TabPageBase {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    const daoTypeList = this.daoTypeList(false) || [];

    const daoTypeFirstFlag = daoTypeList.length > 0 ? daoTypeList[0].flag : '';

    if (metaData != null) {
      values[fieldData.databaseGeneratorConfigId.name] =
        metaData.databaseGeneratorConfigId || whetherNumber.no;
      values[fieldData.connectionConfigId.name] = metaData.connectionConfigId || whetherNumber.no;

      values[fieldData.globalConfig.fieldData.connectorJarFile.name] =
        metaData.globalConfig.connectorJarFile || '';
      values[fieldData.globalConfig.fieldData.projectFolder.name] =
        metaData.globalConfig.projectFolder || '';
      values[fieldData.globalConfig.fieldData.modelPackage.name] =
        metaData.globalConfig.modelPackage || '';
      values[fieldData.globalConfig.fieldData.modelTargetFolder.name] =
        metaData.globalConfig.modelTargetFolder || '';
      values[fieldData.globalConfig.fieldData.daoPackage.name] =
        metaData.globalConfig.daoPackage || '';
      values[fieldData.globalConfig.fieldData.daoTargetFolder.name] =
        metaData.globalConfig.daoTargetFolder || '';
      values[fieldData.globalConfig.fieldData.mappingXmlPackage.name] =
        metaData.globalConfig.mappingXmlPackage || '';
      values[fieldData.globalConfig.fieldData.mappingXmlTargetFolder.name] =
        metaData.globalConfig.mappingXmlTargetFolder || '';
      values[fieldData.globalConfig.fieldData.servicePackage.name] =
        metaData.globalConfig.servicePackage || '';
      values[fieldData.globalConfig.fieldData.serviceTargetFolder.name] =
        metaData.globalConfig.serviceTargetFolder || '';
      values[fieldData.globalConfig.fieldData.encoding.name] = `${
        metaData.globalConfig.encoding || whetherNumber.no
      }`;

      values[fieldData.globalConfig.fieldData.offsetLimit.name] = `${
        metaData.globalConfig.offsetLimit || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.needToStringHashCodeEquals.name] = `${
        metaData.globalConfig.needToStringHashCodeEquals || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.needForUpdate.name] = `${
        metaData.globalConfig.needForUpdate || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.annotationDAO.name] = `${
        metaData.globalConfig.annotationDAO || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.annotation.name] = `${
        metaData.globalConfig.annotation || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.useDAOExtendStyle.name] = `${
        metaData.globalConfig.useDAOExtendStyle || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.useSchemaPrefix.name] = `${
        metaData.globalConfig.useSchemaPrefix || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.jsr310Support.name] = `${
        metaData.globalConfig.jsr310Support || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.overrideXML.name] = `${
        metaData.globalConfig.overrideXML || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.autoDelimitKeywords.name] = `${
        metaData.globalConfig.autoDelimitKeywords || whetherNumber.no
      }`;
      values[fieldData.globalConfig.fieldData.comment.name] = `${
        metaData.globalConfig.comment || whetherNumber.no
      }`;

      values[customFieldCollection.daoType.name] = `${
        metaData.globalConfig.daoType || daoTypeFirstFlag
      }`;

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

      values[fieldData.globalConfig.fieldData.modelTargetFolder.name] = '';

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

      values[fieldData.globalConfig.fieldData.daoTargetFolder.name] = '';

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

      values[fieldData.globalConfig.fieldData.mappingXmlTargetFolder.name] = '';

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

      values[fieldData.globalConfig.fieldData.serviceTargetFolder.name] = '';

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
                {this.renderFormInput(
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
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.connectorJarFile.label,
                  fieldData.globalConfig.fieldData.connectorJarFile.name,
                  true,
                  fieldData.globalConfig.fieldData.connectorJarFile.helper,
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
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.projectFolder.label,
                  fieldData.globalConfig.fieldData.projectFolder.name,
                  true,
                  fieldData.globalConfig.fieldData.projectFolder.helper,
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
                {this.renderFormFileEncodingSelect()}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={12} md={24} sm={24} xs={24}>
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.modelPackage.label,
                  fieldData.globalConfig.fieldData.modelPackage.name,
                  true,
                  fieldData.globalConfig.fieldData.modelPackage.helper,
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
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.modelTargetFolder.label,
                  fieldData.globalConfig.fieldData.modelTargetFolder.name,
                  false,
                  fieldData.globalConfig.fieldData.modelTargetFolder.helper,
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
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.daoPackage.label,
                  fieldData.globalConfig.fieldData.daoPackage.name,
                  true,
                  fieldData.globalConfig.fieldData.daoPackage.helper,
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
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.daoTargetFolder.label,
                  fieldData.globalConfig.fieldData.daoTargetFolder.name,
                  false,
                  fieldData.globalConfig.fieldData.daoTargetFolder.helper,
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
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.mappingXmlPackage.label,
                  fieldData.globalConfig.fieldData.mappingXmlPackage.name,
                  true,
                  fieldData.globalConfig.fieldData.mappingXmlPackage.helper,
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
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.mappingXmlTargetFolder.label,
                  fieldData.globalConfig.fieldData.mappingXmlTargetFolder.name,
                  false,
                  fieldData.globalConfig.fieldData.mappingXmlTargetFolder.helper,
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
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.servicePackage.label,
                  fieldData.globalConfig.fieldData.servicePackage.name,
                  true,
                  fieldData.globalConfig.fieldData.servicePackage.helper,
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
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.serviceTargetFolder.label,
                  fieldData.globalConfig.fieldData.serviceTargetFolder.name,
                  false,
                  fieldData.globalConfig.fieldData.serviceTargetFolder.helper,
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
                {this.renderFormDaoTypeSelect()}
              </Col>

              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.autoDelimitKeywords.label,
                  fieldData.globalConfig.fieldData.autoDelimitKeywords.name,
                  fieldData.globalConfig.fieldData.autoDelimitKeywords.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.useSchemaPrefix.label,
                  fieldData.globalConfig.fieldData.useSchemaPrefix.name,
                  fieldData.globalConfig.fieldData.useSchemaPrefix.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.comment.label,
                  fieldData.globalConfig.fieldData.comment.name,
                  fieldData.globalConfig.fieldData.comment.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.offsetLimit.label,
                  fieldData.globalConfig.fieldData.offsetLimit.name,
                  fieldData.globalConfig.fieldData.offsetLimit.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.needToStringHashCodeEquals.label,
                  fieldData.globalConfig.fieldData.needToStringHashCodeEquals.name,
                  fieldData.globalConfig.fieldData.needToStringHashCodeEquals.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.needForUpdate.label,
                  fieldData.globalConfig.fieldData.needForUpdate.name,
                  fieldData.globalConfig.fieldData.needForUpdate.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.annotationDAO.label,
                  fieldData.globalConfig.fieldData.annotationDAO.name,
                  fieldData.globalConfig.fieldData.annotationDAO.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.annotation.label,
                  fieldData.globalConfig.fieldData.annotation.name,
                  fieldData.globalConfig.fieldData.annotation.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.useDAOExtendStyle.label,
                  fieldData.globalConfig.fieldData.useDAOExtendStyle.name,
                  fieldData.globalConfig.fieldData.useDAOExtendStyle.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.jsr310Support.label,
                  fieldData.globalConfig.fieldData.jsr310Support.name,
                  fieldData.globalConfig.fieldData.jsr310Support.helper,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormWhetherSelect(
                  fieldData.globalConfig.fieldData.overrideXML.label,
                  fieldData.globalConfig.fieldData.overrideXML.name,
                  fieldData.globalConfig.fieldData.overrideXML.helper,
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card title="个性化设置" className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInput(
                  fieldData.globalConfig.fieldData.mapperExtensionName.label,
                  fieldData.globalConfig.fieldData.mapperExtensionName.name,
                  false,
                  fieldData.globalConfig.fieldData.mapperExtensionName.helper,
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

export default DataBaseGeneratorConfig;
