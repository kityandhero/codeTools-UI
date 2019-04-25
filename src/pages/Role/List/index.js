import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Form,
  Select,
  Icon,
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
  isInvalid,
  formatDatetime,
  searchFromList,
  refitCommonData,
  buildFieldDescription,
  copyToClipboard,
  replaceTargetText,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/CustomList/PagerList';
import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import AddModal from '../AddModal';
import { fieldData } from '../Common/data';

const FormItem = Form.Item;
const { confirm } = Modal;

@connect(({ role, global, loading }) => ({
  role,
  global,
  loading: loading.models.role,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.role.list;

  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };

  extendState = () => ({ changeAddModalVisible: false });

  initState = () => ({
    pageName: '角色列表',
    paramsKey: 'ba0edd5f-09c1-413b-879b-0d8ce87604bf',
    loadApiPath: 'role/list',
    dateRangeFieldName: '创建时间',
  });

  roleStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.roleStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getRoleStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.roleStateList());
    return item == null ? '未知' : item.name;
  };

  getRoleStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'processing';
        break;
      case 0:
        result = 'default';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  showAddModal = () => {
    const { changeAddModalVisible } = this.state;
    if (!changeAddModalVisible) {
      this.setState({ changeAddModalVisible: true });
    }
  };

  afterAddModalOk = data => {
    const { dispatch } = this.props;

    this.setState({
      changeAddModalVisible: false,
    });

    const { dataSuccess, message: messageText, clientMessage } = data;
    if (dataSuccess) {
      message.success(clientMessage, 4);

      const {
        data: { roleId },
      } = data;

      dispatch(
        routerRedux.push({
          pathname: `/account/role/edit/load/${roleId}/key/basicInfo`,
        })
      );
    } else {
      message.error(messageText);
    }
  };

  afterAddModalCancel = () => {
    this.setState({
      changeAddModalVisible: false,
    });
  };

  // goToAdd = () => {
  //   const { dispatch } = this.props;
  //   const location = {
  //     pathname: `/permission/role/add`,
  //   };
  //   dispatch(routerRedux.push(location));
  // };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { roleId } = record;
    const location = {
      pathname: `/account/role/edit/load/${roleId}/key/basicInfo`,
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
      default:
        break;
    }
  };

  changeState = (record, stateValue) => {
    const { dispatch } = this.props;
    const { roleId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'role/changeState',
      payload: {
        roleId,
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

        const {
          data: { state: s, stateNote: sn },
        } = data;

        this.handleItem(record.roleId, d => {
          const o = d;
          o.state = s;
          o.stateNote = sn;
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
      title: '删除角色',
      content: `确定要删除角色“${record.name}”吗`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        const { dispatch } = that.props;

        that.setState({ processing: true });

        dispatch({
          type: 'role/remove',
          payload: {
            roleId: record.roleId,
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

            that.refreshGrid();
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
      const { roleId } = o;
      if (roleId === dataId) {
        indexData = index;
      }
    });

    if (indexData >= 0) {
      customData.list[indexData] = handler(customData.list[indexData]);
      this.setState({ customData });
    }
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName, dataLoading, processing } = this.state;

    const roleStateData = this.roleStateList();
    const roleStateOption = [];

    roleStateData.forEach(item => {
      const { name, flag } = item;
      roleStateOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            <FormItem label={fieldData.state}>
              {getFieldDecorator('state', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.state, '选择') },
                ],
                initialValue: roleStateData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.state, '选择')}
                  style={{ width: '100%' }}
                >
                  {roleStateOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(
            this.checkAuthority(accessWayCollection.role.add) ? (
              <Fragment>
                <Divider type="vertical" />
                <Button
                  key="buttonPlus"
                  disabled={dataLoading || processing}
                  type="primary"
                  icon="plus"
                  onClick={this.showAddModal}
                >
                  新增
                </Button>
              </Fragment>
            ) : null,
            8
          )}
        </Row>
      </Fragment>
    );
  };

  getColumn = () => [
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
      align: 'left',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '简介描述',
      dataIndex: 'description',
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '模块数量',
      dataIndex: 'moduleCount',
      width: 120,
      align: 'center',
      render: (val, record) => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {record.isSuper ? '--' : val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '标识',
      dataIndex: 'roleId',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <Fragment>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </Fragment>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </Fragment>
      ),
    },
    {
      title: '创建模式',
      dataIndex: 'roleTemplateId',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Fragment>
            <Tag color={(val || '') === '' ? '#a4a97f' : '#87d068'}>
              {(val || '') === '' ? '自主建立' : '系统内置'}
            </Tag>
          </Fragment>
        </Fragment>
      ),
    },
    {
      title: '当前状态',
      dataIndex: 'state',
      width: 100,
      align: 'center',
      render: (val, record) => (
        <Fragment>
          <Badge status={this.getRoleStateBadgeStatus(val)} text={record.stateNote} />
        </Fragment>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 140,
      align: 'center',
      sorter: false,
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToEdit(record)}
            disabled={!this.checkAuthority(accessWayCollection.role.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {record.state === 0 && this.checkAuthority(accessWayCollection.role.changeState) ? (
                  <Menu.Item
                    key="on"
                    disabled={record.isSuper || (record.roleTemplateId || '') !== ''}
                  >
                    <Icon type="up-circle" />
                    设为启用
                  </Menu.Item>
                ) : null}
                {record.state !== 0 && this.checkAuthority(accessWayCollection.role.changeState) ? (
                  <Menu.Item
                    key="off"
                    disabled={record.isSuper || (record.roleTemplateId || '') !== ''}
                  >
                    <Icon type="down-circle" />
                    设为禁用
                  </Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Icon type="read" />
            编辑
          </Dropdown.Button>
        </Fragment>
      ),
    },
  ];

  renderOther = () => {
    const { changeAddModalVisible } = this.state;

    return (
      <AddModal
        visible={changeAddModalVisible}
        afterOK={this.afterAddModalOk}
        afterCancel={this.afterAddModalCancel}
      />
    );
  };
}

export default Standard;
