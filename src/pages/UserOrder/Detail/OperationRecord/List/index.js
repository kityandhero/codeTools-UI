import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';

import { copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

@connect(({ userOrder, global, loading }) => ({
  userOrder,
  global,
  loading: loading.models.userOrder,
}))
@Form.create()
class List extends InnerPagerList {
  componentAuthority = accessWayCollection.userOrder.listOperationRecord;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      userOrderId: null,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      userOrderId: id,
      paramsKey: 'cf516d0b-8073-45ad-9f76-9206b1e57f03',
      loadApiPath: 'userOrder/listOperationRecord',
      dateRangeFieldName: '操作时间',
    };

    return result;
  };

  getApiData = props => {
    const {
      userOrder: { data },
    } = props;

    return data;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { userOrderId: userOrderIdPre } = this.state;

    return userOrderIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { userOrderId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { userOrderId } = this.state;

    d.userOrderId = userOrderId;

    return d;
  };

  getColumn = () => [
    {
      title: '操作描述',
      dataIndex: 'description',
      align: 'left',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '-'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '操作人',
      dataIndex: 'operatorName',
      width: 180,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '操作备注',
      dataIndex: 'note',
      width: 320,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '数据标识',
      dataIndex: 'userOrderOperationRecordId',
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
      title: '操作时间',
      dataIndex: 'createTime',
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
