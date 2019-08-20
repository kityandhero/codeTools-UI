import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';

import {
  copyToClipboard,
  replaceTargetText,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../../Assist/config';

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

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  initState = () => {
    const result = {
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

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
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
        <>
          <Ellipsis tooltip lines={1}>
            {val || '-'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '操作人',
      dataIndex: 'operatorName',
      width: 180,
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
      title: '操作备注',
      dataIndex: 'note',
      width: 320,
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
      title: '数据标识',
      dataIndex: 'userOrderOperationRecordId',
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
      title: '操作时间',
      dataIndex: 'createTime',
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
