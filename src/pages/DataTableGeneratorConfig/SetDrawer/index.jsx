import React from 'react';
import { connect } from 'umi';
import { Row, Col, Spin, Divider, notification } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { buildFieldHelper, formatDatetime, isFunction } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import UpdateDrawer from '@/customComponents/Framework/CustomForm/UpdateDrawer';

import { fieldData } from '../Common/data';

import styles from './index.less';

@connect(({ dataTableGeneratorConfig, global, loading }) => ({
  dataTableGeneratorConfig,
  global,
  loading: loading.models.dataTableGeneratorConfig,
}))
class Index extends UpdateDrawer {
  componentAuthority = accessWayCollection.dataTable.updateBasicInfo;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        loadDataAfterMount: false,
        pageName: '调整数据表生成配置',
        loadApiPath: 'dataTableGeneratorConfig/get',
        submitApiPath: 'dataTableGeneratorConfig/set',
        useGenerateKey: 0,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  getSimpleTicketDetailIdFromExternalData = () => {
    const { externalData } = this.state;

    let dataTableGeneratorConfigId = '';

    if ((externalData || null) != null) {
      dataTableGeneratorConfigId = externalData.dataTableGeneratorConfigId || '';
    }

    return dataTableGeneratorConfigId;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;

    d.dataTableGeneratorConfigId = this.getSimpleTicketDetailIdFromExternalData();

    return d;
  };

  getApiData = (props) => {
    const {
      dataTableGeneratorConfig: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const {
      externalData: { dataTableGeneratorConfigId },
    } = this.state;

    d.dataTableGeneratorConfigId = dataTableGeneratorConfigId || '';

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const { useGenerateKey } = metaData;

    this.setState({ useGenerateKey });
  };

  buildInitialValues = (metaData) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.dataTableGeneratorConfigId.name] = metaData.dataTableGeneratorConfigId || '';
      values[fieldData.tableName.name] = metaData.tableName || '';
      values[fieldData.generateKeys.name] = metaData.generateKeys || '';
      values[fieldData.domainObjectName.name] = `${metaData.domainObjectName || ''}`;
      values[fieldData.mapperName.name] = `${metaData.mapperName || ''}`;
      values[fieldData.comment.name] = metaData.comment || '';
      values[constants.createTime.name] =
        formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
      values[constants.updateTime.name] =
        formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';
    }

    return values;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const {
      externalData: { dataTableGeneratorConfigId },
      useGenerateKey,
    } = this.state;

    d.dataTableGeneratorConfigId = dataTableGeneratorConfigId || '';
    d.useGenerateKey = useGenerateKey;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
    const { afterOK } = this.props;

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomLeft',
        message: '操作结果',
        description: '套餐已经保存成功。',
      });
    });

    if (isFunction(afterOK)) {
      afterOK();
    }
  };

  onClose = () => {
    const { afterClose } = this.props;

    if (isFunction(afterClose)) {
      afterClose();
    }
  };

  onUseGenerateKeyChange = (e) => {
    this.setState({ useGenerateKey: e });
  };

  renderTitle = () => {
    return '编辑配置';
  };

  formContent = () => {
    const { dataLoading, processing, useGenerateKey } = this.state;

    return (
      <div className={styles.containorBox}>
        <Spin spinning={dataLoading || processing}>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormInputFormItem(
                fieldData.dataTableGeneratorConfigId.label,
                fieldData.dataTableGeneratorConfigId.name,
                true,
                buildFieldHelper(fieldData.dataTableGeneratorConfigId.helper),
                <FormOutlined />,
                {},
                false,
              )}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormInputFormItem(
                fieldData.tableName.label,
                fieldData.tableName.name,
                true,
                buildFieldHelper(fieldData.tableName.helper),
                <FormOutlined />,
                {},
                false,
              )}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormWhetherSelectFormItem(
                fieldData.useGenerateKey.label,
                fieldData.useGenerateKey.name,
                fieldData.useGenerateKey.helper,
                (e) => {
                  this.onUseGenerateKeyChange(e);
                },
              )}
            </Col>
            {`${useGenerateKey || 0}` === '1' ? (
              <Col lg={12} md={12} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.generateKeys.label,
                  fieldData.generateKeys.name,
                  true,
                  buildFieldHelper(fieldData.generateKeys.helper),
                )}
              </Col>
            ) : null}
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormInputFormItem(
                fieldData.domainObjectName.label,
                fieldData.domainObjectName.name,
                true,
                buildFieldHelper(fieldData.dataTableGeneratorConfigId.helper),
              )}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormInputFormItem(
                fieldData.mapperName.label,
                fieldData.mapperName.name,
                true,
                buildFieldHelper(fieldData.mapperName.helper),
              )}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col lg={24} md={24} sm={24} xs={24}>
              {this.renderFormTextAreaFormItem(
                fieldData.comment.label,
                fieldData.comment.name,
                false,
                buildFieldHelper(fieldData.comment.helper),
              )}
            </Col>
          </Row>
          <Divider orientation="left">其他信息</Divider>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFromCreateTimeField()}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFromUpdateTimeField()}
            </Col>
          </Row>
        </Spin>
      </div>
    );
  };
}

export default Index;
