import React, { Fragment } from 'react';
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
  Select,
  DatePicker,
  notification,
  Icon,
  Affix,
  Upload,
  Modal,
  Divider,
  message,
} from 'antd';

import {
  pretreatmentRemoteSingleData,
  refitFieldDecoratorOption,
  refitCommonData,
  getTokenKeyName,
  stringToMoment,
  dateToMoment,
  corsTarget,
  buildFieldDescription,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import ChangeStoreCountModal from '../../ChangeStoreCountModal';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const { confirm } = Modal;

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.product.get;

  constructor(props) {
    super(props);

    const tokenSetObject = {};
    tokenSetObject[`${getTokenKeyName()}`] = localStorage.getItem(getTokenKeyName()) || '';

    this.state = {
      ...this.state,
      previewVisible: false,
      mainImageUploading: false,
      previewImage: '',
      mainImageUrl: '',
      fileList: [],
      productId: null,
      changeStoreCountModalVisible: false,
      tokenSet: tokenSetObject,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      productId: id,
      loadApiPath: 'product/get',
      submitApiPath: 'product/updateBasicInfo',
    };

    return result;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { productId, mainImageUrl } = this.state;

    d.productId = productId;
    d.mainImageUrl = mainImageUrl;

    return d;
  };

  afterLoadSuccess = d => {
    const { mainImageUrl, imageList } = d;

    const fileList = [];
    (imageList || []).forEach(item => {
      const o = {
        uid: item.id,
        name: '',
        status: 'done',
        url: item.url,
      };
      fileList.push(o);
    });

    this.setState({
      mainImageUrl,
      fileList,
    });
  };

  buyTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.buyTypeList);
  };

  rankList = () => {
    const { global } = this.props;
    return refitCommonData(global.rankList);
  };

  saleTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.saleTypeList);
  };

  unitList = () => {
    const { global } = this.props;
    return refitCommonData(global.unitList);
  };

  productStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.productStateList);
  };

  isUpStoreList = () => {
    const { global } = this.props;
    return refitCommonData(global.isUpStoreList);
  };

  isUpAppList = () => {
    const { global } = this.props;
    return refitCommonData(global.isUpAppList);
  };

  isUpWxList = () => {
    const { global } = this.props;
    return refitCommonData(global.isUpWxList);
  };

  handleUploadCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  beforeMainUpload = file => {
    const isPic =
      file.type === 'image/jpeg' ||
      file.type === 'image/gif' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png';
    if (!isPic) {
      message.error('请上传图片文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片文件不能超过2MB!');
    }

    return isPic && isLt2M;
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleMainUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ mainImageUploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { response } = info.file;

      const v = pretreatmentRemoteSingleData(response);

      const { dataSuccess } = v;

      if (dataSuccess) {
        const {
          data: { imageUrl },
        } = v;

        this.addGalleryImage(imageUrl);

        this.setState({
          mainImageUrl: imageUrl,
        });
      }

      this.setState({
        mainImageUploading: false,
      });
    }
  };

  handleGalleryUploadChange = ({ file, fileList }) => {
    this.setState({ fileList: [...fileList] });

    if (file.status === 'done') {
      const { response } = file;

      const v = pretreatmentRemoteSingleData(response);

      const { dataSuccess } = v;

      if (dataSuccess) {
        const {
          data: { imageUrl },
        } = v;

        this.addGalleryImage(imageUrl);
      }
    }
  };

  addGalleryImage = imageUrl => {
    const { dispatch } = this.props;
    const {
      metaData: { productId },
    } = this.state;

    dispatch({
      type: 'product/addImage',
      payload: {
        productId,
        url: imageUrl,
      },
    }).then(() => {
      if (this.mounted) {
        const {
          product: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '操作通知',
              description: '图片添加成功',
            });
          });
        }
      }
    });
  };

  onGalleryRemove = file => {
    const that = this;

    const { processing, fileList } = that.state;

    confirm({
      title: '删除线路',
      content: `确定要删除图片吗`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        const { dispatch } = that.props;
        const { uid: productImgId } = file;

        that.setState({ processing: true });

        dispatch({
          type: 'product/removeImage',
          payload: {
            productImgId,
          },
        }).then(() => {
          if (that.mounted) {
            const {
              product: { data },
            } = that.props;

            const { dataSuccess } = data;
            if (dataSuccess) {
              const list = [];

              (fileList || []).forEach(item => {
                if (item.uid !== file.uid) {
                  list.push(item);
                }
              });

              that.setState({ fileList: list });

              requestAnimationFrame(() => {
                notification.success({
                  placement: 'bottomRight',
                  message: '操作通知',
                  description: '图片删除成功',
                });
              });
            }

            that.setState({ processing: false });
          }
        });
      },
      onCancel() {
        message.info('取消了删除操作！');
      },
    });

    return false;
  };

  showChangeLineModal = () => {
    const { changeStoreCountModalVisible } = this.state;
    if (!changeStoreCountModalVisible) {
      this.setState({ changeStoreCountModalVisible: true });
    }
  };

  afterChangeLineModalOk = data => {
    this.setState({
      changeStoreCountModalVisible: false,
    });

    const { dataSuccess, message: messageText, clientMessage } = data;
    if (dataSuccess) {
      requestAnimationFrame(() => {
        notification.success({
          placement: 'bottomRight',
          message: '操作通知',
          description: clientMessage,
        });
      });

      this.reloadData();
    } else {
      message.error(messageText);
    }
  };

  afterChangeLineModalCancel = () => {
    this.setState({
      changeStoreCountModalVisible: false,
    });
  };

  formContent = () => {
    const { form } = this.props;
    const {
      metaData,
      processing,
      dataLoading,
      tokenSet,
      previewVisible,
      previewImage,
      fileList,
      mainImageUrl,
      mainImageUploading,
      loadSuccess,
      changeStoreCountModalVisible,
    } = this.state;
    const { getFieldDecorator } = form;

    const buyTypeData = this.buyTypeList();
    const buyTypeOption = [];

    buyTypeData.forEach(item => {
      const { name, flag } = item;
      buyTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const rankData = this.rankList();
    const rankOption = [];

    rankData.forEach(item => {
      const { name, flag } = item;
      rankOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const saleTypeData = this.saleTypeList();
    const saleTypeOption = [];

    saleTypeData.forEach(item => {
      const { name, flag } = item;
      saleTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const unitData = this.unitList();
    const unitOption = [];

    unitData.forEach(item => {
      const { name, flag } = item;
      unitOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const productStateData = this.productStateList();
    const productStateOption = [];

    productStateData.forEach(item => {
      const { name, flag } = item;
      productStateOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const isUpStoreData = this.isUpStoreList();
    const isUpStoreOption = [];

    isUpStoreData.forEach(item => {
      const { name, flag } = item;
      isUpStoreOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const isUpAppData = this.isUpAppList();
    const isUpAppOption = [];

    isUpAppData.forEach(item => {
      const { name, flag } = item;
      isUpAppOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const isUpWxData = this.isUpWxList();
    const isUpWxOption = [];

    isUpWxData.forEach(item => {
      const { name, flag } = item;
      isUpWxOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传新图</div>
      </div>
    );

    const corsUrl = corsTarget();

    const uploadMainProps = {
      action: `${corsUrl}/Product/UploadImage`,
      listType: 'picture-card',
      showUploadList: false,
      onPreview: this.handlePreview,
      beforeUpload: this.beforeMainUpload,
      onChange: this.handleMainUploadChange,
      headers: { ...tokenSet },
    };

    const uploadGalleryProps = {
      action: `${corsUrl}/Product/UploadImage`,
      listType: 'picture-card',
      fileList,
      onPreview: this.handlePreview,
      onChange: this.handleGalleryUploadChange,
      onRemove: this.onGalleryRemove,
      headers: { ...tokenSet },
    };

    return (
      <Fragment>
        <div className={styles.containorBox}>
          <Card
            title="品名、描述与状态"
            className={styles.card}
            bordered={false}
            extra={
              <Affix offsetTop={20}>
                {this.getErrorInfo()}
                <Button
                  icon="reload"
                  disabled={dataLoading || processing || !loadSuccess}
                  onClick={this.reloadData}
                  loading={processing}
                >
                  刷新
                </Button>
                {this.checkAuthority(accessWayCollection.product.updateBasicInfo) ? (
                  <Fragment>
                    <Divider type="vertical" />
                    <Button
                      type="primary"
                      icon="save"
                      disabled={dataLoading || processing || !loadSuccess}
                      onClick={this.validate}
                      loading={processing}
                    >
                      保存
                    </Button>
                  </Fragment>
                ) : null}
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
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
                                required: false,
                                message: buildFieldDescription(fieldData.title),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.title)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.no}>
                      {getFieldDecorator(
                        'no',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.no || '',
                          metaData === null ? '' : metaData.no || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.no),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.no)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <FormItem label={fieldData.subtitle}>
                      {getFieldDecorator(
                        'subtitle',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.subtitle || '',
                          metaData === null ? '' : metaData.subtitle || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.subtitle),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.subtitle)}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.habitat}>
                      {getFieldDecorator(
                        'habitat',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.habitat || '',
                          metaData === null ? '' : metaData.habitat || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.habitat),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.habitat)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.spec}>
                      {getFieldDecorator(
                        'spec',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.spec || '',
                          metaData === null ? '' : metaData.spec || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.spec),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.spec)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.feature}>
                      {getFieldDecorator(
                        'feature',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.feature || '',
                          metaData === null ? '' : metaData.feature || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.feature),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.feature)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.unit}>
                      {getFieldDecorator(
                        'unit',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.unit || '',
                          metaData === null ? '' : metaData.unit || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.unit, '选择'),
                              },
                            ],
                          }
                        )
                      )(
                        <Select
                          placeholder={buildFieldDescription(fieldData.unit, '选择')}
                          // onChange={handleChange}
                        >
                          {unitOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.buyType}>
                      {getFieldDecorator(
                        'buyType',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.buyType || '',
                          metaData === null ? '' : metaData.buyType || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.buyType, '选择'),
                              },
                            ],
                          }
                        )
                      )(
                        <Select
                          placeholder={buildFieldDescription(fieldData.buyType, '选择')}
                          // onChange={handleChange}
                        >
                          {buyTypeOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.rankId}>
                      {getFieldDecorator(
                        'rankId',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.rankId || '',
                          metaData === null ? '' : metaData.rankId || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.rankId),
                              },
                            ],
                          }
                        )
                      )(
                        <Select
                          placeholder={buildFieldDescription(fieldData.rankId, '选择')}
                          // onChange={handleChange}
                        >
                          {rankOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.saleType}>
                      {getFieldDecorator(
                        'saleType',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.saleType || '',
                          metaData === null ? '' : metaData.saleType || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.saleType, '选择'),
                              },
                            ],
                          }
                        )
                      )(
                        <Select
                          placeholder={buildFieldDescription(fieldData.saleType, '选择')}
                          // onChange={handleChange}
                        >
                          {saleTypeOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.state}>
                      {getFieldDecorator(
                        'state',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.state || 0,
                          metaData === null ? 0 : metaData.state || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.state, '选择'),
                              },
                            ],
                          }
                        )
                      )(
                        <Select
                          placeholder={buildFieldDescription(fieldData.state, '选择')}
                          // onChange={handleChange}
                        >
                          {productStateOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={24} md={24} sm={24}>
                    <FormItem label={fieldData.url}>
                      {metaData === null
                        ? ''
                        : `http://liangzi.daiyazy.com/Community/Detail.aspx?pid=${metaData.md5}`}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card title="库存、价格、提成、积分与显示区域" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.storeCount}>
                      <Input
                        addonBefore={<Icon type="shop" />}
                        value={metaData ? (metaData.storeCount ? metaData.storeCount : 0) : 0}
                        disabled={
                          !this.checkAuthority(accessWayCollection.product.updateStoreCount)
                        }
                        readOnly
                        placeholder={buildFieldDescription(fieldData.storeCount)}
                        addonAfter={
                          this.checkAuthority(accessWayCollection.product.updateStoreCount) ? (
                            <Button
                              icon="form"
                              style={{
                                border: '0px solid #d9d9d9',
                                backgroundColor: '#fafafa',
                                height: '30px',
                              }}
                              disabled={dataLoading || processing || !loadSuccess}
                              title="调整库存"
                              onClick={e => this.showChangeLineModal(e)}
                            >
                              调整库存
                            </Button>
                          ) : null
                        }
                      />
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.costPrice}>
                      {getFieldDecorator(
                        'costPrice',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.costPrice || 0,
                          metaData === null ? 0 : metaData.costPrice || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.costPrice),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="money-collect" />}
                          placeholder={buildFieldDescription(fieldData.costPrice)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.stockPrice}>
                      {getFieldDecorator(
                        'stockPrice',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.stockPrice || 0,
                          metaData === null ? 0 : metaData.stockPrice || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.stockPrice),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="money-collect" />}
                          placeholder={buildFieldDescription(fieldData.stockPrice)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.salePrice}>
                      {getFieldDecorator(
                        'salePrice',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.salePrice || 0,
                          metaData === null ? 0 : metaData.salePrice || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.salePrice),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="money-collect" />}
                          placeholder={buildFieldDescription(fieldData.salePrice)}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.appSalePrice}>
                      {getFieldDecorator(
                        'appSalePrice',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.appSalePrice || 0,
                          metaData === null ? 0 : metaData.appSalePrice || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.appSalePrice),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="money-collect" />}
                          placeholder={buildFieldDescription(fieldData.appSalePrice)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.marketPrice}>
                      {getFieldDecorator(
                        'marketPrice',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.marketPrice || 0,
                          metaData === null ? 0 : metaData.marketPrice || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.marketPrice),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="money-collect" />}
                          placeholder={buildFieldDescription(fieldData.marketPrice)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.expressPrice}>
                      {getFieldDecorator(
                        'expressPrice',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.expressPrice || 0,
                          metaData === null ? 0 : metaData.expressPrice || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.expressPrice),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="money-collect" />}
                          placeholder={buildFieldDescription(fieldData.expressPrice)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.returnPrice}>
                      {getFieldDecorator(
                        'returnPrice',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.returnPrice || 0,
                          metaData === null ? 0 : metaData.returnPrice || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.returnPrice),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="money-collect" />}
                          placeholder={buildFieldDescription(fieldData.returnPrice)}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.score}>
                      {getFieldDecorator(
                        'score',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.score || 0,
                          metaData === null ? 0 : metaData.score || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.score),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.score)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.isUpStore}>
                      {getFieldDecorator(
                        'isUpStore',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.isUpStore || 0,
                          metaData === null ? 0 : metaData.isUpStore || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.isUpStore, '选择'),
                              },
                            ],
                          }
                        )
                      )(
                        <Select
                          placeholder={buildFieldDescription(fieldData.isUpStore, '选择')}
                          // onChange={handleChange}
                        >
                          {isUpStoreOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.isUpApp}>
                      {getFieldDecorator(
                        'isUpApp',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.isUpApp || 0,
                          metaData === null ? 0 : metaData.isUpApp || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.isUpApp, '选择'),
                              },
                            ],
                          }
                        )
                      )(
                        <Select
                          placeholder={buildFieldDescription(fieldData.isUpApp, '选择')}
                          // onChange={handleChange}
                        >
                          {isUpAppOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.isUpWx}>
                      {getFieldDecorator(
                        'isUpWx',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.isUpWx || 0,
                          metaData === null ? 0 : metaData.isUpWx || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.isUpWx, '选择'),
                              },
                            ],
                          }
                        )
                      )(
                        <Select
                          placeholder={buildFieldDescription(fieldData.isUpWx, '选择')}
                          // onChange={handleChange}
                        >
                          {isUpWxOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={`${fieldData.userMoreNum}（0为不限购）`}>
                      {getFieldDecorator(
                        'userMoreNum',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.userMoreNum || 0,
                          metaData === null ? 0 : metaData.userMoreNum || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.userMoreNum),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.userMoreNum)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24} />
                  <Col lg={6} md={12} sm={24} />
                  <Col lg={6} md={12} sm={24} />
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
                  <div className={styles.mainImageBox}>
                    <div className={styles.mainImageAction}>
                      <Icon type={mainImageUploading ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">上传</div>
                    </div>
                    {mainImageUrl ? (
                      <img src={mainImageUrl} className={styles.mainImage} alt="avatar" />
                    ) : null}
                  </div>
                </Upload>
              </div>
            </Spin>
          </Card>
          <Card
            title={
              <span>
                图片相册
                <span className={styles.help}>
                  {' '}
                  [相册最大容量为8张图片，大小必须统一640*640（800*800），图片相册的添加和删除将自动保存，产品其他信息请在修改后点击保存按钮!]
                </span>
              </span>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical" />
              <div className="clearfix">
                <Upload {...uploadGalleryProps}>
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleUploadCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </Spin>
          </Card>
          <Card title="分享设置" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Form className="ant-advanced-search-form">
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem label="分享标题">
                      {getFieldDecorator(
                        'keywords',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.keywords || '',
                          metaData === null ? '' : metaData.keywords || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.keywords),
                              },
                            ],
                          }
                        )
                      )(
                        <TextArea
                          placeholder="请输入分享标题"
                          autosize={{ minRows: 3, maxRows: 5 }}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="分享描述">
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
                          }
                        )
                      )(
                        <TextArea
                          placeholder="请输入分享描述"
                          autosize={{ minRows: 3, maxRows: 5 }}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card title="其他设置" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.visitCount}>
                      {getFieldDecorator(
                        'visitCount',
                        refitFieldDecoratorOption(
                          metaData === null ? 0 : metaData.visitCount || 0,
                          metaData === null ? 0 : metaData.visitCount || 0,
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.visitCount),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.visitCount)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.inTime}>
                      {getFieldDecorator(
                        'inTime',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.inTime || '',
                          true,
                          dateToMoment(new Date()),
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.inTime),
                              },
                            ],
                          },
                          v => stringToMoment(v)
                        )
                      )(
                        <DatePicker
                          style={{ width: '100%' }}
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          inputReadOnly
                          disabled
                          placeholder={buildFieldDescription(fieldData.inTime)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24} />
                  <Col lg={6} md={12} sm={24} />
                </Row>
              </Form>
            </Spin>
          </Card>
        </div>
        <ChangeStoreCountModal
          productData={metaData}
          visible={changeStoreCountModalVisible}
          afterOK={this.afterChangeLineModalOk}
          afterCancel={this.afterChangeLineModalCancel}
        />
        <BackTop />
      </Fragment>
    );
  };
}

export default BasicInfo;
