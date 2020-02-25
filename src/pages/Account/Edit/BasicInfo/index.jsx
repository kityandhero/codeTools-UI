import React from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Spin, notification, Affix, Button, Divider } from 'antd';
import { ContactsOutlined, SaveOutlined, ReloadOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
  toDatetime,
} from '../../../../utils/tools';
import accessWayCollection from '../../../../customConfig/accessWayCollection';
import { constants } from '../../../../customConfig/config';
import UpdateFormTab from '../../../../customComponents/Framework/CustomForm/UpdateFormTab';

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

  getApiData = props => {
    const {
      account: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { accountId } = this.state;

    d.accountId = accountId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = data => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  formContent = () => {
    const { metaData, processing, dataLoading, loadSuccess } = this.state;

    const initialValues = {
      name: metaData === null ? '' : metaData.name || '',
      description: metaData === null ? '' : metaData.description || '',
    };

    initialValues[constants.createTime] =
      metaData === null ? '' : toDatetime(metaData.createTime) || '';

    return (
      <div className={styles.containorBox}>
        <Spin ref={this.formRef} initialValues={initialValues} layout="vertical">
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
                {this.getErrorInfo()}
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
                  disabled={dataLoading || processing || !loadSuccess}
                  onClick={e => {
                    this.validate(e);
                  }}
                  loading={processing}
                >
                  保存
                </Button>
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.userName,
                    'userName',
                    true,
                    buildFieldHelper(fieldData.userNameHelper),
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.name,
                    'name',
                    true,
                    buildFieldHelper(fieldData.nameHelper),
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormPasswordFormItem(
                    fieldData.password,
                    'password',
                    true,
                    buildFieldHelper(fieldData.passwordHelper),
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFormPasswordFormItem(
                    fieldData.rePassword,
                    'rePassword',
                    true,
                    buildFieldHelper(fieldData.rePasswordHelper),
                  )}
                </Col>
              </Row>
            </Spin>
          </Card>

          <Card title="描述信息" className={styles.card} bordered={false}>
            <Spin spinning={processing}>
              <Row gutter={24}>
                <Col lg={24} md={12} sm={24}>
                  {this.renderFormTextAreaFormItem(
                    fieldData.description,
                    'description',
                    true,
                    buildFieldHelper(fieldData.descriptionHelper),
                  )}
                </Col>
              </Row>
            </Spin>
          </Card>

          <Card title="其他信息" className={styles.card} bordered={false}>
            <Spin spinning={processing}>
              <Row gutter={24}>
                <Col lg={24} md={12} sm={24}>
                  {this.renderFromCreateTimeField(constants.createTime)}
                </Col>
              </Row>
            </Spin>
          </Card>
        </Spin>
      </div>
    );
  };
}

export default BasicInfo;
