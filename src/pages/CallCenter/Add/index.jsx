import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  InputNumber,
  Input,
  Spin,
  notification,
  Icon,
  Affix,
} from 'antd';

import { formatDatetime, refitFieldDecoratorOption, buildFieldDescription } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import AddFormBase from '@/customComponents/Framework/CustomForm/AddFormBase';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ callCenter, global, loading }) => ({
  callCenter,
  global,
  loading: loading.models.callCenter,
}))
@Form.create()
class Index extends AddFormBase {
  componentAuthority = accessWayCollection.callCenter.add;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '增加客服',
        submitApiPath: 'callCenter/addBasicInfo',
      },
    };
  }

  getApiData = props => {
    const {
      callCenter: { data },
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

  afterSubmitSuccess = data => {
    const { dispatch } = this.props;

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行下一步操作。',
      });
    });

    const {
      data: { callCenterId },
    } = data;

    const location = {
      pathname: `/callCenter/edit/load/${callCenterId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
  };

  formContent = () => {
    const { form } = this.props;
    const { processing } = this.state;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.containorBox}>
        <Card
          title="基本信息"
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              {this.getErrorInfo()}
              <Button
                type="primary"
                icon="save"
                disabled={processing}
                onClick={this.validate}
                loading={processing}
              >
                保存
              </Button>
            </Affix>
          }
        >
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={12} md={12} sm={24}>
                  <FormItem label={fieldData.title}>
                    {getFieldDecorator(
                      'title',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.title),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.title)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.contactInformation}>
                    {getFieldDecorator(
                      'contactInformation',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.contactInformation),
                          },
                        ],
                      }),
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.contactInformation)}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.sort}>
                    {getFieldDecorator(
                      'sort',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.sort),
                          },
                        ],
                      }),
                    )(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder={buildFieldDescription(fieldData.sort)}
                      />,
                    )}
                  </FormItem>
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
                  <FormItem label="简介描述">
                    {getFieldDecorator(
                      'description',
                      refitFieldDecoratorOption('', '', '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.description),
                          },
                        ],
                      }),
                    )(
                      <TextArea
                        placeholder="请输入分享标题"
                        autosize={{ minRows: 3, maxRows: 5 }}
                      />,
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.inTime}>
                    <Input
                      addonBefore={<Icon type="form" />}
                      value={formatDatetime(new Date(), 'YYYY-MM-DD HH:mm')}
                      disabled
                      placeholder={buildFieldDescription(fieldData.url)}
                    />
                  </FormItem>
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
