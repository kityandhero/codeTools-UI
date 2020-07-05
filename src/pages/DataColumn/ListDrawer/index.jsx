import React from 'react';
import { connect } from 'umi';
import { Row, Col, Dropdown, Menu, Badge } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { isFunction, copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import MultiPageDrawer from '@/customComponents/Framework/DataMultiPageView/MultiPageDrawer';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import ChangeDataColumnModal from '../ChangeDataColumnModal';

import { fieldData } from '../Common/data';

@connect(({ dataColumn, global, loading }) => ({
  dataColumn,
  global,
  loading: loading.models.dataColumn,
}))
class ListDrawer extends MultiPageDrawer {
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

  getApiData = (props) => {
    const {
      dataColumn: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = (d) => {
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

  getDataColumnStatusBadgeStatus = (v) => {
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

  showDataColumnModal = (record) => {
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
            {this.renderSearchInput(fieldData.columnName.label, fieldData.columnName.name)}
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
    const { columnName } = currentRecord || { columnName: '' };

    const dataColumnModalRender = this.checkAuthority(accessWayCollection.dataColumn.get);

    return (
      <>
        {dataColumnModalRender ? (
          <ChangeDataColumnModal
            visible={dataColumnModalVisible || false}
            externalData={{
              connectionConfigId: connectionConfigId || 0,
              tableName,
              columnName,
            }}
            afterOK={this.afterDataColumnModalOk}
            afterCancel={this.afterDataColumnModalCancel}
          />
        ) : null}
      </>
    );
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.columnName,
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
      dataTarget: fieldData.columnType,
      width: 120,
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
      dataTarget: fieldData.aliasName,
      width: 160,
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
      dataTarget: fieldData.javaType,
      width: 120,
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
      dataTarget: fieldData.typeHandler,
      width: 220,
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
      dataTarget: constants.status,
      width: 100,
      align: 'center',
      render: (val) => (
        <>
          <Badge
            status={this.getDataColumnStatusBadgeStatus(`${val}`)}
            text={this.getDataColumnStatusName(`${val}`)}
          />
        </>
      ),
    },
    {
      dataTarget: fieldData.tableName,
      width: 120,
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
      dataTarget: fieldData.connectionConfigId,
      width: 120,
      align: 'center',
      render: (val) => (
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
      dataTarget: constants.customOperate,
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
              <Menu onClick={(e) => this.handleMenuClick(e, record)}>
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

export default ListDrawer;
