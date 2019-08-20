import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';

import { copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

@connect(({ distribution, global, loading }) => ({
  distribution,
  global,
  loading: loading.models.distribution,
}))
@Form.create()
class List extends InnerPagerList {
  componentAuthority = accessWayCollection.distribution.listOperationRecord;

  getApiData = props => {
    const {
      distribution: { data },
    } = props;

    return data;
  };

  initState = () => ({
    paramsKey: '042febca-9ac0-46c0-9d79-bda4fca308ef',
    loadApiPath: 'distribution/listOperationRecord',
    dateRangeFieldName: '操作时间',
  });

  supplementLoadRequestParams = o => {
    const d = o;

    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    d.distributionId = id;

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
      width: 140,
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
      dataIndex: 'distributionOperationRecordId',
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
