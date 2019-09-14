import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Card, Spin } from 'antd';
import router from 'umi/router';

import accessWayCollection from '@/utils/accessWayCollection';
import Result from '@/customComponents/Result';

import Base from '../Base';

import styles from './index.less';

@connect(({ global }) => ({
  global,
}))
class Success extends Base {
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

  beforeUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/setAreaDistributionTempData',
      payload: null,
    });
  };

  goToList = () => {
    router.replace('/finance/areaAccount/detail/areaDistribution/list');
  };

  formContent = () => {
    const { metaData } = this.state;

    const currentOperator = this.getCurrentOperator();

    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            地区：
          </Col>
          <Col xs={24} sm={16}>
            {currentOperator === null ? '' : currentOperator.cityName || ''}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            提现金额:
          </Col>
          <Col xs={24} sm={16}>
            ￥{metaData === null ? '0' : metaData.amount || '0'}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款账户：
          </Col>
          <Col xs={24} sm={16}>
            {metaData === null ? '' : metaData.bankInfo || ''}
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <>
        <Button onClick={this.goToList}>查看提现记录</Button>
      </>
    );

    return (
      <>
        <Card bordered={false}>
          <Spin spinning={false}>
            <Result
              type="success"
              title="操作成功"
              description="等待平台审核处理"
              extra={information}
              actions={actions}
              className={styles.result}
            />
          </Spin>
        </Card>
      </>
    );
  };
}

export default Success;
