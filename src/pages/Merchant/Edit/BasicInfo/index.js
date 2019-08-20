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
  Icon,
  Affix,
  Upload,
  message,
} from 'antd';
import { Map, Marker } from 'react-amap';
// import Geolocation from 'react-amap-plugin-geolocation';

import {
  refitFieldDecoratorOption,
  refitCommonData,
  getTokenKeyName,
  buildFieldDescription,
  corsTarget,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import UIPoiPicker from '@/customComponents/AMap/UIPoiPicker';
// import UIPositionPicker from '@/customComponents/AMap/UIPositionPicker';

import TabPageBase from '../../TabPageBase';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

const defaultPoint = [113.672108, 34.749387];

// const pluginProps = {
//   enableHighAccuracy: true,
//   timeout: 10000,
//   isDisplayButton: true,
// };

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
@Form.create()
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.merchant.get;

  constructor(props) {
    super(props);

    const tokenSetObject = {};
    tokenSetObject[`${getTokenKeyName()}`] = localStorage.getItem(getTokenKeyName()) || '';

    this.state = {
      ...this.state,
      cardUrl: null,
      cardUrlUploading: false,
      reverseUrl: null,
      reverseUrlUploading: false,
      mapAddress: '',
      mapLatitude: 0,
      mapLongitude: 0,
      mapCenterPoint: null,
      markerPoint: null,
      geocoder: null,
      merchantId: null,
      tokenSet: tokenSetObject,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      merchantId: id,
      loadApiPath: 'merchant/get',
      submitApiPath: 'merchant/updateBasicInfo',
    };

    return result;
  };

  supplementSubmitRequestParams = o => {
    const d = o;

    const { merchantId, mapAddress, mapLatitude, mapLongitude, cardUrl, reverseUrl } = this.state;

    d.merchantId = merchantId;
    d.cardUrl = cardUrl;
    d.reverseUrl = reverseUrl;
    d.address = mapAddress;
    d.lat = mapLatitude;
    d.lng = mapLongitude;

    return d;
  };

  afterLoadSuccess = d => {
    const { address, lng: longitude, lat: latitude, cardUrl, reverseUrl } = d;

    this.setState(
      {
        mapAddress: address,
        mapLongitude: longitude,
        mapLatitude: latitude,
        cardUrl,
        reverseUrl,
      },
      () => {
        this.setMapPosition(window.AMap);
      }
    );
  };

  onChangeAddress = e => {
    const { value: v } = e.target;

    this.setState({ mapAddress: v });
  };

  onChangeLongitude = e => {
    const { value: v } = e.target;

    this.setState({ mapLongitude: v });
  };

  onChangeLatitude = e => {
    const { value: v } = e.target;

    this.setState({ mapLatitude: v });
  };

  merchantPayList = () => {
    const { global } = this.props;
    return refitCommonData(global.merchantPayList);
  };

  merchantPurchaseList = () => {
    const { global } = this.props;
    return refitCommonData(global.merchantPurchaseList);
  };

  merchantSwitchList = () => {
    const { global } = this.props;
    return refitCommonData(global.merchantSwitchList);
  };

  lineList = () => {
    const { global } = this.props;
    return refitCommonData(global.lineList);
  };

  merchantDisplayList = () => {
    const { global } = this.props;
    return refitCommonData(global.merchantDisplayList);
  };

  beforeImageUpload = file => {
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

  handleCardUrlUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ cardUrlUploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const {
        response: {
          data: { imageUrl },
        },
      } = info.file;

      this.setState({
        cardUrl: imageUrl,
        cardUrlUploading: false,
      });
    }
  };

  handleReverseUrlUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ reverseUrlUploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const {
        response: {
          data: { imageUrl },
        },
      } = info.file;

      this.setState({
        reverseUrl: imageUrl,
        reverseUrlUploading: false,
      });
    }
  };

  setMapPosition = () => {
    const { mapLatitude, mapLongitude } = this.state;

    if (mapLatitude > 0 && mapLongitude > 0) {
      const point = [mapLongitude, mapLatitude];
      this.setState({ mapCenterPoint: point });
      this.setState({ markerPoint: point });
    }
  };

  // afterMapCreated = amapObject => {
  //   const { metaData } = this.state;
  //   const { lat: latitudeData, lng: longitudeData } = metaData || { lat: 0, lng: 0 };

  //   if (latitudeData > 0 && longitudeData > 0) {
  //     const point = new amapObject.LngLat(longitudeData, latitudeData);
  //     this.setPositionInfo(point);
  //   }
  // };

  setMakerPosition = e => {
    const {
      lnglat: { lat: latitudeData, lng: longitudeData },
    } = e;

    if (latitudeData > 0 && longitudeData > 0) {
      const point = [longitudeData, latitudeData];

      this.setState({ mapCenterPoint: point, markerPoint: point }, () => {
        const { geocoder } = this.state;

        if (geocoder != null) {
          geocoder.getAddress(point, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              const address = result.regeocode.formattedAddress;

              const { metaData } = this.state;

              if (metaData !== null) {
                metaData.address = address;
                metaData.latitude = latitudeData;
                metaData.longitude = longitudeData;
              }

              this.setState({
                mapAddress: address,
                mapLatitude: latitudeData,
                mapLongitude: longitudeData,
                // mapPosition: JSON.stringify(position),
                metaData,
              });
            }
          });
        }
      });
      // console.dir(window.AMap);

      // const geocoder = new AMap.Geocoder({
      //   city: '010', //城市设为北京，默认：“全国”
      // });
      // console.dir(geocoder);
    }
  };

  // setPositionInfo = position => {
  //   if (typeof position.position !== 'undefined') {
  //     const { metaData } = this.state;

  //     if (metaData !== null) {
  //       metaData.address = position.address;
  //       metaData.latitude = position.position.lat;
  //       metaData.longitude = position.position.lng;
  //     }

  //     this.setState({
  //       mapAddress: position.address,
  //       mapLatitude: position.position.lat,
  //       mapLongitude: position.position.lng,
  //       // mapPosition: JSON.stringify(position),
  //       metaData,
  //     });
  //   }
  // };

  formContent = () => {
    const { form, dispatch } = this.props;
    const {
      metaData,
      processing,
      dataLoading,
      mapAddress,
      mapLatitude,
      mapLongitude,
      mapCenterPoint,
      markerPoint,
      loadSuccess,
      tokenSet,
      cardUrl,
      cardUrlUploading,
      reverseUrl,
      reverseUrlUploading,
    } = this.state;
    const { getFieldDecorator } = form;

    const merchantPayData = this.merchantPayList();
    const merchantPayOption = [];

    merchantPayData.forEach(item => {
      const { name, flag } = item;
      merchantPayOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const merchantPurchaseData = this.merchantPurchaseList();
    const merchantPurchaseOption = [];

    merchantPurchaseData.forEach(item => {
      const { name, flag } = item;
      merchantPurchaseOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const merchantSwitchData = this.merchantSwitchList();
    const merchantSwitchOption = [];

    merchantSwitchData.forEach(item => {
      const { name, flag } = item;
      merchantSwitchOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const lineData = this.lineList();
    const lineOption = [];

    lineData.forEach(item => {
      const { name, flag } = item;
      lineOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const isMerchantDisplayData = this.merchantDisplayList();
    const isMerchantDisplayOption = [];

    isMerchantDisplayData.forEach(item => {
      const { name, flag } = item;
      isMerchantDisplayOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const corsUrl = corsTarget();

    const uploadCardUrlProps = {
      action: `${corsUrl}/Merchant/UploadImage`,
      listType: 'picture-card',
      showUploadList: false,
      onPreview: this.handlePreview,
      beforeUpload: this.beforeImageUpload,
      onChange: this.handleCardUrlUploadChange,
      headers: { ...tokenSet },
    };

    const uploadReverseUrlProps = {
      action: `${corsUrl}/Merchant/UploadImage`,
      listType: 'picture-card',
      showUploadList: false,
      onPreview: this.handlePreview,
      beforeUpload: this.beforeImageUpload,
      onChange: this.handleReverseUrlUploadChange,
      headers: { ...tokenSet },
    };

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title="站长基本信息"
            className={styles.card}
            bordered={false}
            extra={
              <Affix offsetTop={20}>
                {this.getErrorInfo()}
                {this.checkAuthority(accessWayCollection.merchant.updateBasicInfo) ? (
                  <>
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
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.userId}>
                      {getFieldDecorator(
                        'userId',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.userId || '',
                          metaData === null ? '' : metaData.userId || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          disabled
                          addonBefore={<Icon type="audit" />}
                          placeholder={buildFieldDescription(fieldData.userId)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.mName}>
                      {getFieldDecorator(
                        'mName',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.mName || '',
                          metaData === null ? '' : metaData.mName || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.mName),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.mName)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.realName}>
                      {getFieldDecorator(
                        'realName',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.realName || '',
                          metaData === null ? '' : metaData.realName || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.realName),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.realName)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.phone}>
                      {getFieldDecorator(
                        'phone',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.phone || '',
                          metaData === null ? '' : metaData.phone || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.phone),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          disabled
                          addonBefore={<Icon type="phone" />}
                          placeholder="暂无信息"
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.phoneSpare}>
                      {getFieldDecorator(
                        'phoneSpare',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.phoneSpare || '',
                          metaData === null ? '' : metaData.phoneSpare || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.phoneSpare),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          disabled
                          addonBefore={<Icon type="phone" />}
                          placeholder="暂无信息"
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.cardNo}>
                      {getFieldDecorator(
                        'cardNo',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.cardNo || '',
                          metaData === null ? '' : metaData.cardNo || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.cardNo),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          disabled
                          addonBefore={<Icon type="idcard" />}
                          placeholder="暂无信息"
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.bankName}>
                      {getFieldDecorator(
                        'bankName',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.bankName || '',
                          metaData === null ? '' : metaData.bankName || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.bankName),
                              },
                            ],
                          }
                        )
                      )(
                        <Input disabled addonBefore={<Icon type="form" />} placeholder="暂无信息" />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.bankNo}>
                      {getFieldDecorator(
                        'bankNo',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.bankNo || '',
                          metaData === null ? '' : metaData.bankNo || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.bankNo),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          disabled
                          addonBefore={<Icon type="credit-card" />}
                          placeholder="暂无信息"
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card title="状态与设置" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.isPay}>
                      {getFieldDecorator(
                        'isPay',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.isPay || '',
                          metaData === null ? '' : metaData.isPay || '',
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.isPay),
                              },
                            ],
                          }
                        )
                      )(
                        <Select placeholder={buildFieldDescription(fieldData.isPay, '选择')}>
                          {merchantPayOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.isClose}>
                      {getFieldDecorator(
                        'isClose',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.isClose || '',
                          metaData === null ? '' : metaData.isClose || '',
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.isClose),
                              },
                            ],
                          }
                        )
                      )(
                        <Select placeholder={buildFieldDescription(fieldData.isClose, '选择是否')}>
                          {merchantPurchaseOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.isCloseShop}>
                      {getFieldDecorator(
                        'isCloseShop',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.isCloseShop || '',
                          metaData === null ? '' : metaData.isCloseShop || '',
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.isCloseShop),
                              },
                            ],
                          }
                        )
                      )(
                        <Select placeholder={buildFieldDescription(fieldData.isCloseShop, '选择')}>
                          {merchantSwitchOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.lineId}>
                      {getFieldDecorator(
                        'lineId',
                        refitFieldDecoratorOption(
                          metaData === null ? '0' : metaData.lineId || '0',
                          metaData === null ? '0' : metaData.lineId || '0',
                          '0',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.lineId),
                              },
                            ],
                          }
                        )
                      )(
                        <Select placeholder={buildFieldDescription(fieldData.lineId, '选择')}>
                          {lineOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.isDisplay}>
                      {getFieldDecorator(
                        'isDisplay',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.isDisplay || '',
                          metaData === null ? '' : metaData.isDisplay || '',
                          0,
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.isDisplay),
                              },
                            ],
                          }
                        )
                      )(
                        <Select
                          placeholder={buildFieldDescription(fieldData.isMerchantDisplay, '选择')}
                        >
                          {isMerchantDisplayOption}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card title="证件信息" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.cardUrl}>
                      <div className="clearfix">
                        <Upload {...uploadCardUrlProps}>
                          <div className={styles.mainImageBox}>
                            <div className={styles.mainImageAction}>
                              <Icon type={cardUrlUploading ? 'loading' : 'plus'} />
                              <div className="ant-upload-text">上传</div>
                            </div>
                            {cardUrl ? (
                              <img src={cardUrl} className={styles.mainImage} alt="cardInfo" />
                            ) : null}
                          </div>
                        </Upload>
                      </div>
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.reverseUrl}>
                      <div className="clearfix">
                        <Upload {...uploadReverseUrlProps}>
                          <div className={styles.mainImageBox}>
                            <div className={styles.mainImageAction}>
                              <Icon type={reverseUrlUploading ? 'loading' : 'plus'} />
                              <div className="ant-upload-text">上传</div>
                            </div>
                            {reverseUrl ? (
                              <img src={reverseUrl} className={styles.mainImage} alt="cardInfo" />
                            ) : null}
                          </div>
                        </Upload>
                      </div>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card title="所在地信息" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.cityName}>
                      <Input
                        disabled
                        addonBefore={<Icon type="form" />}
                        value={metaData === null ? '' : metaData.cityName || ''}
                        placeholder={buildFieldDescription(fieldData.cityName)}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.address}>
                      <Input
                        addonBefore={<Icon type="environment" />}
                        placeholder={buildFieldDescription(fieldData.address)}
                        defaultValue={mapAddress}
                        value={mapAddress}
                        onChange={e => {
                          this.onChangeAddress(e);
                        }}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.longitude}>
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.longitude)}
                        defaultValue={mapLongitude}
                        value={mapLongitude}
                        readOnly
                        onChange={e => {
                          this.onChangeLongitude(e);
                        }}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.latitude}>
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.latitude)}
                        defaultValue={mapLatitude}
                        value={mapLatitude}
                        readOnly
                        onChange={e => {
                          this.onChangeLatitude(e);
                        }}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={24} md={24} sm={24}>
                    <FormItem label={fieldData.map}>
                      {getFieldDecorator(
                        'map',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.map || '',
                          metaData === null ? '' : metaData.map || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.map),
                              },
                            ],
                          }
                        )
                      )(
                        <div className={styles.mapBox}>
                          <div className={styles.searchBox}>
                            <Input
                              className={styles.searchEl}
                              id="pickerInput"
                              placeholder="在此输入地址检索"
                              addonBefore="地址检索"
                            />
                          </div>
                          <div className={styles.mapInnerBox}>
                            <Map
                              key="editMap"
                              amapkey="bff966857f8311eb68ea03dcbac869ad"
                              // version="1.4.6"
                              zoom="16"
                              center={mapCenterPoint || defaultPoint}
                              useAMapUI
                              touchZoom
                              scrollWheel
                              zoomEnable
                              events={{
                                created: () => {
                                  dispatch({
                                    type: 'global/setAMapObject',
                                    payload: window.AMap,
                                  });

                                  window.AMap.plugin('AMap.Geocoder', () => {
                                    const geocoder = new window.AMap.Geocoder({});
                                    this.setState({ geocoder });
                                  });
                                },
                                click: e => {
                                  this.setMakerPosition(e);
                                },
                              }}
                            >
                              <Marker position={markerPoint || defaultPoint} />
                              {/* <Geolocation {...pluginProps} /> */}
                              <UIPoiPicker />
                              {/* <UIPositionPicker callback={this.setPositionInfo} /> */}
                            </Map>
                          </div>
                        </div>
                      )}
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
