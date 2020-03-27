import React from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Spin, notification, Affix, Divider } from 'antd';
import { FormOutlined, ContactsOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
  formatDatetime,
} from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import UpdateFormTab from '@/customComponents/Framework/CustomForm/UpdateFormTab';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

@connect(({ account, global, loading }) => ({
  account,
  global,
  loading: loading.models.account,
}))
class BasicInfo extends UpdateFormTab {
  componentAuthority = accessWayCollection.account.get;

  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'account/get',
        submitApiPath: 'account/updateBasicInfo',
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

  getApiData = (props) => {
    const {
      account: { data },
    } = props;

    return data;
  };

  buildInitialValues = (metaData) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.userName.name] = metaData.userName || '';
      values[fieldData.name.name] = metaData.name || '';
      values[fieldData.description.name] = metaData.description || '';
      values[constants.createTime.name] =
        formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
      values[constants.updateTime.name] =
        formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';
    }

    return values;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (data) => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  formContent = () => {
    const { processing, dataLoading } = this.state;

    return (
      <>
        <Card
          title={
            <>
              <ContactsOutlined />
              <span className={styles.cardTitle}>基本信息</span>
            </>
          }
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
                  fieldData.userName.label,
                  fieldData.userName.name,
                  true,
                  buildFieldHelper(fieldData.userName.helper),
                  <FormOutlined />,
                  null,
                  false,
                )}
              </Col>
              <Col lg={6} md={12} sm={24} xs={24}>
                {this.renderFormInputFormItem(
                  fieldData.name.label,
                  fieldData.name.name,
                  true,
                  buildFieldHelper(fieldData.name.helper),
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card title="描述信息" className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
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

export default BasicInfo;
