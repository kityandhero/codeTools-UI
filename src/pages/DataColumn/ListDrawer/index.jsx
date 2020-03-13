import React from 'react';
import { connect } from 'dva';
import { Row, Col, Dropdown, Menu, Badge } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { isFunction, copyToClipboard, replaceTargetText } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import { constants } from '../../../customConfig/config';
import PagerDrawer from '../../../customComponents/Framework/CustomList/PagerList/PagerDrawer';
import Ellipsis from '../../../customComponents/Ellipsis';
import EllipsisCustom from '../../../customComponents/EllipsisCustom';

import ChangeDataColumnModal from '../ChangeDataColumnModal';

import { fieldData } from '../Common/data';

@connect(({ dataColumn, global, loading }) => ({
  dataColumn,
  global,
  loading: loading.models.dataColumn,
}))
class Index extends PagerDrawer {
  componentAuthority = accessWayCollection.dataColumn.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        tableScroll: { x: 1440 },
        loadApiPath: 'dataColumn/list',
        dataColumnModalVisible: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  getTargetForm = () => {
    return this.formRef.current;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = () => {
    // 设置界面效果为加载中，减少用户误解
    this.setState({ dataLoading: true, metaListData: [] });

    const that = this;

    setTimeout(() => {
      that.reloadData();
    }, 700);
  };

  getApiData = props => {
    const {
      dataColumn: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = d => {
    const o = d;
    const { externalData } = this.props;
    const { connectionConfigId, tableData } = externalData;
    const { name: tableName } = tableData;

    o.connectionConfigId = connectionConfigId;
    o.tableName = tableName;

    return o;
  };

  getPageName = () => {
    return '数据表列定制';
  };

  selectRecord = (e, record) => {
    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(record);
    }

    this.hideDrawer();
  };

  getDataColumnStatusBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case '0':
        result = 'default';
        break;
      case '1':
        result = 'success';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  showDataColumnModal = record => {
    this.setState({
      dataColumnModalVisible: true,
      currentRecord: record,
    });
  };

  afterDataColumnModalOk = () => {
    this.refreshData();

    this.setState({ dataColumnModalVisible: false });
  };

  afterDataColumnModalCancel = () => {
    this.setState({ dataColumnModalVisible: false });
  };

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={24}>
          <Col lg={6} md={12} sm={24} xs={24}>
            {this.renderSearchInputFormItem(fieldData.name.label, fieldData.name.name)}
          </Col>
          {this.renderSimpleFormButton()}
        </Row>
      </>
    );
  };

  renderOther = () => {
    const { externalData } = this.props;
    const { connectionConfigId, tableData } = externalData;
    const { name: tableName } = tableData || { name: '' };

    const { dataColumnModalVisible, currentRecord } = this.state;
    const { name } = currentRecord || { name: '' };

    const dataColumnModalRender = this.checkAuthority(accessWayCollection.dataColumn.get);

    return (
      <>
        {dataColumnModalRender ? (
          <ChangeDataColumnModal
            visible={dataColumnModalVisible || false}
            externalData={{
              connectionConfigId: connectionConfigId || 0,
              tableName,
              name,
            }}
            afterOK={this.afterDataColumnModalOk}
            afterCancel={this.afterDataColumnModalCancel}
          />
        ) : null}
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.name.label,
      dataIndex: fieldData.name.name,
      align: 'left',
      render: val => (
        <>
          <Ellipsis tooltip={{ placement: 'topLeft' }} lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.type.label,
      dataIndex: fieldData.type.name,
      width: 120,
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
      title: fieldData.aliasName.label,
      dataIndex: fieldData.aliasName.name,
      width: 160,
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
      title: fieldData.javaType.label,
      dataIndex: fieldData.javaType.name,
      width: 120,
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
      title: fieldData.typeHandler.label,
      dataIndex: fieldData.typeHandler.name,
      width: 220,
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
      title: constants.status.label,
      dataIndex: constants.status.name,
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Badge
            status={this.getDataColumnStatusBadgeStatus(`${val}`)}
            text={this.getDataColumnStatusName(`${val}`)}
          />
        </>
      ),
    },
    {
      title: fieldData.tableName.label,
      dataIndex: fieldData.tableName.name,
      width: 120,
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
      title: fieldData.connectionConfigId.label,
      dataIndex: fieldData.connectionConfigId.name,
      width: 120,
      align: 'center',
      render: val => (
        <>
          {`${val}` === '0' ? (
            '--'
          ) : (
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
          )}
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
      title: constants.customOperate.label,
      dataIndex: constants.customOperate.name,
      width: 126,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.showDataColumnModal(record)}
            disabled={!this.checkAuthority(accessWayCollection.dataTable.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {/* {this.checkAuthority(accessWayCollection.connectionConfig.remove) &&
              record.state === 0 ? (
                <Menu.Item key="remove">
                  <Icon type="delete" />
                  移除
                </Menu.Item>
              ) : null} */}
              </Menu>
            }
          >
            <EditOutlined />
            调整
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Index;
