import React, { PureComponent } from 'react';
import Link from 'umi/link';
import RightContent from '../GlobalHeaderCustom/RightContent';
import BaseMenu from '@/components/SiderMenu/BaseMenu';
import styles from './index.less';

export default class TopNavHeaderCustom extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 330 - 165 - 4,
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 330 - 165 - 4,
    };
  }

  render() {
    const { theme, contentWidth, logo } = this.props;
    const { maxWidth } = this.state;
    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
                <h1>商城管理系统</h1>
              </Link>
            </div>
            <div
              style={{
                maxWidth,
              }}
            >
              <BaseMenu {...this.props} style={{ border: 'none', height: 64 }} />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
