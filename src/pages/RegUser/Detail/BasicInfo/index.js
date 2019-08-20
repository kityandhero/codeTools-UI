import React from 'react';
import { connect } from 'dva';
import { Card, Form, Row, Col, Spin, BackTop, Select, Icon } from 'antd';

import { refitCommonData, searchFromList, isInvalid } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import TabPageBase from '../../TabPageBase';

import { fieldData } from '../../Common/data';
import styles from './index.less';

@connect(({ regUser, global, loading }) => ({
  regUser,
  global,
  loading: loading.models.regUser,
}))
@Form.create()
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.regUser.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      regUserId: null,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      regUserId: id,
      loadApiPath: 'regUser/get',
    };

    return result;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { regUserId } = this.state;

    d.regUserId = regUserId;

    return d;
  };

  regUserTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.regUserTypeList);
  };

  getUserTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.regUserTypeList());
    return item == null ? '未知' : item.name;
  };

  sexList = () => {
    const { global } = this.props;
    return refitCommonData(global.sexList);
  };

  getSexName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.sexList());
    return item == null ? '未知' : item.name;
  };

  orderMessageList = () => [{ flag: 0, name: '不接受' }, { flag: 1, name: '接受' }];

  getOrderMessageName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderMessageList());
    return item == null ? '未知' : item.name;
  };

  administrationAuthorityList = () => [{ flag: 0, name: '关闭' }, { flag: 1, name: '开启' }];

  getAdministrationAuthorityName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.administrationAuthorityList());
    return item == null ? '未知' : item.name;
  };

  formContent = () => {
    const { metaData, processing, dataLoading } = this.state;

    const regUserTypeData = this.regUserTypeList();
    const regUserTypeOption = [];

    regUserTypeData.forEach(item => {
      const { name, flag } = item;
      regUserTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const sexData = this.sexList();
    const sexOption = [];

    sexData.forEach(item => {
      const { name, flag } = item;
      sexOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const orderMessageData = this.orderMessageList();
    const orderMessageOption = [];

    orderMessageData.forEach(item => {
      const { name, flag } = item;
      orderMessageOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const administrationAuthorityData = this.administrationAuthorityList();
    const administrationAuthorityOption = [];

    administrationAuthorityData.forEach(item => {
      const { name, flag } = item;
      administrationAuthorityOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title={
              <>
                <Icon type="contacts" />
                <span className={styles.cardTitle}>基本信息</span>
              </>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.nickname}：${metaData === null ? '' : metaData.nickname || ''}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.type}>
                      {`${fieldData.type}：${
                        metaData === null
                          ? ''
                          : this.getUserTypeName(metaData === null ? 0 : metaData.type || 0)
                      }`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.parentId}：${metaData === null ? '' : metaData.parentId || ''}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.phone}：${metaData === null ? '' : metaData.phone || ''}`}
                    </div>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.noId}：${metaData === null ? '' : metaData.noId || ''}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.email}：${metaData === null ? '' : metaData.email || ''}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.birthday}：${metaData === null ? '' : metaData.birthday || ''}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.sex}：${
                        metaData === null
                          ? ''
                          : this.getSexName(metaData === null ? '' : metaData.sex || '')
                      }`}
                    </div>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.province}：${metaData === null ? '' : metaData.province || ''}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.address}：${metaData === null ? '' : metaData.address || ''}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.isReceiveOTMsg}：${
                        metaData === null
                          ? ''
                          : this.getOrderMessageName(
                              metaData === null ? 0 : metaData.isReceiveOTMsg || 0
                            )
                      }`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.isManage}：${
                        metaData === null
                          ? ''
                          : this.getAdministrationAuthorityName(
                              metaData === null ? 0 : metaData.isManage || 0
                            )
                      }`}
                    </div>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
        </div>
        <BackTop />
      </>
    );
  };
}

export default BasicInfo;
