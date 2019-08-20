import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Select, DatePicker } from 'antd';

import {
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  buildFieldDescription,
  refitCommonData,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

const FormItem = Form.Item;
const { Option } = Select;

const fieldData = {
  goodsOutboundMerchantRecordId: '标识',
  productName: '品名',
  specification: '规格',
  unit: '单位',
  productCount: '数量',
  rankId: '品类标识',
  productId: '产品标识',
  lineId: '线路标识',
  lineName: '线路名称',
  merchantId: '社区标识',
  merchantName: '社区名称',
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

@connect(({ goodsOutboundMerchantRecord, global, loading }) => ({
  goodsOutboundMerchantRecord,
  global,
  loading: loading.models.goodsOutboundMerchantRecord,
}))
@Form.create()
class Standard extends InnerPagerList {
  componentAuthority = accessWayCollection.goodsOutboundMerchantRecord.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      batchDate: '',
    };
  }

  getApiData = props => {
    const {
      goodsOutboundMerchantRecord: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      productId: id,
      loadApiPath: 'goodsOutboundMerchantRecord/list',
      dateRangeFieldName: '发生时段',
    };

    return result;
  };

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  lineList = () => {
    const { global } = this.props;
    return refitCommonData(global.lineList, {
      key: '-10000',
      name: '不限',
      flag: '-10000',
    });
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
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName } = this.state;

    const lineData = this.lineList();
    const lineOption = [];

    lineData.forEach(item => {
      const { name, flag } = item;
      lineOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.batchDate}>
              {getFieldDecorator('batchDate', {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.areaAgentId, '选择'),
                  },
                ],
              })(
                <DatePicker
                  placeholder={buildFieldDescription(fieldData.batchDate, '选择')}
                  format="YYYY-MM-DD"
                  onChange={this.onBatchDateChange}
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.lineId}>
              {getFieldDecorator('lineId', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.lineId, '选择') },
                ],
                initialValue: lineData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.lineId, '选择')}
                  style={{ width: '100%' }}
                >
                  {lineOption}
                </Select>
              )}
            </FormItem>
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
      title: '社区名称',
      dataIndex: 'merchantName',
      align: 'center',
      width: 180,
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
      dataIndex: 'goodsOutboundMerchantRecordId',
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
