import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Row, Col, Spin, Divider, BackTop, notification, Affix } from 'antd';
import { SaveOutlined, ReloadOutlined, FormOutlined } from '@ant-design/icons';

import {
  formatDatetime,
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
} from '../../../../utils/tools';
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

  supplementLoadRequestParams = o => {
    const d = o;
    const { connectionConfigId } = this.state;

    d.connectionConfigId = connectionConfigId;

    return d;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { metaData } = this.state;
    const { dataBaseGeneratorConfigId, connectionConfigId } = metaData;

    d.connectionConfigId = connectionConfigId;
    d.dataBaseGeneratorConfigId = dataBaseGeneratorConfigId || '';

    return d;
  };

  getTargetForm = () => {
    return this.formRef.current;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    values[fieldData.dataBaseGeneratorConfigId.name] =
      metaData === null ? '' : metaData.dataBaseGeneratorConfigId || '';
    values[fieldData.connectionConfigId.name] =
      metaData === null ? '' : metaData.connectionConfigId || '';
    values[constants.createTime.name] =
      metaData === null ? '' : formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
    values[constants.updateTime.name] =
      metaData === null ? '' : formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';

    const form = this.getTargetForm();

    form.setFieldsValue(values);
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { dataBaseGeneratorConfigId } = this.state;

    d.dataBaseGeneratorConfigId = dataBaseGeneratorConfigId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
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
