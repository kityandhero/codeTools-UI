import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form } from 'antd';

import { formatDatetime, copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

@connect(({ ignoreOutboundMerchant, global, loading }) => ({
  ignoreOutboundMerchant,
  global,
  loading: loading.models.ignoreOutboundMerchant,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.ignoreOutboundMerchant.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '出库批次忽略社区记录',
        paramsKey: 'f0b22f29-831c-403e-a154-81425e8927fd',
        loadApiPath: 'ignoreOutboundMerchant/list',
        dateRangeFieldName: '发生时段',
        // tableScroll: { x: 1820 },
        batchDate: '',
      },
    };
  }

  getApiData = props => {
    const {
      ignoreOutboundMerchant: { data },
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
            {this.renderSearchInputFormItem(fieldData.lineId, 'lineId')}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 9)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.merchantId, 'merchantId')}
          </Col>
          {this.renderSimpleFormButton(null, 19)}
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
      dataIndex: 'ignoreOutboundMerchantId',
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
      title: '操作人',
      dataIndex: 'operatorName',
      align: 'center',
      width: 120,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
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
