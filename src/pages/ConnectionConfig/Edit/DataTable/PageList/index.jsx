import React from 'react';
import { connect } from 'umi';
import { Row, Col, Dropdown, Menu, notification } from 'antd';
import { EditOutlined, PlayCircleOutlined, SyncOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  copyToClipboard,
  replaceTargetText,
} from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

// import AddModal from '../AddModal';
// import UpdateModal from '../UpdateModal';
import DataColumnListDrawer from '../../../../DataColumn/ListDrawer';
import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../../Assist/config';
import { fieldData as fieldDataDataTable } from '../../../../DataTable/Common/data';
import { fieldData as fieldDataDataTableGeneratorConfig } from '../../../../DataTableGeneratorConfig/Common/data';

@connect(({ dataTable, connectionConfig, dataTableGeneratorConfig, global, loading }) => ({
  dataTable,
  connectionConfig,
  dataTableGeneratorConfig,
  global,
  loading: loading.models.dataTable,
}))
class Index extends InnerPagerList {
  componentAuthority = accessWayCollection.dataTable.listConnectionConfig;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        addModalVisible: false,
        updateModalVisible: false,
        loadApiPath: 'dataTable/pageList',
        dataColumnListDrawerVisible: false,
        currentRecord: null,
      },
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

  getApiData = (props) => {
    const {
      dataTable: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { connectionConfigId } = this.state;

    d.connectionConfigId = connectionConfigId;

    return d;
  };

  showAddModal = () => {
    this.setState({ addModalVisible: true });
  };

  // showUpdateModal = record => {
  //   this.setState({ updateModalVisible: true });
  // };

  afterAddModalCancel = () => {
    this.setState({ addModalVisible: false });
  };

  afterUpdateModalCancel = () => {
    this.setState({ updateModalVisible: false });
  };

  afterAddModalOk = () => {
    this.setState({ addModalVisible: false });

    this.refreshData();
  };

  afterUpdateModalOk = () => {
    this.setState({ updateModalVisible: false });

    this.refreshData();
  };

  showDataColumnListDrawer = (record) => {
    this.setState({
      dataColumnListDrawerVisible: true,
      currentRecord: record,
    });
  };

  afterDataColumnListDrawerClose = () => {
    this.setState({ dataColumnListDrawerVisible: false });
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'showDataColumnListDrawer':
        this.showDataColumnListDrawer(record);
        break;
      default:
        break;
    }
  };

  initialize = (record) => {
    const { dispatch } = this.props;
    const { connectionConfigId } = this.state;
    const { name: tableName } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'dataTableGeneratorConfig/initialize',
      payload: {
        connectionConfigId,
        tableName,
      },
    }).then(() => {
      const {
        dataTableGeneratorConfig: { data },
      } = this.props;

      const { dataSuccess } = data;

      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '生成配置初始化成功',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  generate = (record) => {
    const { dispatch } = this.props;
    const { connectionConfigId } = this.state;
    const {
      dataTableGeneratorConfig: { dataTableGeneratorConfigId },
    } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'dataTableGeneratorConfig/generate',
      payload: {
        connectionConfigId,
        dataTableGeneratorConfigId,
      },
    }).then(() => {
      const {
        dataTableGeneratorConfig: { data },
      } = this.props;

      const { dataSuccess } = data;

      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '执行生成成功',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={24}>
          <Col lg={6} md={12} sm={24} xs={24}>
            {this.renderSearchInputFormItem(
              fieldDataDataTable.name.label,
              fieldDataDataTable.name.name,
              // buildFieldHelper('依据名称进行检索'),
            )}
          </Col>
          {this.renderSimpleFormButton()}
        </Row>
      </>
    );
  };

  renderOther = () => {
    const { connectionConfigId, dataColumnListDrawerVisible, currentRecord } = this.state;
    // const { dataTableId, currentConnectionConfigId, addModalVisible, updateModalVisible } = this.state;

    const dataColumnListDrawerRender = this.checkAuthority(accessWayCollection.dataColumn.list);

    return (
      <>
        {/* <AddModal
          visible={addModalVisible}
          externalData={{ dataTableId }}
          afterOK={() => {
            this.afterAddModalOk();
          }}
          afterCancel={() => {
            this.afterAddModalCancel();
          }}
        /> */}
        {/* <UpdateModal
          visible={updateModalVisible}
          externalData={{ connectionConfigId: currentConnectionConfigId }}
          afterOK={() => {
            this.afterUpdateModalOk();
          }}
          afterCancel={() => {
            this.afterUpdateModalCancel();
          }}
        /> */}

        {dataColumnListDrawerRender ? (
          <DataColumnListDrawer
            visible={dataColumnListDrawerVisible || false}
            externalData={{
              connectionConfigId,
              tableData: currentRecord,
            }}
            width={1200}
            afterClose={this.afterDataColumnListDrawerClose}
          />
        ) : null}
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldDataDataTable.name.label,
      dataIndex: fieldDataDataTable.name.name,
      align: 'left',
      width: 220,
      render: (val) => (
        <>
          <Ellipsis tooltip={{ placement: 'topLeft' }} lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldDataDataTable.initialized.label,
      dataIndex: fieldDataDataTable.initialized.name,
      align: 'center',
      width: 120,
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val === 1 ? '是' : '否'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldDataDataTableGeneratorConfig.domainObjectName.label,
      dataIndex: fieldDataDataTable.dataTableGeneratorConfig.name,
      align: 'center',
      width: 160,
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val.domainObjectName || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldDataDataTableGeneratorConfig.mapperName.label,
      dataIndex: fieldDataDataTable.dataTableGeneratorConfig.name,
      align: 'center',
      width: 160,
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val.mapperName || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldDataDataTableGeneratorConfig.comment.label,
      dataIndex: fieldDataDataTable.dataTableGeneratorConfig.name,
      align: 'center',
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val.comment || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldDataDataTableGeneratorConfig.dataTableGeneratorConfigId.label,
      dataIndex: fieldDataDataTable.dataTableGeneratorConfig.name,
      width: 120,
      align: 'center',
      render: (val) => (
        <>
          {(val.dataTableGeneratorConfigId || '') === '' ? (
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
      title: constants.customOperate.label,
      dataIndex: constants.customOperate.name,
      width: 140,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => {
              if (record.initialized === 1) {
                this.showDataColumnListDrawer(record);
              }

              if (record.initialized === 0) {
                this.initialize(record);
              }
            }}
            disabled={!this.checkAuthority(accessWayCollection.dataTable.get)}
            overlay={
              <Menu onClick={(e) => this.handleMenuClick(e, record)}>
                {this.checkAuthority(accessWayCollection.dataTableGeneratorConfig.initialize) ? (
                  <Menu.Item disabled={record.initialized === 0} key="showDataColumnListDrawer">
                    <EditOutlined />
                    定制列
                  </Menu.Item>
                ) : null}
                {this.checkAuthority(accessWayCollection.dataTableGeneratorConfig.generate) ? (
                  <Menu.Item disabled={record.initialized === 0} key="generate">
                    <PlayCircleOutlined />
                    执行生成
                  </Menu.Item>
                ) : null}
              </Menu>
            }
          >
            {record.initialized === 1 ? <EditOutlined /> : <SyncOutlined />}
            {record.initialized === 1 ? '定制列' : '初始化'}
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Index;
