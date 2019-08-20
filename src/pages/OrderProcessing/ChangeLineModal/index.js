import React from 'react';
import { connect } from 'dva';
import { Form, Select } from 'antd';

import { refitFieldDecoratorOption, refitCommonData, buildFieldDescription } from '@/utils/tools';
import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';

import { fieldData } from '../Common/data';

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

  getApiData = props => {
    const {
      merchant: { data },
    } = props;
    return data;
  };

  initState = () => {
    const result = {
      pageName: '切换线路',
      submitApiPath: 'merchant/changeLine',
      dataLoading: false,
    };

    return result;
  };

  lineList = () => {
    const { global } = this.props;
    return refitCommonData(global.lineList);
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
    const { form, previouslyLine } = this.props;
    const { getFieldDecorator } = form;

    const lineData = this.lineList();
    const lineOption = [];

    lineData.forEach(item => {
      const { name, flag } = item;
      lineOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    return (
      <>
        <FormItem {...formItemLayout} label="原线路">
          {previouslyLine || '' ? previouslyLine.name : ''}
        </FormItem>
        <FormItem {...formItemLayout} label="调整为">
          {getFieldDecorator(
            'lineId',
            refitFieldDecoratorOption(
              previouslyLine || '' ? previouslyLine.lineId : '',
              previouslyLine || '' ? previouslyLine.lineId : '',
              previouslyLine || '' ? previouslyLine.lineId : '',
              {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.lineId, '选择'),
                  },
                ],
              }
            )
          )(
            <Select
              placeholder={buildFieldDescription(fieldData.lineId, '选择')}
              onChange={this.handleChange}
            >
              {lineOption}
            </Select>
          )}
        </FormItem>
      </>
    );
  };
}

export default ChangeLineModal;
