import React from 'react';
import { connect } from 'umi';
import { Row, Col, Spin, Divider, notification } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { formatDatetime, isFunction } from '@/utils/tools';
import { zeroInt, whetherNumber, whetherString } from '@/utils/constants';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import BaseUpdateDrawer from '@/customComponents/Framework/DataDrawer/BaseUpdateDrawer';

import { fieldData } from '../Common/data';

import styles from './index.less';

@connect(({ dataTableGeneratorConfig, global, loading }) => ({
  dataTableGeneratorConfig,
  global,
  loading: loading.models.dataTableGeneratorConfig,
}))
class SetDrawer extends BaseUpdateDrawer {
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
        useTableNameAlias: 0,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  getApiData = (props) => {
    const {
      dataTableGeneratorConfig: { data },
    } = props;

    return data;
  };

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const { useGenerateKey, useTableNameAlias } = metaData;

    this.setState({ useGenerateKey, useTableNameAlias });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.dataTableGeneratorConfigId.name] = metaData.dataTableGeneratorConfigId || '';
      values[fieldData.tableName.name] = metaData.tableName || '';
      values[fieldData.useGenerateKey.name] = `${metaData.useGenerateKey || zeroInt}`;
      values[fieldData.generateKeys.name] = metaData.generateKeys || '';
      values[fieldData.domainObjectName.name] = `${metaData.domainObjectName || ''}`;
      values[fieldData.useActualColumnNames.name] = `${metaData.useActualColumnNames || zeroInt}`;
      values[fieldData.useTableNameAlias.name] = `${metaData.useTableNameAlias || zeroInt}`;
      values[fieldData.aliasName.name] = metaData.aliasName || '';

      const generated = `${metaData.generated || whetherNumber.no}`;

      if (generated === whetherString.yes) {
        values[fieldData.lastGenerateTime.name] = metaData.lastGenerateTime || '';
      }

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

  onUseTableNameAliasChange = (e) => {
    this.setState({ useTableNameAlias: e });
  };

  renderTitle = () => {
    return '编辑配置';
  };

  formContent = () => {
    const { dataLoading, processing, useGenerateKey, useTableNameAlias } = this.state;

    return (
      <div className={styles.containorBox}>
        <Spin spinning={dataLoading || processing}>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormInput(
                fieldData.dataTableGeneratorConfigId.label,
                fieldData.dataTableGeneratorConfigId.name,
                true,
                fieldData.dataTableGeneratorConfigId.helper,
                <FormOutlined />,
                {},
                false,
              )}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormInput(
                fieldData.tableName.label,
                fieldData.tableName.name,
                true,
                fieldData.tableName.helper,
                <FormOutlined />,
                {},
                false,
              )}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormWhetherSelect(
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
                {this.renderFormInput(
                  fieldData.generateKeys.label,
                  fieldData.generateKeys.name,
                  true,
                  fieldData.generateKeys.helper,
                )}
              </Col>
            ) : null}
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormInput(
                fieldData.domainObjectName.label,
                fieldData.domainObjectName.name,
                false,
                fieldData.domainObjectName.helper,
              )}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormWhetherSelect(
                fieldData.useActualColumnNames.label,
                fieldData.useActualColumnNames.name,
                fieldData.useActualColumnNames.helper,
                true,
              )}
            </Col>
          </Row>
          <Divider orientation="left">别名设置</Divider>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormWhetherSelect(
                fieldData.useTableNameAlias.label,
                fieldData.useTableNameAlias.name,
                fieldData.useTableNameAlias.helper,
                (e) => {
                  this.onUseTableNameAliasChange(e);
                },
              )}
            </Col>
            {`${useTableNameAlias || 0}` === '1' ? (
              <Col lg={12} md={12} sm={24} xs={24}>
                {this.renderFormInput(
                  fieldData.aliasName.label,
                  fieldData.aliasName.name,
                  true,
                  fieldData.aliasName.helper,
                )}
              </Col>
            ) : null}
          </Row>
          <Divider orientation="left">其他信息</Divider>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFromCreateTimeField()}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFromUpdateTimeField()}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {this.renderFormInput(
                fieldData.lastGenerateTime.label,
                fieldData.lastGenerateTime.name,
                true,
                fieldData.lastGenerateTime.helper,
                <FormOutlined />,
                {},
                false,
              )}
            </Col>
          </Row>
        </Spin>
      </div>
    );
  };
}

export default SetDrawer;
