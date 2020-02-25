import React from 'react';
import { connect } from 'dva';
import { Transfer } from 'antd';

import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';

@connect(({ role, userRole, global, loading }) => ({
  role,
  userRole,
  global,
  loading: loading.models.role,
}))
class UpdateAccountRoleModal extends ModalBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '设置用户拥有的角色',
        loadApiPath: 'role/listSelect',
        submitApiPath: 'userRole/changeRole',
        customData: [],
        targetKeys: [],
        selectedKeys: [],
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { title, sourceData } = nextProps;

    return { title, sourceData };
  }

  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };

  getUserRoleApiData = props => {
    const {
      userRole: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    const { title, sourceData } = this.state;

    const targetKeys = sourceData;

    this.setState({ pageName: title, targetKeys }, () => {
      this.loadData();
    });
  };

  loadData = () => {
    const { dispatch } = this.props;
    const { loadApiPath } = this.state;

    const submitData = {};

    if (loadApiPath !== '') {
      this.setState({ dataLoading: true });

      dispatch({
        type: loadApiPath,
        payload: submitData,
      }).then(() => {
        if (this.mounted) {
          const data = this.getApiData(this.props);

          const { dataSuccess } = data;

          if (dataSuccess) {
            const { list } = data;
            const { sourceData } = this.props;

            const customData = list;
            const targetKeys = sourceData || [];

            (customData || []).forEach(item => {
              const o = item;

              o.key = o.roleId;
            });

            this.setState({ customData, targetKeys });
          }

          this.setState({ dataLoading: false });
        }
      });
    }
  };

  supplementSubmitRequestParams = data => {
    const { sourceDataMark } = this.props;
    const { targetKeys } = this.state;

    let o = data;

    o.roleCollection = (targetKeys || []).join();

    o = { ...o, ...sourceDataMark };

    return o;
  };

  afterSubmitSuccess = o => {
    const { afterOK } = this.props;

    this.setState({ visible: false });

    const data = o;
    data.clientMessage = `操作成功：已更新模块权限设置 `;

    afterOK(data);
  };

  handleChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };

  formContent = () => {
    const { customData, targetKeys, selectedKeys } = this.state;

    return (
      <>
        <div>
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
      </>
    );
  };
}

export default UpdateAccountRoleModal;
