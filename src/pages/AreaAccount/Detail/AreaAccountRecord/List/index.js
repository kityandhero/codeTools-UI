import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Select, Badge } from 'antd';
import moment from 'moment';

import {
  isMoney,
  refitCommonData,
  isInvalid,
  searchFromList,
  copyToClipboard,
  replaceTargetText,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

const FormItem = Form.Item;

const { Option } = Select;

@connect(({ areaAccountRecord, global, loading }) => ({
  areaAccountRecord,
  global,
  loading: loading.models.areaAccountRecord,
}))
@Form.create()
class List extends InnerPagerList {
  componentAuthority = accessWayCollection.areaAccountRecord.list;

  getApiData = props => {
    const {
      areaAccountRecord: { data },
    } = props;

    return data;
  };

  initState = () => ({
    paramsKey: 'c0a0f27e-9dba-465d-901d-e071c554acc1',
    loadApiPath: 'areaAccountRecord/list',
    dateRangeFieldName: '发生时段',
  });

  areaAccountRecordTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.areaAccountRecordTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getAreaAccountRecordTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAccountRecordTypeList());
    return item == null ? '未知' : item.name;
  };

  getAreaAccountRecordTypeBadgeStatus = v => {
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

  areaAccountRecordIsHandleList = () => {
    const { global } = this.props;
    return refitCommonData(global.areaAccountRecordIsHandleList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getAreaAccountRecordIsHandleName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAccountRecordIsHandleList());
    return item == null ? '未知' : item.name;
  };

  getAreaAccountRecordIsHandleBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'success';
        break;
      default:
        result = 'processing';
        break;
    }

    return result;
  };

  areaAccountRecordRevenueExpensesList = () => {
    const { global } = this.props;
    return refitCommonData(global.areaAccountRecordRevenueExpensesList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getAreaAccountRecordRevenueExpensesName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaAccountRecordRevenueExpensesList());
    return item == null ? '未知' : item.name;
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName } = this.state;

    const areaAccountRecordTypeData = this.areaAccountRecordTypeList();
    const areaAccountRecordTypeOption = [];

    areaAccountRecordTypeData.forEach(item => {
      const { name, flag } = item;
      areaAccountRecordTypeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    const areaAccountRecordRevenueExpensesData = this.areaAccountRecordRevenueExpensesList();
    const areaAccountRecordRevenueExpensesOption = [];

    areaAccountRecordRevenueExpensesData.forEach(item => {
      const { name, flag } = item;
      areaAccountRecordRevenueExpensesOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            <FormItem label="收支类型">
              {getFieldDecorator('revenueExpenses', {
                rules: [{ required: false, message: '请选择收支类型!' }],
                initialValue: areaAccountRecordRevenueExpensesData[0].flag,
              })(
                <Select placeholder="请选择收支类型" style={{ width: '100%' }}>
                  {areaAccountRecordRevenueExpensesOption}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="变动原因">
              {getFieldDecorator('type', {
                rules: [{ required: false, message: '请选择变动原因!' }],
                initialValue: areaAccountRecordTypeData[0].flag,
              })(
                <Select placeholder="请选择变动原因" style={{ width: '100%' }}>
                  {areaAccountRecordTypeOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 6)}
        </Row>
      </Fragment>
    );
  };

  getColumn = () => [
    {
      title: '流水号',
      dataIndex: 'areaAccountRecordId',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <Fragment>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </Fragment>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </Fragment>
      ),
    },
    {
      title: '变动原因',
      dataIndex: 'type',
      width: 220,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {this.getAreaAccountRecordTypeName(val)}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '收支类型',
      dataIndex: 'isOutIn',
      width: 140,
      align: 'center',
      render: val => (
        <Fragment>
          {/* <Badge
              status={this.getAreaAccountRecordTypeBadgeStatus(val)}
              text={this.getAreaAccountRecordRevenueExpensesName(val)}
            /> */}
          {this.getAreaAccountRecordRevenueExpensesName(val)}
        </Fragment>
      ),
    },
    {
      title: '收支金额（元）',
      dataIndex: 'amountReceivable',
      width: 140,
      align: 'center',
      render: val => (
        <Fragment>
          {isMoney(val) ? (
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          ) : (
            '--'
          )}
        </Fragment>
      ),
    },
    {
      title: '发生金额（元）',
      dataIndex: 'amountReceived',
      width: 140,
      align: 'center',
      render: val => (
        <Fragment>
          {isMoney(val) ? (
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          ) : (
            '--'
          )}
        </Fragment>
      ),
    },
    {
      title: '服务费（元）',
      dataIndex: 'serviceCost',
      width: 140,
      align: 'center',
      render: val => (
        <Fragment>
          {isMoney(val) ? (
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          ) : (
            '--'
          )}
        </Fragment>
      ),
    },
    {
      title: '处理状态',
      dataIndex: 'isHandle',
      width: 140,
      align: 'center',
      render: (val, record) => (
        <Fragment>
          <Badge
            status={this.getAreaAccountRecordIsHandleBadgeStatus(val)}
            text={
              record.type === 200
                ? val === 0
                  ? '待计算'
                  : '已计算'
                : this.getAreaAccountRecordIsHandleName(val)
            }
          />
        </Fragment>
      ),
    },
    {
      title: '结算后账户金额（元）',
      dataIndex: 'balance',
      width: 180,
      align: 'center',
      render: val => (
        <Fragment>
          {val ? (
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          ) : (
            '--'
          )}
        </Fragment>
      ),
    },
    {
      title: '变动备注',
      dataIndex: 'note',
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '添加时间',
      dataIndex: 'inTime',
      width: 200,
      align: 'center',
      fixed: 'right',
      sorter: false,
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD HH:mm:ss')}
          </Ellipsis>
        </Fragment>
      ),
    },
  ];
}

export default List;
