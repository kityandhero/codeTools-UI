import React, { Fragment } from 'react';
import { Card, BackTop } from 'antd';

import PagerList from '@/customComponents/CustomList/PagerList';

import styles from './index.less';

class InnerPagerList extends PagerList {
  constructor(props) {
    super(props);

    const defaultState = this.state;
    defaultState.useParamsKey = false;

    this.state = {
      ...defaultState,
    };
  }

  render() {
    return (
      <Fragment>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderTable()}
          </div>
        </Card>
        {this.renderOther()}
        <BackTop />
      </Fragment>
    );
  }
}

export default InnerPagerList;
