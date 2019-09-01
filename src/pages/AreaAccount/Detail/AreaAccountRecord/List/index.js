import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Badge } from 'antd';
import moment from 'moment';

import { isMoney, copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

@connect(({ areaAccountRecord, global, loading }) => ({
  areaAccountRecord,
  global,
  loading: loading.models.areaAccountRecord,
}))
@Form.create()
class List extends InnerPagerList {
  componentAuthority = accessWayCollection.areaAccountRecord.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        paramsKey: 'c0a0f27e-9dba-465d-901d-e071c554acc1',
        loadApiPath: 'areaAccountRecord/list',
        dateRangeFieldName: '发生时段',
      },
    };
  }

  getApiData = props => {
    const {
      areaAccountRecord: { data },
    } = props;

    return data;
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

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            {this.renderSearchAreaAccountRecordRevenueExpensesFormItem(true)}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchAreaAccountRecordTypeFormItem(true)}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 6)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '流水号',
      dataIndex: 'areaAccountRecordId',
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
      title: '变动原因',
      dataIndex: 'type',
      width: 220,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getAreaAccountRecordTypeName(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '收支类型',
      dataIndex: 'isOutIn',
      width: 140,
      align: 'center',
      render: val => <>{this.getAreaAccountRecordRevenueExpensesName(val)}</>,
    },
    {
      title: '收支金额（元）',
      dataIndex: 'amountReceivable',
      width: 140,
      align: 'center',
      render: val => (
        <>
          {isMoney(val) ? (
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      title: '发生金额（元）',
      dataIndex: 'amountReceived',
      width: 140,
      align: 'center',
      render: val => (
        <>
          {isMoney(val) ? (
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      title: '服务费（元）',
      dataIndex: 'serviceCost',
      width: 140,
      align: 'center',
      render: val => (
        <>
          {isMoney(val) ? (
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      title: '处理状态',
      dataIndex: 'isHandle',
      width: 140,
      align: 'center',
      render: (val, record) => (
        <>
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
        </>
      ),
    },
    {
      title: '结算后账户金额（元）',
      dataIndex: 'balance',
      width: 180,
      align: 'center',
      render: val => (
        <>
          {val ? (
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      title: '变动备注',
      dataIndex: 'note',
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
      title: '添加时间',
      dataIndex: 'inTime',
      width: 200,
      align: 'center',
      fixed: 'right',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD HH:mm:ss')}
          </Ellipsis>
        </>
      ),
    },
  ];
}

export default List;
