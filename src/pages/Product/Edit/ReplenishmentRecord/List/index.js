import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Select } from 'antd';
import moment from 'moment';

import {
  getRandomColor,
  buildFieldDescription,
  refitCommonData,
  copyToClipboard,
  replaceTargetText,
  isInvalid,
  searchFromList,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../../Assist/config';

const { Option } = Select;
const FormItem = Form.Item;

const fieldData = {
  state: '售后状态',
};

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class Index extends InnerPagerList {
  componentAuthority = accessWayCollection.product.listStoreChange;

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      productId: id,
      loadApiPath: 'product/listReplenishmentRecord',
      dateRangeFieldName: '提交时间',
    };

    return result;
  };

  getApiData = props => {
    const {
      product: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  replenishmentStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.replenishmentStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getReplenishmentStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentStateList());
    return item == null ? '未知' : item.name;
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { productId } = this.state;

    d.productId = productId;

    return d;
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { dateRangeFieldName } = this.state;
    const { getFieldDecorator } = form;

    const orderStatusData = this.replenishmentStateList();
    const orderStatusOption = [];

    orderStatusData.forEach(item => {
      const { name, flag } = item;
      orderStatusOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>,
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            <FormItem label={fieldData.state}>
              {getFieldDecorator('state', {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.type, '选择'),
                  },
                ],
                initialValue: orderStatusData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.type, '选择')}
                  style={{ width: '100%' }}
                >
                  {orderStatusOption}
                </Select>,
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 12)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '品名',
      dataIndex: 'productName',
      width: 180,
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
      title: '规格',
      dataIndex: 'spec',
      width: 120,
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
      title: '微信端售价',
      dataIndex: 'salePrice',
      width: 120,
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
      title: '购买量',
      dataIndex: 'count',
      width: 120,
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
      title: '总金额',
      dataIndex: 'totalAmount',
      width: 120,
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
      title: '订单流水号',
      dataIndex: 'tradeNo',
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
      title: '售后数量',
      dataIndex: 'num',
      width: 120,
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
      title: '售后原因',
      dataIndex: 'reason',
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
      title: '售后单状态',
      dataIndex: 'state',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis
            style={{
              color: getRandomColor(val + 15),
            }}
            tooltip
            lines={1}
          >
            {this.getReplenishmentStateName(val, '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '提交时间',
      dataIndex: 'inTime',
      width: 180,
      fixed: 'right',
      align: 'center',
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

export default Index;
