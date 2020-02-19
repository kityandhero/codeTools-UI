import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Button,
  Dropdown,
  Menu,
  Modal,
  Divider,
  Badge,
  Tag,
  message,
  notification,
} from 'antd';
import {
  PlusOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  TagsOutlined,
  DeleteOutlined,
  FormOutlined,
} from '@ant-design/icons';

import { formatDatetime, copyToClipboard, replaceTargetText } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import PagerList from '../../../customComponents/Framework/CustomList/PagerList';
import Ellipsis from '../../../customComponents/Ellipsis';
import EllipsisCustom from '../../../customComponents/EllipsisCustom';

import UpdateAreaManageRoleModal from '../UpdateAreaManageRoleModal';
import { fieldData } from '../Common/data';

const { confirm } = Modal;

@connect(({ areaManage, global, loading }) => ({
  areaManage,
  global,
  loading: loading.models.areaManage,
}))
class Standard extends PagerList {
  componentAuthority = accessWayCollection.areaManage.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '账户列表',
        paramsKey: 'ce7a9a67-d0b7-4040-904e-94092f67cc27',
        loadApiPath: 'areaManage/list',
        currentRecord: null,
        changeUpdateAreaManageRoleModalVisible: false,
      },
    };
  }

  getApiData = props => {
    const {
      areaManage: { data },
    } = props;

    return data;
  };

  getAreaManageStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'processing';
        break;
      default:
        result = 'error';
        break;
    }

    return result;
  };

  goToAdd = () => {
    const { dispatch } = this.props;

    const location = {
      pathname: `/account/areaManage/add`,
    };

    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { areaManageId } = record;
    const location = {
      pathname: `/account/areaManage/edit/load/${areaManageId}/key/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'remove':
        this.removeItem(record);
        break;
      case 'on':
        this.changeState(record, 1);
        break;
      case 'off':
        this.changeState(record, 0);
        break;
      case 'setRole':
        this.showUpdateAreaManageRoleModal(record);
        break;
      default:
        break;
    }
  };

  changeState = (record, stateValue) => {
    const { dispatch } = this.props;
    const { areaManageId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'areaManage/changeState',
      payload: {
        areaManageId,
        state: stateValue,
      },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          let m = '';

          switch (stateValue) {
            case 0:
              m = '设为失效';
              break;
            case 1:
              m = '设为生效';
              break;
            default:
              break;
          }

          notification.success({
            placement: 'bottomRight',
            message: '设置操作结果',
            description: `${record.name}已${m}`,
          });
        });

        this.handleItem(record.areaManageId, d => {
          const o = d;
          o.state = stateValue;
          return d;
        });
      }

      this.setState({ processing: false });
    });
  };

  removeItem = record => {
    const that = this;

    const { processing } = that.state;

    confirm({
      title: '删除账户',
      content: `确定要删除账户“${record.name}”吗`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        const { dispatch } = that.props;

        that.setState({ processing: true });

        dispatch({
          type: 'areaManage/remove',
          payload: {
            areaManageId: record.areaManageId,
          },
        }).then(() => {
          const data = that.getApiData(that.props);

          const { dataSuccess } = data;

          if (dataSuccess) {
            requestAnimationFrame(() => {
              notification.success({
                placement: 'bottomRight',
                message: '操作结果',
                description: '数据已经删除成功，请进行后续操作。',
              });
            });

            that.reloadData();
          }

          that.setState({ processing: false });
        });
      },
      onCancel() {
        message.info('取消了删除操作！');
      },
    });

    return false;
  };

  handleItem = (dataId, handler) => {
    const { customData } = this.state;
    let indexData = -1;
    customData.list.forEach((o, index) => {
      const { areaManageId } = o;
      if (areaManageId === dataId) {
        indexData = index;
      }
    });

    if (indexData >= 0) {
      customData.list[indexData] = handler(customData.list[indexData]);
      this.setState({ customData });
    }
  };

  showUpdateAreaManageRoleModal = record => {
    const { changeUpdateAreaManageRoleModalVisible } = this.state;
    if (!changeUpdateAreaManageRoleModalVisible) {
      this.setState(
        {
          currentRecord: record,
        },
        () => {
          this.setState({ changeUpdateAreaManageRoleModalVisible: true });
        },
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterUpdateAreaManageRoleModalOk = data => {
    this.setState({
      changeUpdateAreaManageRoleModalVisible: false,
    });

    this.reloadData();
  };

  afterUpdateAreaManageRoleModalCancel = () => {
    this.setState({
      changeUpdateAreaManageRoleModalVisible: false,
    });
  };

  renderSimpleFormRow = () => {
    const { dataLoading, processing } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.name, 'name')}
          </Col>
          <Col md={4} sm={24}>
            {this.renderSearchAreaManageStateFormItem(true)}
          </Col>
          {this.renderSimpleFormButton(
            <>
              <Divider type="vertical" />
              <Button
                key="buttonPlus"
                disabled={dataLoading || processing}
                type="primary"
                icon={<PlusOutlined />}
                onClick={this.goToAdd}
              >
                新增账户
              </Button>
            </>,
            7,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '人员名称',
      dataIndex: 'name',
      width: 140,
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
      title: '登录名',
      dataIndex: 'loginName',
      width: 180,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '拥有角色',
      dataIndex: 'roleName',
      align: 'center',
      render: (val, record) => (
        <>
          {record.roleNameCollection.length === 0 ? '--' : null}

          {record.roleNameCollection.length > 0 ? (
            <>{this.renderRoleNameCollection(record.roleNameCollection)}</>
          ) : null}
        </>
      ),
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      width: 140,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '数据标识',
      dataIndex: 'areaManageId',
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
      title: '状态',
      dataIndex: 'state',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Badge
            status={this.getAreaManageStateBadgeStatus(val)}
            text={this.getAreaManageStateName(val)}
          />
        </>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'inTime',
      width: 200,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToEdit(record)}
            disabled={!this.checkAuthority(accessWayCollection.areaManage.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {record.state === 0 &&
                this.checkAuthority(accessWayCollection.areaManage.changeState) ? (
                  <Menu.Item key="on">
                    <UpCircleOutlined />
                    设为生效
                  </Menu.Item>
                ) : null}
                {record.state !== 0 &&
                this.checkAuthority(accessWayCollection.areaManage.changeState) ? (
                  <Menu.Item key="off">
                    <DownCircleOutlined />
                    设为失效
                  </Menu.Item>
                ) : null}
                {this.checkAuthority(accessWayCollection.userRole.changeRole) ? (
                  <Menu.Item key="setRole">
                    <TagsOutlined />
                    设置角色
                  </Menu.Item>
                ) : null}
                {this.checkAuthority(accessWayCollection.areaManage.remove) ? (
                  <Menu.Item key="remove">
                    <DeleteOutlined />
                    删除
                  </Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <FormOutlined />
            编辑
          </Dropdown.Button>
        </>
      ),
    },
  ];

  renderRoleNameCollection = roleNameCollection => (
    <>
      {roleNameCollection.map(item => (
        <Tag key={`${item}`} color="#87d068">
          {item}
        </Tag>
      ))}
    </>
  );

  renderOther = () => {
    const { changeUpdateAreaManageRoleModalVisible, currentRecord } = this.state;

    return (
      <UpdateAreaManageRoleModal
        title={`设置人员“${currentRecord == null ? '' : currentRecord.name}”拥有的角色`}
        sourceDataMark={{
          areaManageId: currentRecord == null ? '' : currentRecord.areaManageId,
        }}
        sourceData={currentRecord == null ? [] : currentRecord.roleCollection}
        visible={changeUpdateAreaManageRoleModalVisible}
        afterOK={this.afterUpdateAreaManageRoleModalOk}
        afterCancel={this.afterUpdateAreaManageRoleModalCancel}
      />
    );
  };
}

export default Standard;
