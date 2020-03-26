import React from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Dropdown, Menu, notification, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { constants } from '@/customConfig/config';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';

// import AddModal from '../AddModal';
// import UpdateModal from '../UpdateModal';
import DataColumnListDrawer from '../../../../DataColumn/ListDrawer';
import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../../Assist/config';
import { fieldData as fieldDataDataTable } from '../../../../DataTable/Common/data';

const { confirm } = Modal;

@connect(({ dataTable, connectionConfig, global, loading }) => ({
  dataTable,
  connectionConfig,
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
      case 'setWait':
        this.setWait(record);
        break;
      case 'setOpening':
        this.setOpening(record);
        break;
      case 'setOver':
        this.setOver(record);
        break;
      case 'remove':
        this.removeConfirm(record);
        break;
      default:
        break;
    }
  };

  setWait = (record) => {
    const { dispatch } = this.props;
    const { connectionConfigId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'connectionConfig/setWait',
      payload: { connectionConfigId },
    }).then(() => {
      const {
        connectionConfig: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已暂停',
          });
        });

        this.reloadData();

        this.reloadByUrl();
      }

      this.setState({ processing: false });
    });
  };

  setOpening = (record) => {
    const { dispatch } = this.props;
    const { connectionConfigId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'connectionConfig/setOpening',
      payload: { connectionConfigId },
    }).then(() => {
      const {
        connectionConfig: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已开始',
          });

          if (record.dataTableState !== 1) {
            message.warn('该产品目前未上架，请上架该产品');
          }

          if (record.storeCount <= 0) {
            message.warn('该产品库存不足了');
          }
        });

        this.reloadData();

        this.reloadByUrl();
      }

      this.setState({ processing: false });
    });
  };

  setOver = (record) => {
    const { dispatch } = this.props;
    const { connectionConfigId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'connectionConfig/setOver',
      payload: { connectionConfigId },
    }).then(() => {
      const {
        connectionConfig: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已完结',
          });
        });

        this.reloadData();

        this.reloadByUrl();
      }

      this.setState({ processing: false });
    });
  };

  removeConfirm = (record) => {
    const that = this;
    const { processing } = that.state;

    confirm({
      title: '移除预售设置',
      content: `确定要移除吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        that.remove(record);
      },
      onCancel() {},
    });
  };

  remove = (record) => {
    const { dispatch } = this.props;
    const { connectionConfigId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'connectionConfig/remove',
      payload: { connectionConfigId },
    }).then(() => {
      const {
        connectionConfig: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已移除',
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
      render: (val) => (
        <>
          <Ellipsis tooltip={{ placement: 'topLeft' }} lines={1}>
            {val}
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
            onClick={() => this.showDataColumnListDrawer(record)}
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
            定制列
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Index;
