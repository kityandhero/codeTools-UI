import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Icon, Button, Dropdown, Menu, Divider } from 'antd';

import { getRandomColor, formatDatetime, replaceTargetText, copyToClipboard } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';

import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';
import styles from './index.less';

@connect(({ userOrder, global, loading }) => ({
  userOrder,
  global,
  loading: loading.models.userOrder,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.userOrder.listUserPaymentOrder;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '支付订单列表',
        paramsKey: 'd432c2af-8d43-498a-b89b-96c367ab23fc',
        loadApiPath: 'userOrder/list',
        dateRangeFieldName: '提交时段',
        tableScroll: { x: 1840 },
        showSelect: true,
      },
    };
  }

  getApiData = props => {
    const {
      userOrder: { data },
    } = props;

    return data;
  };

  getPayTypeIconType = flag => {
    let result = '';

    switch (flag) {
      case 1:
        result = 'wechat';
        break;
      case 2:
        result = 'alipay';
        break;
      default:
        result = '';
        break;
    }

    return result;
  };

  getPayTypeIconColor = flag => {
    let result = '';

    switch (flag) {
      case 1:
        result = '#01d10c';
        break;
      case 2:
        result = '#00a1e9';
        break;
      default:
        result = '';
        break;
    }

    return result;
  };

  goToDetail = record => {
    const { dispatch } = this.props;
    const { userOrderId } = record;
    const location = {
      pathname: `/order/payment/detail/load/${userOrderId}/key/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName, dataLoading, processing } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            {this.renderSearchInputFormItem(fieldData.realName, 'realName')}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchInputFormItem(fieldData.tradeNo, 'tradeNo')}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchInputFormItem(fieldData.userOrderId, 'userOrderId')}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchOrderStatusFormItem(true)}
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 12)}
          {this.renderSimpleFormButton(
            <>
              <Divider type="vertical" />
              <Button
                disabled={dataLoading || processing}
                type="dashed"
                icon="export"
                onClick={this.showAddNewModal}
              >
                导出
              </Button>
              <Divider type="vertical" />
              <Button
                disabled={dataLoading || processing}
                className={styles.searchButtonMarginLeft}
                type="dashed"
                icon="printer"
                onClick={this.showAddNewModal}
              >
                单用户合并打印
              </Button>
            </>,
            12,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '订单Id',
      dataIndex: 'userOrderId',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </>
      ),
    },
    {
      title: '流水号',
      dataIndex: 'tradeNo',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </>
      ),
    },
    {
      title: '用户昵称/收件人',
      dataIndex: 'nickname',
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
            {(record.spec || '') === '' ? '' : `(${record.spec})`}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '消费者类型',
      dataIndex: 'type',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis
            style={{
              color: getRandomColor(val + 8),
            }}
            tooltip
            lines={1}
          >
            {this.getRegUserTypeName(val)}
          </Ellipsis>
        </>
      ),
    },
    // {
    //   title: '支付类型',
    //   dataIndex: 'payType',
    //   width: 120,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis
    //         style={{
    //           color: getRandomColor(val + 14),
    //         }}
    //         tooltip
    //         lines={1}
    //       >
    //         {this.getPayTypeName(val)}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    {
      title: '站长名称',
      dataIndex: 'mRealName',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '站点名称',
      dataIndex: 'merchantName',
      width: 200,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis
            style={{
              color: getRandomColor(val + 15),
            }}
            tooltip
            lines={1}
          >
            {this.getOrderStatusName(val, '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '总金额(元)',
      dataIndex: 'amount',
      width: 160,
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            <Icon
              type={this.getPayTypeIconType(record.payType)}
              style={{ color: this.getPayTypeIconColor(record.payType) }}
            />
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '下单时间',
      dataIndex: 'inTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis
            style={{
              color: getRandomColor(val + 6),
            }}
            tooltip
            lines={1}
          >
            {this.getOrderTypeName(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '下单渠道',
      dataIndex: 'clientType',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getUserOrderClientTypeName(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToDetail(record)}
            disabled={!this.checkAuthority(accessWayCollection.userOrder.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {/* <Menu.Item key="1">
                  <Icon type="setting" />
                  数据
                </Menu.Item> */}
              </Menu>
            }
          >
            <Icon type="read" />
            详情
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default List;
