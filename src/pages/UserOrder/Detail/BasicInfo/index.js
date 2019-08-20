import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  Button,
  Form,
  Spin,
  Table,
  BackTop,
  Popconfirm,
  notification,
  Affix,
  Divider,
  Descriptions,
  message,
} from 'antd';

import {
  isInvalid,
  formatMoneyToChinese,
  isNumber,
  isMoney,
  searchFromList,
  refitCommonData,
  pretreatmentRequestParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import Ellipsis from '@/customComponents/Ellipsis';

import TabPageBase from '../../TabPageBase';
// import ChangePayModal from '../ChangePayModal';

// import { fieldData } from '../../Common/data';
import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ userOrder, global, loading }) => ({
  userOrder,
  global,
  loading: loading.models.userOrder,
}))
@Form.create()
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.userOrder.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      userOrderId: null,
      stateCode: null,
      changePayModalVisible: false,
      totalProductAmount: 0,
      realyPayPrice: 0,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      userOrderId: id,
      loadApiPath: 'userOrder/get',
    };

    return result;
  };

  supplementSubmitRequestParams = o => {
    const d = o;

    const { userOrderId } = this.state;

    d.userOrderId = userOrderId;

    return d;
  };

  afterLoadSuccess = d => {
    const { state: stateCode, totalProductAmount, realyPayPrice } = d;

    this.setState({
      stateCode,
      totalProductAmount,
      realyPayPrice,
    });
  };

  orderStatusList = () => {
    const { global } = this.props;
    return refitCommonData(global.orderStatusList);
  };

  getOrderStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderStatusList());
    return item == null ? '未知' : item.name;
  };

  payTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.payTypeList);
  };

  getPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.payTypeList());
    return item == null ? '未知' : item.name;
  };

  requestWhenProcessing = () => {
    message.warn('其他操作正在进行，请稍后再尝试哦！');
  };

  requestWhenPreLoad = () => {
    message.warn('数据正在加载，请稍后再尝试哦！');
  };

  repairOrder = () => {
    const { processing, loadSuccess } = this.state;

    if (!loadSuccess) {
      this.requestWhenPreLoad();
      return;
    }

    if (processing) {
      this.requestWhenProcessing();
      return;
    }

    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { userOrderId } = this.state;

      o.userOrderId = userOrderId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'userOrder/repairOrder',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          userOrder: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `订单支付修复成功！`,
            });
          });
        }
      }

      this.setState({ processing: false });
    });
  };

  sendOut = () => {
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
      const { userOrderId } = this.state;

      o.userOrderId = userOrderId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'userOrder/sendOut',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          userOrder: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `操作成功，订单已发货！`,
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

  grantBrokerage = () => {
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
      const { userOrderId } = this.state;

      o.userOrderId = userOrderId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'userOrder/grantBrokerage',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          userOrder: { data },
        } = this.props;

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

  withdrawBrokerage = () => {
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
      const { userOrderId } = this.state;

      o.userOrderId = userOrderId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'userOrder/withdrawBrokerage',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          userOrder: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `操作成功，已撤回佣金！`,
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

  finishOrder = () => {
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
      const { userOrderId } = this.state;

      o.userOrderId = userOrderId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'userOrder/finishOrder',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          userOrder: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `操作成功，已完成订单！`,
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

  closeOrder = () => {
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
      const { userOrderId } = this.state;

      o.userOrderId = userOrderId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'userOrder/closeOrder',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          userOrder: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `操作成功，已关闭订单！`,
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

  refund = () => {
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
      const { userOrderId } = this.state;

      o.userOrderId = userOrderId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'userOrder/refund',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          userOrder: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '执行结果',
              description: `操作成功，已退款！`,
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

  saleTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.saleTypeList);
  };

  unitList = () => {
    const { global } = this.props;
    return refitCommonData(global.unitList);
  };

  getUnitName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.unitList());
    return item == null ? '未知' : item.name;
  };

  // showChangePayModal = () => {
  //   const { changePayModalVisible } = this.state;
  //   if (!changePayModalVisible) {
  //     this.setState({ changePayModalVisible: true });
  //   }
  // };

  // afterChangePayModalOk = data => {
  //   const {
  //     dispatch,
  //     location: { pathname },
  //   } = this.props;

  //   this.setState({
  //     changePayModalVisible: false,
  //   });

  //   const { dataSuccess, message: messageText, clientMessage } = data;
  //   if (dataSuccess) {
  //     message.success(clientMessage, 4);

  //     this.reloadData();

  //     dispatch(
  //       routerRedux.replace({
  //         pathname: `${pathname.replace('/load/', '/update/')}`,
  //       })
  //     );
  //   } else {
  //     message.error(messageText);
  //   }
  // };

  // afterChangePayModalCancel = () => {
  //   this.setState({
  //     changePayModalVisible: false,
  //   });
  // };

  formContent = () => {
    const {
      metaData,
      processing,
      dataLoading,
      stateCode,
      // userOrderId,
      // totalProductAmount,
      // realyPayPrice,
      // changePayModalVisible,
    } = this.state;

    const itemList = [];
    // let oneData = {};
    let dataCount = 0;
    let totalCount = 0;
    let totalAmount = 0;
    let totalScore = 0;

    if (metaData !== null) {
      (metaData.itemList || []).forEach(o => {
        const v = o;
        v.key = o.productId;
        v.other = '--';
        itemList.push(v);

        totalCount += o.count;
        totalAmount += o.price;
        totalScore += o.score;
      });

      dataCount = (itemList || []).length;

      itemList.push({
        key: 'sum',
        title: '总计',
        count: totalCount,
        score: totalScore,
        price: totalAmount.toFixed(2),
        other: '--',
      });

      // if (dataCount === 1) {
      //   [oneData] = itemList;
      // }
    }

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === dataCount) {
        obj.props.colSpan = 0;
      }
      return obj;
    };

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'title',
        width: 200,
        align: 'left',
        render: (text, row, index) => {
          if (index < dataCount) {
            return (
              <Ellipsis tooltip lines={1}>
                {text}
              </Ellipsis>
            );
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width: 200,
        align: 'left',
        render: renderContent,
      },
      {
        title: '单位',
        dataIndex: 'unit',
        width: 100,
        align: 'center',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'purchasePrice',
        width: 100,
        align: 'center',
        render: renderContent,
      },
      {
        title: '数量',
        dataIndex: 'count',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index < dataCount.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '积分',
        dataIndex: 'score',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index < dataCount.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'price',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index < dataCount.length) {
            return <span>{text}</span>;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '其他信息',
        dataIndex: 'other',
        align: 'right',
        render: val => (
          <>
            <Ellipsis tooltip lines={1}>
              {val || '--'}
            </Ellipsis>
          </>
        ),
      },
    ];

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title="综合信息"
            className={styles.card}
            bordered={false}
            extra={
              <Affix offsetTop={20}>
                {this.getErrorInfo()}
                {stateCode === 1 && this.checkAuthority(accessWayCollection.userOrder.sendOut) ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      title="确认发货，确定吗？"
                      onConfirm={e => this.sendOut(e)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="primary" icon="save" size="small" className={styles.darkGreen}>
                        确认发货
                      </Button>
                    </Popconfirm>
                    <Divider type="vertical" />
                  </>
                ) : null}
                {this.checkAuthority(accessWayCollection.userOrder.grantBrokerage) ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      title="生成佣金并发送消息，确定吗？"
                      onConfirm={e => this.grantBrokerage(e)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="primary" icon="save" size="small" className={styles.red}>
                        生成佣金并发送消息
                      </Button>
                    </Popconfirm>
                    <Divider type="vertical" />
                  </>
                ) : null}
                {this.checkAuthority(accessWayCollection.userOrder.withdrawBrokerage) ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      title="撤回佣金，确定吗？"
                      onConfirm={e => this.withdrawBrokerage(e)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="primary" icon="save" size="small" className={styles.green}>
                        撤回佣金
                      </Button>
                    </Popconfirm>
                    <Divider type="vertical" />
                  </>
                ) : null}
                {this.checkAuthority(accessWayCollection.userOrder.finishOrder) ? (
                  <>
                    <Popconfirm
                      placement="bottom"
                      title="完成订单，确定吗？"
                      onConfirm={e => this.finishOrder(e)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="primary" icon="save" size="small" className={styles.green}>
                        完成订单
                      </Button>
                    </Popconfirm>
                  </>
                ) : null}

                {/* <Divider type="vertical" />
                <Popconfirm
                  placement="bottom"
                  title="打印小票，确定吗？"
                  // onConfirm={e => this.setSingleLineComplete(e)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    type="primary"
                    icon="save"
                    size="small"
                    className={styles.green}

                  >
                    打印小票
                  </Button>
                </Popconfirm> */}
                {/* <Divider type="vertical" />
                <Popconfirm
                  placement="bottom"
                  title="打印订单，确定吗？"
                  // onConfirm={e => this.setSingleLineComplete(e, record)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    type="primary"
                    icon="print"
                    size="small"
                    className={styles.green}

                  >
                    打印订单
                  </Button>
                </Popconfirm> */}
                {/* <Divider type="vertical" />
                <Popconfirm
                  placement="bottom"
                  title="打印同城快递，确定吗？"
                  // onConfirm={e => this.setSingleLineComplete(e, record)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    type="primary"
                    icon="print"
                    size="small"
                    className={styles.green}

                  >
                    打印同城快递
                  </Button>
                </Popconfirm> */}
                {/* <Divider type="vertical" />
                <Popconfirm
                  placement="bottom"
                  title="撤回出库，确定吗？"
                  onConfirm={e => this.setSingleLineComplete(e)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    type="primary"
                    icon="print"
                    size="small"
                    className={styles.red}
                    disabled={!loadSuccess}


                  >
                    撤回出库
                  </Button>
                </Popconfirm> */}
                {this.checkAuthority(accessWayCollection.userOrder.closeOrder) ? (
                  <>
                    <Divider type="vertical" />
                    <Popconfirm
                      placement="bottom"
                      title="关闭订单，确定吗？"
                      onConfirm={e => this.closeOrder(e)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="primary" icon="print" size="small" className={styles.red}>
                        关闭订单
                      </Button>
                    </Popconfirm>
                  </>
                ) : null}
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Descriptions
                title={`订单信息 [流水号：${metaData === null ? '' : metaData.tradeNo || ''}]`}
                size="large"
                style={{ marginBottom: 32 }}
              >
                <Description label="配送费">
                  {isMoney(metaData === null ? '' : metaData.courierPrice)
                    ? `￥${metaData === null ? '' : metaData.courierPrice}`
                    : ''}
                </Description>
                <Description label="合计金额">
                  {isMoney(metaData === null ? '' : metaData.totalAmount)
                    ? `￥${metaData === null ? '' : metaData.totalAmount}`
                    : ''}{' '}
                  ({formatMoneyToChinese(metaData === null ? '' : metaData.totalAmount)})
                </Description>
                <Description label="下单时间">
                  {metaData === null ? '' : metaData.beginTime || ''}
                </Description>
                <Description label="支付时间">
                  {metaData === null ? '' : metaData.payTime || ''}
                </Description>
                <Description label="收货人">
                  {metaData === null
                    ? ''
                    : `${metaData.sendConsignee} | ${metaData.sendPhone}` || ''}
                </Description>
                <Description label="收货地址">
                  {metaData === null
                    ? ''
                    : `  ${metaData.sendAddress} | ${metaData.sendStreetAddress}` || ''}
                </Description>
                <Description label="备注信息">
                  {metaData === null ? '无备注' : metaData.content || '无备注'}
                </Description>
                <Description label="站长信息">
                  {`${metaData === null ? '' : metaData.merchantInfo.mName || ''} ${
                    metaData === null ? '' : metaData.merchantInfo.realName || ''
                  }`}
                </Description>
              </Descriptions>
              <Divider style={{ marginBottom: 32 }} />
              <div className={styles.title}>订单商品</div>
              <Table columns={columns} dataSource={itemList} pagination={false} />
            </Spin>
          </Card>
          <Card
            title="支付、返佣与退款"
            className={styles.card}
            bordered={false}
            extra={
              <>
                {this.checkAuthority(accessWayCollection.userOrder.repairOrder) ? (
                  <>
                    <Popconfirm
                      placement="top"
                      title="修正支付信息，确定吗？"
                      onConfirm={e => this.repairOrder(e)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="primary" icon="edit" size="small" className={styles.orange}>
                        修正支付信息
                      </Button>
                    </Popconfirm>
                  </>
                ) : null}
                {/* <Divider type="vertical" />
                <Button
                  type="primary"
                  icon="edit"
                  size="small"
                  className={styles.orange}
                  onClick={this.showChangePayModal}
                >
                  修改实收金额
                </Button> */}
              </>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Descriptions
                className={styles.headerList}
                // size="small"
                col="3"
              >
                <Description label="支付状态">
                  {this.getOrderStatusName(metaData === null ? '' : metaData.state, '--')}
                </Description>
                <Description label="支付方式">
                  {metaData === null ? '' : metaData.payTypeNote}
                </Description>
                <Description label="商品总金额">
                  {isMoney(metaData === null ? '' : metaData.totalProductAmount)
                    ? `${metaData === null ? '' : metaData.totalProductAmount}`
                    : ''}
                  元
                </Description>
                <Description label="配送费用">
                  {isMoney(metaData === null ? '' : metaData.courierPrice)
                    ? `${metaData === null ? '' : metaData.courierPrice}`
                    : ''}
                  元
                </Description>
                <Description label="发票税金">
                  {isMoney(metaData === null ? '' : metaData.invoiceTaxes)
                    ? `${metaData === null ? '' : metaData.invoiceTaxes}`
                    : ''}
                  元
                </Description>
                <Description label="积分总计">
                  {isNumber(metaData === null ? '' : metaData.totalScore)
                    ? `${metaData === null ? '' : metaData.totalScore}`
                    : ''}
                  分
                </Description>
                <Description label="订单总金额">
                  {isMoney(metaData === null ? '' : metaData.totalAmount)
                    ? `${metaData === null ? '' : metaData.totalAmount}`
                    : ''}
                  元
                </Description>
                <Description label="是否返还佣金">
                  {metaData === null ? '' : metaData.isReturnMoney}
                </Description>
                <Description label="退款金额">
                  {isMoney(metaData === null ? '' : metaData.returnMoney)
                    ? `${metaData === null ? '' : metaData.returnMoney}`
                    : ''}
                  元
                </Description>
                <Description label="退款原因">
                  {metaData === null ? '' : metaData.returnNote || ''}
                </Description>
              </Descriptions>
            </Spin>
          </Card>
          <Card title="会员信息" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Descriptions
                className={styles.headerList}
                // size="small"
                col="4"
              >
                <Description label="会员昵称">
                  {metaData === null ? '' : metaData.userName || ''}
                </Description>
                <Description label="账户余额">
                  {isMoney(metaData === null ? '' : metaData.userInfo.accountMoney)
                    ? `${metaData === null ? '' : metaData.userInfo.accountMoney}`
                    : ''}
                  元
                </Description>
                <Description label="账户积分">
                  {isNumber(metaData === null ? '' : metaData.userInfo.integral)
                    ? `${metaData === null ? '' : metaData.userInfo.integral}`
                    : ''}
                  分
                </Description>
              </Descriptions>
            </Spin>
          </Card>
          <Card title="配送信息" className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Descriptions
                className={styles.headerList}
                // size="small"
                col="2"
              >
                <Description label="配送人员">
                  {metaData === null ? '' : metaData.expressName || ''}
                </Description>
                <Description label="配送说明">
                  {metaData === null ? '' : metaData.explain || ''}
                </Description>
                <Description label="收件地址">
                  {metaData === null
                    ? ''
                    : `${metaData.sendConsignee} | ${metaData.sendPhone} | ${metaData.sendAddress} | ${metaData.sendStreetAddress}` ||
                      ''}
                </Description>
              </Descriptions>
            </Spin>
          </Card>
        </div>
        {/* <ChangePayModal
          userOrderId={userOrderId}
          productAmount={totalProductAmount}
          payAmount={realyPayPrice}
          visible={changePayModalVisible}
          afterOK={this.afterChangePayModalOk}
          afterCancel={this.afterChangePayModalCancel}
        /> */}
        <BackTop />
      </>
    );
  };
}

export default BasicInfo;
