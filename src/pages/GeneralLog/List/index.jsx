import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Dropdown, Menu } from 'antd';
import { ReadOutlined, BookOutlined } from '@ant-design/icons';

import { formatDatetime, copyToClipboard, replaceTargetText } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import { constants } from '../../../customConfig/config';
import PagerList from '../../../customComponents/Framework/CustomList/PagerList';
import Ellipsis from '../../../customComponents/Ellipsis';
import EllipsisCustom from '../../../customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

@connect(({ generalLog, global, loading }) => ({
  generalLog,
  global,
  loading: loading.models.generalLog,
}))
class Index extends PagerList {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '模块列表',
        paramsKey: '53e093b4-70d0-4a37-8eee-e8bf2ff3f687',
        loadApiPath: 'generalLog/list',
        dateRangeFieldName: '生成时段',
      },
    };
  }

  getApiData = props => {
    const {
      generalLog: { data },
    } = props;

    return data;
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { generalLogId } = record;

    const location = {
      pathname: `/generalLog/edit/load/${generalLogId}/key/basicInfo`,
    };

    dispatch(routerRedux.push(location));
  };

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={24}>
          <Col md={6} sm={24}>
            {this.renderSearchInputFormItem(fieldData.message, 'message')}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchChannelFormItem(true)}
          </Col>
          {this.renderSimpleFormButton()}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.message,
      dataIndex: 'message',
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
      title: fieldData.generalLogId,
      dataIndex: 'generalLogId',
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
      title: constants.channel.label,
      dataIndex: constants.channel.name,
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
      title: constants.createTime.label,
      dataIndex: constants.createTime.name,
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
    {
      title: '操作',
      dataIndex: 'customOperate',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToEdit(record)}
            disabled={!this.checkAuthority(accessWayCollection.account.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                <Menu.Item key="analysis" disabled>
                  <BookOutlined />
                  分析
                </Menu.Item>
              </Menu>
            }
          >
            <ReadOutlined />
            查看
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Index;
