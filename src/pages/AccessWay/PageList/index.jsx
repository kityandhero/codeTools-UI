import React from 'react';
import { connect, history } from 'umi';
import { Row, Col, Dropdown, Menu } from 'antd';
import { ReadOutlined, BookOutlined } from '@ant-design/icons';

import { toDatetime, formatDatetime, copyToClipboard, replaceTargetText } from '@/utils/tools';
import { unlimitedWithStringFlag } from '@/utils/constants';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import MultiPage from '@/customComponents/Framework/DataMultiPageView/MultiPage';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class PageList extends MultiPage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '模块列表',
        paramsKey: '53e093b4-70d0-4a37-8eee-e8bf2ff3f687',
        loadApiPath: 'accessWay/pageList',
        dateRangeFieldName: '生成时段',
      },
    };
  }

  getApiData = (props) => {
    const {
      accessWay: { data },
    } = props;

    return data;
  };

  goToEdit = (record) => {
    const { accessWayId } = record;

    const location = {
      pathname: `/accessWay/edit/load/${accessWayId}/key/basicInfo`,
    };

    history.push(location);
  };

  renderSimpleFormInitialValues = () => {
    const v = {};

    v[constants.channel.name] = unlimitedWithStringFlag.flag;

    return v;
  };

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={24}>
          <Col md={6} sm={24}>
            {this.renderSearchInput(fieldData.name.label, fieldData.name.name)}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchInput(fieldData.relativePath.label, fieldData.relativePath.name)}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchChannelSelect(true)}
          </Col>
          {this.renderSimpleFormButton()}
        </Row>
      </>
    );
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      render: (val) => (
        <>
          <Ellipsis tooltip={{ placement: 'topLeft' }} lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      dataTarget: fieldData.relativePath,
      width: 300,
      align: 'left',
      render: (val) => (
        <>
          <Ellipsis tooltip={{ placement: 'topLeft' }} lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      dataTarget: fieldData.tag,
      width: 120,
      align: 'center',
      render: (val) => (
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
      dataTarget: fieldData.expand,
      width: 340,
      align: 'center',
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      dataTarget: constants.channel,
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
      dataTarget: constants.createTime,
      width: 140,
      align: 'center',
      sorter: false,
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(toDatetime(val), 'YYYY-MM-DD HH:mm')}
          </Ellipsis>
        </>
      ),
    },
    {
      dataTarget: constants.customOperate,
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
              <Menu onClick={(e) => this.handleMenuClick(e, record)}>
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

export default PageList;
