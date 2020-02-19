import React, { PureComponent } from 'react';

import styles from './index.less';

/**
 * 减少使用 dangerouslySetInnerHTML
 */
class Index extends PureComponent {
  render() {
    const { children, text } = this.props;

    return (
      <>
        <div className={styles.containor}>
          {children}
          <span>{text}</span>
        </div>
      </>
    );
  }
}

export default Index;
