import React from 'react';
import { connect } from 'dva';
import { Form, Card, Button, Row, Col, Spin, BackTop } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
  formatDatetime,
} from '../../../../utils/tools';
import { constants } from '../../../../customConfig/config';
import accessWayCollection from '../../../../customConfig/accessWayCollection';
import HtmlBox from '../../../../customComponents/HtmlBox';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

@connect(({ errorLog, global, loading }) => ({
  errorLog,
  global,
  loading: loading.models.errorLog,
}))
class Index extends TabPageBase {
  componentAuthority = accessWayCollection.errorLog.get;

  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'errorLog/get',
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    values[constants.channelNote.name] = metaData === null ? '' : metaData.channelNote || '';
    values[constants.createTime.name] =
      metaData === null ? '' : formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
    values[constants.updateTime.name] =
      metaData === null ? '' : formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';

    const form = this.getTargetForm();

    form.setFieldsValue(values);
  };

  formContent = () => {
    const { dataLoading, processing, metaData } = this.state;

    return (
      <>
        <div className={styles.containorBox}>
          <Form ref={this.formRef} layout="vertical">
            <Card
              title="基本信息"
              className={styles.card}
              bordered={false}
              extra={
                <>
                  <Button
                    type="default"
                    icon={<ReloadOutlined />}
                    disabled={dataLoading || processing}
                    onClick={() => {
                      this.reloadData();
                    }}
                    loading={processing}
                  >
                    刷新
                  </Button>
                </>
              }
            >
              <Spin spinning={dataLoading || processing}>
                <Row gutter={24}>
                  <Col span={24}>
                    <HtmlBox>{metaData === null ? '' : metaData.message || '无'}</HtmlBox>
                  </Col>
                </Row>
              </Spin>
            </Card>

            <Card title="其他信息" className={styles.card} bordered={false}>
              <Spin spinning={processing}>
                <Row gutter={24}>
                  <Col span={24}>
                    {this.renderFormTextAreaFormItem(
                      fieldData.description,
                      'description',
                      false,
                      buildFieldHelper(fieldData.descriptionHelper),
                      null,
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
