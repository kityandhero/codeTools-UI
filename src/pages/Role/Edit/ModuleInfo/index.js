import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Card,
  Spin,
  Tag,
  message,
  Icon,
  Affix,
  Button,
  Divider,
  Popconfirm,
  notification,
} from 'antd';

import { replaceTargetText, pretreatmentRequestParams, copyToClipboard } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import UpdateFormTab from '@/customComponents/CustomForm/UpdateFormTab';
import StandardTableCustom from '@/customComponents/StandardTableCustom';
import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import UpdateModuleModal from '../../UpdateModuleModal';
import RoleModuleDrawer from '../../../AccessWay/RoleModuleDrawer';

import styles from './index.less';

@connect(({ role, global, loading }) => ({
  role,
  global,
  loading: loading.models.role,
}))
class ModuleInfo extends UpdateFormTab {
  componentAuthority = accessWayCollection.role.get;

  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      isSuper: false,
      fromTemplate: false,
      changeAddModalVisible: false,
      moduleDrawerVisible: false,
      removeModuleApiPath: '',
      currentRecord: null,
    };
  }

  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      roleId: id,
      loadApiPath: 'role/get',
      removeModuleApiPath: 'role/removeModule',
      drawerVisible: false,
    };

    return result;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { roleId: roleIdPre } = this.state;

    return roleIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { roleId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { roleId } = this.state;

    d.roleId = roleId;

    return d;
  };

  afterLoadSuccess = data => {
    const { isSuper, roleTemplateId } = data;

    const fromTemplate = (roleTemplateId || '') !== '';

    this.setState({ isSuper, fromTemplate });

    if (isSuper) {
      message.warn('超级管理员角色不能进行任何编辑操作！');
    } else if ((roleTemplateId || '') !== '') {
      message.warn('系统内置的角色不能进行任何编辑操作！');
    }
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { roleId } = this.state;

    d.roleId = roleId;

    return d;
  };

  removeModule = (e, record) => {
    const { dispatch } = this.props;
    const { removeModuleApiPath, roleId } = this.state;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      o.guidTag = record.guidTag;
      o.roleId = roleId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: removeModuleApiPath,
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const data = this.getApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          const {
            location: { pathname },
          } = this.props;

          dispatch(
            routerRedux.replace({
              pathname: `${pathname.replace('/load/', '/update/')}`,
            })
          );

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomLeft',
              message: '操作执行结果',
              description: `模块’${record.name}‘ 已经成功移除。`,
            });
          });
        }

        this.setState({ processing: false });
      }
    });
  };

  getErrorInfo = () => {};

  showModuleDrawer = () => {
    this.setState({
      moduleDrawerVisible: true,
    });
  };

  hideModuleDrawer = () => {
    this.setState({ moduleDrawerVisible: false });
  };

  onModuleDrawerClose = () => {
    this.setState({ moduleDrawerVisible: false });
  };

  afterOperateSuccess = () => {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    this.reloadData();

    dispatch(
      routerRedux.replace({
        pathname: `${pathname.replace('/load/', '/update/')}`,
      })
    );
  };

  showUpdateModuleModal = record => {
    const { changeUpdateModuleModalVisible } = this.state;
    if (!changeUpdateModuleModalVisible) {
      this.setState(
        {
          currentRecord: record,
        },
        () => {
          this.setState({ changeUpdateModuleModalVisible: true });
        }
      );
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterUpdateModuleModalOk = data => {
    this.setState({
      changeUpdateModuleModalVisible: false,
    });

    this.reloadData();
  };

  afterUpdateModuleModalCancel = () => {
    this.setState({
      changeUpdateModuleModalVisible: false,
    });
  };

  renderModuleDrawer = () => {
    const { moduleDrawerVisible, metaData } = this.state;

    return (
      <RoleModuleDrawer
        visible={moduleDrawerVisible}
        sourceData={metaData}
        width={1200}
        onClose={this.hideModuleDrawer}
        afterOperateSuccess={this.afterOperateSuccess}
        afterClose={this.onModuleDrawerClose}
      />
    );
  };

  renderOther = () => {
    const { changeUpdateModuleModalVisible, currentRecord, metaData } = this.state;

    return (
      <UpdateModuleModal
        sourceDataMark={{
          roleId: metaData == null ? '' : metaData.roleId,
          guidTag: currentRecord == null ? '' : currentRecord.guidTag,
        }}
        sourceData={currentRecord == null ? [] : currentRecord.additional.expansionSetCollection}
        visible={changeUpdateModuleModalVisible}
        afterOK={this.afterUpdateModuleModalOk}
        afterCancel={this.afterUpdateModuleModalCancel}
      />
    );
  };

  renderExpansionSetCollection = expansionSetCollection => (
    <Fragment>
      {expansionSetCollection.map(item => (
        <Tag key={`${item.name}_${item.indexNo}`} color={item.value === '1' ? '#87d068' : ''}>
          {item.name}
        </Tag>
      ))}
    </Fragment>
  );

  formContent = () => {
    const { metaData, processing, dataLoading, loadSuccess, isSuper, fromTemplate } = this.state;

    const listModule = { list: [] };

    (metaData == null ? [] : metaData.additional.listModule || []).forEach(item => {
      const o = item;
      o.key = item.guidTag;

      listModule.list.push(o);
    });

    const columns = [
      {
        title: '模块名称',
        dataIndex: 'name',
        align: 'left',
        render: val => (
          <Fragment>
            {' '}
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: 'Url路径',
        dataIndex: 'relativePath',
        width: 300,
        align: 'left',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val || '--'}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '模块标识',
        dataIndex: 'guidTag',
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
        title: '操作与数据权限',
        dataIndex: 'expansionSet',
        width: 340,
        align: 'center',
        render: (val, record) => (
          <Fragment>
            {record.additional.expansionSetCollection.length === 0 ? '--' : null}

            {record.additional.expansionSetCollection.length > 0 ? (
              <Fragment>
                {this.renderExpansionSetCollection(record.additional.expansionSetCollection)}
              </Fragment>
            ) : null}
          </Fragment>
        ),
      },
      {
        title: '操作',
        width: 220,
        fixed: 'right',
        align: 'center',
        render: (text, record) => (
          <Fragment>
            <Button
              size="small"
              icon="form"
              text="更改权限"
              disabled={record.expansionSet === '' || isSuper || fromTemplate}
              onClick={() => {
                this.showUpdateModuleModal(record);
              }}
            >
              更改权限
            </Button>
            <Divider type="vertical" />
            {isSuper || fromTemplate ? (
              <Button size="small" icon="delete" text="删除" disabled>
                删除
              </Button>
            ) : (
              <Popconfirm
                placement="topRight"
                title="删除此操作模块，确定吗？"
                onConfirm={e => this.removeModule(e, record)}
                okText="确定"
                cancelText="取消"
              >
                <Button size="small" icon="delete" text="删除">
                  删除
                </Button>
              </Popconfirm>
            )}
          </Fragment>
        ),
      },
    ];

    return (
      <Fragment>
        <Card
          title={
            <Fragment>
              <Icon type="contacts" />
              <span className={styles.cardTitle}>基本信息</span>
            </Fragment>
          }
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              {this.getErrorInfo()}
              <Button
                icon="reload"
                disabled={dataLoading || processing || !loadSuccess || isSuper || fromTemplate}
                onClick={this.reloadData}
                loading={processing}
              >
                刷新
              </Button>
              <Divider type="vertical" />
              <Button
                type="primary"
                icon="plus-circle"
                disabled={dataLoading || processing || !loadSuccess || isSuper || fromTemplate}
                onClick={this.showModuleDrawer}
                loading={processing}
              >
                增加模块
              </Button>
            </Affix>
          }
        >
          <Spin spinning={dataLoading || processing}>
            <StandardTableCustom
              loading={dataLoading || processing}
              data={listModule}
              columns={columns}
              pagination={false}
            />
          </Spin>
        </Card>
        {this.renderOther()}
        {this.renderModuleDrawer()}
      </Fragment>
    );
  };
}

export default ModuleInfo;
