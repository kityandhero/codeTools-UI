import React from 'react';
import { connect } from 'dva';
import { Card, Form, Row, Col, Spin, BackTop, Icon } from 'antd';

import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
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
      ...{
        loadApiPath: 'regUser/get',
        regUserId: null,
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

  supplementSubmitRequestParams = o => {
    const d = o;
    const { regUserId } = this.state;

    d.regUserId = regUserId;

    return d;
  };

  formContent = () => {
    const { metaData, processing, dataLoading } = this.state;

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
                          : this.getUserSexName(metaData === null ? '' : metaData.sex || '')
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
                              metaData === null ? 0 : metaData.isReceiveOTMsg || 0,
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
                              metaData === null ? 0 : metaData.isManage || 0,
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
