import React, { PureComponent } from 'react';
import { setLocale, getLocale } from 'umi';
import classNames from 'classnames';
import { Menu, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import { formatMessage } from '@/utils/tools';

import styles from './index.less';

export default class SelectLang extends PureComponent {
  changLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();

    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={this.changLang}>
        <Menu.Item key="zh-CN">
          <span role="img" aria-label="简体中文">
            🇨🇳
          </span>
          简体中文
        </Menu.Item>
        <Menu.Item key="zh-TW">
          <span role="img" aria-label="繁体中文">
            🇭🇰
          </span>
          繁体中文
        </Menu.Item>
        <Menu.Item key="en-US">
          <span role="img" aria-label="English">
            🇬🇧
          </span>
          English
        </Menu.Item>
        <Menu.Item key="pt-BR">
          <span role="img" aria-label="Português">
            🇵🇹
          </span>
          Português
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <GlobalOutlined
          className={classNames(styles.dropDown, className)}
          title={formatMessage({ id: 'navBar.lang' })}
        />
      </Dropdown>
    );
  }
}
