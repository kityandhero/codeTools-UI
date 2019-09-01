import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Menu, Badge, Icon, Dropdown, Modal, notification, message } from 'antd';

import { formatDatetime, copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

const { confirm } = Modal;

@connect(({ areaRankSaleStatistic, global, loading }) => ({
  areaRankSaleStatistic,
  global,
  loading: loading.models.areaRankSaleStatistic,
}))
@Form.create()
class StandardList extends PagerList {
  componentAuthority = accessWayCollection.areaRankSaleStatistic.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '销售分类分时统计列表',
        paramsKey: '6b212b84-b020-4f9d-8037-877c41a8a36a',
        loadApiPath: 'areaRankSaleStatistic/list',
        dateRangeFieldName: '统计时段',
        // tableScroll: { x: 1620 },
      },
    };
  }

  getApiData = props => {
    const {
      areaRankSaleStatistic: { data },
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
    const { areaRankSaleStatisticId } = record;
    const location = {
      pathname: `/subentryData/statistic/areaRankSale/detail/load/${areaRankSaleStatisticId}/key/basicInfo`,
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
          type: 'areaRankSaleStatistic/remove',
          payload: {
            areaRankSaleStatisticId: record.areaRankSaleStatisticId,
          },
        }).then(() => {
          const {
            areaRankSaleStatistic: { data },
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
          <Col md={4} sm={24}>
            {this.renderSearchStatisticModeFormItem(true)}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 12)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '数据标识',
      dataIndex: 'areaRankSaleStatisticId',
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
      title: '统计模式',
      dataIndex: 'mode',
      width: 120,
      align: 'center',
      render: (val, record) => <>{record.modeNote}</>,
    },
    {
      title: '线上销售总额',
      dataIndex: 'onlineSaleAmount',
      width: 120,
      align: 'center',
      render: val => <>￥{val}</>,
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

export default StandardList;
