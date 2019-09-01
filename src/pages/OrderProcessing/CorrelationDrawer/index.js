import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Button, Drawer, Icon, Popconfirm, Divider, notification, message } from 'antd';

import { toNumber } from '@/utils/tools';
import { printAllOrder, printChildOrder, printChildA4Order } from '@/utils/print';
import ListDrawer from '@/customComponents/Framework/CustomList/SingleList/ListDrawer';

import ChangeLineModal from '../ChangeLineModal';
import styles from './index.less';

@connect(({ orderProcessing, global, loading }) => ({
  orderProcessing,
  global,
  loading: loading.models.orderProcessing,
}))
@Form.create()
class CorrelationDrawer extends ListDrawer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'orderProcessing/listMerchant',
        tableScroll: null,
        lineId: null,
        stateCode: -10000,
        lineRecord: null,
        changeLineModalVisible: false,
        currentMerchant: null,
        printedCommunity: [],
        printedA4: [],
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, title, lineId, lineRecord, stateCode } = nextProps;

    return { visible, title, lineId, lineRecord, stateCode };
  }

  getApiData = props => {
    const {
      orderProcessing: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    // 设置界面效果为加载中，减少用户误解
    this.setState({ dataLoading: true, metaListData: [] });

    const that = this;

    setTimeout(() => {
      that.reloadData();
    }, 700);
  };

  supplementLoadRequestParams = d => {
    const o = d;
    const { lineId, stateCode } = this.state;

    o.lineId = lineId;
    o.state = stateCode;

    return o;
  };

  showChangeLineModal = (e, record) => {
    const { changeLineModalVisible } = this.state;
    if (!changeLineModalVisible) {
      this.setState({ currentMerchant: record }, () => {
        this.setState({ changeLineModalVisible: true });
      });
    }
  };

  refreshParentData = () => {
    const { afterOperateSuccess } = this.props;

    if (typeof afterOperateSuccess === 'function') {
      afterOperateSuccess();
    }
  };

  afterChangeLineModalOk = data => {
    this.setState({
      changeLineModalVisible: false,
    });

    const { dataSuccess, message: messageText, clientMessage } = data;
    if (dataSuccess) {
      message.success(clientMessage, 4);

      this.reloadData();
      this.refreshParentData();
    } else {
      message.error(messageText);
    }
  };

  afterChangeLineModalCancel = () => {
    this.setState({
      changeLineModalVisible: false,
    });
  };

  setIgnoreOutbound = (e, record) => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/toggleIgnoreOutboundMerchant',
      payload: {
        merchantId: record.merchantId,
      },
    }).then(() => {
      if (this.mounted) {
        const {
          orderProcessing: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();
          this.refreshParentData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomLeft',
              message: '出库操作执行结果',
              description: `社区’${record.mName}‘已经设置${
                record.ignoreOutbound || false ? '暂不' : ''
              }出库`,
            });
          });
        }

        this.setState({ processing: false });
      }
    });
  };

  setCommunityOutbound = (e, record) => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setCommunityOutbound',
      payload: {
        merchantId: record.merchantId,
      },
    }).then(() => {
      if (this.mounted) {
        const {
          orderProcessing: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();
          this.refreshParentData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomLeft',
              message: '出库操作执行结果',
              description: `社区’${record.mName}‘已经设置出库`,
            });
          });
        }

        this.setState({ processing: false });
      }
    });
  };

  setCommunityPrint = (e, record) => {
    const { dispatch, stateCode } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setCommunityPrint',
      payload: {
        merchantId: record.merchantId,
        state: stateCode,
      },
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        const {
          data: { header, body },
        } = data;

        printChildOrder(header, body);

        const { printedCommunity } = this.state;
        const printedCommunitySet = new Set(printedCommunity);
        printedCommunitySet.add(record.merchantId);

        this.setState({ printedCommunity: Array.from(printedCommunitySet) });

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomLeft',
            message: '出库操作执行结果',
            description: `社区’${record.mName}‘打印三联总单已经传送打印机`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setSinglePrint = (e, record) => {
    const { dispatch, stateCode } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSinglePrint',
      payload: {
        merchantId: record.merchantId,
        state: stateCode,
      },
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          const {
            data: { header, body },
          } = data;

          printChildA4Order(header, body);

          const { printedA4 } = this.state;
          const printedA4dSet = new Set(printedA4);
          printedA4dSet.add(record.merchantId);

          this.setState({ printedA4: Array.from(printedA4dSet) });

          notification.success({
            placement: 'bottomLeft',
            message: '出库操作执行结果',
            description: `社区’${record.mName}‘打印A4分单已经传送打印机`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  // setCommunityTransport = (e, record) => {
  //   const { dispatch } = this.props;

  //   this.setState({ processing: true });

  //   dispatch({
  //     type: 'orderProcessing/setCommunityTransport',
  //     payload: {
  //       merchantId: record.merchantId,
  //     },
  //   }).then(() => {
  //     const {
  //       orderProcessing: { data },
  //     } = this.props;

  //     const { dataSuccess } = data;
  //     if (dataSuccess) {
  //       this.reloadData();
  //       this.refreshParentData();

  //       requestAnimationFrame(() => {
  //         notification.success({
  //           placement: 'bottomLeft',
  //           message: '出库操作执行结果',
  //           description: `社区’${record.mName}‘已设置配送`,
  //         });
  //       });
  //     }

  //     this.setState({ processing: false });
  //   });
  // };

  setSingleLineOutbound = () => {
    const { dispatch } = this.props;
    const { lineRecord } = this.state;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLineOutbound',
      payload: {
        lineId: lineRecord.lineId,
      },
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        this.reloadData();
        this.refreshParentData();

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomLeft',
            message: '出库操作执行结果',
            description: `线路 ${lineRecord.name} 已经设置开始出库`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setSingleLineTransport = () => {
    const { dispatch } = this.props;
    const { lineRecord } = this.state;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLineTransport',
      payload: {
        lineId: lineRecord.lineId,
      },
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        this.reloadData();
        this.refreshParentData();

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '配送操作执行结果',
            description: `线路 ${lineRecord.name} 已经设置开始配送`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setSingleLineComplete = () => {
    const { dispatch } = this.props;
    const { lineRecord, stateCode } = this.state;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLineComplete',
      payload: {
        lineId: lineRecord.lineId,
        state: stateCode,
      },
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        this.reloadData();
        this.refreshParentData();

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '配送完成操作执行结果',
            description: `线路 ${lineRecord.name} 已经设置配送完成`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setSingleLinePrint = () => {
    const { dispatch } = this.props;
    const { stateCode, lineRecord } = this.state;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLinePrint',
      payload: {
        lineId: lineRecord.lineId,
        state: stateCode,
      },
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        const {
          data: { header, body },
        } = data;

        printAllOrder(header, body);

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomLeft',
            message: '打印操作执行结果',
            description: `线路 ${lineRecord.name} 已经传输给打印机。`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  goToEdit = (e, record) => {
    const { dispatch } = this.props;
    const { merchantId } = record;
    const { stateCode } = this.state;
    const location = {
      pathname: `/orderProcessing/edit/load/${merchantId}/${stateCode}/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  getColumn = () => {
    const { stateCode } = this.props;
    const { lineRecord, printedCommunity, printedA4 } = this.state;

    const printedCommunitySet = new Set(printedCommunity);
    const printedA4Set = new Set(printedA4);
    const lineRecordCheck = lineRecord || {
      name: '',
      needDistribution: true,
      disabled: true,
      canOperate: false,
    };

    return [
      {
        title: '社区信息',
        dataIndex: 'lineId',
        align: 'left',
        render: (val, record) => (
          <>
            <span className={styles.communityName}>{record.mName}</span>
            <span className={styles.communityMerchant}>
              {`${record.realName}*${lineRecordCheck.name}`} 共
              <span style={{ color: '#5632ED' }}>{record.userOrderTotalCount}</span>
              件商品，共计
              <span style={{ color: '#98541a' }}> {record.userOrderTotalAmount}</span>元
              <span style={{ color: '#f71a1a' }}>
                {record.ignoreOutbound || false ? '（今日不配送）' : ''}
              </span>
            </span>
          </>
        ),
      },
      {
        title: '操作',
        width: 556,
        align: 'right',
        // fixed: 'right',
        render: (text, record) => (
          <>
            {record.ignoreOutbound || false ? (
              <a className={styles.actionButton} disabled>
                <Icon type="swap" className={styles.editButton} />
                切换线路
              </a>
            ) : (
              <a
                className={styles.actionButton}
                disabled={
                  lineRecord.outbound === 100 ||
                  lineRecord.outbound === 200 ||
                  lineRecord.outbound === 300
                }
                onClick={e => this.showChangeLineModal(e, record)}
              >
                <Icon type="swap" className={styles.editButton} />
                切换线路
              </a>
            )}
            {toNumber(stateCode) === 1 && !lineRecordCheck.needDistribution ? (
              !(record.ignoreOutbound || false) ? (
                <>
                  <Divider type="vertical" />
                  {lineRecord.outbound === 100 ||
                  lineRecord.outbound === 200 ||
                  lineRecord.outbound === 300 ? (
                    <a className={styles.actionButton} disabled>
                      <Icon type="clock-circle" className={styles.editButton} />
                      设置暂不出库
                    </a>
                  ) : (
                    <Popconfirm
                      placement="topRight"
                      title="设置今日暂不出库，设置后该社区今日不能变更线路，确定吗？"
                      onConfirm={e => this.setIgnoreOutbound(e, record)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <a className={styles.actionButton}>
                        <Icon type="clock-circle" className={styles.editButton} />
                        设置暂不出库
                      </a>
                    </Popconfirm>
                  )}
                </>
              ) : (
                <>
                  <Divider type="vertical" />
                  {lineRecord.outbound === 100 ||
                  lineRecord.outbound === 200 ||
                  lineRecord.outbound === 300 ? (
                    <a className={`${styles.actionButton}`} disabled>
                      <Icon type="undo" className={styles.editButton} />
                      恢复今日出库
                    </a>
                  ) : (
                    <Popconfirm
                      placement="topRight"
                      title="将恢复今日出库，确定吗？"
                      onConfirm={e => this.setIgnoreOutbound(e, record)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <a className={`${styles.actionButton} ${styles.undo}`}>
                        <Icon type="undo" className={styles.editButton} />
                        恢复今日出库
                      </a>
                    </Popconfirm>
                  )}
                </>
              )
            ) : null}
            {!lineRecordCheck.needDistribution ? (
              lineRecord.outbound === 100 ||
              lineRecord.outbound === 200 ||
              lineRecord.outbound === 300 ? (
                <>
                  <Divider type="vertical" />
                  {record.ignoreOutbound || false ? (
                    <a className={styles.actionButton} disabled>
                      <Icon type="printer" className={styles.editButton} />
                      打印三联单社区总单
                    </a>
                  ) : (
                    <Popconfirm
                      placement="topRight"
                      title="将打印三联单社区总单，确定吗？"
                      onConfirm={e => this.setCommunityPrint(e, record)}
                      onCancel={e => this.setCommunityPrintCancel(e, record)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <a
                        className={[
                          styles.actionButton,
                          printedCommunitySet.has(record.merchantId) || record.hasPrinted
                            ? styles.orange
                            : null,
                        ]}
                      >
                        <Icon type="printer" className={styles.editButton} />
                        {printedCommunitySet.has(record.merchantId) || record.hasPrinted
                          ? '重打'
                          : '打印'}
                        三联单社区总单
                      </a>
                    </Popconfirm>
                  )}
                </>
              ) : (
                <>
                  <Divider type="vertical" />
                  <a className={styles.actionButton} disabled>
                    <Icon type="printer" className={styles.editButton} />
                    打印三联单社区总单
                  </a>
                </>
              )
            ) : null}
            {!lineRecordCheck.needDistribution ? (
              lineRecord.outbound === 100 ||
              lineRecord.outbound === 200 ||
              lineRecord.outbound === 300 ? (
                <>
                  <Divider type="vertical" />
                  {record.ignoreOutbound || false ? (
                    <a className={styles.actionButton} disabled>
                      <Icon type="printer" className={styles.editButton} />
                      打印A4分单
                    </a>
                  ) : (
                    <Popconfirm
                      placement="topRight"
                      title="将打印A4分单，确定吗？"
                      onConfirm={e => this.setSinglePrint(e, record)}
                      onCancel={e => this.setSinglePrintCancel(e, record)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <a
                        className={[
                          styles.actionButton,
                          printedA4Set.has(record.merchantId) || record.hasEveryonePrinted
                            ? styles.orange
                            : null,
                        ]}
                      >
                        <Icon type="printer" className={styles.editButton} />
                        {printedA4Set.has(record.merchantId) || record.hasEveryonePrinted
                          ? '重打'
                          : '打印'}
                        A4分单
                      </a>
                    </Popconfirm>
                  )}
                </>
              ) : (
                <>
                  <Divider type="vertical" />
                  <a className={styles.actionButton} disabled>
                    <Icon type="printer" className={styles.editButton} />
                    打印A4分单
                  </a>
                </>
              )
            ) : null}
            {/* {toNumber(stateCode) === 3 && !lineRecordCheck.needDistribution ? (
              <>
                <Divider type="vertical" />
                <Popconfirm
                  placement="topRight"
                  title="将设置配送订单，确定吗？"
                  onConfirm={e => this.setCommunityTransport(e, record)}
                  onCancel={e => this.setCommunityTransportCancel(e, record)}
                  okText="确定"
                  cancelText="取消"
                >
                  <a className={styles.actionButton}>
                    <Icon type="retweet" className={styles.editButton} />
                    配送
                  </a>
                </Popconfirm>
              </>
            ) : null} */}
            <Divider type="vertical" />
            <a className={styles.actionButton} onClick={e => this.goToEdit(e, record)}>
              <Icon type="book" className={styles.editButton} />
              查看
            </a>
          </>
        ),
      },
    ];
  };

  buildTableOtherConfig = () => ({
    expandedRowRender: record => (
      <div>
        <p>
          <span className={styles.bold}>订单总计：</span>
          <span>
            {`共${record.userOrderTotalCount}件商品，共计${record.userOrderTotalAmount}元`}
          </span>
        </p>
      </div>
    ),
  });

  getPageName = () => {
    const { title: titleDrawer } = this.props;
    const { stateCode: status, dataLoading, metaListData } = this.state;

    let stateNote = '';

    switch (status) {
      case '1':
        stateNote = '待出库';
        break;
      case '3':
        stateNote = '待配送';
        break;
      case '2':
        stateNote = '配送中';
        break;
      case '7':
        stateNote = '配送完成';
        break;
      default:
        break;
    }

    return (
      <span>
        {` ${titleDrawer}`}
        {dataLoading ? '' : `【共${(metaListData || []).length}个社区${stateNote}】`}
      </span>
    );
  };

  render() {
    const { width: widthDrawer, stateCode } = this.props;

    const {
      visible,
      dataLoading,
      processing,
      lineRecord,
      changeLineModalVisible,
      currentMerchant,
    } = this.state;

    const lineRecordCheck = lineRecord || {
      name: '',
      needDistribution: true,
      disabled: true,
      canOperate: false,
    };

    return (
      <Drawer
        title={
          <span>
            {this.renderTitleIcon()}
            {this.getPageName()}
          </span>
        }
        destroyOnClose={false}
        className={styles.containorBox}
        width={widthDrawer}
        placement="right"
        visible={visible}
        maskClosable={false}
        onClose={this.onClose}
        style={{
          height: 'calc(100% - 55px)',
        }}
      >
        <div className={styles.tableContainorBox}>
          {this.renderTable()}
          <div className={styles.bottomBar}>
            {!lineRecordCheck.needDistribution ? (
              !lineRecordCheck.canOperate ? (
                <>
                  <Button type="primary" icon="printer" loading={processing} disabled>
                    打印线路三联总单
                  </Button>
                  <Divider type="vertical" />
                </>
              ) : (
                <>
                  <Popconfirm
                    placement="topRight"
                    title="将打印三联总单，确定吗？"
                    onConfirm={e => this.setSingleLinePrint(e, lineRecord)}
                    onCancel={e => this.setSingleLinePrintCancel(e, lineRecord)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      type="primary"
                      icon="printer"
                      loading={processing}
                      disabled={dataLoading || processing}
                    >
                      打印线路三联总单
                    </Button>
                  </Popconfirm>
                  <Divider type="vertical" />
                </>
              )
            ) : null}
            {toNumber(stateCode) === 1 && !lineRecordCheck.needDistribution ? (
              !lineRecordCheck.canOperate ? (
                <>
                  <Button type="primary" icon="export" loading={processing} disabled>
                    线路开始出库
                  </Button>
                  <Divider type="vertical" />
                </>
              ) : (
                <>
                  <Popconfirm
                    placement="topRight"
                    title="线路开始出库，确定吗？"
                    onConfirm={e => this.setSingleLineOutbound(e, lineRecord)}
                    onCancel={e => this.setSingleLineOutboundCancel(e, lineRecord)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon="export"
                      loading={processing}
                      disabled={dataLoading || processing}
                    >
                      线路开始出库
                    </Button>
                  </Popconfirm>
                  <Divider type="vertical" />
                </>
              )
            ) : null}
            {toNumber(stateCode) === 3 && !lineRecordCheck.needDistribution ? (
              !lineRecordCheck.canOperate ? (
                <>
                  <Button type="primary" icon="retweet" loading={processing} disabled>
                    线路开始配送
                  </Button>
                  <Divider type="vertical" />
                </>
              ) : (
                <>
                  <Popconfirm
                    placement="topRight"
                    title="线路开始配送，确定吗？"
                    onConfirm={e => this.setSingleLineTransport(e, lineRecord)}
                    onCancel={e => this.setSingleLineTransportCancel(e, lineRecord)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon="retweet"
                      loading={processing}
                      disabled={dataLoading || processing}
                    >
                      线路开始配送
                    </Button>
                  </Popconfirm>
                  <Divider type="vertical" />
                </>
              )
            ) : null}
            {toNumber(stateCode) === 2 && !lineRecordCheck.needDistribution ? (
              !lineRecordCheck.canOperate ? (
                <>
                  <Button type="primary" icon="retweet" loading={processing} disabled>
                    线路配送完成
                  </Button>
                  <Divider type="vertical" />
                </>
              ) : (
                <>
                  <Popconfirm
                    placement="topRight"
                    title="线路配送完成，确定吗？"
                    onConfirm={e => this.setSingleLineComplete(e, lineRecord)}
                    onCancel={e => this.setSingleLineCompleteCancel(e, lineRecord)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon="retweet"
                      loading={processing}
                      disabled={dataLoading || processing}
                    >
                      线路配送完成
                    </Button>
                  </Popconfirm>
                  <Divider type="vertical" />
                </>
              )
            ) : null}
            <Button
              style={{
                marginRight: 8,
              }}
              icon="close"
              onClick={this.onClose}
            >
              关闭面版
            </Button>
          </div>
        </div>
        <ChangeLineModal
          previouslyLine={lineRecord}
          merchantData={currentMerchant}
          visible={changeLineModalVisible}
          afterOK={this.afterChangeLineModalOk}
          afterCancel={this.afterChangeLineModalCancel}
        />
      </Drawer>
    );
  }
}

export default CorrelationDrawer;
