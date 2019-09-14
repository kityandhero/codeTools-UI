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
  Upload,
  InputNumber,
} from 'antd';

import {
  getTokenKeyName,
  formatDatetime,
  corsTarget,
  refitFieldDecoratorOption,
  buildFieldDescription,
  pretreatmentRemoteSingleData,
  getDerivedStateFromPropsForUrlParams,
  getToken,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import { parseUrlParamsForSetState } from '../../Assist/config';
import TabPageBase from '../../TabPageBase';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ advertisement, global, loading }) => ({
  advertisement,
  global,
  loading: loading.models.advertisement,
}))
@Form.create()
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.advertisement.get;

  constructor(props) {
    super(props);

    const tokenSetObject = {};
    tokenSetObject[`${getTokenKeyName()}`] = getToken() || '';

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'advertisement/get',
        submitApiPath: 'advertisement/updateBasicInfo',
        advertisementId: null,
        imageUploading: false,
        previewImage: '',
        imageUrl: '',
        imageName: '',
        tokenSet: tokenSetObject,
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
    const { advertisementId, imageUrl, imageName } = this.state;

    d.advertisementId = advertisementId;
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
    const { dataLoading, processing, imageUploading, imageUrl, tokenSet, metaData } = this.state;
    const { getFieldDecorator } = form;

    const corsUrl = corsTarget();

    const uploadMainProps = {
      action: `${corsUrl}/advertisement/uploadImage`,
      listType: 'picture-card',
      showUploadList: false,
      onPreview: this.handlePreview,
      beforeUpload: this.beforeMainUpload,
      onChange: this.handleMainUploadChange,
      headers: { ...tokenSet },
    };

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
                  disabled={dataLoading || processing || imageUploading}
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
                    {this.renderFormAdvertisementClassFormItem(
                      metaData === null ? '' : metaData.classId || '',
                    )}
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
                <Row gutter={24}>
                  <Col lg={24} md={24} sm={24}>
                    <FormItem label={fieldData.url}>
                      {getFieldDecorator(
                        'url',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.url || '',
                          metaData === null ? '' : metaData.url || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.url),
                              },
                            ],
                          },
                        ),
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.url)}
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
              <span>
                图片展示
                <span className={styles.help}>
                  {' '}
                  [大小必须统一640*640（800*800），上传后需点击保存按钮保存！]
                </span>
              </span>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <div className="clearfix">
                <Upload {...uploadMainProps}>
                  <div className={styles.imageBox}>
                    <div className={styles.imageAction}>
                      <Icon type={imageUploading ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">上传</div>
                    </div>
                    {imageUrl ? <img src={imageUrl} className={styles.image} alt="avatar" /> : null}
                  </div>
                </Upload>
              </div>
            </Spin>
          </Card>
          <Card title="其他信息" className={styles.card} bordered={false}>
            <Spin spinning={processing}>
              <Form layout="vertical">
                <Row gutter={24}>
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
