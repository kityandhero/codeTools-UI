import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Icon, Button, Dropdown, Menu, Modal, Divider, notification } from 'antd';

import { getRandomColor, formatDatetime, replaceTargetText, copyToClipboard } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

const { confirm } = Modal;

@connect(({ replenishment, global, loading }) => ({
  replenishment,
  global,
  loading: loading.models.replenishment,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.replenishment.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '售后订单列表',
        paramsKey: '8c21f9f5-e74a-424d-a309-acd3a5260ba4',
        loadApiPath: 'replenishment/list',
        dateRangeFieldName: '提交时间',
        tableScroll: { x: 2020 },
      },
    };
  }

  getApiData = props => {
    const {
      replenishment: { data },
    } = props;

    return data;
  };

  goToDetail = record => {
    const { dispatch } = this.props;
    const { replenishmentId } = record;
    const location = {
      pathname: `/order/replenishment/detail/load/${replenishmentId}/key/orderInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  goToHandle = record => {
    const { dispatch } = this.props;
    const { replenishmentId } = record;
    const location = {
      pathname: `/order/replenishment/detail/load/${replenishmentId}/key/replenishmentInfo`,
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
    const { replenishmentId } = record;

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
        that.setState({ processing: true });

        dispatch({
          type: 'replenishment/remove',
          payload: {
            replenishmentId,
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

            that.reloadData();
          }

          that.setState({ processing: false });
        });
      },
      onCancel() {},
    });

    return false;
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
          <Col md={5} sm={24}>
            {this.renderSearchReplenishmentTypeFormItem(true)}
          </Col>
          <Col md={7} sm={24}>
            {this.renderSearchReplenishmentReasonTypeFormItem(true)}
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 12)}
          <Col md={5} sm={24}>
            {this.renderSearchReplenishmentStateFormItem(true)}
          </Col>
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
            </>,
            7,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    // {
    //   title: '售后编号',
    //   dataIndex: 'replenishmentId',
    //   width: 200,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <EllipsisCustom
    //         tooltip
    //         lines={1}
    //         removeChildren
    //         extraContent={
    //           <>
    //             <a
    //               onClick={() => {
    //                 copyToClipboard(val);
    //               }}
    //             >
    //               {replaceTargetText(val, '***', 2, 6)}
    //             </a>
    //           </>
    //         }
    //       >
    //         {val}
    //       </EllipsisCustom>
    //     </>
    //   ),
    // },
    {
      title: '订单编号',
      dataIndex: 'orderId',
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
      title: '订单流水',
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
      title: '社区名称',
      dataIndex: 'mName',
      width: 180,
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
      title: '站长姓名',
      dataIndex: 'realName',
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
      title: '用户昵称',
      dataIndex: 'nickname',
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
      title: '售后类型',
      dataIndex: 'type',
      width: 180,
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
            {this.getReplenishmentTypeName(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '处理状态',
      dataIndex: 'state',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis
            style={{
              color: getRandomColor(val + 16),
            }}
            tooltip
            lines={1}
          >
            {this.getReplenishmentStateName(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '申请原因',
      dataIndex: 'reasonType',
      width: 180,
      align: 'center',
      render: val => (
        <>
          <Ellipsis
            style={{
              color: getRandomColor(val + 24),
            }}
            tooltip
            lines={1}
          >
            {this.getReplenishmentReasonTypeName(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '下单时间',
      dataIndex: 'userOrderInTime',
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
      title: '备注',
      dataIndex: 'note',
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
      title: '申请时间',
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
      title: '补货出库日期',
      dataIndex: 'replenishmentOutboundTime',
      width: 122,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'YYYY-MM-DD', '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '最后处理时间',
      dataIndex: 'lastHandleTime',
      width: 122,
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
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToHandle(record)}
            disabled={!this.checkAuthority(accessWayCollection.replenishment.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {/* <Menu.Item key="detail">
                    <Icon type="read" />
                    详情
                  </Menu.Item> */}
                {this.checkAuthority(accessWayCollection.replenishment.remove) ? (
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
        </>
      ),
    },
  ];
}

export default List;
