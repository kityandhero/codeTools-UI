import React, { PureComponent } from 'react';

import styles from './index.less';

/**
 * 减少使用 dangerouslySetInnerHTML
 */
class IconInfo extends PureComponent {
  render() {
    const { text, icon } = this.props;

    const iconItem = (icon || null) == null ? null : <span className={styles.iconBox}>{icon}</span>;

    return (
      <>
        <div className={styles.containor}>
          {iconItem}
          <span>{text}</span>
        </div>
      </>
    );
  }
}

export default IconInfo;
