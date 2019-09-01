import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form } from 'antd';

import { formatDatetime, copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

@connect(({ goodsOutboundLineRecord, global, loading }) => ({
  goodsOutboundLineRecord,
  global,
  loading: loading.models.goodsOutboundLineRecord,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.goodsOutboundLineRecord.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '线路出库批次物品统计',
        paramsKey: '44d80dd7-47af-4318-8a04-e482cdd57995',
        loadApiPath: 'goodsOutboundLineRecord/list',
        dateRangeFieldName: '发生时段',
        tableScroll: { x: 2160 },
        batchDate: '',
      },
    };
  }

  getApiData = props => {
    const {
      goodsOutboundLineRecord: { data },
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
            {this.renderSearchInputFormItem(fieldData.productId, 'productId')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchRankFormItem(true)}
          </Col>
          {this.renderSimpleFormButton(null, 14)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '批次',
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
      title: '线路名称',
      dataIndex: 'lineName',
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
      title: fieldData.productName,
      dataIndex: 'productName',
      align: 'center',
      width: 200,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.specification,
      dataIndex: 'specification',
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
      title: fieldData.unit,
      dataIndex: 'unit',
      align: 'center',
      width: 120,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.productCount,
      dataIndex: 'productCount',
      align: 'center',
      width: 120,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.averageCostPrice,
      dataIndex: 'averageCostPrice',
      align: 'center',
      width: 120,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.averageStockPrice,
      dataIndex: 'averageStockPrice',
      align: 'center',
      width: 120,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.averageSalePrice,
      dataIndex: 'averageSalePrice',
      align: 'center',
      width: 120,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.totalCostPrice,
      dataIndex: 'totalCostPrice',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.totalStockPrice,
      dataIndex: 'totalStockPrice',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.totalSalePrice,
      dataIndex: 'totalSalePrice',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '数据标识',
      dataIndex: 'goodsOutboundLineRecordId',
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
      title: '发生时间',
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
