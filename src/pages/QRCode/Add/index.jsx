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
  Upload,
} from 'antd';

import {
  getTokenKeyName,
  formatDatetime,
  corsTarget,
  refitFieldDecoratorOption,
  buildFieldDescription,
  pretreatmentRemoteSingleData,
  getToken,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import AddFormBase from '@/customComponents/Framework/CustomForm/AddFormBase';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ qRCode, global, loading }) => ({
  qRCode,
  global,
  loading: loading.models.qRCode,
}))
@Form.create()
class Index extends AddFormBase {
  componentAuthority = accessWayCollection.qRCode.add;

  constructor(props) {
    super(props);

    const tokenSetObject = {};
    tokenSetObject[`${getTokenKeyName()}`] = getToken() || '';

    this.state = {
      ...this.state,
      ...{
        pageName: '增加二维码',
        submitApiPath: 'qRCode/addBasicInfo',
        imageUploading: false,
        previewImage: '',
        imageUrl: '',
        imageName: '',
        tokenSet: tokenSetObject,
      },
    };
  }

  getApiData = props => {
    const {
      qRCode: { data },
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
      data: { qRCodeId },
    } = data;

    const location = {
      pathname: `/qRCode/edit/load/${qRCodeId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
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
    const { processing, imageUploading, imageUrl, tokenSet } = this.state;
    const { getFieldDecorator } = form;

    const corsUrl = corsTarget();

    const uploadMainProps = {
      action: `${corsUrl}/qRCode/uploadImage`,
      listType: 'picture-card',
      showUploadList: false,
      onPreview: this.handlePreview,
      beforeUpload: this.beforeMainUpload,
      onChange: this.handleMainUploadChange,
      headers: { ...tokenSet },
    };

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
                disabled={processing || imageUploading}
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
                <Col lg={18} md={12} sm={24}>
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
              <Row gutter={24}>
                <Col lg={24} md={24} sm={24}>
                  <FormItem label={fieldData.url}>
                    {getFieldDecorator(
                      'url',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.url),
                          },
                        ],
                      }),
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
          <Spin spinning={processing}>
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
