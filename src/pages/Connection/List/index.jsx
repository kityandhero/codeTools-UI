import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Icon,
  Dropdown,
  Menu,
  Button,
  Divider,
  notification,
  Modal,
  message,
} from 'antd';

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

@connect(({ connection, global, loading }) => ({
  connection,
  global,
  loading: loading.models.connection,
}))
@Form.create()
class Index extends PagerList {
  // componentAuthority = accessWayCollection.connection.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '客服列表',
        paramsKey: '938bdc77-66b5-4afe-835b-9aa64a7ead5b',
        loadApiPath: 'connection/list',
      },
    };
  }

  getApiData = props => {
    const {
      connection: { data },
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
      title: '删除客服',
      content: `确定要删除客服 ${record == null ? '' : record.title} 吗？`,
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
      type: 'connection/remove',
      payload: submitData,
    }).then(() => {
      const {
        connection: { data },
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
      pathname: `/assistTools/connection/add`,
    };
    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { pageNo } = this.state;
    const { connectionId } = record;
    const location = {
      pathname: `/assistTools/connection/edit/load/${connectionId}/${pageNo}/basicInfo`,
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
    const { dataLoading, processing } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            {this.renderSearchInputFormItem(fieldData.title, 'title')}
          </Col>
          {this.renderSimpleFormButton(
            this.checkAuthority(accessWayCollection.connection.add) ? (
              <>
                <Divider type="vertical" />
                <Button
                  key="buttonPlus"
                  disabled={dataLoading || processing}
                  type="primary"
                  icon="plus"
                  onClick={this.goToAdd}
                >
                  新增客服
                </Button>
              </>
            ) : null,
            6
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.title,
      dataIndex: 'title',
      width: 220,
      align: 'left',
    },
    {
      title: fieldData.contactInformation,
      dataIndex: 'contactInformation',
      width: 220,
      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: fieldData.description,
      dataIndex: 'description',
      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: fieldData.sort,
      dataIndex: 'sort',
      width: 100,
      align: 'center',
    },
    {
      title: fieldData.connectionId,
      dataIndex: 'connectionId',
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
      title: fieldData.inTime,
      dataIndex: 'inTime',
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
                  <Icon type="delete" />
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <Icon type="edit" />
            修改
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Index;
