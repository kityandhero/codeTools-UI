import React from 'react';
import { connect } from 'dva';
import { FormOutlined } from '@ant-design/icons';

import { buildFieldHelper, recordLog } from '../../../utils/tools';
import ModalBase from '../../../customComponents/Framework/CustomForm/ModalBase';

import { fieldData } from '../Common/data';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

@connect(({ dataColumn, global, loading }) => ({
  dataColumn,
  global,
  loading: loading.models.dataColumn,
}))
class Index extends ModalBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '更新列定制信息',
        loadApiPath: 'dataColumn/get',
        submitApiPath: 'dataColumn/set',
        width: 580,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;
    const { visible: visiblePre } = prevState;

    let needReset = false;

    if (visiblePre === false && visible === true) {
      needReset = true;
    }

    return { visible, needReset, externalData };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.clientMessage = '';

    recordLog(123123);

    this.reloadData();
  };

  getApiData = props => {
    const {
      dataColumn: { data },
    } = props;
    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    values[fieldData.name.name] = metaData === null ? '' : metaData.name || '';
    values[fieldData.type.name] = metaData === null ? '' : metaData.type || '';
    values[fieldData.aliasName.name] = metaData === null ? '' : metaData.aliasName || '';
    values[fieldData.javaType.name] = metaData === null ? '' : metaData.javaType || '';
    values[fieldData.typeHandler.name] = metaData === null ? '' : metaData.typeHandler || '';

    const form = this.getTargetForm();

    form.setFieldsValue(values);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { externalData } = this.state;
    const { connectionConfigId, tableName, name } = externalData;

    d.connectionConfigId = connectionConfigId;
    d.tableName = tableName;
    d.name = name;

    return d;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { externalData } = this.state;
    const { connectionConfigId, tableName, name } = externalData;

    d.connectionConfigId = connectionConfigId;
    d.tableName = tableName;
    d.name = name;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
    const { afterOK } = this.props;

    const { metaData } = this.state;

    this.setState({ visible: false });

    const o = responseOriginalData;

    const { name } = metaData;

    o.clientMessage = `操作成功：列 ${name} 定制成功`;

    afterOK(o);
  };

  formContent = () => {
    return (
      <>
        {this.renderFormInputFormItem(
          fieldData.name.label,
          fieldData.name.name,
          true,
          buildFieldHelper(fieldData.name.helper),
          <FormOutlined />,
          { readOnly: true },
          false,
          formItemLayout,
        )}
        {this.renderFormInputFormItem(
          fieldData.type.label,
          fieldData.type.name,
          true,
          buildFieldHelper(fieldData.type.helper),
          <FormOutlined />,
          { readOnly: true },
          false,
          formItemLayout,
        )}
        {this.renderFormInputFormItem(
          fieldData.aliasName.label,
          fieldData.aliasName.name,
          true,
          buildFieldHelper(fieldData.aliasName.helper),
          <FormOutlined />,
          null,
          true,
          formItemLayout,
        )}
        {this.renderFormInputFormItem(
          fieldData.javaType.label,
          fieldData.javaType.name,
          true,
          buildFieldHelper(fieldData.javaType.helper),
          <FormOutlined />,
          null,
          true,
          formItemLayout,
        )}
        {this.renderFormInputFormItem(
          fieldData.typeHandler.label,
          fieldData.typeHandler.name,
          true,
          buildFieldHelper(fieldData.typeHandler.helper),
          <FormOutlined />,
          null,
          true,
          formItemLayout,
        )}
      </>
    );
  };
}

export default Index;
