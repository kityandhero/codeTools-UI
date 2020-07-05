import React from 'react';
import { connect, history } from 'umi';
import { Row, Col, Dropdown, Menu } from 'antd';
import { ReadOutlined, ProfileOutlined, CreditCardOutlined } from '@ant-design/icons';

import { toDatetime, formatDatetime, copyToClipboard, replaceTargetText } from '@/utils/tools';
import { unlimitedWithStringFlag } from '@/utils/constants';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import MultiPage from '@/customComponents/Framework/DataMultiPageView/MultiPage';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

@connect(({ errorLog, global, loading }) => ({
  errorLog,
  global,
  loading: loading.models.errorLog,
}))
class PageList extends MultiPage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '模块列表',
        paramsKey: '53e093b4-70d0-4a37-8eee-e8bf2ff3f687',
        loadApiPath: 'errorLog/pageList',
        dateRangeFieldName: '生成时段',
      },
    };
  }

  getApiData = (props) => {
    const {
      errorLog: { data },
    } = props;

    return data;
  };

  goToEdit = (record) => {
    const { errorLogId } = record;

    const location = {
      pathname: `/errorLog/edit/load/${errorLogId}/key/basicInfo`,
    };

    history.push(location);
  };

  handleMenuClick = (e, record) => {
    const { key } = e;
    const { errorLogId } = record;

    switch (key) {
      case 'paramInfo':
        history.push({ pathname: `/errorLog/edit/load/${errorLogId}/key/paramInfo` });
        break;
      case 'stackTraceInfo':
        history.push({ pathname: `/errorLog/edit/load/${errorLogId}/key/stackTraceInfo` });
        break;
      default:
        break;
    }
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
            {this.renderSearchInput(fieldData.message.label, fieldData.message.name)}
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
      dataTarget: fieldData.message,
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
      dataTarget: fieldData.causeMessage,
      width: 240,
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
      dataTarget: fieldData.scene,
      width: 180,
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
      dataTarget: fieldData.errorLogId,
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
      width: 140,
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
                <Menu.Item key="paramInfo">
                  <ProfileOutlined />
                  参数信息
                </Menu.Item>
                <Menu.Item key="stackTraceInfo">
                  <CreditCardOutlined />
                  堆栈信息
                </Menu.Item>
              </Menu>
            }
          >
            <ReadOutlined />
            基本信息
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default PageList;
