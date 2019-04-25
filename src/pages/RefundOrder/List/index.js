import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Icon,
  Dropdown,
  Menu,
  Modal,
  Button,
  Divider,
  Badge,
  notification,
} from 'antd';

import {
  isInvalid,
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

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

@connect(({ refundOrder, global, loading }) => ({
  refundOrder,
  global,
  loading: loading.models.refundOrder,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.refundOrder.list;

  getApiData = props => {
    const {
      refundOrder: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '退款订单列表',
    paramsKey: 'c2bccbc0-7b81-4edc-b4d2-565da2dcdd1f',
    loadApiPath: 'refundOrder/list',
    dateRangeFieldName: '提交时段',
    tableScroll: { x: 2040 },
  });

  refundOrderHandleTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.refundOrderHandleTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getRefundOrderHandleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderHandleTypeList());
    return item == null ? '未知' : item.name;
  };

  refundOrderStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.refundOrderStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getRefundOrderStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderStateList());
    return item == null ? '未知' : item.name;
  };

  getRefundOrderStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'success';
        break;
      case 0:
        result = 'error';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  goToDetail = record => {
    const { dispatch } = this.props;
    const { refundOrderId } = record;
    const location = {
      pathname: `/order/refund/detail/load/${refundOrderId}/key/orderInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  goToHandle = record => {
    const { dispatch } = this.props;
    const { refundOrderId } = record;
    const location = {
      pathname: `/order/refund/detail/load/${refundOrderId}/key/refundInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'detail':
        this.goToDetail(record);
        break;
      case 'delete':
        this.removeData(record);
        break;
      case 'handle':
        this.goToHandle(record);
        break;
      default:
        break;
    }
  };

  removeData = record => {
    const { dispatch } = this.props;
    const { refundOrderId } = record;

    const that = this;

    const { processing } = that.state;

    confirm({
      title: '删除售后单',
      content: `确定要删除单${record.tradeNo}吗?`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        dispatch({
          type: 'refundOrder/remove',
          payload: {
            refundOrderId,
          },
        }).then(() => {
          const data = that.getApiData(that.props);

          const { dataSuccess } = data;
          if (dataSuccess) {
            requestAnimationFrame(() => {
              notification.success({
                placement: 'bottomRight',
                message: '设置操作结果',
                description: `单号：${record.tradeNo} 已删除`,
              });
            });

            that.refreshGrid();
          }

          that.setState({ processing: false });
        });
      },
      onCancel() {},
    });

    return false;
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName, dataLoading, processing } = this.state;

    const refundOrderHandleTypeData = this.refundOrderHandleTypeList();
    const refundOrderHandleTypeOption = [];

    refundOrderHandleTypeData.forEach(item => {
      const { name, flag } = item;
      refundOrderHandleTypeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    const refundOrderStateData = this.refundOrderStateList();
    const refundOrderStateOption = [];

    refundOrderStateData.forEach(item => {
      const { name, flag } = item;
      refundOrderStateOption.push(
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
            <FormItem label={fieldData.state}>
              {getFieldDecorator('state', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.state, '选择') },
                ],
                initialValue: refundOrderStateData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.state, '选择')}
                  style={{ width: '100%' }}
                >
                  {refundOrderStateOption}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label={fieldData.handleType}>
              {getFieldDecorator('handleType', {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.handleType, '选择'),
                  },
                ],
                initialValue: refundOrderHandleTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.handleType, '选择')}
                  style={{ width: '100%' }}
                >
                  {refundOrderHandleTypeOption}
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
            </Fragment>,
            12
          )}
        </Row>
      </Fragment>
    );
  };

  getColumn = () => [
    // {
    //   title: '退款Id',
    //   dataIndex: 'refundOrderId',
    //   width: 200,
    //   align: 'center',
    // },
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
    {
      title: '退款流水',
      dataIndex: 'refundTradeNo',
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
      title: '订单流水',
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
      title: '站长姓名',
      dataIndex: 'realName',
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
      title: '站点名称',
      dataIndex: 'mName',
      width: 180,
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
      title: '退款原因',
      dataIndex: 'refundDesc',
      width: 180,
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
      title: '处理状态',
      dataIndex: 'state',
      width: 240,
      align: 'center',
      render: (val, record) => (
        <Fragment>
          <Badge
            status={this.getRefundOrderStateBadgeStatus(val)}
            text={`${this.getRefundOrderStateName(val)}/${this.getRefundOrderHandleTypeName(
              record.handleType
            )}`}
          />
        </Fragment>
      ),
    },
    {
      title: '退款数量',
      dataIndex: 'num',
      width: 100,
      align: 'center',
    },
    {
      title: '退款金额',
      dataIndex: 'money',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            ￥{val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '返还库存',
      dataIndex: 'returnStore',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val === '' ? '--' : val === 1 ? '是' : '否'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '提交时间',
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
    // {
    //   title: '退款状态',
    //   dataIndex: 'handleType',
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
    //         {this.getRefundOrderHandleTypeName(val)}
    //       </Ellipsis>
    //     </Fragment>
    //   ),
    // },
    {
      title: '处理时间',
      dataIndex: 'handleTime',
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
      title: '退款备注',
      dataIndex: 'note',
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
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToHandle(record)}
            disabled={!this.checkAuthority(accessWayCollection.refundOrder.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {/* <Menu.Item key="detail">
                    <Icon type="read" />
                    详情
                  </Menu.Item> */}
                {this.checkAuthority(accessWayCollection.refundOrder.remove) ? (
                  <Menu.Item key="delete">
                    <Icon type="delete" />
                    删除
                  </Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Icon type="form" />
            处理
          </Dropdown.Button>
        </Fragment>
      ),
    },
  ];
}

export default List;
