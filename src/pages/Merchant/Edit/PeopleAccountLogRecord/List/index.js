import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form } from 'antd';

import {
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  getRandomColor,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { parseUrlParamsForSetState } from '../../../Assist/config';

const fieldData = {
  peopleAccountLogId: '标识',
  realName: '站长姓名',
  merchantName: '站点名',
  phone: '联系方式',
  type: '变动类型',
  typeNote: '变动类型',
  isOutIn: '收支类行',
  isOutInNote: '收支类行',
  inType: '收入来源',
  inTypeNote: '收入来源',
  money: '金额',
  note: '变更备注',
  inTime: '变更时间',
};

@connect(({ peopleAccountLog, global, loading }) => ({
  peopleAccountLog,
  global,
  loading: loading.models.peopleAccountLog,
}))
@Form.create()
class Index extends InnerPagerList {
  componentAuthority = accessWayCollection.peopleAccountLog.listByMerchant;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'peopleAccountLog/listByMerchant',
        dateRangeFieldName: '发生时段',
        batchDate: '',
        merchantId: null,
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
      peopleAccountLog: { data },
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
    const { batchDate, merchantId } = this.state;

    d.batchDate = batchDate;
    d.merchantId = merchantId;

    return d;
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchPeopleAccountLogTypeFormItem(true)}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchPeopleAccountLogIsOutInFormItem(true)}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 6)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.peopleAccountLogId,
      dataIndex: 'peopleAccountLogId',
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
      title: fieldData.realName,
      dataIndex: 'realName',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.money,
      dataIndex: 'money',
      align: 'center',
      width: 140,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val | '') === '' ? (
              '--'
            ) : (
              <span>
                {record.isOutIn === 1 ? (
                  <span
                    style={{
                      color: '#ff5500',
                    }}
                  >
                    + {val}
                  </span>
                ) : null}

                {record.isOutIn === 2 ? (
                  <span
                    style={{
                      color: '#87d068',
                    }}
                  >
                    - {val}
                  </span>
                ) : null}

                {record.isOutIn !== 1 && record.isOutIn !== 2 ? val : ''}
              </span>
            )}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.type,
      dataIndex: 'type',
      align: 'center',
      width: 160,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(val + 10),
              }}
            >
              {record.typeNote}
            </span>
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.isOutIn,
      dataIndex: 'isOutIn',
      align: 'center',
      width: 140,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(val + 18),
              }}
            >
              {record.isOutInNote}
            </span>
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.inType,
      dataIndex: 'inType',
      align: 'center',
      width: 180,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {record.isOutIn === 1 ? (
              <span
                style={{
                  color: getRandomColor(val + 47),
                }}
              >
                {record.inTypeNote}
              </span>
            ) : (
              '--'
            )}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.merchantName,
      dataIndex: 'merchantName',
      align: 'center',
      width: 180,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.note,
      dataIndex: 'note',
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
      title: fieldData.inTime,
      dataIndex: 'inTime',
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
