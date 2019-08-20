import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Divider,
  Spin,
  Icon,
  Alert,
  message,
} from 'antd';

import { toMoney, buildFieldDescription, formatDatetime } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import Base from '../Base';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ areaAccount, global, loading }) => ({
  areaAccount,
  global,
  loading: loading.models.areaAccount,
}))
@Form.create()
class FillIn extends Base {
  componentAuthority = accessWayCollection.areaDistribution.add;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      canApply: true,
      errorMessage: '',
      amount: 0,
      bankCardNo: '',
      bankInfo: '',
      inTime: formatDatetime(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      bankList: [],
    };
  }

  initState = () => {
    const result = {
      loadApiPath: 'areaAccount/getCurrent',
    };

    return result;
  };

  afterLoadSuccess = d => {
    const { balance, bankList } = d;

    let canApply = true;
    let errorMessage = '';

    if (balance <= 0) {
      canApply = false;
      errorMessage = '没有可提现的账户余额！';
    }

    if (canApply) {
      if ((bankList || []).length === 0) {
        canApply = false;
        errorMessage = '请先完善提现账户银行卡信息！';
      }
    }

    this.setState({
      canApply,
      errorMessage,
      bankList,
    });

    const tempData = this.getTempData();

    if (tempData) {
      const { amount, bankCardNo, bankInfo, inTime } = tempData;

      this.setState({
        amount,
        bankCardNo,
        bankInfo,
        inTime,
      });
    }
  };

  saveTempData = () => {
    const { dispatch } = this.props;

    const {
      amount,
      bankCardNo,
      bankInfo,
      inTime,
      metaData: { balance },
    } = this.state;

    if (amount <= 0 || amount > balance) {
      message.error('提现金额有误！');
      return;
    }

    if (amount < 50) {
      message.error('提现金额下限为50元，请确认您的输入！');
      return;
    }

    if ((bankCardNo || '') === '') {
      message.error('请选择银行卡号！');
      return;
    }

    dispatch({
      type: 'global/setAreaDistributionTempData',
      payload: { amount, bankCardNo, bankInfo, inTime },
    }).then(() => {
      router.push('/finance/areaWithdrawal/apply/confirm');
    });
  };

  formContent = () => {
    const {
      metaData,
      dataLoading,
      canApply,
      errorMessage,
      processing,
      loadSuccess,
      amount,
      bankCardNo,
      bankInfo,
      inTime,
      bankList,
    } = this.state;

    const currentOperator = this.getCurrentOperator();

    const bankData = bankList || [];
    const bankOption = [];

    bankData.forEach(item => {
      const { name: itemName, bankName: itemBankName, bankCardNo: itemBankCardNoItem } = item;

      bankOption.push(
        <Option key={itemBankCardNoItem} value={itemBankCardNoItem}>
          {`${itemName} ${itemBankName}  ${itemBankCardNoItem}`}
        </Option>
      );
    });

    const amountProp = {
      style: { width: '100%' },
      min: 50,
      max: metaData === null ? 0 : metaData.balance || 0,
      placeholder: buildFieldDescription(fieldData.amount, '输入'),
      onChange: v => {
        this.setState({ amount: v });
      },
    };

    if (amount > 0) {
      amountProp.formatter = value => `￥ ${toMoney(value)}`;
      amountProp.value = toMoney(amount);
    }

    const bankSelectProp = {
      labelInValue: true,
      placeholder: buildFieldDescription(fieldData.bank, '选择'),
      onChange: ({ key, label }) => {
        this.setState({ bankCardNo: key, bankInfo: label });
      },
    };

    if (bankCardNo) {
      bankSelectProp.value = { key: bankCardNo, label: bankInfo };
    }

    return (
      <>
        <Card bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
              {canApply ? null : (
                <FormItem {...formItemLayout} label="提醒信息">
                  <Alert
                    type="warning"
                    showIcon
                    message={<span>{`还不能提现哦，${errorMessage}`}</span>}
                  />
                </FormItem>
              )}
              <FormItem {...formItemLayout} label={fieldData.cityName}>
                <Input
                  disabled
                  addonBefore={<Icon type="environment" />}
                  value={currentOperator === null ? '' : currentOperator.cityName || ''}
                />
              </FormItem>
              <FormItem {...formItemLayout} label={fieldData.balance}>
                <Input
                  disabled
                  addonBefore={<Icon type="money-collect" />}
                  value={metaData === null ? '0' : metaData.balance || '0'}
                />
              </FormItem>
              <FormItem {...formItemLayout} label={fieldData.amount}>
                <InputNumber {...amountProp} />
              </FormItem>
              <FormItem {...formItemLayout} label={fieldData.bank}>
                <Select {...bankSelectProp}>{bankOption}</Select>
              </FormItem>
              <FormItem {...formItemLayout} label={fieldData.inTime}>
                <Input disabled addonBefore={<Icon type="calendar" />} value={inTime} />
              </FormItem>
              <FormItem
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
                  disabled={dataLoading || processing || !loadSuccess || !canApply}
                  loading={processing}
                  onClick={this.saveTempData}
                >
                  下一步
                </Button>
              </FormItem>
            </Form>
            <Divider style={{ margin: '40px 0 24px' }} />
            <div className={styles.desc}>
              <h3>说明</h3>
              <h4>提现规则</h4>
              <p>1.50元起提，单日每次提现限额20000，单日不限制提现次数。</p>
              <p>
                2.每笔按付款金额收取手续费，按金额0.1%收取，最低1元，最高25元,
                手续费和付款的金额都从运营账户出。
              </p>
              <p>3.付款到账实效为1-3日，工作日工作时间内当日到账，非工作日工作时间次日到账。</p>
              <h4>注意事项</h4>
              <p>1.目前企业付款到银行卡支持17家银行，更多银行逐步开放中。</p>
              <p>
                2.因为提现的时候会有资金（包含新订单和退款的资金变动）正在处理，提现后可能会出现负值，但不影响资金准确计算。
              </p>
            </div>
          </Spin>
        </Card>
      </>
    );
  };
}

export default FillIn;
