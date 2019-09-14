import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form } from 'antd';

import {
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { parseUrlParamsForSetState } from '../../../Assist/config';

const fieldData = {
  goodsOutboundMerchantRecordId: '标识',
  lineId: '线路标识',
  lineName: '线路名称',
  productName: '品名',
  specification: '规格',
  unit: '单位',
  productCount: '数量',
  rankId: '品类标识',
  productId: '产品标识',
  minCostPrice: '最小成本价',
  averageCostPrice: '平均成本价',
  maxCostPrice: '最大成本价',
  minSalePrice: '最小售价',
  averageSalePrice: '平均售价',
  maxSalePrice: '最大售价',
  minStockPrice: '最小站长价',
  averageStockPrice: '平均站长价',
  maxStockPrice: '最大站长价',
  totalCostPrice: '总计成本价',
  totalSalePrice: '总计售价',
  totalStockPrice: '总计站长价',
  areaAgentId: '所属地区',
  batchDate: ' 出库批次',
};

@connect(({ goodsOutboundLineRecord, global, loading }) => ({
  goodsOutboundLineRecord,
  global,
  loading: loading.models.goodsOutboundLineRecord,
}))
@Form.create()
class Index extends InnerPagerList {
  componentAuthority = accessWayCollection.goodsOutboundLineRecord.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'goodsOutboundLineRecord/list',
        dateRangeFieldName: '发生时段',
        batchDate: '',
        productId: null,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
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
    const { batchDate, productId } = this.state;

    d.batchDate = batchDate;
    d.productId = productId;

    return d;
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchBatchDateFormItem()}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchLineFormItem(true)}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 6)}
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

export default Index;
