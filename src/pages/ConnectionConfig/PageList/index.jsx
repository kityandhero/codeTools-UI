import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Dropdown, Menu, Button, Divider, notification, Modal, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import {
  pretreatmentRequestParams,
  copyToClipboard,
  replaceTargetText,
  buildFieldHelper,
  formatDatetime,
  toDatetime,
} from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import { unlimitedWithStringFlag } from '../../../utils/constants';
import { constants } from '../../../customConfig/config';
import PagerList from '../../../customComponents/Framework/CustomList/PagerList';
import Ellipsis from '../../../customComponents/Ellipsis';
import EllipsisCustom from '../../../customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

const { confirm } = Modal;

@connect(({ connectionConfig, global, loading }) => ({
  connectionConfig,
  global,
  loading: loading.models.connectionConfig,
}))
class Index extends PagerList {
  componentAuthority = accessWayCollection.connectionConfig.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '数据连接列表',
        paramsKey: '938bdc77-66b5-4afe-835b-9aa64a7ead5b',
        loadApiPath: 'connectionConfig/pageList',
        showSelect: true,
      },
    };
  }

  getApiData = props => {
    const {
      connectionConfig: { data },
    } = props;

    return data;
  };

  handleItem = (dataId, handler) => {
    const { metaOriginalData } = this.state;
    let indexData = -1;

    metaOriginalData.list.forEach((o, index) => {
      const { connectionId } = o;
      if (connectionId === dataId) {
        indexData = index;
      }
    });

    if (indexData >= 0) {
      metaOriginalData.list[indexData] = handler(metaOriginalData.list[indexData]);
      this.setState({ metaOriginalData });
    }
  };

  removeConfirm = record => {
    const that = this;
    const { processing } = that.state;

    confirm({
      title: '删除数据连接',
      content: `确定要删除数据连接 ${record == null ? '' : record.title} 吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        that.remove(record);
      },
      onCancel() {
        message.info('取消了删除操作！');
      },
    });
  };

  remove = record => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      o.connectionId = record.connectionId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'connectionConfig/remove',
      payload: submitData,
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
            description: '数据已经删除成功，请进行后续操作。',
          });
        });

        this.setState({ processing: false });
        this.reloadData();
      }
    });
  };

  goToAdd = () => {
    const { dispatch } = this.props;
    const location = {
      pathname: `/connectionConfig/add`,
    };
    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { connectionConfigId } = record;

    const location = {
      pathname: `/connectionConfig/edit/load/${connectionConfigId}/key/basicInfo`,
    };

    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'delete':
        this.removeConfirm(record);
        break;
      default:
        break;
    }
  };

  renderBatchActionMenu = () => [
    {
      key: 'batchDelete',
      name: '批量删除',
      icon: <DeleteOutlined />,
    },
  ];

  onBatchActionSelect = key => {
    switch (key) {
      case 'batchDelete':
        this.onBatchDelete();
        break;
      default:
        break;
    }
  };

  onBatchDelete = () => {
    message.info('onBatchDelete');
  };

  renderSimpleFormInitialValues = () => {
    const v = {};

    v[fieldData.encoding.name] = unlimitedWithStringFlag.flag;
    v[fieldData.databaseType.name] = unlimitedWithStringFlag.flag;

    return v;
  };

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={24}>
          <Col lg={6} md={12} sm={24} xs={24}>
            {this.renderSearchInputFormItem(
              fieldData.name.label,
              fieldData.name.name,
              buildFieldHelper('依据名称进行检索'),
            )}
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            {this.renderSearchDatabaseEncodingFormItem(true)}
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            {this.renderSearchDatabaseDatabaseTypeFormItem(true)}
          </Col>
          {this.renderSimpleFormButton()}
        </Row>
      </>
    );
  };

  // renderAlertContent = () => {
  //   const { metaExtra } = this.state;

  //   if ((metaExtra || null) != null) {
  //     const { total } = metaExtra;

  //     return `信息：共${total}页数据`;
  //   }

  //   return null;
  // };

  renderExtraAction = () => {
    const { dataLoading, processing } = this.state;

    return this.checkAuthority(accessWayCollection.connectionConfig.add) ? (
      <>
        <Divider type="vertical" />
        <Button
          key="buttonPlus"
          disabled={dataLoading || processing}
          type="primary"
          icon={<PlusOutlined />}
          onClick={this.goToAdd}
        >
          新增
        </Button>
      </>
    ) : null;
  };

  getColumn = () => [
    {
      title: fieldData.name.label,
      dataIndex: fieldData.name.name,
      align: 'left',
      render: val => <>{val || '--'}</>,
    },
    // {
    //   title: fieldData.contactInformation,
    //   dataIndex: 'contactInformation',
    //   width: 220,
    //   align: 'center',
    //   render: val => <>{val || '--'}</>,
    // },
    // {
    //   title: fieldData.description,
    //   dataIndex: 'description',
    //   align: 'center',
    //   render: val => <>{val || '--'}</>,
    // },
    // {
    //   title: fieldData.sort,
    //   dataIndex: 'sort',
    //   width: 100,
    //   align: 'center',
    // },
    {
      title: fieldData.schema.label,
      dataIndex: fieldData.schema.name,
      width: 200,
      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: fieldData.databaseType.label,
      dataIndex: fieldData.databaseType.name,
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getDatabaseDatabaseTypeName(`${val || ''}`)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.connectionType.label,
      dataIndex: fieldData.connectionType.name,
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getDatabaseConnectionTypeName(`${val || ''}`)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.encoding.label,
      dataIndex: fieldData.encoding.name,
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getDatabaseEncodingName(`${val || ''}`)}
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
      title: constants.channelNote.label,
      dataIndex: constants.channelNote.name,
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
            {(val || '') === '' ? '--' : formatDatetime(toDatetime(val), 'YYYY-MM-DD HH:mm')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: constants.customOperate.label,
      dataIndex: constants.customOperate.name,
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToEdit(record)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                <Menu.Item key="delete">
                  <DeleteOutlined />
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <EditOutlined />
            修改
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Index;
