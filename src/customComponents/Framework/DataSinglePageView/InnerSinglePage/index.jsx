import React from 'react';
import { Card, BackTop } from 'antd';

import SinglePage from '../SinglePage';

import styles from './index.less';

class InnerSinglePage extends SinglePage {
  constructor(props) {
    super(props);

    const defaultState = this.state;

    this.useParamsKey = false;

    this.state = {
      ...defaultState,
    };
  }

  render() {
    return (
      <>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderAboveTable()}
            {this.renderTable()}
          </div>
        </Card>
        {this.renderOther()}
        <BackTop />
      </>
    );
  }
}

export default InnerSinglePage;
