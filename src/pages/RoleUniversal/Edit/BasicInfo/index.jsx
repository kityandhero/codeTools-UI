import React from 'react';
import { connect } from 'umi';
import { Card, Form, Row, Col, Spin, Icon } from 'antd';

import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import FromDisplayItem from '@/customComponents/FromDisplayItem';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import styles from './index.less';

@connect(({ roleTemplate, global, loading }) => ({
  roleTemplate,
  global,
  loading: loading.models.roleTemplate,
}))
@Form.create()
class Index extends TabPageBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'roleTemplate/get',
        submitApiPath: 'roleTemplate/updateBasicInfo',
        roleTemplateId: null,
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
      roleTemplate: { data },
    } = props;

    return data;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { roleTemplateId } = this.state;

    d.roleTemplateId = roleTemplateId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { roleTemplateId } = this.state;

    d.roleTemplateId = roleTemplateId;

    return d;
  };

  formContent = () => {
    const { metaData, processing, dataLoading } = this.state;

    return (
      <>
        <Card title={this.renderBasicInfoTitle()} className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col lg={24} md={12} sm={24}>
                <FromDisplayItem
                  name={fieldData.name}
                  value={metaData === null ? '' : metaData.name || ''}
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col lg={24} md={12} sm={24}>
                <FromDisplayItem
                  name={fieldData.description}
                  value={metaData === null ? '' : metaData.description || ''}
                />
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card
          title={
            <>
              <Icon type="contacts" />
              <span className={styles.cardTitle}>其他信息</span>
            </>
          }
          className={styles.card}
          bordered={false}
        >
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col lg={6} md={12} sm={24}>
                <FromDisplayItem
                  name={fieldData.moduleCount}
                  value={metaData === null ? '' : metaData.moduleCount || '0'}
                />
              </Col>
              <Col lg={6} md={12} sm={24}>
                <FromDisplayItem
                  name={fieldData.channel}
                  value={metaData === null ? '' : metaData.channelNote || ''}
                />
              </Col>
              <Col lg={6} md={12} sm={24}>
                <FromDisplayItem
                  name={fieldData.createTime}
                  value={metaData === null ? '' : metaData.createTime || ''}
                />
              </Col>
            </Row>
          </Spin>
        </Card>
      </>
    );
  };
}

export default Index;
