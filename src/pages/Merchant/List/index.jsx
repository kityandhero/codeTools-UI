import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Icon, Dropdown, Menu, Button, Badge, Divider } from 'antd';

import { getRandomColor, copyToClipboard, replaceTargetText, formatDatetime } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';

import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

import styles from './index.less';

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.merchant.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '站长列表',
        paramsKey: '7713045b-a5de-44ca-bd5d-0695549eec8d',
        loadApiPath: 'merchant/list',
        dateRangeFieldName: '统计时段',
      },
    };
  }

  getApiData = props => {
    const {
      merchant: { data },
    } = props;

    return data;
  };

  getMerchantStatusBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'success';
        break;
      default:
        result = 'error';
        break;
    }

    return result;
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { merchantId } = record;
    const location = {
      pathname: `/person/merchant/edit/load/${merchantId}/key/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  goToAudit = record => {
    const { dispatch } = this.props;
    const { merchantId } = record;
    const location = {
      pathname: `/person/merchant/edit/load/${merchantId}/key/auditInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'audit':
        this.goToAudit(record);
        break;
      default:
        break;
    }
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName, dataLoading, processing } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.userId, 'userId')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.realName, 'realName')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.phone, 'phone')}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 9)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.mName, 'mName')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchLineFormItem(true)}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchMerchantStatusFormItem(true)}
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
            9,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '服务站名',
      dataIndex: 'mName',
      width: 240,
      align: 'left',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(record.isCloseShop + 14),
              }}
            >
              [{this.getMerchantSwitchName(record.isCloseShop)}]
            </span>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '推荐人→站长姓名',
      dataIndex: 'shareMercahntName',
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '无推荐'} → <span className={styles.merchantName}>{record.realName}</span>
          </Ellipsis>
        </>
      ),
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 120,
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
      title: '站长标识',
      dataIndex: 'merchantId',
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
      title: '用户标识',
      dataIndex: 'userId',
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
      title: '状态',
      dataIndex: 'state',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Badge
            status={this.getMerchantStatusBadgeStatus(val)}
            text={this.getMerchantStatusName(val)}
          />
        </>
      ),
    },
    // {
    //   title: '周件',
    //   dataIndex: 'weeklyCount',
    //   width: 60,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         {val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    // {
    //   title: '周销',
    //   dataIndex: 'weeklyAmount',
    //   width: 100,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         ￥{val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    // {
    //   title: '周排',
    //   dataIndex: 'weeklyRanking',
    //   width: 60,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         {val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    // {
    //   title: '月件',
    //   dataIndex: 'monthlyCount',
    //   width: 60,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         {val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    // {
    //   title: '月销',
    //   dataIndex: 'monthlyAmount',
    //   width: 100,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         ￥{val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    // {
    //   title: '月排',
    //   dataIndex: 'monthlyRanking',
    //   width: 60,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         {val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    // {
    //   title: '段销件',
    //   dataIndex: 'timeSpanCount',
    //   width: 80,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         {val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    // {
    //   title: '段销额',
    //   dataIndex: 'timeSpanAmount',
    //   width: 100,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         ￥{val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    // {
    //   title: '售后数',
    //   dataIndex: 'afterSaleCount',
    //   width: 80,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         {val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    // {
    //   title: '退款数',
    //   dataIndex: 'refundCount',
    //   width: 80,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         {val || '0'}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    {
      title: '线路',
      dataIndex: 'lineId',
      width: 180,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getLineName(val, '--')}
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
      title: '审核时间',
      dataIndex: 'handleTime',
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
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToEdit(record)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                <Menu.Item key="audit">
                  <Icon type="issues-close" />
                  审核
                </Menu.Item>
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
