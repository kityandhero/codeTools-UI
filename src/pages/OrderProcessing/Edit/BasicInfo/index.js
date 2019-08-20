import React from 'react';
import { connect } from 'dva';
import { Card, Spin, BackTop, Table, Empty, Popconfirm, Button, notification } from 'antd';

import {
  refitCommonData,
  isInvalid,
  isNumber,
  isMoney,
  searchFromList,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import Ellipsis from '@/customComponents/Ellipsis';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';

import styles from './index.less';

const getPageName = status => {
  let result = '';

  switch (status) {
    case '1':
      result = '待出库';
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

  return result;
};

@connect(({ userOrder, orderProcessing, global, loading }) => ({
  userOrder,
  orderProcessing,
  global,
  loading: loading.models.userOrder,
}))
class BasicInfo extends TabPageBase {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '', stateCode: -10000 },
      parseUrlParamsForSetState,
    );
  }

  initState = () => {
    const result = {
      loadApiPath: 'userOrder/listMerchantUserOrder',
    };

    return result;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { merchantId, stateCode } = this.state;

    d.merchantId = merchantId;
    d.state = stateCode;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const listData = (metaListData || []).map(item => {
      const o = item;
      o.processing = false;

      return o;
    });

    this.setState({
      metaListData: listData,
    });
  };

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

  setUserOrderImmediatelyFinish = (e, record, index) => {
    const { dispatch } = this.props;
    const { userOrderId } = record;
    const { metaListData } = this.state;

    metaListData[index].processing = true;

    this.setState({ metaListData });

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

  formContent = () => {
    const { metaListData, dataLoading, loadSuccess, stateCode } = this.state;

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'title',
        align: 'center',
        render: val => (
          <>
            <Ellipsis tooltip lines={1}>
              {val || '--'}
            </Ellipsis>
          </>
        ),
      },
      {
        title: '规格',
        dataIndex: 'spec',
        align: 'center',
        render: val => (
          <>
            <Ellipsis tooltip lines={1}>
              {val || '--'}
            </Ellipsis>
          </>
        ),
      },
      {
        title: '单位',
        dataIndex: 'unit',
        align: 'center',
        render: val => (
          <>
            <Ellipsis tooltip lines={1}>
              {val}
              {/* {this.getUnitName(val)} */}
            </Ellipsis>
          </>
        ),
      },
      {
        title: '单价',
        dataIndex: 'price',
        align: 'center',
        render: val => (
          <>
            <Ellipsis tooltip lines={1}>
              {isMoney(val) ? `￥${val}` : '--'}
            </Ellipsis>
          </>
        ),
      },
      {
        title: '数量',
        dataIndex: 'count',
        align: 'center',
        render: val => (
          <>
            <Ellipsis tooltip lines={1}>
              {isNumber(val) ? `${val}` : '--'}
            </Ellipsis>
          </>
        ),
      },
      {
        title: '积分',
        dataIndex: 'score',
        align: 'center',
        render: val => (
          <>
            <Ellipsis tooltip lines={1}>
              {isNumber(val) ? `${val}` : '--'}
            </Ellipsis>
          </>
        ),
      },
      {
        title: '合计',
        dataIndex: 'purchasePrice',
        align: 'center',
        render: val => (
          <>
            <Ellipsis tooltip lines={1}>
              {isMoney(val) ? `￥${val}` : '--'}
            </Ellipsis>
          </>
        ),
      },
    ];

    return (
      <>
        <div className={styles.infoContainor}>
          <Spin spinning={dataLoading || !loadSuccess}>
            {(metaListData || []).map((item, index) => (
              <Card
                key={item.key}
                title={`订单编号：${item.tradeNo} 联系：${item.shippingAddress} 下单时间：${
                  item.inTime
                } 当前状态：${getPageName(stateCode)}`}
                className={styles.card}
                bordered={false}
                extra={
                  <>
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
                        disabled={dataLoading || metaListData[index].processing || !loadSuccess}
                        loading={metaListData[index].processing}
                      >
                        完成订单
                      </Button>
                    </Popconfirm>
                  </>
                }
              >
                <div>
                  <Table columns={columns} dataSource={item.itemList} pagination={false} />
                </div>
              </Card>
            ))}
            {(metaListData || []).length === 0 ? (
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
      </>
    );
  };
}

export default BasicInfo;
