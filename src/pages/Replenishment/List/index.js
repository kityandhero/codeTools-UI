import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  Divider,
  notification,
} from 'antd';

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
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

@connect(({ replenishment, global, loading }) => ({
  replenishment,
  global,
  loading: loading.models.replenishment,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.replenishment.list;

  getApiData = props => {
    const {
      replenishment: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '售后订单列表',
    paramsKey: '8c21f9f5-e74a-424d-a309-acd3a5260ba4',
    loadApiPath: 'replenishment/list',
    dateRangeFieldName: '提交时间',
    tableScroll: { x: 2020 },
  });

  replenishmentReasonTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.replenishmentReasonTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getReplenishmentReasonTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentReasonTypeList());
    return item == null ? '未知' : item.name;
  };

  replenishmentStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.replenishmentStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getReplenishmentStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentStateList());
    return item == null ? '未知' : item.name;
  };

  replenishmentTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.replenishmentTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getReplenishmentTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentTypeList());
    return item == null ? '未知' : item.name;
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

    const replenishmentReasonTypeData = this.replenishmentReasonTypeList();
    const replenishmentReasonTypeOption = [];

    replenishmentReasonTypeData.forEach(item => {
      const { name, flag } = item;
      replenishmentReasonTypeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    const replenishmentStateData = this.replenishmentStateList();
    const replenishmentStateOption = [];

    replenishmentStateData.forEach(item => {
      const { name, flag } = item;
      replenishmentStateOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    const replenishmentTypeData = this.replenishmentTypeList();
    const replenishmentTypeOption = [];

    replenishmentTypeData.forEach(item => {
      const { name, flag } = item;
      replenishmentTypeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    return (
      <>
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
          <Col md={4} sm={24}>
            <FormItem label={fieldData.type}>
              {getFieldDecorator('type', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.type, '选择') },
                ],
                initialValue: replenishmentTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.type, '选择')}
                  style={{ width: '100%' }}
                >
                  {replenishmentTypeOption}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label={fieldData.reasonType}>
              {getFieldDecorator('reasonType', {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.reasonType, '选择'),
                  },
                ],
                initialValue: replenishmentReasonTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.reasonType, '选择')}
                  style={{ width: '100%' }}
                >
                  {replenishmentReasonTypeOption}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 12)}
          <Col md={4} sm={24}>
            <FormItem label="处理状态">
              {getFieldDecorator('state', {
                rules: [{ required: false, message: '请选择处理状态!' }],
                initialValue: replenishmentStateData[0].flag,
              })(
                <Select placeholder="请选择处理状态" style={{ width: '100%' }}>
                  {replenishmentStateOption}
                </Select>
              )}
            </FormItem>
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
            6
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
