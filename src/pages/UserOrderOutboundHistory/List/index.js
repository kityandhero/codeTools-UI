import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form } from 'antd';

import { formatDatetime, copyToClipboard, replaceTargetText, getRandomColor } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

@connect(({ userOrderOutboundHistory, global, loading }) => ({
  userOrderOutboundHistory,
  global,
  loading: loading.models.userOrderOutboundHistory,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.userOrderOutboundHistory.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        batchDate: '',
        pageName: '批次出库订单记录',
        paramsKey: '794c31a1-09c4-47de-b4fc-f63db6e3089b',
        loadApiPath: 'userOrderOutboundHistory/list',
        dateRangeFieldName: '发生时段',
        tableScroll: { x: 1820 },
      },
    };
  }

  getApiData = props => {
    const {
      userOrderOutboundHistory: { data },
    } = props;

    return data;
  };

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  handleFormOtherReset = () => {
    this.setState({
      batchDate: '',
    });
  };

  onBatchDateChange = (date, dateString) => {
    this.setState({
      batchDate: dateString,
    });
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { batchDate } = this.state;

    d.batchDate = batchDate;

    return d;
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;
    const currentOperator = this.getCurrentOperator();

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(
              fieldData.city,
              '',
              currentOperator == null ? '' : currentOperator.cityName || '',
              null,
              'form',
              { disabled: true },
              false,
            )}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchBatchDateFormItem()}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchLineFormItem(true)}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 9)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.merchantId, 'merchantId')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.userOrderId, 'userOrderId')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchUserOrderOutboundHistoryTypeFormItem(true)}
          </Col>
          {this.renderSimpleFormButton(null, 9)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.userOrderId,
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
      title: fieldData.batchDate,
      dataIndex: 'batchDate',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.description,
      dataIndex: 'description',
      align: 'left',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.typeNote,
      dataIndex: 'typeNote',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.outboundDataChanged,
      dataIndex: 'outboundDataChanged',
      align: 'center',
      width: 160,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(val + 14),
              }}
            >
              {record.outboundDataChangedNote}
            </span>
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.transportDataChanged,
      dataIndex: 'transportDataChanged',
      align: 'center',
      width: 160,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(val + 14),
              }}
            >
              {record.transportDataChangedNote}
            </span>
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.completeDataChanged,
      dataIndex: 'completeDataChanged',
      align: 'center',
      width: 160,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(val + 14),
              }}
            >
              {record.completeDataChangedNote}
            </span>
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.additional,
      dataIndex: 'additional',
      align: 'center',
      width: 160,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val.areaAgentName}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.userOrderOutboundHistoryId,
      dataIndex: 'userOrderOutboundHistoryId',
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
      title: fieldData.createTime,
      dataIndex: 'createTime',
      width: 200,
      align: 'center',
      sorter: false,
      fixed: 'right',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
  ];
}

export default Standard;
