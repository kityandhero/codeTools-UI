import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form } from 'antd';

import {
  isInvalid,
  formatDatetime,
  searchFromList,
  refitCommonData,
  copyToClipboard,
  replaceTargetText,
} from '@/utils/tools';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
@Form.create()
class Index extends PagerList {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '模块列表',
        paramsKey: '3c7c3102-ad12-47b4-86ef-7d38c855bddc',
        loadApiPath: 'accessWay/list',
        dateRangeFieldName: '生成时段',
      },
    };
  }

  getApiData = props => {
    const {
      accessWay: { data },
    } = props;

    return data;
  };

  managementChannelList = () => {
    const { global } = this.props;
    return refitCommonData(global.managementChannelList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getManagementChannelName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.managementChannelList());
    return item == null ? '未知' : item.name;
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            {this.renderSearchManagementChannelFormItem()}
          </Col>
          <Col md={4} sm={24}>
            {this.renderSearchInputFormItem('关键词', 'keywords', '', null)}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 4)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.name,
      dataIndex: 'name',
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
      title: fieldData.relativePath,
      dataIndex: 'relativePath',
      width: 300,
      align: 'left',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.guidTag,
      dataIndex: 'guidTag',
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
      title: fieldData.expand,
      dataIndex: 'expand',
      width: 340,
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
      title: fieldData.channel,
      dataIndex: 'channel',
      width: 160,
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {record.channelNote}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.createTime,
      dataIndex: 'createTime',
      width: 140,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
  ];
}

export default Index;
