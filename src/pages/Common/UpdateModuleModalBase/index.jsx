import React from 'react';
import { Transfer } from 'antd';

import Base from '@/customComponents/Framework/DataModal/Base';

class UpdateModuleModalBase extends Base {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        targetKeys: [],
        selectedKeys: [],
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    const { externalData } = this.state;
    const { expansionSetCollection } = externalData;

    const metaListData = [];
    const targetKeys = [];

    (expansionSetCollection || []).forEach((item) => {
      const o = item;

      o.key = item.indexNo;

      if (o.value === '1') {
        targetKeys.push(o.key);
      }

      metaListData.push(o);
    });

    this.setState({ metaListData, targetKeys });
  };

  supplementSubmitRequestParams = (data) => {
    const {
      externalData: { requestParams },
      targetKeys,
      metaListData,
    } = this.state;

    let o = data;

    let result = '';
    const temp = [];

    (metaListData || []).forEach((item) => {
      const c = item;

      c.value = '0';

      temp.push(c);
    });

    (targetKeys || []).forEach((item) => {
      temp[item].value = '1';
    });

    (temp || []).forEach((item) => {
      result += item.value;
    });

    o.expansionSet = result;

    o = { ...o, ...requestParams };

    return o;
  };

  afterSubmitSuccess = (o) => {
    const { afterOK } = this.props;

    this.setState({ visible: false });

    const data = o;
    data.clientMessage = `操作成功：已更新模块权限设置 `;

    afterOK(data);
  };

  handleChange = (nextTargetKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };

  formContent = () => {
    const { metaListData, targetKeys, selectedKeys } = this.state;

    return (
      <>
        <div>
          <Transfer
            listStyle={{
              width: 212,
            }}
            dataSource={metaListData}
            titles={['未启用', '已启用']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}
            render={(item) => item.name}
          />
        </div>
      </>
    );
  };
}

export default UpdateModuleModalBase;
