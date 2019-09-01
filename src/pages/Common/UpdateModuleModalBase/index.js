import React from 'react';
import { Transfer } from 'antd';

import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';

class UpdateModuleModalBase extends ModalBase {
  constructor(props) {
    super(props);

    const defaultState = this.state;

    defaultState.dataLoading = false;

    this.state = {
      ...defaultState,
      ...{
        pageName: '更新权限设置',
        submitApiPath: 'role/updateModule',
        sourceData: [],
        customData: [],
        targetKeys: [],
        selectedKeys: [],
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { sourceData } = nextProps;

    const customData = [];
    const targetKeys = [];

    (sourceData || []).forEach(item => {
      const o = item;

      o.key = item.indexNo;

      if (o.value === '1') {
        targetKeys.push(o.key);
      }

      customData.push(o);
    });

    return { sourceData, customData, targetKeys };
  }

  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };

  supplementSubmitRequestParams = data => {
    const { sourceDataMark } = this.props;
    const { targetKeys, customData } = this.state;

    let o = data;

    let result = '';
    const temp = [];

    (customData || []).forEach(item => {
      const c = item;

      c.value = '0';

      temp.push(c);
    });

    (targetKeys || []).forEach(item => {
      temp[item].value = '1';
    });

    (temp || []).forEach(item => {
      result += item.value;
    });

    o.expansionSet = result;

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
            titles={['未启用', '已启用']}
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

export default UpdateModuleModalBase;
