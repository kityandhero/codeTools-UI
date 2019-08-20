import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Select, Input, Icon, DatePicker } from 'antd';

import {
  formatDatetime,
  refitCommonData,
  copyToClipboard,
  replaceTargetText,
  buildFieldDescription,
  getRandomColor,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

const FormItem = Form.Item;
const { Option } = Select;

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
      batchDate: '',
    };
  }

  getApiData = props => {
    const {
      userOrderOutboundHistory: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '批次出库订单记录',
    paramsKey: '794c31a1-09c4-47de-b4fc-f63db6e3089b',
    loadApiPath: 'userOrderOutboundHistory/list',
    dateRangeFieldName: '发生时段',
    tableScroll: { x: 1820 },
  });

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  userOrderOutboundHistoryTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.userOrderOutboundHistoryTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
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

    const userOrderOutboundHistoryTypeData = this.userOrderOutboundHistoryTypeList();
    const userOrderOutboundHistoryTypeOption = [];

    userOrderOutboundHistoryTypeData.forEach(item => {
      const { name, flag } = item;
      userOrderOutboundHistoryTypeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

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
              {getFieldDecorator('lineId')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.lineId, '输入')}
                />
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
            <FormItem label={fieldData.userOrderId}>
              {getFieldDecorator('userOrderId')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.userOrderId, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.type}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.type, '选择'),
                  },
                ],
                initialValue: userOrderOutboundHistoryTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.type, '选择')}
                  style={{ width: '100%' }}
                >
                  {userOrderOutboundHistoryTypeOption}
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
