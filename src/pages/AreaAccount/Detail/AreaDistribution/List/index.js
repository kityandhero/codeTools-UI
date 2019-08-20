import React from 'react';
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
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

const FormItem = Form.Item;

const { Option } = Select;

@connect(({ areaDistribution, global, loading }) => ({
  areaDistribution,
  global,
  loading: loading.models.areaDistribution,
}))
@Form.create()
class List extends InnerPagerList {
  componentAuthority = accessWayCollection.areaDistribution.list;

  getApiData = props => {
    const {
      areaDistribution: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '站长体现申请列表',
    paramsKey: '65c4ef89-1f0d-48df-9fd6-b0f428c03872',
    loadApiPath: 'areaDistribution/list',
    dateRangeFieldName: '提交时间',
  });

  areaDistributionPayTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.areaDistributionPayTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getAreaDistributionPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaDistributionPayTypeList());
    return item == null ? '未知' : item.name;
  };

  areaDistributionStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.areaDistributionStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getAreaDistributionStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaDistributionStateList());
    return item == null ? '未知' : item.name;
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
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName } = this.state;

    const areaDistributionStateData = this.areaDistributionStateList();
    const areaDistributionStateOption = [];

    areaDistributionStateData.forEach(item => {
      const { name, flag } = item;
      areaDistributionStateOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            <FormItem label="审核状态">
              {getFieldDecorator('state', {
                rules: [{ required: false, message: '请选择审核状态!' }],
                initialValue: areaDistributionStateData[0].flag,
              })(
                <Select placeholder="请选择审核状态" style={{ width: '100%' }}>
                  {areaDistributionStateOption}
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
