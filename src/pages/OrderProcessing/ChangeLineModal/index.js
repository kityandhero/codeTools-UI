import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
@Form.create()
class ChangeLineModal extends ModalBase {
  targetLineName = '';

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '切换线路',
        submitApiPath: 'merchant/changeLine',
        dataLoading: false,
      },
    };
  }

  getApiData = props => {
    const {
      merchant: { data },
    } = props;
    return data;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { merchantData } = this.props;

    d.merchantId = merchantData.merchantId;

    return d;
  };

  afterSubmitSuccess = o => {
    const { afterOK, merchantData } = this.props;

    this.setState({ visible: false });

    const data = o;

    const { realName } = merchantData;

    data.clientMessage = `操作成功：${realName} 已经变更线路为 ${this.targetLineName}`;

    afterOK(data);
  };

  handleChange = (v, option) => {
    const {
      props: { children },
    } = option;

    this.targetLineName = children;
  };

  formContent = () => {
    const { previouslyLine } = this.props;

    return (
      <>
        <FormItem {...formItemLayout} label="原线路">
          {previouslyLine || '' ? previouslyLine.name : ''}
        </FormItem>
        {this.renderFormLineFormItem(
          previouslyLine || '' ? previouslyLine.lineId : '',
          null,
          '调整为',
          formItemLayout,
        )}
      </>
    );
  };
}

export default ChangeLineModal;
