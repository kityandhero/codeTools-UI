import React, { Fragment } from 'react';
import { Transfer } from 'antd';

import ModalBase from '@/customComponents/CustomForm/ModalBase';

class UpdateModuleModalBase extends ModalBase {
  constructor(props) {
    super(props);

    const defaultState = this.state;

    defaultState.dataLoading = false;

    this.state = {
      ...defaultState,
      customData: [],
      targetKeys: [],
      selectedKeys: [],
    };
  }

  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '更新权限设置',
    submitApiPath: 'role/updateModule',
  });

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;

    this.doWorkWhenWillReceive(nextProps);
    this.setState({ visible });
  }

  handlePropData = props => {
    const { sourceData } = props;

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

    this.setState({ customData, targetKeys });
  };

  initOther = () => {
    this.handlePropData(this.props);
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenWillReceive = nextProps => {
    this.handlePropData(nextProps);
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
      <Fragment>
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
      </Fragment>
    );
  };
}

export default UpdateModuleModalBase;
