import React, { PureComponent } from 'react';
import { Icon } from 'antd';

import styles from './index.less';

/**
 * 减少使用 dangerouslySetInnerHTML
 */
class Index extends PureComponent {
  render() {
    const { type, text } = this.props;

    return (
      <>
        <div className={styles.containor}>
          <Icon type={type} className={styles.iconBox} />
          <span>{text}</span>
        </div>
      </>
    );
  }
}

export default Index;
