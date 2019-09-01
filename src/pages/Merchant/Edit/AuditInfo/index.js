import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Spin,
  BackTop,
  notification,
  Affix,
  Popconfirm,
  Divider,
} from 'antd';
import { Map, Marker } from 'react-amap';

import {
  pretreatmentRequestParams,
  refitFieldDecoratorOption,
  buildFieldDescription,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import FromDisplayItem from '@/customComponents/FromDisplayItem';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

const FormItem = Form.Item;

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
@Form.create()
class AuditInfo extends TabPageBase {
  componentAuthority = accessWayCollection.merchant.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'merchant/get',
        cardUrl: null,
        reverseUrl: null,
        mapAddress: '',
        mapLatitude: 0,
        mapLongitude: 0,
        mapCenterPoint: [0, 0],
        merchantId: null,
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
    const { merchantId } = this.state;

    d.merchantId = merchantId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const { address, lng: longitude, lat: latitude, cardUrl, reverseUrl } = metaData;

    this.setState({
      mapAddress: address,
      mapLongitude: longitude,
      mapLatitude: latitude,
      cardUrl,
      reverseUrl,
    });
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

  pass = () => {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    const { processing, loadSuccess } = this.state;

    if (!loadSuccess) {
      this.requestWhenPreLoad();
      return;
    }

    if (processing) {
      this.requestWhenProcessing();
      return;
    }

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { merchantId } = this.state;

      o.merchantId = merchantId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'merchant/pass',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          merchant: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `设置审核通过成功！`,
            });
          });
        }
      }

      this.setState({ processing: false }, () => {
        dispatch(
          routerRedux.replace({
            pathname: `${pathname.replace('/load/', '/update/')}`,
          }),
        );
      });
    });
  };

  refuse = () => {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    const { processing, loadSuccess } = this.state;

    if (!loadSuccess) {
      this.requestWhenPreLoad();
      return;
    }

    if (processing) {
      this.requestWhenProcessing();
      return;
    }

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { merchantId } = this.state;

      o.merchantId = merchantId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'merchant/refuse',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          merchant: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `驳回申请成功！`,
            });
          });
        }
      }

      this.setState({ processing: false }, () => {
        dispatch(
          routerRedux.replace({
            pathname: `${pathname.replace('/load/', '/update/')}`,
          }),
        );
      });
    });
  };

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
      loadSuccess,
      cardUrl,
      reverseUrl,
    } = this.state;
    const { getFieldDecorator } = form;

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title="站长基本信息"
            className={styles.card}
            bordered={false}
            extra={
              (metaData === null ? -1 : metaData.state === null ? -1 : metaData.state) === 0 ? (
                <>
                  <Affix offsetTop={20}>
                    {this.getErrorInfo()}
                    {this.checkAuthority(accessWayCollection.merchant.pass) ? (
                      <Popconfirm
                        placement="bottomRight"
                        title="通过审核，确定吗？"
                        onConfirm={e => this.pass(e)}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button
                          type="primary"
                          icon="check"
                          disabled={dataLoading || processing || !loadSuccess}
                          loading={processing}
                        >
                          通过
                        </Button>
                      </Popconfirm>
                    ) : null}
                    {this.checkAuthority(accessWayCollection.userOrder.pass) &&
                    this.checkAuthority(accessWayCollection.userOrder.refuse) ? (
                      <Divider type="vertical" />
                    ) : null}
                    {this.checkAuthority(accessWayCollection.merchant.refuse) ? (
                      <Popconfirm
                        placement="bottomRight"
                        title="驳回申请，确定吗？"
                        onConfirm={e => this.refuse(e)}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button
                          type="danger"
                          icon="close"
                          disabled={dataLoading || processing || !loadSuccess}
                          loading={processing}
                        >
                          驳回
                        </Button>
                      </Popconfirm>
                    ) : null}
                  </Affix>
                </>
              ) : (
                <>{this.getMerchantStatusName(metaData == null ? -1 : metaData.state || -1)}</>
              )
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Form>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.userId}
                      value={metaData === null ? '' : metaData.userId || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.mName}
                      value={metaData === null ? '' : metaData.mName || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.realName}
                      value={metaData === null ? '' : metaData.realName || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.phone}
                      value={metaData === null ? '' : metaData.phone || ''}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.phoneSpare}
                      value={metaData === null ? '' : metaData.phoneSpare || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.cardNo}
                      value={metaData === null ? '' : metaData.cardNo || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.bankName}
                      value={metaData === null ? '' : metaData.bankName || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.bankNo}
                      value={metaData === null ? '' : metaData.bankNo || ''}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.isPay}
                      value={this.getMerchantPayName(metaData === null ? 0 : metaData.isPay || 0)}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.isClose}
                      value={this.getIsMerchantPurchaseName(
                        metaData === null ? 0 : metaData.isClose || 0,
                      )}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.isCloseShop}
                      value={this.getMerchantSwitchName(
                        metaData === null ? 0 : metaData.isCloseShop || 0,
                      )}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.lineId}
                      value={this.getLineName(metaData === null ? '' : metaData.lineId || '')}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.isDisplay}
                      value={this.getIsMerchantDisplayName(
                        metaData === null ? 0 : metaData.isDisplay || 0,
                      )}
                    />
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
                        <div className={styles.mainImageBox}>
                          <img
                            src={cardUrl || '/noCardImage.jpg'}
                            className={styles.mainImage}
                            alt="cardInfo"
                          />
                        </div>
                      </div>
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.reverseUrl}>
                      <div className="clearfix">
                        <div className={styles.mainImageBox}>
                          <img
                            src={reverseUrl || '/noCardImage.jpg'}
                            className={styles.mainImage}
                            alt="cardInfo"
                          />
                        </div>
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
                  <Col lg={4} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.cityName}
                      value={metaData === null ? '' : metaData.cityName || ''}
                    />
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.address}
                      value={metaData === null ? '' : mapAddress || ''}
                    />
                  </Col>
                  <Col lg={4} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.longitude}
                      value={metaData === null ? '' : mapLongitude || ''}
                    />
                  </Col>
                  <Col lg={4} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.latitude}
                      value={metaData === null ? '' : mapLatitude || ''}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={24} md={24} sm={24}>
                    <FormItem label={fieldData.mapShow}>
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
                          },
                        ),
                      )(
                        <div className={styles.mapBox}>
                          <div className={styles.mapInnerBox}>
                            <Map
                              key="auditMap"
                              amapkey="bff966857f8311eb68ea03dcbac869ad"
                              // version="1.4.6"
                              zoom="16"
                              center={mapCenterPoint}
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
                                },
                              }}
                            >
                              <Marker position={mapCenterPoint} />
                            </Map>
                          </div>
                        </div>,
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

export default AuditInfo;
