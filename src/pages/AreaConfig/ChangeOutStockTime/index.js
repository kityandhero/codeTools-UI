import React from 'react';
import { Form, TimePicker, Button, Spin, notification } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import accessWayCollection from '@/utils/accessWayCollection';
import UpdateForm from '@/customComponents/CustomForm/UpdateForm';

import styles from './index.less';

const FormItem = Form.Item;

const format = 'HH:mm';

const fieldLabels = {
  outStockTime: '当前出库时间',
  time: '设置新的出库时间',
};

@connect(({ areaConfig, loading }) => ({
  areaConfig,
  loading: loading.models.areaConfig,
}))
@Form.create()
class ChangeOutStockTime extends UpdateForm {
  componentAuthority = accessWayCollection.areaConfig.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      hour: 0,
      minute: 0,
    };
  }

  getApiData = props => {
    const {
      areaConfig: { data },
    } = props;

    return data;
  };

  initState = () => {
    const result = {
      loadApiPath: 'areaConfig/getCurrent',
      submitApiPath: 'areaConfig/changeOutStockTime',
    };

    return result;
  };

  afterLoadSuccess = d => {
    const { outStockHour, outStockMinute } = d;

    this.setState({
      hour: outStockHour,
      minute: outStockMinute,
    });
  };

  supplementSubmitRequestParams = o => {
    const d = o;

    const { hour, minute } = this.state;

    d.hour = hour;
    d.minute = minute;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = data => {
    const { form } = this.props;
    const { metaData, hour, minute } = this.state;

    metaData.outStockHour = hour;
    metaData.outStockMinute = minute;

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

  render() {
    const { metaData, hour, minute, processing, dataLoading, loadSuccess } = this.state;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Spin spinning={processing || dataLoading}>
            <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
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
              <Button
                type="primary"
                icon="save"
                onClick={this.validate}
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
