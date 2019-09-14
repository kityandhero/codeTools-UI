import React from 'react';
import { connect } from 'dva';
import { Form, Button, Alert, notification, Card, Spin, Divider } from 'antd';
import router from 'umi/router';

import { formatDatetime, toMoney, formatMoneyToChinese } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import Base from '../Base';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ areaDistribution, global, loading }) => ({
  areaDistribution,
  global,
  loading: loading.models.areaAccount,
}))
@Form.create()
class Confirm extends Base {
  componentAuthority = accessWayCollection.areaDistribution.add;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadDataAfterMount: false,
      },
    };
  }

  initOther = () => {
    const tempData = this.getTempData();

    if (tempData == null) {
      router.replace('/finance/areaWithdrawal/apply/fillIn');
    }
  };

  goPrev = () => {
    router.push('/finance/areaWithdrawal/apply/fillIn');
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { metaData } = this.state;
    const submitData = metaData;

    this.setState({ processing: true });

    dispatch({
      type: 'areaDistribution/addBasicInfo',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        this.setState({ processing: false });

        const {
          areaDistribution: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomRight',
              message: '操作结果',
              description: '提现申请已经成功提交，请等待平台处理。',
            });
          });

          router.push('/finance/areaWithdrawal/apply/success');
        }
      }
    });
  };

  formContent = () => {
    const { metaData, processing } = this.state;

    const currentOperator = this.getCurrentOperator();

    return (
      <>
        <Card bordered={false}>
          <Spin spinning={processing}>
            <Form layout="horizontal" className={styles.stepForm}>
              <Alert
                closable
                showIcon
                message="确认提现后，将转入平台审核处理，可以通过提现列表查看状态。"
                style={{ marginBottom: 24 }}
              />
              <FormItem
                {...formItemLayout}
                className={styles.stepFormText}
                label={fieldData.cityName}
              >
                {currentOperator === null ? '' : currentOperator.cityName || ''}
              </FormItem>
              <FormItem
                {...formItemLayout}
                className={styles.stepFormText}
                label={fieldData.amount}
              >
                <span className={styles.money}>
                  ￥{metaData === null ? '0' : metaData.amount || '0'}
                </span>
                <span className={styles.uppercase}>
                  （
                  {formatMoneyToChinese(toMoney(metaData === null ? '0' : metaData.amount || '0'))}
                  ）
                </span>
              </FormItem>
              <FormItem {...formItemLayout} className={styles.stepFormText} label={fieldData.bank}>
                {metaData === null ? '' : metaData.bankInfo || ''}
              </FormItem>
              <FormItem
                {...formItemLayout}
                className={styles.stepFormText}
                label={fieldData.inTime}
              >
                {metaData === null ? '' : formatDatetime(metaData.inTime, 'YYYY-MM-DD HH:mm:ss')}
              </FormItem>
              <Divider style={{ margin: '24px 0' }} />
              <Form.Item
                style={{ marginBottom: 8 }}
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: {
                    span: formItemLayout.wrapperCol.span,
                    offset: formItemLayout.labelCol.span,
                  },
                }}
                label=""
              >
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  loading={processing}
                  disabled={processing}
                >
                  提交
                </Button>
                <Button onClick={this.goPrev} style={{ marginLeft: 8 }}>
                  上一步
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </>
    );
  };
}

export default Confirm;
