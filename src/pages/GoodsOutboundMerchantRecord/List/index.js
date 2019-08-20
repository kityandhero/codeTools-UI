import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Select, DatePicker, Input, Icon } from 'antd';

import {
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  buildFieldDescription,
  refitCommonData,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ goodsOutboundMerchantRecord, global, loading }) => ({
  goodsOutboundMerchantRecord,
  global,
  loading: loading.models.goodsOutboundMerchantRecord,
}))
@Form.create()
class Standard extends PagerList {
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

  initState = () => ({
    pageName: '社区出库批次物品统计',
    paramsKey: '4d875311-c811-4d20-83aa-f1f59d07af94',
    loadApiPath: 'goodsOutboundMerchantRecord/list',
    dateRangeFieldName: '发生时段',
    tableScroll: { x: 2220 },
  });

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
    const { batchDate } = this.state;

    d.batchDate = batchDate;

    return d;
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName } = this.state;
    const currentOperator = this.getCurrentOperator();

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

    const rankData = this.rankList();

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.areaAgentId}>
              <Input
                addonBefore={<Icon type="form" />}
                disabled
                value={currentOperator == null ? '' : currentOperator.cityName || ''}
              />
            </FormItem>
          </Col>
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
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 9)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.merchantId}>
              {getFieldDecorator('merchantId')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.merchantId, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.productId}>
              {getFieldDecorator('productId')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.productId, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.rankId}>
              {getFieldDecorator('rankId', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.type, '选择') },
                ],
                initialValue: rankData[0].rankId,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.type, '选择')}
                  style={{ width: '100%' }}
                >
                  {this.renderRankOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(null, 9)}
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
