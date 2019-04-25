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
  Input,
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

import UpdateAreaManageRoleModal from '../UpdateAreaManageRoleModal';
import { fieldData } from '../Common/data';

const FormItem = Form.Item;
const { confirm } = Modal;
const { Option } = Select;

@connect(({ areaManage, global, loading }) => ({
  areaManage,
  global,
  loading: loading.models.areaManage,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.areaManage.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      currentRecord: null,
      changeUpdateAreaManageRoleModalVisible: false,
    };
  }

  getApiData = props => {
    const {
      areaManage: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '账户列表',
    paramsKey: 'ce7a9a67-d0b7-4040-904e-94092f67cc27',
    loadApiPath: 'areaManage/list',
  });

  areaManageStateList = () => {
    const { global } = this.props;

    return refitCommonData(global.areaManageStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getAreaManageStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaManageStateList());
    return item == null ? '未知' : item.name;
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
        }
      );
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterUpdateAreaManageRoleModalOk = data => {
    this.setState({
      changeUpdateAreaManageRoleModalVisible: false,
    });

    this.refreshGrid();
  };

  afterUpdateAreaManageRoleModalCancel = () => {
    this.setState({
      changeUpdateAreaManageRoleModalVisible: false,
    });
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dataLoading, processing } = this.state;

    const areaManageStateData = this.areaManageStateList();
    const areaManageStateOption = [];

    areaManageStateData.forEach(item => {
      const { name, flag } = item;
      areaManageStateOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.name}>
              {getFieldDecorator('name')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.name, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label={fieldData.state}>
              {getFieldDecorator('state', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.state, '选择') },
                ],
                initialValue: areaManageStateData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.state, '选择')}
                  style={{ width: '100%' }}
                >
                  {areaManageStateOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(
            <Fragment>
              <Divider type="vertical" />
              <Button
                key="buttonPlus"
                disabled={dataLoading || processing}
                type="primary"
                icon="plus"
                onClick={this.goToAdd}
              >
                新增账户
              </Button>
            </Fragment>,
            7
          )}
        </Row>
      </Fragment>
    );
  };

  getColumn = () => [
    {
      title: '人员名称',
      dataIndex: 'name',
      width: 140,
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
      title: '登录名',
      dataIndex: 'loginName',
      width: 180,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '拥有角色',
      dataIndex: 'roleName',
      align: 'center',
      render: (val, record) => (
        <Fragment>
          {record.roleNameCollection.length === 0 ? '--' : null}

          {record.roleNameCollection.length > 0 ? (
            <Fragment>{this.renderRoleNameCollection(record.roleNameCollection)}</Fragment>
          ) : null}
        </Fragment>
      ),
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      width: 140,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '数据标识',
      dataIndex: 'areaManageId',
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
      title: '状态',
      dataIndex: 'state',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Badge
            status={this.getAreaManageStateBadgeStatus(val)}
            text={this.getAreaManageStateName(val)}
          />
        </Fragment>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'inTime',
      width: 200,
      align: 'center',
      sorter: false,
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm', '--')}
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
            disabled={!this.checkAuthority(accessWayCollection.areaManage.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {record.state === 0 &&
                this.checkAuthority(accessWayCollection.areaManage.changeState) ? (
                  <Menu.Item key="on">
                    <Icon type="up-circle" />
                    设为生效
                  </Menu.Item>
                ) : null}
                {record.state !== 0 &&
                this.checkAuthority(accessWayCollection.areaManage.changeState) ? (
                  <Menu.Item key="off">
                    <Icon type="down-circle" />
                    设为失效
                  </Menu.Item>
                ) : null}
                {this.checkAuthority(accessWayCollection.userRole.changeRole) ? (
                  <Menu.Item key="setRole">
                    <Icon type="tags" />
                    设置角色
                  </Menu.Item>
                ) : null}
                {this.checkAuthority(accessWayCollection.areaManage.remove) ? (
                  <Menu.Item key="remove">
                    <Icon type="delete" />
                    删除
                  </Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Icon type="form" />
            编辑
          </Dropdown.Button>
        </Fragment>
      ),
    },
  ];

  renderRoleNameCollection = roleNameCollection => (
    <Fragment>
      {roleNameCollection.map(item => (
        <Tag key={`${item}`} color="#87d068">
          {item}
        </Tag>
      ))}
    </Fragment>
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
