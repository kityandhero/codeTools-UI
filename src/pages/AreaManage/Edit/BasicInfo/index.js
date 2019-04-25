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
} from 'antd';

import {
  isInvalid,
  searchFromList,
  refitCommonData,
  refitFieldDecoratorOption,
  formatDatetime,
  buildFieldDescription,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import UpdateFormTab from '@/customComponents/CustomForm/UpdateFormTab';
import FromDisplayItem from '@/customComponents/FromDisplayItem';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ areaManage, global, loading }) => ({
  areaManage,
  global,
  loading: loading.models.areaManage,
}))
@Form.create()
class BasicInfo extends UpdateFormTab {
  componentAuthority = accessWayCollection.areaManage.get;

  goToUpdateWhenProcessed = true;

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      areaManageId: id,
      loadApiPath: 'areaManage/get',
      submitApiPath: 'areaManage/updateBasicInfo',
    };

    return result;
  };

  getApiData = props => {
    const {
      areaManage: { data },
    } = props;

    return data;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { areaManageId: areaManageIdPre } = this.state;

    return areaManageIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { areaManageId: id };
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

  areaManageStateList = () => {
    const { global } = this.props;

    return refitCommonData(global.areaManageStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getAreaManageStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaManageStateList());
    return item == null ? '未知' : item.name;
  };

  formContent = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { metaData, processing, dataLoading, loadSuccess } = this.state;

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
                disabled={dataLoading || processing || !loadSuccess}
                onClick={this.reloadData}
                loading={processing}
              >
                刷新
              </Button>
              <Divider type="vertical" />
              <Button
                type="primary"
                icon="save"
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
                      addonBefore={<Icon type="form" />}
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
                        }
                      )
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.name)}
                      />
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
                        }
                      )
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.phone)}
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
      </Fragment>
    );
  };
}

export default BasicInfo;
