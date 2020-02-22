import React from 'react';
import { Form, Switch, TimePicker, Button, Spin, notification } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { SaveOutlined } from '@ant-design/icons';

import accessWayCollection from '../../../customConfig/accessWayCollection';
import UpdateForm from '../../../customComponents/Framework/CustomForm/UpdateForm';

import styles from './index.less';

const FormItem = Form.Item;

const format = 'HH:mm';

const fieldLabels = {
  outStockTime: '当前出库时间',
  time: '设置新的出库时间',
  autoCompleteGoodsLogisticsProcessRequestMessage:
    '自动触发未执行的“开始配送”/“配送完成”操作（将在第二天1点检测执行）',
};

@connect(({ areaConfig, loading }) => ({
  areaConfig,
  loading: loading.models.areaConfig,
}))
class ChangeOutStockTime extends UpdateForm {
  componentAuthority = accessWayCollection.areaConfig.get;

  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'areaConfig/getCurrent',
        submitApiPath: 'areaConfig/changeOutStockTime',
        hour: 0,
        minute: 0,
        autoCompleteGoodsLogisticsProcessRequestMessage: 0,
      },
    };
  }

  getApiData = props => {
    const {
      areaConfig: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const {
      outStockHour,
      outStockMinute,
      autoCompleteGoodsLogisticsProcessRequestMessage,
    } = metaData;

    this.setState({
      hour: outStockHour,
      minute: outStockMinute,
      autoCompleteGoodsLogisticsProcessRequestMessage,
    });
  };

  supplementSubmitRequestParams = o => {
    const d = o;

    const { hour, minute, autoCompleteGoodsLogisticsProcessRequestMessage } = this.state;

    d.hour = hour;
    d.minute = minute;
    d.autoCompleteGoodsLogisticsProcessRequestMessage = autoCompleteGoodsLogisticsProcessRequestMessage;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = data => {
    const form = this.getTargetForm();
    const { metaData, hour, minute, autoCompleteGoodsLogisticsProcessRequestMessage } = this.state;

    metaData.outStockHour = hour;
    metaData.outStockMinute = minute;
    metaData.autoCompleteGoodsLogisticsProcessRequestMessage = autoCompleteGoodsLogisticsProcessRequestMessage;

    this.setState({
      metaData,
    });

    form.resetFields();

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

  onTimePickerChange = time => {
    this.setState({ hour: time.hour(), minute: time.minute() });
  };

  onSwitchChange = checked => {
    this.setState({ autoCompleteGoodsLogisticsProcessRequestMessage: checked ? 1 : 0 });
  };

  render() {
    const {
      metaData,
      hour,
      minute,
      autoCompleteGoodsLogisticsProcessRequestMessage,
      processing,
      dataLoading,
      loadSuccess,
    } = this.state;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Spin spinning={processing || dataLoading}>
            <Form
              ref={this.formRef}
              layout="vertical"
              onSubmit={this.handleSubmit}
              hideRequiredMark
            >
              <FormItem label={fieldLabels.outStockTime}>
                <TimePicker
                  value={
                    metaData
                      ? moment({ hour: metaData.outStockHour, minute: metaData.outStockMinute })
                      : null
                  }
                  disabled
                  format={format}
                />
              </FormItem>
              <FormItem label={fieldLabels.time}>
                <TimePicker
                  value={metaData ? moment({ hour, minute }) : null}
                  format={format}
                  onChange={this.onTimePickerChange}
                />
              </FormItem>
              <FormItem label={fieldLabels.autoCompleteGoodsLogisticsProcessRequestMessage}>
                <Switch
                  checked={(autoCompleteGoodsLogisticsProcessRequestMessage || 0) === 1}
                  onChange={this.onSwitchChange}
                />
              </FormItem>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={e => {
                  this.validate(e, this.formRef.current);
                }}
                loading={processing}
                disabled={
                  processing ||
                  !loadSuccess ||
                  !this.checkAuthority(accessWayCollection.areaConfig.changeOutStockTime)
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

export default ChangeOutStockTime;
