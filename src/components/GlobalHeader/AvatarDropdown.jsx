import React from 'react';
import { connect, history } from 'umi';
import { Avatar, Menu, Spin } from 'antd';
import { ApiOutlined, MonitorOutlined, LogoutOutlined } from '@ant-design/icons';

import { checkIsSuper } from '../../utils/authority';

import HeaderDropdown from '../HeaderDropdown';

import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'swagger') {
      window.open('/swagger-ui.html', '_blank');

      return;
    }

    if (key === 'monitor') {
      window.open('/monitor', '_blank');

      return;
    }

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(`/account/${key}`);
  };

  render() {
    const {
      global: { operator = null },
    } = this.props;

    const menuItems = [];

    if (checkIsSuper()) {
      menuItems.push({
        key: 'swagger',
        icon: <ApiOutlined />,
        text: 'Swagger文档',
      });

      menuItems.push({
        key: 'monitor',
        icon: <MonitorOutlined />,
        text: '监控信息',
      });
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menuItems.map((o) => (
          <Menu.Item key={o.key}>
            {o.icon}
            {o.text}
          </Menu.Item>
        ))}

        {menuItems.length > 0 ? <Menu.Divider /> : null}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return operator != null ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={operator.avatar || '/user.png'}
            alt="avatar"
          />
          <span className={styles.name}>{operator.name || '未知用户'}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <div className="unknownBox">
        <Spin
          delay={500}
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </div>
    );
  }
}

export default connect(({ global }) => ({
  global,
}))(AvatarDropdown);
