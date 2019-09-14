import React, { PureComponent } from 'react';

import styles from './index.less';

export default class FromDisplayItem extends PureComponent {
  render() {
    const { name, value, empty } = this.props;

    return <div className={styles.fieldBox}>{`${name}：${value || (empty || '')}`}</div>;
  }
}
