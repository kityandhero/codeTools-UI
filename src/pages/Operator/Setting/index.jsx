import React from 'react';
import { connect, history } from 'umi';
import { Menu } from 'antd';
import { GridContent } from '@ant-design/pro-layout';

import AuthorizationWrapper from '@/customComponents/Framework/AuthorizationWrapper';

import styles from './index.less';

const { Item } = Menu;

@connect(({ account }) => ({
  account,
}))
class Setting extends AuthorizationWrapper {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      base: '基本设置',
      password: '更改密码',
      // security: '安全设置',
    };
    const key = location.pathname.replace(`${match.path}/`, '');

    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'base',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  doDidMountTask = () => {
    window.addEventListener('resize', this.resize);

    this.resize();
  };

  beforeUnmount = () => {
    window.removeEventListener('resize', this.resize);
  };

  getMenu = () => {
    const { menuMap } = this.state;

    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;

    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    history.push(`/operator/setting/${key}`);

    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      this.setState({
        mode,
      });
    });
  };

  render() {
    const { children } = this.props;

    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            this.main = ref;
          }}
        >
          <div className={styles.leftMenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default Setting;
