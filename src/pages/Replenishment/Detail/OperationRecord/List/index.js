import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';

import { copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

@connect(({ replenishment, global, loading }) => ({
  replenishment,
  global,
  loading: loading.models.replenishment,
}))
@Form.create()
class List extends InnerPagerList {
  componentAuthority = accessWayCollection.replenishment.listOperationRecord;

  getApiData = props => {
    const {
      replenishment: { data },
    } = props;

    return data;
  };

  initState = () => ({
    paramsKey: '99044f6c-a8d5-491c-8aef-543d8ba5810d',
    loadApiPath: 'replenishment/listOperationRecord',
    dateRangeFieldName: '操作时间',
  });

  supplementLoadRequestParams = o => {
    const d = o;

    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    d.replenishmentId = id;

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
      width: 140,
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
      dataIndex: 'replenishmentOperationRecordId',
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
