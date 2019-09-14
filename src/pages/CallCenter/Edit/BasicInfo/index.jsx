import React from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Input,
  Spin,
  BackTop,
  notification,
  Icon,
  Affix,
  InputNumber,
} from 'antd';

import {
  formatDatetime,
  refitFieldDecoratorOption,
  buildFieldDescription,
  pretreatmentRemoteSingleData,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ callCenter, global, loading }) => ({
  callCenter,
  global,
  loading: loading.models.callCenter,
}))
@Form.create()
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.callCenter.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'callCenter/get',
        submitApiPath: 'callCenter/updateBasicInfo',
        callCenterId: null,
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

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const { imageName, imageUrl } = metaData;

    this.setState({ imageName, imageUrl });
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { callCenterId, imageUrl, imageName } = this.state;

    d.callCenterId = callCenterId;
    d.imageUrl = imageUrl;
    d.imageName = imageName;

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

  handleMainUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ imageUploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { response } = info.file;

      const v = pretreatmentRemoteSingleData(response);

      const { dataSuccess } = v;

      if (dataSuccess) {
        const {
          data: { imageUrl, name },
        } = v;

        this.setState({
          imageUrl,
          imageName: name,
        });
      }

      this.setState({
        imageUploading: false,
      });
    }
  };

  formContent = () => {
    const { form } = this.props;
    const { dataLoading, processing, metaData } = this.state;
    const { getFieldDecorator } = form;

    return (
      <>
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
                  disabled={dataLoading || processing}
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
                  <Col lg={12} md={12} sm={24}>
                    <FormItem label={fieldData.title}>
                      {getFieldDecorator(
                        'title',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.title || '',
                          metaData === null ? '' : metaData.title || '',
                          '',
                          {
                            rules: [
                              {
                                required: true,
                                message: buildFieldDescription(fieldData.title),
                              },
                            ],
                          },
                        ),
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
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.contactInformation || '',
                          metaData === null ? '' : metaData.contactInformation || '',
                          '',
                          {
                            rules: [
                              {
                                required: true,
                                message: buildFieldDescription(fieldData.contactInformation),
                              },
                            ],
                          },
                        ),
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
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.sort || '',
                          metaData === null ? '' : metaData.sort || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.sort),
                              },
                            ],
                          },
                        ),
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
                          },
                        ),
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
        <BackTop />
      </>
    );
  };
}

export default BasicInfo;
