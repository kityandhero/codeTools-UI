import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Spin, BackTop, Table, Empty, Popconfirm, Button, notification } from 'antd';

import {
  refitCommonData,
  isInvalid,
  pretreatmentRequestParams,
  isNumber,
  isMoney,
  searchFromList,
} from '@/utils/tools';
import Ellipsis from '@/components/Ellipsis';

import styles from './index.less';

const getPageName = status => {
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

  return result;
};

@connect(({ userOrder, orderProcessing, global, loading }) => ({
  userOrder,
  orderProcessing,
  global,
  loading: loading.models.userOrder,
}))
class BasicInfo extends PureComponent {
  mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dataLoading: true,
      loadSuccess: false,
      customData: [],
      stateCode: -10000,
      merchantId: null,
    };
  }

  componentDidMount() {
    this.mounted = true;

    const { match } = this.props;
    const { params } = match;
    const { id, state: stateCode } = params;

    this.setState({ merchantId: id, stateCode }, () => {
      this.loadData();
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { id, state: stateCode },
      },
    } = nextProps;

    const { merchantId: merchantIdPre, stateCode: stateCodePre } = this.state;

    this.setState({ merchantId: id, stateCode }, () => {
      const { dataLoading } = this.state;
      if (!dataLoading) {
        if (merchantIdPre !== id || stateCodePre !== stateCode) {
          this.loadData();
        }
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    this.setState = () => {};
  }

  orderStatusList = () => {
    const { global } = this.props;
    return refitCommonData(global.orderStatusList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getOrderStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderStatusList());
    return item == null ? '未知' : item.name;
  };

  loadData = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { merchantId, stateCode } = this.state;

      o.merchantId = merchantId;
      o.state = stateCode;

      return o;
    });

    this.setState({
      dataLoading: true,
      loadSuccess: false,
      customData: [],
    });

    dispatch({
      type: 'userOrder/listMerchantUserOrder',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          userOrder: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { list: customList } = data;

          const listData = (customList || []).map(item => {
            const o = item;
            o.processing = false;

            return o;
          });

          this.setState({
            loadSuccess: dataSuccess,
            customData: listData,
          });
        }

        this.setState({ dataLoading: false });
      }
    });
  };

  reloadData = () => {
    this.loadData();
  };

  setUserOrderImmediatelyFinish = (e, record, index) => {
    const { dispatch } = this.props;
    const { userOrderId } = record;
    const { customData } = this.state;

    customData[index].processing = true;

    this.setState({ customData });

    dispatch({
      type: 'orderProcessing/setUserOrderImmediatelyFinish',
      payload: {
        userOrderId,
      },
    }).then(() => {
      const {
        orderProcessing: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          this.reloadData();

          notification.success({
            placement: 'bottomRight',
            message: '设置操作结果',
            description: `编号为 ${record.tradeNo} 的订单已设置为完成`,
          });
        });
      }
    });
  };

  render() {
    const { customData, dataLoading, loadSuccess, stateCode } = this.state;

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'title',
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val || '--'}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '规格',
        dataIndex: 'spec',
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val || '--'}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '单位',
        dataIndex: 'unit',
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
              {/* {this.getUnitName(val)} */}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '单价',
        dataIndex: 'price',
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {isMoney(val) ? `￥${val}` : '--'}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '数量',
        dataIndex: 'count',
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {isNumber(val) ? `${val}` : '--'}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '积分',
        dataIndex: 'score',
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {isNumber(val) ? `${val}` : '--'}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '合计',
        dataIndex: 'purchasePrice',
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {isMoney(val) ? `￥${val}` : '--'}
            </Ellipsis>
          </Fragment>
        ),
      },
    ];

    return (
      <Fragment>
        <div className={styles.infoContainor}>
          <Spin spinning={dataLoading || !loadSuccess}>
            {(customData || []).map((item, index) => (
              <Card
                key={item.key}
                title={`订单编号：${item.tradeNo} 联系：${item.shippingAddress} 下单时间：${
                  item.inTime
                } 当前状态：${getPageName(stateCode)}`}
                className={styles.card}
                bordered={false}
                extra={
                  <Fragment>
                    <Popconfirm
                      placement="topRight"
                      title="立即完成订单，确定吗？"
                      onConfirm={e => this.setUserOrderImmediatelyFinish(e, item, index)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button
                        type="primary"
                        icon="save"
                        disabled={dataLoading || customData[index].processing || !loadSuccess}
                        loading={customData[index].processing}
                      >
                        完成订单
                      </Button>
                    </Popconfirm>
                  </Fragment>
                }
              >
                <div>
                  <Table columns={columns} dataSource={item.itemList} pagination={false} />
                </div>
              </Card>
            ))}
            {(customData || []).length === 0 ? (
              <Card
                title={`${getPageName(stateCode)}的订单`}
                className={styles.card}
                bordered={false}
              >
                <Empty />
              </Card>
            ) : null}
          </Spin>
        </div>
        <BackTop />
      </Fragment>
    );
  }
}

export default BasicInfo;
