import React from 'react';
import { connect } from 'umi';
import { FormOutlined } from '@ant-design/icons';

import { toNumber } from '@/utils/tools';
import { whetherNumber } from '@/utils/constants';
import Base from '@/customComponents/Framework/DataModal/Base';

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
class ChangeDataColumnModal extends Base {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '更新列定制信息',
        loadApiPath: 'dataColumn/get',
        submitApiPath: 'dataColumn/set',
        width: 580,
        ignoreValue: 0,
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

    this.reloadData();
  };

  getApiData = (props) => {
    const {
      dataColumn: { data },
    } = props;
    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const values = {};

    values[fieldData.columnName.name] = metaData === null ? '' : metaData.columnName || '';
    values[fieldData.columnType.name] = metaData === null ? '' : metaData.columnType || '';
    values[fieldData.ignore.name] =
      metaData === null ? '' : `${metaData.ignore || whetherNumber.no}`;
    values[fieldData.aliasName.name] = metaData === null ? '' : metaData.aliasName || '';
    values[fieldData.javaType.name] = metaData === null ? '' : metaData.javaType || '';
    values[fieldData.typeHandler.name] = metaData === null ? '' : metaData.typeHandler || '';

    return values;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const { ignoreValue } = metaData;

    this.setState({ ignoreValue: toNumber(ignoreValue) });
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { connectionConfigId, tableName, columnName } = externalData;

    d.connectionConfigId = connectionConfigId;
    d.tableName = tableName;
    d.columnName = columnName;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { connectionConfigId, tableName, columnName } = externalData;

    d.connectionConfigId = connectionConfigId;
    d.tableName = tableName;
    d.columnName = columnName;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extraData, responseOriginalData, submitData) => {
    const { afterOK } = this.props;

    const { metaData } = this.state;

    this.setState({ visible: false });

    const o = responseOriginalData;

    const { columnName } = metaData;

    o.clientMessage = `操作成功：列 ${columnName} 定制成功`;

    afterOK(o);
  };

  onIgnoreChange = (e) => {
    this.setState({ ignoreValue: toNumber(e) });
  };

  formContent = () => {
    const { ignoreValue } = this.state;

    return (
      <>
        {this.renderFormInput(
          fieldData.columnName.label,
          fieldData.columnName.name,
          true,
          fieldData.columnName.helper,
          <FormOutlined />,
          { readOnly: true },
          false,
          formItemLayout,
        )}
        {this.renderFormInput(
          fieldData.columnType.label,
          fieldData.columnType.name,
          true,
          fieldData.columnType.helper,
          <FormOutlined />,
          { readOnly: true },
          false,
          formItemLayout,
        )}
        {this.renderFormWhetherSelect(
          fieldData.ignore.label,
          fieldData.ignore.name,
          fieldData.ignore.helper,
          (e) => {
            this.onIgnoreChange(e);
          },
          formItemLayout,
          true,
        )}

        {this.renderFormInput(
          fieldData.aliasName.label,
          fieldData.aliasName.name,
          false,
          fieldData.aliasName.helper,
          <FormOutlined />,
          {
            disabled: ignoreValue === whetherNumber.yes,
          },
          true,
          formItemLayout,
        )}
        {this.renderFormInput(
          fieldData.javaType.label,
          fieldData.javaType.name,
          false,
          fieldData.javaType.helper,
          <FormOutlined />,
          {
            disabled: ignoreValue === whetherNumber.yes,
          },
          true,
          formItemLayout,
        )}
        {this.renderFormInput(
          fieldData.typeHandler.label,
          fieldData.typeHandler.name,
          false,
          fieldData.typeHandler.helper,
          <FormOutlined />,
          {
            disabled: ignoreValue === whetherNumber.yes,
          },
          true,
          formItemLayout,
        )}
      </>
    );
  };
}

export default ChangeDataColumnModal;
