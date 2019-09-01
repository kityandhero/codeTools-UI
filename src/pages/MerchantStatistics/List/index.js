import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Menu, Badge, Icon, Dropdown, Modal, notification, message } from 'antd';

import { formatDatetime, copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

const { confirm } = Modal;

@connect(({ merchantStatistics, global, loading }) => ({
  merchantStatistics,
  global,
  loading: loading.models.merchantStatistics,
}))
@Form.create()
class Index extends PagerList {
  componentAuthority = accessWayCollection.merchantStatistics.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '站长销售统计列表',
        paramsKey: '0699294c-edcd-4d5d-a0d3-8961aefe1c46',
        loadApiPath: 'merchantStatistics/list',
        dateRangeFieldName: '统计时段',
        tableScroll: { x: 1920 },
      },
    };
  }

  getApiData = props => {
    const {
      merchantStatistics: { data },
    } = props;

    return data;
  };

  getStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'success';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  goToDetail = record => {
    const { dispatch } = this.props;
    const { merchantStatisticsId } = record;
    const location = {
      pathname: `/subentryData/statistic/areaRankSale/detail/load/${merchantStatisticsId}/key/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'remove':
        this.removeItem(record);
        break;
      default:
        break;
    }
  };

  removeItem = record => {
    const that = this;

    const { processing } = that.state;

    confirm({
      title: '删除补全纪录',
      content: `确定要删除补全纪录吗`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        const { dispatch } = that.props;

        that.setState({ processing: true });

        dispatch({
          type: 'merchantStatistics/remove',
          payload: {
            merchantStatisticsId: record.merchantStatisticsId,
          },
        }).then(() => {
          const {
            merchantStatistics: { data },
          } = that.props;

          const { dataSuccess } = data;
          if (dataSuccess) {
            requestAnimationFrame(() => {
              notification.success({
                placement: 'bottomRight',
                message: '操作结果',
                description: '数据已经删除成功，请进行后续操作。',
              });
            });

            that.reloadData();
          }

          that.setState({ processing: false });
        });
      },
      onCancel() {
        message.info('取消了删除操作！');
      },
    });

    return false;
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.realName, 'realName')}
          </Col>
          <Col md={4} sm={24}>
            {this.renderSearchMerchantSaleStatisticShowModeFormItem(true)}
          </Col>
          <Col md={3} sm={24}>
            {this.renderSearchStatisticModeFormItem(true)}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 6, {
            format: 'YYYY-MM-DD',
            showTime: false,
          })}
          {this.renderSimpleFormButton(null, 6)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '站点名称',
      dataIndex: 'merchantName',
      width: 180,
      align: 'left',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '站长姓名',
      dataIndex: 'realName',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '订单总额',
      dataIndex: 'totalSaleAmount',
      width: 120,
      align: 'center',
      render: val => <>{(val || '') === '' ? '--' : `￥${val}`}</>,
    },
    {
      title: '排名',
      dataIndex: 'ranking',
      width: 100,
      align: 'center',
      render: val => (
        <>
          {val === -1 ? '待排名' : ''}
          {val === 0 ? '无排名' : ''}
          {val > 0 ? val : ''}
        </>
      ),
    },
    {
      title: '统计模式',
      dataIndex: 'mode',
      width: 120,
      align: 'center',
      render: (val, record) => <>{record.modeNote}</>,
    },
    {
      title: '统计时段',
      dataIndex: 'startTime',
      width: 220,
      align: 'center',
      render: (val, record) => (
        <>
          {record.mode === 0
            ? `${formatDatetime(val, 'YYYY-MM-DD', '--')} ${formatDatetime(val, 'HH:mm', '--')}`
            : ''}
          {record.mode === 1 ? `${formatDatetime(val, 'YYYY-MM-DD', '--')}` : ''}
          {record.mode === 2
            ? `${formatDatetime(val, 'YYYY-MM-DD', '--')} ~ ${formatDatetime(
                record.endTime,
                'YYYY-MM-DD',
                '--',
              )}`
            : ''}
          {record.mode === 3 ? `${formatDatetime(val, 'YYYY-MM', '--')}` : ''}
          {record.mode === 4
            ? `${formatDatetime(val, 'YYYY-MM', '--')} ~ ${formatDatetime(
                record.endTime,
                'YYYY-MM',
                '--',
              )}`
            : ''}
          {record.mode === 5 ? `${formatDatetime(val, 'YYYY', '--')}` : ''}
        </>
      ),
    },
    {
      title: '订单量',
      dataIndex: 'totalSaleCount',
      width: 120,
      align: 'center',
      render: val => <>{(val || '') === '' ? '--' : `${val}单`}</>,
    },
    {
      title: '退款总额',
      dataIndex: 'totalRefundOrderAmount',
      width: 120,
      align: 'center',
      render: val => <>{(val || '') === '' ? '--' : `￥${val}`}</>,
    },
    {
      title: '退款单量',
      dataIndex: 'totalRefundOrderCount',
      width: 120,
      align: 'center',
      render: val => <>{(val || '') === '' ? '--' : `${val}单`}</>,
    },
    {
      title: '售后单量',
      dataIndex: 'totalReplenishmentCount',
      width: 120,
      align: 'center',
      render: val => <>{(val || '') === '' ? '--' : `${val}单`}</>,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      align: 'center',
      render: (val, record) => (
        <>
          <Badge status={this.getStateBadgeStatus(val)} text={record.stateNote} />
        </>
      ),
    },
    {
      title: '数据标识',
      dataIndex: 'merchantSaleStatisticId',
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
      title: '数据统计时间点',
      dataIndex: 'createTime',
      width: 140,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={<>{formatDatetime(val, 'MM-DD HH:mm', '--')}</>}
          >
            {val}
          </EllipsisCustom>
        </>
      ),
    },
    {
      title: '操作',
      width: 106,
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToDetail(record)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {/* <Menu.Item key="remove">
                  <Icon type="delete" />
                  导出
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

export default Index;
