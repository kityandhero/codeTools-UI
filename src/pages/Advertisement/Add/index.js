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
  Select,
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
  refitCommonData,
  pretreatmentRemoteSingleData,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import AddFormBase from '@/customComponents/Framework/CustomForm/AddFormBase';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ advertisement, global, loading }) => ({
  advertisement,
  global,
  loading: loading.models.advertisement,
}))
@Form.create()
class Index extends AddFormBase {
  componentAuthority = accessWayCollection.advertisement.add;

  constructor(props) {
    super(props);

    const tokenSetObject = {};
    tokenSetObject[`${getTokenKeyName()}`] = localStorage.getItem(getTokenKeyName()) || '';

    this.state = {
      ...this.state,
      imageUploading: false,
      previewImage: '',
      imageUrl: '',
      imageName: '',
      tokenSet: tokenSetObject,
    };
  }

  getApiData = props => {
    const {
      advertisement: { data },
    } = props;

    return data;
  };

  initState = () => {
    const result = {
      pageName: '增加广告',
      submitApiPath: 'advertisement/addBasicInfo',
    };

    return result;
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
      data: { advertisementId },
    } = data;

    const location = {
      pathname: `/advertisement/edit/load/${advertisementId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
  };

  advertisementClassList = () => {
    const { global } = this.props;
    return refitCommonData(global.advertisementClassList);
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

    const advertisementClassData = this.advertisementClassList();
    const advertisementClassOption = [];

    advertisementClassData.forEach(item => {
      const { name, flag } = item;
      advertisementClassOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.title)}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.classId}>
                    {getFieldDecorator(
                      'classId',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: true,
                            message: buildFieldDescription(fieldData.classId),
                          },
                        ],
                      })
                    )(
                      <Select placeholder={buildFieldDescription(fieldData.classId, '选择')}>
                        {advertisementClassOption}
                      </Select>
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
                      })
                    )(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder={buildFieldDescription(fieldData.sort)}
                      />
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
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.url)}
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
