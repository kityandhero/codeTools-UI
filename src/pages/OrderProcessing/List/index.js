import React, { Fragment } from 'react';
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

import { corsTarget, pretreatmentRequestParams, toNumber, stringIsEmpty } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import SingleList from '@/customComponents/CustomList/SingleList';
import { printAllOrder } from '@/utils/print';
import CorrelationDrawer from '../CorrelationDrawer';

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
      linePrinted: [],
    };
  }

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
      pageName: '订单信息列表',
      loadApiPath: 'orderProcessing/list',
      stateCode,
    };
  };

  doWorkWhenWillReceive = nextProps => {
    const { stateCode: stateCodePre } = this.state;
    const {
      match: {
        params: { state: stateCodeNext },
      },
    } = nextProps;

    this.setState({ stateCode: stateCodeNext });

    if (stateCodePre !== stateCodeNext) {
      // 清除页面数据，减少用户误解
      this.setState({ stateCode: stateCodeNext, customData: { list: [] } }, () => {
        this.loadData();
      });
    }
  };

  getPageName = () => {
    const { stateCode: status, pageName } = this.state;

    let result = '';

    switch (status) {
      case '1':
        result = '待出库';
        break;
      case '3':
        result = '出库中';
        break;
      case '2':
        result = '配送中';
        break;
      case '7':
        result = '已完成';
        break;
      default:
        break;
    }

    return `${result}${pageName}`;
  };

  supplementLoadRequestParams = d => {
    const o = d;
    const { stateCode } = this.state;

    o.state = stateCode;
    return o;
  };

  setSingleLineTransit = (e, record) => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLineTransit',
      payload: {
        lineId: record.lineId,
      },
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
            description: `线路 ${record.name} 已经设置开始出库`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setSingleLineTransitCancel = (e, record) => {
    message.warn(`线路 ${record.name} 取消开始出库操作`);
  };

  setMultiLineTransit = () => {
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
      type: 'orderProcessing/setMultiLineTransit',
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

  setMultiLineTransitCancel = () => {
    message.warn(`所选线路取消出库操作。`);
  };

  setAllLineTransit = () => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setAllLineTransit',
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

  setAllLineTransitCancel = () => {
    message.warn(`全部线路取消出库操作。`);
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

  setSingleLinePrintCancel = (e, record) => {
    message.warn(`线路 ${record.name} 取消打印操作。`);
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

  setMultiLinePrintCancel = () => {
    message.warn(`所选线路取消打印操作`);
  };

  setSingleLineDispatch = (e, record) => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLineDispatch',
      payload: {
        lineId: record.lineId,
      },
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
            message: '配送操作执行结果',
            description: `线路 ${record.name} 已经设置开始配送`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setSingleLineDispatchCancel = (e, record) => {
    message.warn(`线路 ${record.name} 取消开始配送操作`);
  };

  setSingleLineDispatchFinish = (e, record) => {
    const { dispatch } = this.props;
    const { stateCode } = this.state;

    this.setState({ processing: true });

    dispatch({
      type: 'orderProcessing/setSingleLineDispatchFinish',
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
        this.refreshGrid();

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '配送完成操作执行结果',
            description: `线路 ${record.name} 已经设置配送完成`,
          });
        });
      }

      this.setState({ processing: false });
    });
  };

  setSingleLineDispatchFinishCancel = (e, record) => {
    message.warn(`线路 ${record.name} 取消配送完成操作`);
  };

  showCorrelationDrawer = record => {
    const { lineId } = record;
    const info = `${record.name}`;

    this.setState({
      currentLineId: lineId,
      currentRecord: record,
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
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            <FormItem label="线路名称">
              {getFieldDecorator('name')(
                <Input addonBefore={<Icon type="form" />} placeholder="请输入线路名称" />
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(
            <Fragment>
              {toNumber(stateCode) === 1 ? (
                <Fragment>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="topRight"
                    title="所选线路开始出库，确定吗？"
                    onConfirm={() => this.setMultiLineTransit()}
                    onCancel={() => this.setMultiLineTransitCancel()}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      key="buttonSelectTransit"
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
                    onConfirm={() => this.setAllLineTransit()}
                    onCancel={() => this.setAllLineTransitCancel()}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      key="buttonAllTransit"
                      type="primary"
                      icon="export"
                      loading={processing}
                      disabled={dataLoading || processing}
                    >
                      全部线路开始出库
                    </Button>
                  </Popconfirm>
                </Fragment>
              ) : null}
              {toNumber(stateCode) === 2 || toNumber(stateCode) === 3 ? (
                <Fragment>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="topRight"
                    title="导出所选线路当天出库产品数据？"
                    onConfirm={() => this.getExportKey()}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      key="buttonExportSelectTransitProduct"
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
                </Fragment>
              ) : null}
            </Fragment>,
            18
          )}
        </Row>
      </Fragment>
    );
  };

  getColumn = () => {
    const { stateCode, linePrinted } = this.state;

    const linePrintedSet = new Set(linePrinted);

    return [
      {
        title: '线路名称',
        dataIndex: 'lineId',
        align: 'left',
        render: (val, record) => (
          <Fragment>
            <span
              className={styles.pointer}
              onClick={() => {
                this.showCorrelationDrawer(record);
              }}
            >
              {`${record.name}【司机：${
                stringIsEmpty(record.driverName) ? '无' : record.driverName
              }，共${record.userOrderMerchantCount}个社区，${record.userOrderGoodsCount}件货物】`}
            </span>
          </Fragment>
        ),
      },
      {
        title: '操作',
        width: 256,
        align: 'right',
        // fixed: 'right',
        render: (text, record) => (
          <Fragment>
            {record.needDistribution ? (
              <Fragment>
                <Icon type="info-circle" className={styles.editButton} />
                需要分配线路
              </Fragment>
            ) : null}
            {!record.needDistribution ? (
              record.canOperate ? (
                <Fragment>
                  <Popconfirm
                    placement="topRight"
                    title="将打印三联总单，确定吗？"
                    onConfirm={e => this.setSingleLinePrint(e, record)}
                    onCancel={e => this.setSingleLinePrintCancel(e, record)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a
                      className={[
                        styles.actionButton,
                        linePrintedSet.has(record.lineId) ? styles.orange : null,
                      ]}
                    >
                      <Icon type="printer" className={styles.editButton} />
                      打印三联总单
                    </a>
                  </Popconfirm>
                </Fragment>
              ) : (
                <Fragment>
                  <a className={styles.actionButton} disabled>
                    <Icon type="printer" className={styles.editButton} />
                    打印三联总单
                  </a>
                </Fragment>
              )
            ) : null}
            {toNumber(stateCode) === 1 && !record.needDistribution ? (
              record.canOperate ? (
                <Fragment>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="topRight"
                    title="开始出库，确定吗？"
                    onConfirm={e => this.setSingleLineTransit(e, record)}
                    onCancel={e => this.setSingleLineTransitCancel(e, record)}
                    okText="确定"
                    cancelText="取消"
                    disabled={record.lineId === '0' || record.lineId === ''}
                  >
                    <a className={styles.actionButton}>
                      <Icon type="export" className={styles.editButton} />
                      开始出库
                    </a>
                  </Popconfirm>
                </Fragment>
              ) : (
                <Fragment>
                  <Divider type="vertical" />
                  <a className={styles.actionButton} disabled>
                    <Icon type="export" className={styles.editButton} />
                    开始出库
                  </a>{' '}
                </Fragment>
              )
            ) : null}
            {toNumber(stateCode) === 3 && !record.needDistribution ? (
              record.canOperate ? (
                <Fragment>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="topRight"
                    title="开始配送，确定吗？"
                    onConfirm={e => this.setSingleLineDispatch(e, record)}
                    onCancel={e => this.setSingleLineDispatchCancel(e, record)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a className={styles.actionButton}>
                      <Icon type="retweet" className={styles.editButton} />
                      开始配送
                    </a>
                  </Popconfirm>
                </Fragment>
              ) : (
                <Fragment>
                  <Divider type="vertical" />
                  <a className={styles.actionButton} disabled>
                    <Icon type="retweet" className={styles.editButton} />
                    开始配送
                  </a>
                </Fragment>
              )
            ) : null}
            {toNumber(stateCode) === 2 && !record.needDistribution ? (
              record.canOperate ? (
                <Fragment>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="topRight"
                    title="配送完成，确定吗？"
                    onConfirm={e => this.setSingleLineDispatchFinish(e, record)}
                    onCancel={e => this.setSingleLineDispatchFinishCancel(e, record)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a className={styles.actionButton}>
                      <Icon type="retweet" className={styles.editButton} />
                      配送完成
                    </a>
                  </Popconfirm>
                </Fragment>
              ) : (
                <Fragment>
                  <Divider type="vertical" />
                  <a className={styles.actionButton} disabled>
                    <Icon type="retweet" className={styles.editButton} />
                    配送完成
                  </a>
                </Fragment>
              )
            ) : null}
          </Fragment>
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
