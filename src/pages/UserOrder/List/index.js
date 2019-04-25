import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Input, Select, Icon, Button, Dropdown, Menu, Divider } from 'antd';

import {
  isInvalid,
  getRandomColor,
  searchFromList,
  refitCommonData,
  formatDatetime,
  replaceTargetText,
  copyToClipboard,
  buildFieldDescription,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/CustomList/PagerList';

import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ userOrder, global, loading }) => ({
  userOrder,
  global,
  loading: loading.models.userOrder,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.userOrder.listUserPaymentOrder;

  getApiData = props => {
    const {
      userOrder: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '支付订单列表',
    paramsKey: 'd432c2af-8d43-498a-b89b-96c367ab23fc',
    loadApiPath: 'userOrder/list',
    dateRangeFieldName: '提交时段',
    tableScroll: { x: 1640 },
    showSelect: true,
  });

  cityList = () => {
    const { global } = this.props;
    return refitCommonData(global.cityList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getCityName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.cityList());
    return item == null ? '未知' : item.name;
  };

  regUserTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.regUserTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getRegUserTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.regUserTypeList());
    return item == null ? '未知' : item.name;
  };

  payTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.payTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.payTypeList());
    return item == null ? '未知' : item.name;
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

  orderTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.orderTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getOrderTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderTypeList());
    return item == null ? '未知' : item.name;
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

  userOrderClientTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.userOrderClientTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getUserOrderClientTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.userOrderClientTypeList());
    return item == null ? '--' : item.name;
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
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName, dataLoading, processing } = this.state;

    const orderTypeData = this.orderTypeList();
    const orderTypeOption = [];

    orderTypeData.forEach(item => {
      const { name, flag } = item;
      orderTypeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    const orderStatusData = this.orderStatusList();
    const orderStatusOption = [];

    orderStatusData.forEach(item => {
      const { name, flag } = item;
      orderStatusOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            <FormItem label={fieldData.realName}>
              {getFieldDecorator('realName')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.realName, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label={fieldData.tradeNo}>
              {getFieldDecorator('tradeNo')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.tradeNo, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label={fieldData.userOrderId}>
              {getFieldDecorator('userOrderId')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.userOrderId, '输入')}
                />
              )}
            </FormItem>
          </Col>
          {/* <Col md={6} sm={24}>
            <FormItem label={fieldData.type}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.type, '选择'),
                  },
                ],
                initialValue: orderTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.type, '选择')}
                  style={{ width: '100%' }}
                >
                  {orderTypeOption}
                </Select>
              )}
            </FormItem>
          </Col> */}
          <Col md={6} sm={24}>
            <FormItem label={fieldData.state}>
              {getFieldDecorator('state', {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.state, '选择'),
                  },
                ],
                initialValue: orderStatusData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.state, '选择')}
                  style={{ width: '100%' }}
                >
                  {orderStatusOption}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 12)}
          {this.renderSimpleFormButton(
            <Fragment>
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
            </Fragment>,
            12
          )}
        </Row>
      </Fragment>
    );
  };

  getColumn = () => [
    {
      title: '订单Id',
      dataIndex: 'userOrderId',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <Fragment>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </Fragment>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </Fragment>
      ),
    },
    // {
    //   title: '城市',
    //   dataIndex: 'cityId',
    //   width: 100,
    //   align: 'center',
    //   render: val => (
    //     <Fragment>
    //       <Ellipsis
    //         style={{
    //           color: getRandomColor(val * 2),
    //         }}
    //         tooltip
    //         lines={1}
    //       >
    //         {this.getCityName(val)}
    //       </Ellipsis>
    //     </Fragment>
    //   ),
    // },
    {
      title: '流水号',
      dataIndex: 'tradeNo',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <Fragment>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </Fragment>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </Fragment>
      ),
    },
    {
      title: '用户昵称/收件人',
      dataIndex: 'nickname',
      align: 'center',
      render: (val, record) => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val}
            {(record.spec || '') === '' ? '' : `(${record.spec})`}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '消费者类型',
      dataIndex: 'type',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis
            style={{
              color: getRandomColor(val + 8),
            }}
            tooltip
            lines={1}
          >
            {this.getRegUserTypeName(val)}
          </Ellipsis>
        </Fragment>
      ),
    },
    // {
    //   title: '支付类型',
    //   dataIndex: 'payType',
    //   width: 120,
    //   align: 'center',
    //   render: val => (
    //     <Fragment>
    //       <Ellipsis
    //         style={{
    //           color: getRandomColor(val + 14),
    //         }}
    //         tooltip
    //         lines={1}
    //       >
    //         {this.getPayTypeName(val)}
    //       </Ellipsis>
    //     </Fragment>
    //   ),
    // },
    {
      title: '站长名称',
      dataIndex: 'mRealName',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis
            style={{
              color: getRandomColor(val + 15),
            }}
            tooltip
            lines={1}
          >
            {this.getOrderStatusName(val, '--')}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '总金额(元)',
      dataIndex: 'amount',
      width: 160,
      align: 'center',
      render: (val, record) => (
        <Fragment>
          <Ellipsis className={styles.price} tooltip lines={1}>
            <Icon
              type={this.getPayTypeIconType(record.payType)}
              style={{ color: this.getPayTypeIconColor(record.payType) }}
            />
            {val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '下单时间',
      dataIndex: 'inTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis
            style={{
              color: getRandomColor(val + 6),
            }}
            tooltip
            lines={1}
          >
            {this.getOrderTypeName(val)}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '下单渠道',
      dataIndex: 'clientType',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {this.getUserOrderClientTypeName(val)}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Fragment>
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
        </Fragment>
      ),
    },
  ];
}

export default List;
