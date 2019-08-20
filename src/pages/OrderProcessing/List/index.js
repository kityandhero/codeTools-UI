import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Form,
  Input,
  Icon,
  Button,
  Divider,
  Popconfirm,
  message,
  notification,
} from 'antd';

import {
  // getQueue,
  corsTarget,
  pretreatmentRequestParams,
  toNumber,
  stringIsEmpty,
  formatDatetime,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import SingleList from '@/customComponents/Framework/CustomList/SingleList';
import { printAllOrder } from '@/utils/print';
import CorrelationDrawer from '../CorrelationDrawer';

import { parseUrlParamsForSetState } from '../Assist/config';

import styles from './index.less';

const FormItem = Form.Item;

@connect(({ orderProcessing, global, loading }) => ({
  orderProcessing,
  global,
  loading: loading.models.orderProcessing,
}))
@Form.create()
class List extends SingleList {
  componentAuthority = accessWayCollection.orderProcessing.list;

  timerOutbound = null;

  timerTransport = null;

  timerComplete = null;

  checkingOutbound = false;

  checkingTransport = false;

  checkingComplete = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      currentLineId: null,
      currentRecord: null,
      drawerTitle: '',
      correlationDrawerVisible: false,
      selectedDataTableDataRows: [],
      stateCode: -10000,
      outboundTime: '',
      linePrinted: [],
      lineOutboundWait: [],
      lineOutboundProcessing: [],
      lineOutboundComplete: [],
      lineTransportWait: [],
      lineTransportProcessing: [],
      lineTransportComplete: [],
      lineCompleteWait: [],
      lineCompleteProcessing: [],
      lineCompleteComplete: [],
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

  beforeUnmount = () => {
    window.clearTimeout(this.timerOutbound);
    window.clearTimeout(this.timerTransport);
    window.clearTimeout(this.timerComplete);
  };

  getApiData = props => {
    const {
      orderProcessing: { data },
    } = props;

    return data;
  };

  initState = () => {
    const {
      match: {
        params: { state: stateCode },
      },
    } = this.props;

    return {
      pageName: '线路信息列表',
      loadApiPath: 'orderProcessing/list',
      stateCode,
    };
  };

  // eslint-disable-next-line no-unused-vars
  doWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    window.clearTimeout(this.timerOutbound);
    window.clearTimeout(this.timerTransport);
    window.clearTimeout(this.timerComplete);

    return null;
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { stateCode: stateCodePre } = preState;
    const { state: stateCodeNext } = this.state;

    if (stateCodePre !== stateCodeNext) {
      // 清除页面数据，减少用户误解
      this.setState({ customData: { list: [] } }, () => {
        this.loadData();
      });
    }
  };

  getPageName = () => {
    const { stateCode: status, pageName, outboundTime } = this.state;

    let result = '';
    let outboundTimeInfo = '';

    switch (status) {
      case '1':
        result = '待出库';
        outboundTimeInfo = `，当前出库时间：${outboundTime || '--'}`;
        break;
      case '3':
        result = '待配送';
        break;
      case '2':
        result = '配送中';
        break;
      case '7':
        result = '配送完成';
        break;
      default:
        break;
    }

    return `${result}${pageName} [${formatDatetime(new Date(), 'YYYY-MM-DD')}]${outboundTimeInfo}`;
  };

  supplementLoadRequestParams = d => {
    const o = d;
    const { stateCode } = this.state;

    o.state = stateCode;
    return o;
  };

  afterLoadSuccess = data => {
    const {
      extra: { outboundTime },
      list,
    } = data;

    this.setState({
      outboundTime,
      // linePrinted: [],
      // lineOutboundWait: [],
      // lineOutboundProcessing: [],
      // lineOutboundComplete: [],
      // lineTransportWait: [],
      // lineTransportProcessing: [],
      // lineTransportComplete: [],
      // lineCompleteWait: [],
      // lineCompleteProcessing: [],
      // lineCompleteComplete: [],
    });

    const linePrinted = [];
    const lineOutboundWait = [];
    const lineOutboundProcessing = [];
    const lineOutboundComplete = [];
    const lineTransportWait = [];
    const lineTransportProcessing = [];
    const lineTransportComplete = [];
    const lineCompleteWait = [];
    const lineCompleteProcessing = [];
    const lineCompleteComplete = [];

    let needCheckingOutbound = false;
    let needCheckingTransport = false;
    let needCheckingComplete = false;

    (list || []).forEach(o => {
      if (o.outbound === 100) {
        lineOutboundWait.push(o.lineId);
        needCheckingOutbound = true;
      }

      if (o.outbound === 200) {
        lineOutboundProcessing.push(o.lineId);
        needCheckingOutbound = true;
      }

      if (o.outbound === 300) {
        lineOutboundComplete.push(o.lineId);
      }

      if (o.transport === 100) {
        lineTransportWait.push(o.lineId);
        needCheckingTransport = true;
      }

      if (o.transport === 200) {
        lineTransportProcessing.push(o.lineId);
        needCheckingTransport = true;
      }

      if (o.transport === 300) {
        lineTransportComplete.push(o.lineId);
      }

      if (o.complete === 100) {
        lineCompleteWait.push(o.lineId);
        needCheckingComplete = true;
      }

      if (o.complete === 200) {
        lineCompleteProcessing.push(o.lineId);
        needCheckingComplete = true;
      }

      if (o.complete === 300) {
        lineCompleteComplete.push(o.lineId);
      }
    });

    this.setState(
      {
        outboundTime,
        linePrinted,
        lineOutboundWait,
        lineOutboundProcessing,
        lineOutboundComplete,
        lineTransportWait,
        lineTransportProcessing,
        lineTransportComplete,
        lineCompleteWait,
        lineCompleteProcessing,
        lineCompleteComplete,
      },
      () => {
        const { stateCode } = this.state;
        const stateCodeNumber = toNumber(stateCode);

        if (needCheckingOutbound && stateCodeNumber === 1) {
          this.checkAllLineOutboundResult();
        }

        if (needCheckingTransport && stateCodeNumber === 3) {
          this.checkAllLineTransportResult();
        }

        if (needCheckingComplete && stateCodeNumber === 2) {
          this.checkAllLineCompleteResult();
        }
      },
    );
  };

  setSingleLineOutbound = (e, record) => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLineOutbound',
      payload: {
        lineId: record.lineId,
      },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          message.warn(`线路 ${record.name} 开始准备出库，结果会在稍后通知您`);
        });

        const { lineOutboundWait } = this.state;

        const lineOutboundWaitSet = new Set(lineOutboundWait || []);
        lineOutboundWaitSet.add(record.lineId);

        this.setState({ lineOutboundWait: Array.from(lineOutboundWaitSet) }, () => {
          this.checkAllLineOutboundResult();
        });
      }

      this.setState({ processing: false });
    });
  };

  // checkSingleLineOutboundResultDelay = (that, record) => {
  //   setTimeout(() => {
  //     that.checkSingleLineOutboundResult(that, record);
  //   }, 800);
  // };

  // checkSingleLineOutboundResult = (that, record) => {
  //   const { dispatch } = that.props;

  //   dispatch({
  //     type: 'orderProcessing/checkSingleLineOutboundResult',
  //     payload: {
  //       lineId: record.lineId,
  //     },
  //   }).then(() => {
  //     const data = that.getApiData(that.props);

  //     const { dataSuccess } = data;
  //     if (dataSuccess) {
  //       const {
  //         data: { exist, state: statusCode },
  //       } = data;

  //       if (exist) {
  //         const { lineOutboundWait, lineOutboundProcessing, lineOutboundComplete } = that.state;

  //         const lineOutboundWaitSet = new Set(lineOutboundWait || []);
  //         const lineOutboundProcessingSet = new Set(lineOutboundProcessing || []);
  //         const lineOutboundCompleteSet = new Set(lineOutboundComplete || []);

  //         if (statusCode === 100) {
  //           lineOutboundWaitSet.add(record.lineId);
  //           lineOutboundProcessingSet.delete(record.lineId);
  //           lineOutboundCompleteSet.delete(record.lineId);
  //         }

  //         if (statusCode === 200) {
  //           lineOutboundWaitSet.delete(record.lineId);
  //           lineOutboundProcessingSet.add(record.lineId);
  //           lineOutboundCompleteSet.delete(record.lineId);
  //         }

  //         if (statusCode === 300) {
  //           lineOutboundWaitSet.delete(record.lineId);
  //           lineOutboundProcessingSet.delete(record.lineId);
  //           lineOutboundCompleteSet.add(record.lineId);
  //         }

  //         that.setState({
  //           lineOutboundWait: Array.from(lineOutboundWaitSet),
  //           lineOutboundProcessing: Array.from(lineOutboundProcessingSet),
  //           lineOutboundComplete: Array.from(lineOutboundCompleteSet),
  //         });
  //       }

  //       if (exist && statusCode === 300) {
  //         requestAnimationFrame(() => {
  //           notification.success({
  //             placement: 'bottomRight',
  //             message: '出库操作执行结果',
  //             description: `线路 ${record.name} 已经完成出库`,
  //           });
  //         });
  //       } else {
  //         const queue = getQueue();
  //         queue.push(that.checkSingleLineOutboundResultDelay(that, record));
  //       }
  //     }
  //   });
  // };

  checkAllLineOutboundResult = () => {
    const { dispatch } = this.props;

    if (!this.checkingOutbound) {
      this.checkingOutbound = true;

      dispatch({
        type: 'orderProcessing/checkAllLineOutboundResult',
        payload: {},
      }).then(() => {
        const data = this.getApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          const {
            data: {
              listWait,
              listProcessing,
              listComplete,
              // waitCount,
              // processingCount,
              // completeCount,
              needRecheck,
            },
          } = data;

          this.setState(
            {
              lineOutboundWait: listWait,
              lineOutboundProcessing: listProcessing,
              lineOutboundComplete: listComplete,
            },
            () => {
              this.checkingOutbound = false;

              if (needRecheck && !this.checkingOutbound) {
                this.timerOutbound = setTimeout(() => {
                  this.checkAllLineOutboundResult();
                }, 800);
              }
            },
          );
        } else {
          this.checkingOutbound = false;
        }
      });
    }
  };

  setMultiLineOutbound = () => {
    const { dispatch } = this.props;
    const { selectedDataTableDataRows } = this.state;

    const submitData = pretreatmentRequestParams({}, d => {
      const lineIdList = [];

      (selectedDataTableDataRows || []).forEach(item => {
        lineIdList.push(item.lineId);
      });

      const o = d;

      o.lineIds = lineIdList.join(',');

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setMultiLineOutbound',
      payload: submitData,
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        this.refreshGrid();

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '出库操作执行结果',
            description: `所选线路已经设置出库。`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setAllLineOutbound = () => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setAllLineOutbound',
      payload: {},
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        this.refreshGrid();

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '出库操作执行结果',
            description: `全部线路已经设置出库。`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setSingleLinePrint = (e, record) => {
    const { dispatch } = this.props;
    const { stateCode } = this.state;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLinePrint',
      payload: {
        lineId: record.lineId,
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

        const { linePrinted } = this.state;
        const linePrintedSet = new Set(linePrinted);
        linePrintedSet.add(record.lineId);

        this.setState({ linePrinted: Array.from(linePrintedSet) });

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '打印操作执行结果',
            description: `线路 ${record.name} 已经传输给打印机。`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setMultiLinePrint = () => {
    const { dispatch } = this.props;
    const { stateCode } = this.state;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setMultiLinePrint',
      payload: {
        lineIdList: '1,2,3',
        state: stateCode,
      },
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '出库操作执行结果',
            description: `所选项已经传输给打印机。`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setSingleLineTransport = (e, record) => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLineTransport',
      payload: {
        lineId: record.lineId,
      },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          message.warn(`线路 ${record.name} 开始准备配送，结果会在稍后通知您`);
        });

        const { lineTransportWait } = this.state;

        const lineTransportWaitSet = new Set(lineTransportWait || []);
        lineTransportWaitSet.add(record.lineId);

        this.setState({ lineTransportWait: Array.from(lineTransportWaitSet) }, () => {
          this.checkAllLineTransportResult();
        });

        // const that = this;
        // const queue = getQueue();
        // queue.push(that.checkSingleLineTransportResultDelay(that, record));
      }

      this.setState({ processing: false });
    });
  };

  // checkSingleLineTransportResultDelay = (that, record) => {
  //   setTimeout(() => {
  //     that.checkSingleLineTransportResult(that, record);
  //   }, 800);
  // };

  // checkSingleLineTransportResult = (that, record) => {
  //   const { dispatch } = that.props;

  //   dispatch({
  //     type: 'orderProcessing/checkSingleLineTransportResult',
  //     payload: {
  //       lineId: record.lineId,
  //     },
  //   }).then(() => {
  //     const data = that.getApiData(that.props);

  //     const { dataSuccess } = data;
  //     if (dataSuccess) {
  //       const {
  //         data: { exist, state: statusCode },
  //       } = data;

  //       if (exist) {
  //         const { lineTransportWait, lineTransportProcessing, lineTransportComplete } = that.state;

  //         const lineTransportWaitSet = new Set(lineTransportWait || []);
  //         const lineTransportProcessingSet = new Set(lineTransportProcessing || []);
  //         const lineTransportCompleteSet = new Set(lineTransportComplete || []);

  //         if (statusCode === 100) {
  //           lineTransportWaitSet.add(record.lineId);
  //           lineTransportProcessingSet.delete(record.lineId);
  //           lineTransportCompleteSet.delete(record.lineId);
  //         }

  //         if (statusCode === 200) {
  //           lineTransportWaitSet.delete(record.lineId);
  //           lineTransportProcessingSet.add(record.lineId);
  //           lineTransportCompleteSet.delete(record.lineId);
  //         }

  //         if (statusCode === 300) {
  //           lineTransportWaitSet.delete(record.lineId);
  //           lineTransportProcessingSet.delete(record.lineId);
  //           lineTransportCompleteSet.add(record.lineId);
  //         }

  //         that.setState({
  //           lineTransportWait: Array.from(lineTransportWaitSet),
  //           lineTransportProcessing: Array.from(lineTransportProcessingSet),
  //           lineTransportComplete: Array.from(lineTransportCompleteSet),
  //         });
  //       }

  //       if (exist && statusCode === 300) {
  //         requestAnimationFrame(() => {
  //           notification.success({
  //             placement: 'bottomRight',
  //             message: '出库操作执行结果',
  //             description: `线路 ${record.name} 已经开始配送`,
  //           });
  //         });
  //       } else {
  //         const queue = getQueue();
  //         queue.push(that.checkSingleLineTransportResultDelay(that, record));
  //       }
  //     }
  //   });
  // };

  checkAllLineTransportResult = () => {
    const { dispatch } = this.props;

    if (!this.checkingTransport) {
      this.checkingTransport = true;

      dispatch({
        type: 'orderProcessing/checkAllLineTransportResult',
        payload: {},
      }).then(() => {
        const data = this.getApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          const {
            data: {
              listWait,
              listProcessing,
              listComplete,
              // waitCount,
              // processingCount,
              // completeCount,
              needRecheck,
            },
          } = data;

          this.setState(
            {
              lineTransportWait: listWait,
              lineTransportProcessing: listProcessing,
              lineTransportComplete: listComplete,
            },
            () => {
              this.checkingTransport = false;

              if (needRecheck && !this.checkingTransport) {
                this.timerTransport = setTimeout(() => {
                  this.checkAllLineTransportResult();
                }, 800);
              }
            },
          );
        } else {
          this.checkingTransport = false;
        }
      });
    }
  };

  setSingleLineComplete = (e, record) => {
    const { dispatch } = this.props;
    const { stateCode } = this.state;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLineComplete',
      payload: {
        lineId: record.lineId,
        state: stateCode,
      },
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          message.warn(`线路 ${record.name} 开始进行完成操作，结果会在稍后通知您`);
        });

        const { lineCompleteWait } = this.state;

        const lineCompleteWaitSet = new Set(lineCompleteWait || []);
        lineCompleteWaitSet.add(record.lineId);

        this.setState({ lineCompleteWait: Array.from(lineCompleteWaitSet) }, () => {
          this.checkAllLineCompleteResult();
        });

        // const that = this;
        // const queue = getQueue();
        // queue.push(that.checkSingleLineCompleteResultDelay(that, record));
      }

      this.setState({ processing: false });
    });
  };

  // checkSingleLineCompleteResultDelay = (that, record) => {
  //   setTimeout(() => {
  //     that.checkSingleLineCompleteResult(that, record);
  //   }, 800);
  // };

  // checkSingleLineCompleteResult = (that, record) => {
  //   const { dispatch } = that.props;

  //   dispatch({
  //     type: 'orderProcessing/checkSingleLineCompleteResult',
  //     payload: {
  //       lineId: record.lineId,
  //     },
  //   }).then(() => {
  //     const data = that.getApiData(that.props);

  //     const { dataSuccess } = data;
  //     if (dataSuccess) {
  //       const {
  //         data: { exist, state: statusCode },
  //       } = data;

  //       if (exist) {
  //         const { lineCompleteWait, lineCompleteProcessing, lineCompleteComplete } = that.state;

  //         const lineCompleteWaitSet = new Set(lineCompleteWait || []);
  //         const lineCompleteProcessingSet = new Set(lineCompleteProcessing || []);
  //         const lineCompleteCompleteSet = new Set(lineCompleteComplete || []);

  //         if (statusCode === 100) {
  //           lineCompleteWaitSet.add(record.lineId);
  //           lineCompleteProcessingSet.delete(record.lineId);
  //           lineCompleteCompleteSet.delete(record.lineId);
  //         }

  //         if (statusCode === 200) {
  //           lineCompleteWaitSet.delete(record.lineId);
  //           lineCompleteProcessingSet.add(record.lineId);
  //           lineCompleteCompleteSet.delete(record.lineId);
  //         }

  //         if (statusCode === 300) {
  //           lineCompleteWaitSet.delete(record.lineId);
  //           lineCompleteProcessingSet.delete(record.lineId);
  //           lineCompleteCompleteSet.add(record.lineId);
  //         }

  //         that.setState({
  //           lineCompleteWait: Array.from(lineCompleteWaitSet),
  //           lineCompleteProcessing: Array.from(lineCompleteProcessingSet),
  //           lineCompleteComplete: Array.from(lineCompleteCompleteSet),
  //         });
  //       }

  //       if (exist && statusCode === 300) {
  //         requestAnimationFrame(() => {
  //           notification.success({
  //             placement: 'bottomRight',
  //             message: '配送完成操作执行结果',
  //             description: `线路 ${record.name} 已经配送完成`,
  //           });
  //         });
  //       } else {
  //         const queue = getQueue();
  //         queue.push(that.checkSingleLineCompleteResultDelay(that, record));
  //       }
  //     }
  //   });
  // };

  checkAllLineCompleteResult = () => {
    const { dispatch } = this.props;

    if (!this.checkingComplete) {
      this.checkingComplete = true;

      dispatch({
        type: 'orderProcessing/checkAllLineCompleteResult',
        payload: {},
      }).then(() => {
        const data = this.getApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          const {
            data: {
              listWait,
              listProcessing,
              listComplete,
              // waitCount,
              // processingCount,
              // completeCount,
              needRecheck,
            },
          } = data;

          this.setState(
            {
              lineCompleteWait: listWait,
              lineCompleteProcessing: listProcessing,
              lineCompleteComplete: listComplete,
            },
            () => {
              // 存在多次点击按钮的情况
              this.checkingComplete = false;

              if (needRecheck && !this.checkingComplete) {
                this.timerComplete = setTimeout(() => {
                  this.checkAllLineCompleteResult();
                }, 800);
              }
            },
          );
        } else {
          this.checkingComplete = false;
        }
      });
    }
  };

  showCorrelationDrawer = record => {
    const { lineId } = record;
    const info = `${record.name}`;
    const { lineOutboundComplete } = this.state;

    const lineOutboundCompleteSet = new Set(lineOutboundComplete || []);

    const o = record;

    if (lineOutboundCompleteSet.has(record.lineId)) {
      o.outbound = 300;
    }

    this.setState({
      currentLineId: lineId,
      currentRecord: o,
      drawerTitle: info,
      correlationDrawerVisible: true,
    });
  };

  hideCorrelationDrawer = () => {
    this.setState({ correlationDrawerVisible: false });
  };

  onCorrelationDrawerClose = () => {
    this.setState({ correlationDrawerVisible: false });
  };

  afterOperateSuccess = () => {
    this.refreshGrid();
  };

  getExportKey = () => {
    const { dispatch } = this.props;

    const { selectedDataTableDataRows } = this.state;

    const submitData = pretreatmentRequestParams({}, d => {
      const lineIdList = [];

      (selectedDataTableDataRows || []).forEach(item => {
        lineIdList.push(item.lineId);
      });

      const o = d;

      o.lineIds = lineIdList.join(',');

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/exportKey',
      payload: submitData,
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;
      const { dataSuccess } = data;
      if (dataSuccess) {
        const {
          data: { fileKey },
        } = data;
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '执行成功，文件即将开始下载！',
          });
        });
        this.setState({ processing: false });
        const corsUrl = corsTarget();
        window.open(`${corsUrl}/orderProcessing/ExportFile?fileKey=${fileKey}`, '_self');
      }
    });
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dataLoading, processing, selectedDataTableDataRows, stateCode } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            <FormItem label="线路名称">
              {getFieldDecorator('name')(
                <Input addonBefore={<Icon type="form" />} placeholder="请输入线路名称" />,
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(
            <>
              {toNumber(stateCode) === 1 ? (
                <>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="topRight"
                    title="所选线路开始出库，确定吗？"
                    onConfirm={() => this.setMultiLineOutbound()}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      key="buttonSelectOutbound"
                      type="primary"
                      icon="export"
                      loading={processing}
                      disabled={
                        dataLoading || processing || (selectedDataTableDataRows || []).length === 0
                      }
                    >
                      所选线路开始出库
                    </Button>
                  </Popconfirm>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="topRight"
                    title="全部线路开始出库，确定吗？"
                    onConfirm={() => this.setAllLineOutbound()}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      key="buttonAllOutbound"
                      type="primary"
                      icon="export"
                      loading={processing}
                      disabled={dataLoading || processing}
                    >
                      全部线路开始出库
                    </Button>
                  </Popconfirm>
                </>
              ) : null}
              {toNumber(stateCode) === 2 || toNumber(stateCode) === 3 ? (
                <>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="topRight"
                    title="导出所选线路当天出库产品数据？"
                    onConfirm={() => this.getExportKey()}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      key="buttonExportSelectOutboundProduct"
                      type="primary"
                      icon="export"
                      loading={processing}
                      disabled={
                        dataLoading || processing || (selectedDataTableDataRows || []).length === 0
                      }
                    >
                      导出所选线路当天出库产品数据
                    </Button>
                  </Popconfirm>
                </>
              ) : null}
            </>,
            18,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => {
    const {
      stateCode,
      linePrinted,
      lineOutboundWait,
      lineOutboundProcessing,
      lineOutboundComplete,
      lineTransportWait,
      lineTransportProcessing,
      lineTransportComplete,
      lineCompleteWait,
      lineCompleteProcessing,
      lineCompleteComplete,
    } = this.state;

    const linePrintedSet = new Set(linePrinted);

    const lineOutboundWaitSet = new Set(lineOutboundWait || []);
    const lineOutboundProcessingSet = new Set(lineOutboundProcessing || []);
    const lineOutboundCompleteSet = new Set(lineOutboundComplete || []);

    const lineTransportWaitSet = new Set(lineTransportWait || []);
    const lineTransportProcessingSet = new Set(lineTransportProcessing || []);
    const lineTransportCompleteSet = new Set(lineTransportComplete || []);

    const lineCompleteWaitSet = new Set(lineCompleteWait || []);
    const lineCompleteProcessingSet = new Set(lineCompleteProcessing || []);
    const lineCompleteCompleteSet = new Set(lineCompleteComplete || []);

    return [
      {
        title: '线路名称',
        dataIndex: 'lineId',
        align: 'left',
        render: (val, record) => (
          <>
            <span
              className={styles.pointer}
              onClick={() => {
                this.showCorrelationDrawer(record);
              }}
            >
              {`${record.name}【司机：${
                stringIsEmpty(record.driverName) ? '无' : record.driverName
              }，共${record.userOrderMerchantCount}个社区，${record.userOrderGoodsCount}件货物】`}
              {(record.ignoreOutboundMerchantCount || 0) > 0
                ? `(${record.ignoreOutboundMerchantCount}个站点今日不配送）`
                : ''}
            </span>
          </>
        ),
      },
      {
        title: '操作',
        width: 256,
        align: 'right',
        // fixed: 'right',
        render: (text, record) => (
          <>
            {record.needDistribution ? (
              <>
                <Icon type="info-circle" className={styles.editButton} />
                需要分配线路
              </>
            ) : null}
            {!record.needDistribution ? (
              record.canOperate ? (
                record.outbound === 300 || lineOutboundCompleteSet.has(record.lineId) ? (
                  <>
                    <Popconfirm
                      placement="topRight"
                      title="将打印三联总单，确定吗？"
                      onConfirm={e => this.setSingleLinePrint(e, record)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <a
                        className={[
                          styles.actionButton,
                          linePrintedSet.has(record.lineId) || record.hasPrinted
                            ? styles.orange
                            : null,
                        ]}
                      >
                        <Icon type="printer" className={styles.editButton} />
                        {linePrintedSet.has(record.lineId) || record.hasPrinted ? '重打' : '打印'}
                        三联总单
                      </a>
                    </Popconfirm>
                    <Divider type="vertical" />
                  </>
                ) : (
                  <>
                    <a className={styles.actionButton} disabled>
                      <Icon type="printer" className={styles.editButton} />
                      打印三联总单
                    </a>
                    <Divider type="vertical" />
                  </>
                )
              ) : (
                <>
                  <a className={styles.actionButton} disabled>
                    <Icon type="printer" className={styles.editButton} />
                    打印三联总单
                  </a>
                  <Divider type="vertical" />
                </>
              )
            ) : null}
            {toNumber(stateCode) === 1 && !record.needDistribution ? (
              record.canOperate ? (
                record.outbound === 0 &&
                !lineOutboundWaitSet.has(record.lineId) &&
                !lineOutboundProcessingSet.has(record.lineId) &&
                !lineOutboundCompleteSet.has(record.lineId) ? (
                  <>
                    <Popconfirm
                      placement="topRight"
                      title="开始出库，确定吗？"
                      onConfirm={e => this.setSingleLineOutbound(e, record)}
                      okText="确定"
                      cancelText="取消"
                      disabled={record.lineId === '0' || record.lineId === ''}
                    >
                      <a className={styles.actionButton}>
                        <Icon type="export" className={styles.editButton} />
                        开始出库
                      </a>
                    </Popconfirm>
                  </>
                ) : (
                  <>
                    {lineOutboundWaitSet.has(record.lineId) ? (
                      <a className={`${styles.actionButton} ${styles.wait}`}>
                        <Icon type="clock-circle" className={[styles.editButton]} />
                        等待出库
                      </a>
                    ) : null}
                    {lineOutboundProcessingSet.has(record.lineId) ? (
                      <a className={`${styles.actionButton} ${styles.processing}`}>
                        <Icon type="loading" className={styles.editButton} />
                        正在出库
                      </a>
                    ) : null}
                    {lineOutboundCompleteSet.has(record.lineId) ? (
                      <a className={`${styles.actionButton} ${styles.complete}`}>
                        <Icon type="check-circle" className={styles.editButton} />
                        出库完成
                      </a>
                    ) : null}
                  </>
                )
              ) : (
                <>
                  {record.outbound === 0 ? (
                    <a className={styles.actionButton} disabled>
                      <Icon type="export" className={styles.editButton} />
                      无需出库
                    </a>
                  ) : null}
                  {lineOutboundWaitSet.has(record.lineId) ? (
                    <a className={`${styles.actionButton} ${styles.wait}`}>
                      <Icon type="clock-circle" className={[styles.editButton]} />
                      等待出库
                    </a>
                  ) : null}
                  {lineOutboundProcessingSet.has(record.lineId) ? (
                    <a className={`${styles.actionButton} ${styles.processing}`}>
                      <Icon type="loading" className={styles.editButton} />
                      正在出库
                    </a>
                  ) : null}
                  {lineOutboundCompleteSet.has(record.lineId) ? (
                    <a className={`${styles.actionButton} ${styles.complete}`}>
                      <Icon type="check-circle" className={styles.editButton} />
                      出库完成
                    </a>
                  ) : null}
                </>
              )
            ) : null}
            {toNumber(stateCode) === 3 && !record.needDistribution ? (
              record.canOperate ? (
                record.transport === 0 &&
                !lineTransportWaitSet.has(record.lineId) &&
                !lineTransportProcessingSet.has(record.lineId) &&
                !lineTransportCompleteSet.has(record.lineId) ? (
                  <>
                    <Popconfirm
                      placement="topRight"
                      title="开始配送，确定吗？"
                      onConfirm={e => this.setSingleLineTransport(e, record)}
                      okText="确定"
                      cancelText="取消"
                      disabled={record.lineId === '0' || record.lineId === ''}
                    >
                      <a className={styles.actionButton}>
                        <Icon type="export" className={styles.editButton} />
                        开始配送
                      </a>
                    </Popconfirm>
                  </>
                ) : (
                  <>
                    {lineTransportWaitSet.has(record.lineId) ? (
                      <a className={`${styles.actionButton} ${styles.wait}`}>
                        <Icon type="clock-circle" className={[styles.editButton]} />
                        等待配送
                      </a>
                    ) : null}
                    {lineTransportProcessingSet.has(record.lineId) ? (
                      <a className={`${styles.actionButton} ${styles.processing}`}>
                        <Icon type="loading" className={styles.editButton} />
                        正在处理
                      </a>
                    ) : null}
                    {lineTransportCompleteSet.has(record.lineId) ? (
                      <a className={`${styles.actionButton} ${styles.complete}`}>
                        <Icon type="check-circle" className={styles.editButton} />
                        正在配送
                      </a>
                    ) : null}
                  </>
                )
              ) : (
                <>
                  {lineTransportWaitSet.has(record.lineId) ? (
                    <a className={`${styles.actionButton} ${styles.wait}`}>
                      <Icon type="clock-circle" className={[styles.editButton]} />
                      等待配送
                    </a>
                  ) : null}
                  {lineTransportProcessingSet.has(record.lineId) ? (
                    <a className={`${styles.actionButton} ${styles.processing}`}>
                      <Icon type="loading" className={styles.editButton} />
                      正在处理
                    </a>
                  ) : null}
                  {lineTransportCompleteSet.has(record.lineId) ? (
                    <a className={`${styles.actionButton} ${styles.complete}`}>
                      <Icon type="check-circle" className={styles.editButton} />
                      正在配送
                    </a>
                  ) : null}
                </>
              )
            ) : null}
            {toNumber(stateCode) === 2 && !record.needDistribution ? (
              record.canOperate ? (
                record.complete === 0 &&
                !lineCompleteWaitSet.has(record.lineId) &&
                !lineCompleteProcessingSet.has(record.lineId) &&
                !lineCompleteCompleteSet.has(record.lineId) ? (
                  <>
                    <Popconfirm
                      placement="topRight"
                      title="配送完成，确定吗？"
                      onConfirm={e => this.setSingleLineComplete(e, record)}
                      okText="确定"
                      cancelText="取消"
                      disabled={record.lineId === '0' || record.lineId === ''}
                    >
                      <a className={styles.actionButton}>
                        <Icon type="export" className={styles.editButton} />
                        配送完成
                      </a>
                    </Popconfirm>
                  </>
                ) : (
                  <>
                    {lineCompleteWaitSet.has(record.lineId) ? (
                      <a className={`${styles.actionButton} ${styles.wait}`}>
                        <Icon type="clock-circle" className={[styles.editButton]} />
                        等待处理
                      </a>
                    ) : null}
                    {lineCompleteProcessingSet.has(record.lineId) ? (
                      <a className={`${styles.actionButton} ${styles.processing}`}>
                        <Icon type="loading" className={styles.editButton} />
                        正在处理
                      </a>
                    ) : null}
                    {lineCompleteCompleteSet.has(record.lineId) ? (
                      <a className={`${styles.actionButton} ${styles.complete}`}>
                        <Icon type="check-circle" className={styles.editButton} />
                        配送完成
                      </a>
                    ) : null}
                  </>
                )
              ) : (
                <>
                  {lineCompleteWaitSet.has(record.lineId) ? (
                    <a className={`${styles.actionButton} ${styles.wait}`}>
                      <Icon type="clock-circle" className={[styles.editButton]} />
                      等待处理
                    </a>
                  ) : null}
                  {lineCompleteProcessingSet.has(record.lineId) ? (
                    <a className={`${styles.actionButton} ${styles.processing}`}>
                      <Icon type="loading" className={styles.editButton} />
                      正在处理
                    </a>
                  ) : null}
                  {lineCompleteCompleteSet.has(record.lineId) ? (
                    <a className={`${styles.actionButton} ${styles.complete}`}>
                      <Icon type="check-circle" className={styles.editButton} />
                      配送完成
                    </a>
                  ) : null}
                </>
              )
            ) : null}
            {toNumber(stateCode) === 7 ? (
              <>
                <a className={styles.actionButton} disabled>
                  <Icon type="retweet" className={styles.editButton} />
                  已完成
                </a>
              </>
            ) : null}
          </>
        ),
      },
    ];
  };

  renderOther = () => {
    const {
      currentLineId,
      currentRecord,
      drawerTitle,
      correlationDrawerVisible,
      stateCode,
    } = this.state;

    return (
      <CorrelationDrawer
        title={drawerTitle}
        lineId={currentLineId}
        stateCode={stateCode}
        lineRecord={currentRecord}
        visible={correlationDrawerVisible}
        width={1200}
        onClose={this.hideCorrelationDrawer}
        afterOperateSuccess={this.afterOperateSuccess}
        afterClose={this.onCorrelationDrawerClose}
      />
    );
  };
}

export default List;
