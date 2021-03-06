import React from 'react';
import { connect, history } from 'umi';
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

import { toDatetime, formatDatetime, copyToClipboard, replaceTargetText } from '@/utils/tools';
import { unlimitedWithStringFlag } from '@/utils/constants';
import accessWayCollection from '@/customConfig/accessWayCollection';
import { customFieldCollection } from '@/customSpecialComponents/Supplement/customConstants';
import { constants } from '@/customConfig/config';
import MultiPage from '@/customComponents/Framework/DataMultiPageView/MultiPage';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import UpdateAccountRoleModal from '../UpdateAccountRoleModal';
import { fieldData } from '../Common/data';

const { confirm } = Modal;

@connect(({ account, global, loading }) => ({
  account,
  global,
  loading: loading.models.account,
}))
class PageList extends MultiPage {
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

  getApiData = (props) => {
    const {
      account: { data },
    } = props;

    return data;
  };

  getAccountStateBadgeStatus = (v) => {
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
    const location = {
      pathname: `/account/account/add`,
    };

    history.push(location);
  };

  goToEdit = (record) => {
    const { accountId } = record;
    const location = {
      pathname: `/account/account/edit/load/${accountId}/key/basicInfo`,
    };
    history.push(location);
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'remove':
        this.removeItem(record);
        break;
      case 'setEnable':
        this.setEnable(record);
        break;
      case 'setDisable':
        this.setDisable(record);
        break;
      case 'setRole':
        this.showUpdateAccountRoleModal(record);
        break;
      default:
        break;
    }
  };

  setEnable = (record) => {
    const { dispatch } = this.props;
    const { accountId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'account/setEnable',
      payload: {
        accountId,
      },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '设置操作结果',
            description: `${record.name}已设置为启用`,
          });
        });

        this.refreshData();
      }

      this.setState({ processing: false });
    });
  };

  setDisable = (record) => {
    const { dispatch } = this.props;
    const { accountId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'account/setDisable',
      payload: {
        accountId,
      },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '设置操作结果',
            description: `${record.name}已已设置为禁用`,
          });
        });

        this.refreshData();
      }

      this.setState({ processing: false });
    });
  };

  removeItem = (record) => {
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

  showUpdateAccountRoleModal = (record) => {
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
  afterUpdateAccountRoleModalOk = (data) => {
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
            {this.renderSearchInput(fieldData.name.label, fieldData.name.name)}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchAccountStatusSelect(true)}
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

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.userName,
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
      dataTarget: fieldData.name,
      width: 140,
      align: 'center',
      render: (val) => (
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
      dataTarget: fieldData.accountId,
      width: 120,
      align: 'center',
      render: (val) => (
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
      dataTarget: constants.status,
      width: 100,
      align: 'center',
      render: (val) => (
        <>
          <Badge
            status={this.getAccountStateBadgeStatus(`${val}`)}
            text={this.getAccountStatusName(`${val}`)}
          />
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
      dataTarget: constants.createTime,
      width: 140,
      align: 'center',
      sorter: false,
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(toDatetime(val), 'YYYY-MM-DD HH:mm')}
          </Ellipsis>
        </>
      ),
    },
    {
      dataTarget: constants.customOperate,
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
              <Menu onClick={(e) => this.handleMenuClick(e, record)}>
                {record.status === 0 &&
                record.canSetStatus === 1 &&
                this.checkAuthority(accessWayCollection.account.setEnable) ? (
                  <Menu.Item key="setEnable">
                    <UpCircleOutlined />
                    设为启用
                  </Menu.Item>
                ) : null}
                {record.status !== 0 &&
                record.canSetStatus === 1 &&
                this.checkAuthority(accessWayCollection.account.setDisable) ? (
                  <Menu.Item key="setDisable">
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
                {record.canSetStatus === 1 &&
                this.checkAuthority(accessWayCollection.account.remove) ? (
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

  renderRoleNameCollection = (roleNameCollection) => (
    <>
      {roleNameCollection.map((item) => (
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

export default PageList;
