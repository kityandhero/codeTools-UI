import React from 'react';
import { connect } from 'dva';
import { Form, Button, Spin, message, notification, Input } from 'antd';

import { refitFieldDecoratorOption, buildFieldDescription } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import UpdateForm from '../../../customComponents/Framework/CustomForm/UpdateForm';

import styles from './index.less';

const FormItem = Form.Item;

const fieldData = {
  name: '仓库名称',
  code: '仓库编码',
  address: '仓库地址',
};

@connect(({ warehouse, loading }) => ({
  warehouse,
  loading: loading.models.warehouse,
}))
class EditMasterWarehouse extends UpdateForm {
  componentAuthority = accessWayCollection.warehouse.getMaster;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'warehouse/getMaster',
        submitApiPath: 'warehouse/setMasterBasicInfo',
      },
    };
  }

  getApiData = props => {
    const {
      warehouse: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const { exist, message: messageText } = metaExtra;

    if (!exist) {
      message.warn(messageText);
    }
  };

  supplementSubmitRequestParams = o => {
    const d = o;

    const { hour, minute } = this.state;

    d.hour = hour;
    d.minute = minute;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = data => {
    this.reloadData();

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { metaData, processing, dataLoading, loadSuccess } = this.state;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Spin spinning={processing || dataLoading}>
            <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
              <FormItem label={fieldData.name}>
                {getFieldDecorator(
                  'name',
                  refitFieldDecoratorOption(
                    metaData === null ? '' : metaData.name || '',
                    metaData === null ? '' : metaData.name || '',
                    '',
                    {
                      rules: [
                        {
                          required: false,
                          message: buildFieldDescription(fieldData.name),
                        },
                      ],
                    },
                  ),
                )(
                  <Input
                    addonBefore={<FormOutlined />}
                    placeholder={buildFieldDescription(fieldData.name)}
                  />,
                )}
              </FormItem>
              <FormItem label={fieldData.code}>
                {getFieldDecorator(
                  'code',
                  refitFieldDecoratorOption(
                    metaData === null ? '' : metaData.code || '',
                    metaData === null ? '' : metaData.code || '',
                    '',
                    {
                      rules: [
                        {
                          required: false,
                          message: buildFieldDescription(fieldData.code),
                        },
                      ],
                    },
                  ),
                )(
                  <Input
                    addonBefore={<FormOutlined />}
                    placeholder={buildFieldDescription(fieldData.code)}
                  />,
                )}
              </FormItem>
              <FormItem label={fieldData.address}>
                {getFieldDecorator(
                  'address',
                  refitFieldDecoratorOption(
                    metaData === null ? '' : metaData.address || '',
                    metaData === null ? '' : metaData.address || '',
                    '',
                    {
                      rules: [
                        {
                          required: false,
                          message: buildFieldDescription(fieldData.address),
                        },
                      ],
                    },
                  ),
                )(
                  <Input.TextArea
                    rows={4}
                    placeholder={buildFieldDescription(fieldData.address)}
                  />,
                )}
              </FormItem>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={this.validate}
                loading={processing}
                disabled={
                  processing ||
                  !loadSuccess ||
                  !this.checkAuthority(accessWayCollection.warehouse.setMasterBasicInfo)
                }
              >
                保存配置
              </Button>
            </Form>
          </Spin>
        </div>
      </div>
    );
  }
}

export default EditMasterWarehouse;
