import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Input,
  Spin,
  BackTop,
  notification,
  Icon,
  Divider,
  Popconfirm,
} from 'antd';

import {
  pretreatmentRequestParams,
  formatDatetime,
  buildFieldDescription,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import UpdateFormTab from '@/customComponents/Framework/CustomForm/UpdateFormTab';
import FromDisplayItem from '@/customComponents/FromDisplayItem';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@connect(({ distribution, global, loading }) => ({
  distribution,
  global,
  loading: loading.models.distribution,
}))
@Form.create()
class ApplyInfo extends UpdateFormTab {
  componentAuthority = accessWayCollection.distribution.get;

  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'distribution/get',
        submitApiPath: '',
        distributionId: null,
        reason: '',
        handleNote: '',
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

  getApiData = props => {
    const {
      distribution: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { distributionId } = this.state;

    d.distributionId = distributionId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const reason = metaData.reason || '销售奖励金';
    const handleNote = metaData.handleNote || '';

    this.setState({ reason, handleNote });
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

  onReasonChange = o => {
    this.setState({ reason: o.target.value });
  };

  onHandleNoteChange = o => {
    this.setState({ handleNote: o.target.value });
  };

  payByWeChat = () => {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    const { reason, handleNote } = this.state;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { distributionId } = this.state;

      o.distributionId = distributionId;
      o.reason = reason;
      o.handleNote = handleNote;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'distribution/payByWeChat',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const data = this.getApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `操作成功，生成佣金并发送消息！`,
            });
          });

          this.setState({ processing: false }, () => {
            dispatch(
              routerRedux.replace({
                pathname: `${pathname.replace('/load/', '/update/')}`,
              }),
            );
          });
        } else {
          this.setState({ processing: false });
        }
      }
    });
  };

  payByOffline = () => {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    const { reason, handleNote } = this.state;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { distributionId } = this.state;

      o.distributionId = distributionId;
      o.reason = reason;
      o.handleNote = handleNote;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'distribution/payByOffline',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const data = this.getApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `操作成功，生成佣金并发送消息！`,
            });
          });

          this.setState({ processing: false }, () => {
            dispatch(
              routerRedux.replace({
                pathname: `${pathname.replace('/load/', '/update/')}`,
              }),
            );
          });
        } else {
          this.setState({ processing: false });
        }
      }
    });
  };

  // payByBank = () => {
  //   const {
  //     dispatch,
  //     location: { pathname },
  //   } = this.props;

  //   const { processing, loadSuccess } = this.state;

  //   if (!loadSuccess) {
  //     this.requestWhenPreLoad();
  //     return;
  //   }

  //   if (processing) {
  //     this.requestWhenProcessing();
  //     return;
  //   }

  //   const submitData = pretreatmentRequestParams({}, d => {
  //     const o = d;
  //     const { userOrderId } = this.state;

  //     o.userOrderId = userOrderId;

  //     return o;
  //   });

  //   this.setState({ processing: true });

  //   dispatch({
  //     type: 'userOrder/grantBrokerage',
  //     payload: submitData,
  //   }).then(() => {
  //     if (this.mounted) {
  //       const {
  //         userOrder: { data },
  //       } = this.props;

  //       const { dataSuccess } = data;
  //       if (dataSuccess) {
  //         this.reloadData();

  //         requestAnimationFrame(() => {
  //           notification.success({
  //             placement: 'bottomRight',
  //             message: '执行结果',
  //             description: `操作成功，生成佣金并发送消息！`,
  //           });
  //         });
  //       }
  //     }

  //     this.setState({ processing: false }, () => {
  //       dispatch(
  //         routerRedux.replace({
  //           pathname: `${pathname.replace('/load/', '/update/')}`,
  //         })
  //       );
  //     });
  //   });
  // };

  refuse = () => {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    const { reason, handleNote } = this.state;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { distributionId } = this.state;

      o.distributionId = distributionId;
      o.reason = reason;
      o.handleNote = handleNote;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'distribution/refuse',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const data = this.getApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `操作成功，生成佣金并发送消息！`,
            });
          });

          this.setState({ processing: false }, () => {
            dispatch(
              routerRedux.replace({
                pathname: `${pathname.replace('/load/', '/update/')}`,
              }),
            );
          });
        } else {
          this.setState({ processing: false });
        }
      }
    });
  };

  formContent = () => {
    const { metaData, processing, dataLoading, loadSuccess, reason, handleNote } = this.state;

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title={
              <>
                <Icon type="contacts" />
                <span className={styles.cardTitle}>申请信息</span>
              </>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.userId}
                      value={metaData === null ? '' : metaData.userId || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.amount}
                      value={metaData === null ? '' : metaData.amount || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.weChatName}
                      value={metaData === null ? '' : metaData.weChatName || ''}
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.name}
                      value={metaData === null ? '' : metaData.name || ''}
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
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
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.state}
                      value={
                        metaData === null ? '' : this.getDistributionStateName(metaData.state) || ''
                      }
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FromDisplayItem
                      name={fieldData.applyTime}
                      value={
                        metaData === null
                          ? ''
                          : formatDatetime(
                              metaData === null ? '' : metaData.applyTime,
                              'YYYY-MM-DD HH:mm',
                            ) || ''
                      }
                    />
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>

          <Card
            title={
              <>
                <Icon type="contacts" />
                <span className={styles.cardTitle}>申请处理</span>
              </>
            }
            className={styles.card}
            bordered={false}
            extra={
              <>
                {metaData == null ? null : metaData.state === 0 ? (
                  // eslint-disable-next-line react/jsx-indent
                  <>
                    {this.checkAuthority(accessWayCollection.distribution.payByOffline) ? (
                      <Popconfirm
                        placement="top"
                        title="同意并线下处理，确定吗？"
                        onConfirm={e => this.payByOffline(e)}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button
                          type="primary"
                          icon="check-circle"
                          size="small"
                          className={styles.red}
                          disabled={!loadSuccess || processing}
                        >
                          同意并线下处理
                        </Button>
                      </Popconfirm>
                    ) : null}
                    {this.checkAuthority(accessWayCollection.distribution.payByWeChat) ? (
                      <>
                        <Divider type="vertical" />
                        <Popconfirm
                          placement="top"
                          title="同意并微信零钱支付，确定吗？"
                          onConfirm={e => this.payByWeChat(e)}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Button
                            type="primary"
                            icon="check-circle"
                            size="small"
                            className={styles.red}
                            disabled={!loadSuccess || processing}
                          >
                            同意并微信零钱支付
                          </Button>
                        </Popconfirm>
                      </>
                    ) : null}
                    {/* <Divider type="vertical" />
                        <Popconfirm
                          placement="top"
                          title="同意企业支付到银行卡，确定吗？"
                          onConfirm={e => this.payByBank(e)}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Button
                            type="primary"
                            icon="check-circle"
                            size="small"
                            className={styles.red}
                            onClick={this.validate}
                          >
                            同意企业支付到银行卡
                          </Button>
                        </Popconfirm> */}
                    {this.checkAuthority(accessWayCollection.distribution.refuse) ? (
                      <>
                        <Divider type="vertical" />
                        <Popconfirm
                          placement="topLeft"
                          title="拒绝申请，确定吗？"
                          onConfirm={e => this.refuse(e)}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Button
                            type="danger"
                            icon="close-circle"
                            size="small"
                            disabled={!loadSuccess || processing}
                            className={styles.red}
                          >
                            拒绝
                          </Button>
                        </Popconfirm>
                      </>
                    ) : null}
                  </>
                ) : null}
              </>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="horizontal" className={styles.formBox}>
                {metaData === null ? null : metaData.state === 0 ? (
                  <>
                    <FormItem {...formItemLayout} label={fieldData.reason}>
                      <Input
                        value={reason}
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.reason)}
                        onChange={this.onReasonChange}
                      />
                      {/* {getFieldDecorator(
                        'reason',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.reason || 0,
                          metaData === null ? 0 : metaData.reason || 0,
                          '销售奖励金',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.reason),
                              },
                            ],
                          }
                        )
                      )(

                      )} */}
                    </FormItem>
                    <FormItem {...formItemLayout} label={fieldData.handleNote}>
                      <TextArea
                        value={handleNote}
                        placeholder={buildFieldDescription(fieldData.handleNote)}
                        autosize={{ minRows: 3, maxRows: 5 }}
                        onChange={this.onHandleNoteChange}
                      />
                      {/* {getFieldDecorator(
                        'handleNote',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.handleNote || '',
                          metaData === null ? '' : metaData.handleNote || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.handleNote),
                              },
                            ],
                          }
                        )
                      )(

                      )} */}
                    </FormItem>
                  </>
                ) : (
                  <>
                    <FormItem {...formItemLayout} label={fieldData.state}>
                      {metaData === null ? '' : this.getDistributionStateName(metaData.state) || ''}
                    </FormItem>
                    <FormItem {...formItemLayout} label={fieldData.reason}>
                      {metaData === null ? '' : metaData.reason || ''}
                    </FormItem>
                    <FormItem {...formItemLayout} label={fieldData.handleNote}>
                      {metaData === null ? '' : metaData.handleNote || ''}
                    </FormItem>
                  </>
                )}
              </Form>
            </Spin>
          </Card>
        </div>
        <BackTop />
      </>
    );
  };
}

export default ApplyInfo;
