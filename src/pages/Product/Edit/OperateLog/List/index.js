import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';

import { copyToClipboard, replaceTargetText } from '@/utils/tools';
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
  componentAuthority = accessWayCollection.product.listLog;

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
      paramsKey: 'c031a8b9-b6e5-49f9-aa89-9a79aa5d85f3',
      loadApiPath: 'product/listLog',
      dateRangeFieldName: '操作时间',
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

  getColumn = () => [
    {
      title: '操作内容',
      dataIndex: 'content',
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
      title: '日志标识',
      dataIndex: 'sysLogsId',
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
      title: '类型',
      dataIndex: 'title',
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
      title: '操作时间',
      dataIndex: 'inTime',
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
