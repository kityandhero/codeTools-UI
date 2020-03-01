import React from 'react';
import { connect } from 'dva';
import { Form, Card, Row, Col, Spin, notification, Affix, Button, Divider } from 'antd';
import { FormOutlined, ContactsOutlined, SaveOutlined, ReloadOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
  formatDatetime,
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

  formRef = React.createRef();

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

  getTargetForm = () => {
    return this.formRef.current;
  };

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {
      userName: metaData === null ? '' : metaData.userName || '',
      name: metaData === null ? '' : metaData.name || '',
      description: metaData === null ? '' : metaData.description || '',
    };

    values[constants.createTime.name] =
      metaData === null ? '' : formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
    values[constants.updateTime.name] =
      metaData === null ? '' : formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';

    const form = this.getTargetForm();

    form.setFieldsValue(values);
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
    const { processing, dataLoading, loadSuccess } = this.state;

    return (
      <div className={styles.containorBox}>
        <Form ref={this.formRef} layout="vertical">
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
                    <FormOutlined />,
                    null,
                    false,
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
                    false,
                    buildFieldHelper(fieldData.descriptionHelper),
                  )}
                </Col>
              </Row>
            </Spin>
          </Card>

          <Card title="其他信息" className={styles.card} bordered={false}>
            <Spin spinning={processing}>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFromCreateTimeField()}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFromUpdateTimeField()}
                </Col>
              </Row>
            </Spin>
          </Card>
        </Form>
      </div>
    );
  };
}

export default BasicInfo;
