import React from 'react';
import { Card, Steps } from 'antd';

import accessWayCollection from '@/utils/accessWayCollection';
import UpdateFormTab from '@/customComponents/Framework/CustomForm/UpdateFormTab';

import styles from './index.less';

const { Step } = Steps;

class Apply extends UpdateFormTab {
  componentAuthority = accessWayCollection.areaDistribution.add;

  initState = () => ({
    loadDataAfterMount: false,
  });

  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'fillIn':
        return 0;
      case 'confirm':
        return 1;
      case 'success':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { children } = this.props;
    return (
      <Card bordered={false}>
        <>
          <Steps current={this.getCurrentStep()} className={styles.steps}>
            <Step title="填写提现信息" />
            <Step title="确认提现信息" />
            <Step title="完成" />
          </Steps>
          {children}
        </>
      </Card>
    );
  }
}

export default Apply;
