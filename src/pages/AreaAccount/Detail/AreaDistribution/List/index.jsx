import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Badge } from 'antd';
import moment from 'moment';

import { isMoney, copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

@connect(({ areaDistribution, global, loading }) => ({
  areaDistribution,
  global,
  loading: loading.models.areaDistribution,
}))
@Form.create()
class List extends InnerPagerList {
  componentAuthority = accessWayCollection.areaDistribution.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '站长体现申请列表',
        paramsKey: '65c4ef89-1f0d-48df-9fd6-b0f428c03872',
        loadApiPath: 'areaDistribution/list',
        dateRangeFieldName: '提交时间',
      },
    };
  }

  getApiData = props => {
    const {
      areaDistribution: { data },
    } = props;

    return data;
  };

  getAreaDistributionStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 0:
        result = 'processing';
        break;
      case 1:
        result = 'success';
        break;
      case 2:
        result = 'error';
        break;
      default:
        result = 'default';
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
            {this.renderSearchAreaDistributionStateFormItem(true)}
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
      dataIndex: 'areaDistributionId',
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
      title: '提现金额（元）',
      dataIndex: 'amount',
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
      title: '提现到',
      dataIndex: 'name',
      width: 280,
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val} {record.bankName} {record.bankCardNo}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '提交时间',
      dataIndex: 'applyTime',
      width: 200,
      align: 'center',
      render: val => (
        <>
          <>
            <Ellipsis tooltip lines={1}>
              {(val || '') === ''
                ? '--'
                : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD HH:mm:ss')}
            </Ellipsis>
          </>
        </>
      ),
    },
    {
      title: '审核状态',
      dataIndex: 'state',
      width: 140,
      align: 'center',
      render: val => (
        <>
          <Badge
            status={this.getAreaDistributionStateBadgeStatus(val)}
            text={this.getAreaDistributionStateName(val)}
          />
        </>
      ),
    },
    {
      title: '提现后账户金额（元）',
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
      title: '处理备注',
      dataIndex: 'dReason',
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
  ];
}

export default List;
