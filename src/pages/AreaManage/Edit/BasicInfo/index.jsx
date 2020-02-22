import React from 'react';
import { connect } from 'dva';
import { Form, Card, Row, Col, Spin, notification, Input, Affix, Button, Divider } from 'antd';
import { ContactsOutlined, SaveOutlined, FormOutlined, ReloadOutlined } from '@ant-design/icons';

import {
  refitFieldDecoratorOption,
  formatDatetime,
  buildFieldDescription,
  getDerivedStateFromPropsForUrlParams,
} from '../../../../utils/tools';
import accessWayCollection from '../../../../customConfig/accessWayCollection';
import UpdateFormTab from '../../../../customComponents/Framework/CustomForm/UpdateFormTab';
import FromDisplayItem from '../../../../customComponents/FromDisplayItem';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../Assist/config';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ areaManage, global, loading }) => ({
  areaManage,
  global,
  loading: loading.models.areaManage,
}))
class BasicInfo extends UpdateFormTab {
  componentAuthority = accessWayCollection.areaManage.get;

  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'areaManage/get',
        submitApiPath: 'areaManage/updateBasicInfo',
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
      areaManage: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { areaManageId } = this.state;

    d.areaManageId = areaManageId;

    return d;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { areaManageId } = this.state;

    d.areaManageId = areaManageId;

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
    const form = this.getTargetForm();
    const { getFieldDecorator } = form;
    const { metaData, processing, dataLoading, loadSuccess } = this.state;

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
                onClick={this.validate}
                loading={processing}
              >
                保存
              </Button>
            </Affix>
          }
        >
          <Spin spinning={dataLoading || processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.loginName}>
                    <Input
                      addonBefore={<FormOutlined />}
                      placeholder={buildFieldDescription(fieldData.loginName)}
                      disabled
                      value={metaData === null ? '' : metaData.loginName || ''}
                    />
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.name}>
                    {getFieldDecorator(
                      'name',
                      refitFieldDecoratorOption(
                        metaData === null ? '' : metaData.name || '',
                        metaData === null ? '' : metaData.name || '',
                        '',
                        {
                          rules: [
                            {
                              required: false,
                              message: buildFieldDescription(fieldData.name),
                            },
                          ],
                        },
                      ),
                    )(
                      <Input
                        addonBefore={<FormOutlined />}
                        placeholder={buildFieldDescription(fieldData.name)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.phone}>
                    {getFieldDecorator(
                      'phone',
                      refitFieldDecoratorOption(
                        metaData === null ? '' : metaData.phone || '',
                        metaData === null ? '' : metaData.phone || '',
                        '',
                        {
                          rules: [
                            {
                              required: false,
                              message: buildFieldDescription(fieldData.phone),
                            },
                          ],
                        },
                      ),
                    )(
                      <Input
                        addonBefore={<FormOutlined />}
                        placeholder={buildFieldDescription(fieldData.phone)}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card
          title={
            <>
              <ContactsOutlined />
              <span className={styles.cardTitle}>其他信息</span>
            </>
          }
          className={styles.card}
          bordered={false}
        >
          <Spin spinning={dataLoading || processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FromDisplayItem
                    name={fieldData.state}
                    value={
                      metaData === null ? '' : this.getAreaManageStateName(metaData.state) || ''
                    }
                  />
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FromDisplayItem
                    name={fieldData.roleNameCollection}
                    value={metaData === null ? '' : (metaData.roleNameCollection || []).join()}
                  />
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FromDisplayItem
                    name={fieldData.inTime}
                    value={
                      metaData === null
                        ? ''
                        : formatDatetime(metaData.inTime, 'YYYY-MM-DD HH:mm') || '无'
                    }
                  />
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </>
    );
  };
}

export default BasicInfo;
