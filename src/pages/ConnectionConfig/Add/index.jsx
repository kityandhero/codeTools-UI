import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Button, Form, Row, Col, Spin, notification, Affix } from 'antd';

import { buildFieldHelper } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import AddFormBase from '../../../customComponents/Framework/CustomForm/AddFormBase';

import { fieldData } from '../Common/data';
import styles from './index.less';

@connect(({ connectionConfig, global, loading }) => ({
  connectionConfig,
  global,
  loading: loading.models.connectionConfig,
}))
@Form.create()
class Index extends AddFormBase {
  componentAuthority = accessWayCollection.connectionConfig.add;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '增加数据连接',
        submitApiPath: 'connectionConfig/addBasicInfo',
      },
    };
  }

  getApiData = props => {
    const {
      connectionConfig: { data },
    } = props;

    return data;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { productId, imageUrl, imageName } = this.state;

    d.productId = productId;
    d.imageUrl = imageUrl;
    d.imageName = imageName;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
    const { dispatch } = this.props;

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行下一步操作。',
      });
    });

    const { connectionId } = singleData;

    const location = {
      pathname: `/connectionConfig/edit/load/${connectionId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
  };

  formContent = () => {
    const { processing } = this.state;

    return (
      <div className={styles.containorBox}>
        <Card
          title="基本信息"
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              <>
                <Button
                  type="primary"
                  icon="save"
                  disabled={processing}
                  onClick={this.validate}
                  loading={processing}
                >
                  保存
                </Button>
              </>
            </Affix>
          }
        >
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={18} md={12} sm={24}>
                  {this.renderFormInputFormItem(
                    fieldData.name,
                    'name',
                    '',
                    true,
                    buildFieldHelper(fieldData.nameHelper)
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderf}
                  {this.renderFormInputFormItem(
                    fieldData.contactInformation,
                    'contactInformation',
                    '',
                    true,
                    buildFieldHelper(fieldData.contactInformationHelper)
                  )}
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>

        <Card title="其他信息" className={styles.card} bordered={false}>
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col span={24}>
                  {this.renderFormTextAreaFormItem(
                    fieldData.description,
                    'description',
                    '',
                    false,
                    buildFieldHelper(fieldData.descriptionHelper),
                    {
                      autoSize: { minRows: 3, maxRows: 5 },
                    }
                  )}
                </Col>
                <Col lg={6} md={12} sm={24}>
                  {this.renderFromCreateTimeField()}
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  };
}

export default Index;
