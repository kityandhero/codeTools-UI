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
  Select,
  DatePicker,
  notification,
  Icon,
  Affix,
  Modal,
  Divider,
  message,
} from 'antd';

import {
  pretreatmentRemoteSingleData,
  refitFieldDecoratorOption,
  getTokenKeyName,
  stringToMoment,
  buildFieldDescription,
  getDerivedStateFromPropsForUrlParams,
  getToken,
  buildFieldHelper,
  getMomentNow,
  dateToMoment,
  formatDatetime,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import { goodsTypeCollection } from '@/utils/customConfig';

import TabPageBase from '../../TabPageBase';
import ChangeStoreCountModal from '../../ChangeStoreCountModal';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const { confirm } = Modal;

@connect(({ discountActivities, global, loading }) => ({
  discountActivities,
  global,
  loading: loading.models.discountActivities,
}))
@Form.create()
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.discountActivities.get;

  constructor(props) {
    super(props);

    const tokenSetObject = {};
    tokenSetObject[`${getTokenKeyName()}`] = getToken() || '';

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'discountActivities/get',
        submitApiPath: 'discountActivities/updateBasicInfo',
        discountActivitiesId: null,
        changeStoreCountModalVisible: false,
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
    const { discountActivitiesId, mainImageUrl } = this.state;

    d.discountActivitiesId = discountActivitiesId;
    d.mainImageUrl = mainImageUrl;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const { mainImageUrl, imageList, saleTimeMode } = metaData;

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
      saleTimeSwitch: saleTimeMode !== 0,
      saleTimeModeSelected: saleTimeMode,
    });
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
      metaData: { discountActivitiesId },
    } = this.state;

    dispatch({
      type: 'discountActivities/addImage',
      payload: {
        discountActivitiesId,
        url: imageUrl,
      },
    }).then(() => {
      if (this.mounted) {
        const {
          discountActivities: { data },
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
        const { uid: discountActivitiesImgId } = file;

        that.setState({ processing: true });

        dispatch({
          type: 'discountActivities/removeImage',
          payload: {
            discountActivitiesImgId,
          },
        }).then(() => {
          if (that.mounted) {
            const {
              discountActivities: { data },
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

  showChangeStoreCountModal = () => {
    const { changeStoreCountModalVisible } = this.state;
    if (!changeStoreCountModalVisible) {
      this.setState({ changeStoreCountModalVisible: true });
    }
  };

  afterChangeStoreCountModalOk = data => {
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

  afterChangeStoreCountModalCancel = () => {
    this.setState({
      changeStoreCountModalVisible: false,
    });
  };

  onSaleTimeSwitch() {
    const { saleTimeSwitch, saleTimeModeSelected } = this.state;

    this.setState({
      saleTimeSwitch: !saleTimeSwitch,
      saleTimeModeSelected: !saleTimeSwitch ? 1 : saleTimeModeSelected,
    });
  }

  formContent = () => {
    const { form } = this.props;
    const {
      metaData,
      processing,
      dataLoading,
      loadSuccess,
      changeStoreCountModalVisible,
    } = this.state;
    const { getFieldDecorator } = form;

    const discountActivitiesStateData = this.discountActivitiesStateList();
    const discountActivitiesStateOption = [];

    discountActivitiesStateData.forEach(item => {
      const { name, flag } = item;
      discountActivitiesStateOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title="名称、商品信息"
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
                {this.checkAuthority(accessWayCollection.discountActivities.updateBasicInfo) ? (
                  <>
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
                  </>
                ) : null}
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={12} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.activitiesTitle,
                      'activitiesTitle',
                      metaData === null ? '' : metaData.activitiesTitle || '',
                      true,
                      buildFieldHelper(fieldData.activitiesTitleUpdateHelper),
                      'form',
                      { disabled: true },
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24} />
                </Row>
                {metaData != null ? (
                  <>
                    {metaData.goodsType === goodsTypeCollection.product ? (
                      <Row gutter={24}>
                        <Col lg={12} md={12} sm={24}>
                          {this.renderFormInputFormItem(
                            fieldData.goodsTitle,
                            'goodsTitle',
                            metaData.goods != null ? metaData.goods.title || '' : '',
                            false,
                            null,
                            'form',
                            { disabled: true },
                            false,
                          )}
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                          {this.renderFormInputFormItem(
                            fieldData.goodsSpec,
                            'spec',
                            metaData.goods != null ? metaData.goods.spec || '' : '',
                            false,
                            null,
                            'form',
                            { disabled: true },
                            false,
                          )}
                        </Col>
                      </Row>
                    ) : null}
                  </>
                ) : null}
              </Form>
            </Spin>
          </Card>
          <Card title="售卖设置" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem
                      label={fieldData.activitiesStoreCount}
                      extra={buildFieldHelper(fieldData.activitiesStoreCountUpdateHelper)}
                    >
                      <Input
                        addonBefore={<Icon type="shop" />}
                        value={
                          metaData
                            ? metaData.activitiesStoreCount
                              ? metaData.activitiesStoreCount
                              : 0
                            : 0
                        }
                        disabled={
                          !this.checkAuthority(accessWayCollection.product.updateStoreCount)
                        }
                        readOnly
                        placeholder={buildFieldDescription(
                          fieldData.activitiesStoreCountUpdateHelper,
                        )}
                        addonAfter={
                          this.checkAuthority(
                            accessWayCollection.discountActivities.updateStoreCount,
                          ) ? (
                            <Button
                              icon="form"
                              style={{
                                border: '0px solid #d9d9d9',
                                backgroundColor: '#fafafa',
                                height: '30px',
                              }}
                              disabled={dataLoading || processing || !loadSuccess}
                              title="调整库存"
                              onClick={e => this.showChangeStoreCountModal(e)}
                            >
                              调整库存
                            </Button>
                          ) : null
                        }
                      />
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.activitiesSalePrice,
                      'activitiesSalePrice',
                      metaData === null ? '' : metaData.activitiesSalePrice || '',
                      true,
                      buildFieldHelper(fieldData.activitiesSalePriceUpdateHelper),
                      'form',
                      { disabled: true },
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.stockPrice,
                      'stockPrice',
                      metaData === null ? '' : metaData.stockPrice || '',
                      true,
                      buildFieldHelper(fieldData.stockPriceUpdateHelper),
                      'form',
                      { disabled: true },
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.inviterRewardPrice,
                      'inviterRewardPrice',
                      metaData === null ? '' : metaData.inviterRewardPrice || '',
                      true,
                      buildFieldHelper(fieldData.inviterRewardPriceUpdateHelper),
                      'form',
                      { disabled: true },
                      false,
                    )}
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.orderExpireMinute,
                      'orderExpireMinute',
                      metaData === null ? '' : metaData.orderExpireMinute || '',
                      true,
                      buildFieldHelper(fieldData.orderExpireMinuteUpdateHelper),
                      'form',
                      { disabled: true },
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.isCanRefund,
                      'isCanRefund',
                      metaData === null ? '' : metaData.isCanRefund ? '是' : '否',
                      true,
                      buildFieldHelper(fieldData.isCanRefundUpdateHelper),
                      'form',
                      { disabled: true },
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.limitCustomerByCount,
                      'limitCustomerByCount',
                      metaData === null ? '' : metaData.limitCustomerByCount || 0,
                      true,
                      buildFieldHelper(fieldData.limitCustomerByCountUpdateHelper),
                      'form',
                      { disabled: true },
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.limitMerchantByCount,
                      'limitMerchantByCount',
                      metaData === null ? '' : metaData.limitMerchantByCount || 0,
                      true,
                      buildFieldHelper(fieldData.limitMerchantByCountUpdateHelper),
                      'form',
                      { disabled: true },
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.saleStartTime,
                      'saleStartTime',
                      formatDatetime(
                        metaData == null ? '' : metaData.saleStartTime,
                        'YYYY-MM-DD HH:mm:ss',
                        '',
                      ),
                      true,
                      buildFieldHelper(fieldData.saleStartTimeUpdateHelper),
                      'form',
                      { disabled: true },
                      false,
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem
                      label={fieldData.saleEndTime}
                      extra={buildFieldHelper(fieldData.saleEndTimeHelper)}
                    >
                      {getFieldDecorator(
                        'saleEndTime',
                        refitFieldDecoratorOption(
                          metaData === null
                            ? null
                            : stringToMoment(metaData.saleEndTime || '') || null,
                          true,
                          dateToMoment(new Date()),
                          {
                            rules: [
                              {
                                required: true,
                                message: buildFieldDescription(fieldData.saleEndTime),
                              },
                            ],
                          },
                          v => stringToMoment(v),
                        ),
                      )(
                        <DatePicker
                          style={{ width: '100%' }}
                          showTime={{
                            minuteStep: 60,
                            secondStep: 60,
                          }}
                          format="YYYY-MM-DD HH:00:00"
                          inputReadOnly
                          disabledDate={current => {
                            return (
                              current &&
                              current <
                                getMomentNow()
                                  .add('day', -1)
                                  .endOf('day')
                            );
                          }}
                          placeholder={buildFieldDescription(fieldData.saleEndTime, '选择')}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card title="分享设置" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Form className="ant-advanced-search-form">
                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem label={fieldData.shareTitle}>
                      {getFieldDecorator(
                        'shareTitle',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.shareTitle || '',
                          metaData === null ? '' : metaData.shareTitle || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.shareTitle),
                              },
                            ],
                          },
                        ),
                      )(
                        <TextArea
                          placeholder={buildFieldDescription(fieldData.shareTitle)}
                          autosize={{ minRows: 3, maxRows: 5 }}
                        />,
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label={fieldData.shareDescription}>
                      {getFieldDecorator(
                        'shareDescription',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.shareDescription || '',
                          metaData === null ? '' : metaData.shareDescription || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.shareDescription),
                              },
                            ],
                          },
                        ),
                      )(
                        <TextArea
                          placeholder={buildFieldDescription(fieldData.shareDescription)}
                          autosize={{ minRows: 3, maxRows: 5 }}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card
            title="宣传海报"
            className={styles.card}
            bordered={false}
            extra="暂不可设置，即将开放"
          >
            <Spin spinning={dataLoading || processing}>
              <Form className="ant-advanced-search-form">
                <Row gutter={24}>
                  <Col lg={24} md={24} sm={24}>
                    <FormItem label={fieldData.posterImageUrl}>
                      {getFieldDecorator(
                        'posterImageUrl',
                        refitFieldDecoratorOption('', null, '', {
                          rules: [
                            {
                              required: false,
                              message: buildFieldDescription(fieldData.posterImageUrl),
                            },
                          ],
                        }),
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          disabled
                          placeholder={buildFieldDescription(fieldData.posterImageUrl)}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card title="系统备注信息" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={24} md={12} sm={24}>
                    <FormItem label={fieldData.note} extra={buildFieldHelper(fieldData.noteHelper)}>
                      {getFieldDecorator(
                        'note',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.note || '',
                          metaData === null ? '' : metaData.note || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.note),
                              },
                            ],
                          },
                        ),
                      )(
                        <TextArea
                          placeholder={buildFieldDescription(fieldData.note)}
                          autosize={{ minRows: 3, maxRows: 5 }}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
        </div>
        <ChangeStoreCountModal
          externalData={metaData}
          visible={changeStoreCountModalVisible}
          afterOK={this.afterChangeStoreCountModalOk}
          afterCancel={this.afterChangeStoreCountModalCancel}
        />
        <BackTop />
      </>
    );
  };
}

export default BasicInfo;
