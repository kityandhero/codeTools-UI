import React, { Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Row,
  Col,
  Spin,
  notification,
  Icon,
  Input,
  Affix,
  Button,
  Divider,
  message,
} from 'antd';

import { refitFieldDecoratorOption, formatDatetime, buildFieldDescription } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import UpdateFormTab from '@/customComponents/CustomForm/UpdateFormTab';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ role, global, loading }) => ({
  role,
  global,
  loading: loading.models.role,
}))
@Form.create()
class BasicInfo extends UpdateFormTab {
  componentAuthority = accessWayCollection.role.get;

  goToUpdateWhenProcessed = true;

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      roleId: id,
      isSuper: false,
      fromTemplate: false,
      loadApiPath: 'role/get',
      submitApiPath: 'role/updateBasicInfo',
    };

    return result;
  };

  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { roleId: roleIdPre } = this.state;

    return roleIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { roleId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { roleId } = this.state;

    d.roleId = roleId;

    return d;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { roleId } = this.state;

    d.roleId = roleId;

    return d;
  };

  afterLoadSuccess = data => {
    const { isSuper, roleTemplateId } = data;

    const fromTemplate = (roleTemplateId || '') !== '';

    this.setState({ isSuper, fromTemplate });

    if (isSuper) {
      message.warn('超级管理员角色不能进行任何编辑操作！');
    } else if (fromTemplate) {
      message.warn('系统内置的角色不能进行任何编辑操作！');
    }
  };

  // eslint-disable-next-line no-unused-vars
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
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { metaData, processing, dataLoading, loadSuccess, isSuper, fromTemplate } = this.state;

    return (
      <Fragment>
        <Card
          title={
            <Fragment>
              <Icon type="contacts" />
              <span className={styles.cardTitle}>基本信息</span>
            </Fragment>
          }
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              {this.getErrorInfo()}
              <Button
                icon="reload"
                disabled={dataLoading || processing || !loadSuccess || isSuper || fromTemplate}
                onClick={this.reloadData}
                loading={processing}
              >
                刷新
              </Button>
              <Divider type="vertical" />
              <Button
                type="primary"
                icon="save"
                disabled={dataLoading || processing || !loadSuccess || isSuper || fromTemplate}
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
                <Col lg={24} md={12} sm={24}>
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
                        }
                      )
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        disabled={metaData != null && metaData.isSuper}
                        placeholder={buildFieldDescription(fieldData.name)}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={24} md={12} sm={24}>
                  <FormItem label={fieldData.description}>
                    {getFieldDecorator(
                      'description',
                      refitFieldDecoratorOption(
                        metaData === null ? '' : metaData.description || '',
                        metaData === null ? '' : metaData.description || '',
                        '',
                        {
                          rules: [
                            {
                              required: false,
                              message: buildFieldDescription(fieldData.description),
                            },
                          ],
                        }
                      )
                    )(
                      <TextArea
                        placeholder={buildFieldDescription(fieldData.description)}
                        disabled={metaData != null && metaData.isSuper}
                        rows={4}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card
          title={
            <Fragment>
              <Icon type="contacts" />
              <span className={styles.cardTitle}>其他信息</span>
            </Fragment>
          }
          className={styles.card}
          bordered={false}
        >
          <Spin spinning={dataLoading || processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={8} md={12} sm={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.moduleCount}：${
                      metaData === null ? '' : metaData.moduleCount || '0'
                    }`}
                  </div>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.roleTemplateId}：${
                      metaData === null
                        ? ''
                        : (metaData.roleTemplateId || '') === ''
                        ? '自主建立'
                        : '系统内置'
                    }`}
                  </div>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.createTime}：${
                      metaData === null
                        ? ''
                        : formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '无'
                    }`}
                  </div>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </Fragment>
    );
  };
}

export default BasicInfo;
