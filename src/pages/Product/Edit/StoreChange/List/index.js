import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Badge } from 'antd';
import moment from 'moment';

import { isNumber, copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class List extends InnerPagerList {
  componentAuthority = accessWayCollection.product.listStoreChange;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      productId: null,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      productId: id,
      paramsKey: '5a923ef9-155f-4ff1-b156-9c3fff4704ea',
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

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { productId: productIdPre } = this.state;

    return productIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { productId: id };
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

  getColumn = () => [
    {
      title: '日志标识',
      dataIndex: 'storeChangeRecordId',
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
      title: '发生地点',
      dataIndex: 'channelNote',
      align: 'left',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '变动类型',
      dataIndex: 'changeTypeNote',
      width: 180,
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
      title: '变动数量',
      dataIndex: 'changeCount',
      width: 140,
      align: 'center',
      render: val => (
        <Fragment>
          {isNumber(val) ? (
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
      dataIndex: 'state',
      width: 100,
      align: 'center',
      render: (val, record) => (
        <Fragment>
          <Badge status={this.getStateBadgeStatus(val)} text={record.stateNote} />
        </Fragment>
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
