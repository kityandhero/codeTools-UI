import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Row, Col, Dropdown, Menu, Button, Divider, notification, Modal, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import {
  pretreatmentRequestParams,
  copyToClipboard,
  replaceTargetText,
} from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
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
        loadApiPath: 'connectionConfig/list',
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
    const { pageNo } = this.state;
    const { connectionId } = record;
    const location = {
      pathname: `/connectionConfig/edit/load/${connectionId}/${pageNo}/basicInfo`,
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

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col lg={6} md={12} sm={24}>
            {/* {this.renderSearchInputFormItem(fieldData.name, 'title')} */}
          </Col>
          {this.renderSimpleFormButton()}
        </Row>
      </>
    );
  };

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
      title: fieldData.name,
      dataIndex: 'name',
      width: 220,
      align: 'left',
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
      title: fieldData.connectionConfigId,
      dataIndex: 'connectionConfigId',
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
      title: fieldData.createTime,
      dataIndex: 'createTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.operate,
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
