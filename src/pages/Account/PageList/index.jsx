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
  DeleteOutlined,
  FormOutlined,
} from '@ant-design/icons';

import {
  toDatetime,
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
} from '../../../utils/tools';
import { unlimitedWithStringFlag } from '../../../utils/constants';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import { customFieldCollection } from '../../../customSpecialComponents/CustomCommonSupplement/customConstants';
import { constants } from '../../../customConfig/config';
import PagerList from '../../../customComponents/Framework/CustomList/PagerList';
import Ellipsis from '../../../customComponents/Ellipsis';
import EllipsisCustom from '../../../customComponents/EllipsisCustom';

import UpdateAccountRoleModal from '../UpdateAccountRoleModal';
import { fieldData } from '../Common/data';

const { confirm } = Modal;

@connect(({ account, global, loading }) => ({
  account,
  global,
  loading: loading.models.account,
}))
class Index extends PagerList {
  componentAuthority = accessWayCollection.account.pageList;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '账户列表',
        paramsKey: '6c8efa60-997d-43ca-981e-afc0c466c266',
        loadApiPath: 'account/pageList',
        currentRecord: null,
        changeUpdateAccountRoleModalVisible: false,
      },
    };
  }

  getApiData = props => {
    const {
      account: { data },
    } = props;

    return data;
  };

  getAccountStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case '1':
        result = 'processing';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  goToAdd = () => {
    const { dispatch } = this.props;

    const location = {
      pathname: `/account/account/add`,
    };

    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { accountId } = record;
    const location = {
      pathname: `/account/account/edit/load/${accountId}/key/basicInfo`,
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
        this.showUpdateAccountRoleModal(record);
        break;
      default:
        break;
    }
  };

  changeState = (record, stateValue) => {
    const { dispatch } = this.props;
    const { accountId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'account/changeState',
      payload: {
        accountId,
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

        this.handleItem(record.accountId, d => {
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
          type: 'account/remove',
          payload: {
            accountId: record.accountId,
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
      const { accountId } = o;
      if (accountId === dataId) {
        indexData = index;
      }
    });

    if (indexData >= 0) {
      customData.list[indexData] = handler(customData.list[indexData]);
      this.setState({ customData });
    }
  };

  showUpdateAccountRoleModal = record => {
    const { changeUpdateAccountRoleModalVisible } = this.state;
    if (!changeUpdateAccountRoleModalVisible) {
      this.setState(
        {
          currentRecord: record,
        },
        () => {
          this.setState({ changeUpdateAccountRoleModalVisible: true });
        },
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterUpdateAccountRoleModalOk = data => {
    this.setState({
      changeUpdateAccountRoleModalVisible: false,
    });

    this.reloadData();
  };

  afterUpdateAccountRoleModalCancel = () => {
    this.setState({
      changeUpdateAccountRoleModalVisible: false,
    });
  };

  renderSimpleFormInitialValues = () => {
    const v = {};

    v[customFieldCollection.accountStatus.name] = unlimitedWithStringFlag.flag;

    return v;
  };

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={24}>
          <Col lg={6} md={12} sm={24}>
            {this.renderSearchInputFormItem(fieldData.name.label, fieldData.name.name)}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchAccountStatusFormItem(true)}
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
      title: fieldData.userName.label,
      dataIndex: fieldData.userName.name,
      align: 'left',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.name.label,
      dataIndex: fieldData.name.name,
      width: 140,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    // {
    //   title: '拥有角色',
    //   dataIndex: 'roleName',
    //   align: 'center',
    //   render: (val, record) => (
    //     <>
    //       {record.roleNameCollection.length === 0 ? '--' : null}

    //       {record.roleNameCollection.length > 0 ? (
    //         <>{this.renderRoleNameCollection(record.roleNameCollection)}</>
    //       ) : null}
    //     </>
    //   ),
    // },
    // {
    //   title: '联系方式',
    //   dataIndex: 'phone',
    //   width: 140,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <Ellipsis tooltip lines={1}>
    //         {val}
    //       </Ellipsis>
    //     </>
    //   ),
    // },
    {
      title: fieldData.accountId.label,
      dataIndex: fieldData.accountId.name,
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
      title: constants.status.label,
      dataIndex: constants.status.name,
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Badge
            status={this.getAccountStateBadgeStatus(`${val}`)}
            text={this.getAccountStatusName(`${val}`)}
          />
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
            disabled={!this.checkAuthority(accessWayCollection.account.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {record.state === 0 &&
                this.checkAuthority(accessWayCollection.account.changeState) ? (
                  <Menu.Item key="on">
                    <UpCircleOutlined />
                    设为启用
                  </Menu.Item>
                ) : null}
                {record.state !== 0 &&
                this.checkAuthority(accessWayCollection.account.changeState) ? (
                  <Menu.Item key="off">
                    <DownCircleOutlined />
                    设为禁用
                  </Menu.Item>
                ) : null}
                {/* {this.checkAuthority(accessWayCollection.userRole.changeRole) ? (
                  <Menu.Item key="setRole">
                    <TagsOutlined />
                    设置角色
                  </Menu.Item>
                ) : null} */}
                {this.checkAuthority(accessWayCollection.account.remove) ? (
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
    const { changeUpdateAccountRoleModalVisible, currentRecord } = this.state;

    return (
      <UpdateAccountRoleModal
        title={`设置人员“${currentRecord == null ? '' : currentRecord.name}”拥有的角色`}
        sourceDataMark={{
          accountId: currentRecord == null ? '' : currentRecord.accountId,
        }}
        sourceData={currentRecord == null ? [] : currentRecord.roleCollection}
        visible={changeUpdateAccountRoleModalVisible}
        afterOK={this.afterUpdateAccountRoleModalOk}
        afterCancel={this.afterUpdateAccountRoleModalCancel}
      />
    );
  };
}

export default Index;
