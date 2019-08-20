import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Select, Badge } from 'antd';
import moment from 'moment';

import {
  buildFieldDescription,
  refitCommonData,
  isNumber,
  copyToClipboard,
  replaceTargetText,
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
  type: '变更类型',
};

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class List extends InnerPagerList {
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
      loadApiPath: 'product/listStoreChange',
      dateRangeFieldName: '发生时间',
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

  storeTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.storeTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { productId } = this.state;

    d.productId = productId;

    return d;
  };

  getStateBadgeStatus = v => {
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

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { dateRangeFieldName } = this.state;
    const { getFieldDecorator } = form;

    const storeTypeData = this.storeTypeList();
    const storeTypeOption = [];

    storeTypeData.forEach(item => {
      const { name, flag } = item;
      storeTypeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>,
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          <Col md={4} sm={24}>
            <FormItem label={fieldData.type}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.type, '选择'),
                  },
                ],
                initialValue: storeTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.type, '选择')}
                  style={{ width: '100%' }}
                >
                  {storeTypeOption}
                </Select>,
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(null, 12)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '日志标识',
      dataIndex: 'storeChangeRecordId',
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
      title: '发生地点',
      dataIndex: 'channelNote',
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
      title: '变动类型',
      dataIndex: 'changeTypeNote',
      width: 180,
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
      title: '变动数量',
      dataIndex: 'changeCount',
      width: 140,
      align: 'center',
      render: val => (
        <>
          {isNumber(val) ? (
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
      dataIndex: 'state',
      width: 100,
      align: 'center',
      render: (val, record) => (
        <>
          <Badge status={this.getStateBadgeStatus(val)} text={record.stateNote} />
        </>
      ),
    },
    {
      title: '变动时间',
      dataIndex: 'createTime',
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

export default List;
