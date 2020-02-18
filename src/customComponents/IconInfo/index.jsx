import React, { PureComponent } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';

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
          <LegacyIcon type={type} className={styles.iconBox} />
          <span>{text}</span>
        </div>
      </>
    );
  }
}

export default Index;
