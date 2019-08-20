import React from 'react';
import { connect } from 'dva';

import { Card, Form, Spin, Icon, Transfer, Affix, Button, Divider, notification } from 'antd';

import {
  isInvalid,
  searchFromList,
  refitCommonData,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import UpdateFormTab from '@/customComponents/Framework/CustomForm/UpdateFormTab';

import { parseUrlParamsForSetState, checkNeedUpdateAssist  } from '../../Assist/config';

import styles from './index.less';

@connect(({ areaManage, role, userRole, global, loading }) => ({
  areaManage,
  role,
  userRole,
  global,
  loading: loading.models.areaManage,
}))
@Form.create()
class RoleInfo extends UpdateFormTab {
  componentAuthority = accessWayCollection.areaManage.get;

  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      customData: [],
      targetKeys: [],
      selectedKeys: [],
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

  initState = () => {
    const result = {
      loadApiPath: 'areaManage/get',
      submitApiPath: 'userRole/changeRole',
    };

    return result;
  };

  getApiData = props => {
    const {
      areaManage: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { areaManageId } = this.state;

    d.areaManageId = areaManageId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = areaManageData => {
    const { dispatch } = this.props;

    this.setState({ dataLoading: true });

    dispatch({
      type: 'role/listSelect',
      payload: {},
    }).then(() => {
      if (this.mounted) {
        const {
          role: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { list } = data;
          const { roleCollection } = areaManageData;

          const customData = list;
          const targetKeys = roleCollection || [];

          (customData || []).forEach(item => {
            const o = item;

            o.key = o.roleId;
          });

          this.setState({ customData, targetKeys });
        }

        this.setState({ dataLoading: false });
      }
    });
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const {
      metaData: { areaManageId },
      targetKeys,
    } = this.state;

    d.areaManageId = areaManageId;
    d.roleCollection = (targetKeys || []).join();

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = data => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  handleChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };

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

  formContent = () => {
    const {
      processing,
      dataLoading,
      loadSuccess,
      customData,
      targetKeys,
      selectedKeys,
    } = this.state;

    return (
      <>
        <Card
          title={
            <>
              <Icon type="contacts" />
              <span className={styles.cardTitle}>设置角色</span>
            </>
          }
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              {this.getErrorInfo()}
              <Button
                icon="reload"
                disabled={dataLoading || processing || !loadSuccess}
                onClick={this.reloadData}
                loading={processing}
              >
                刷新
              </Button>
              <Divider type="vertical" />
              <Button
                type="primary"
                icon="save"
                disabled={dataLoading || processing || !loadSuccess}
                onClick={this.validate}
                loading={processing}
              >
                保存
              </Button>
            </Affix>
          }
        >
          <Spin spinning={dataLoading || processing}>
            <div className={styles.transferBox}>
              <Transfer
                listStyle={{
                  width: 212,
                }}
                dataSource={customData}
                titles={['未拥有', '已拥有']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={this.handleChange}
                onSelectChange={this.handleSelectChange}
                render={item => item.name}
              />
            </div>
          </Spin>
        </Card>
      </>
    );
  };
}

export default RoleInfo;
