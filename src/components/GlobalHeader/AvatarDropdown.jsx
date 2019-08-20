import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import accessWayCollection from '@/utils/accessWayCollection';
import { checkHasAuthority } from '@/utils/authority';

import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;
    const { dispatch } = this.props;

    if (key === 'userCenter') {
      router.push('/account/center');
      return;
    }

    if (key === 'triggerError') {
      router.push('/exception/trigger');
      return;
    }

    if (key === 'areaConfig') {
      router.push('/system/areaConfig');
      return;
    }

    if (key === 'warehouse') {
      router.push('/system/areaConfig/editMasterWarehouse');
      return;
    }

    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }

    router.push(`/account/${key}`);
  };

  render() {
    const {
      global: { currentOperator = null },
      menu,
    } = this.props;

    if (!menu) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={currentOperator == null ? '' : currentOperator.avatar}
            alt="avatar"
          />
          <span className={styles.name}>{currentOperator == null ? '' : currentOperator.name}</span>
        </span>
      );
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item> */}
        {checkHasAuthority(accessWayCollection.areaConfig.get) ? (
          <Menu.Item key="areaConfig">
            <Icon type="setting" />
            地区设置
          </Menu.Item>
        ) : null}
        {checkHasAuthority(accessWayCollection.warehouse.getMaster) ? (
          <Menu.Item key="warehouse">
            <Icon type="shop" />
            主仓信息
          </Menu.Item>
        ) : null}
        {checkHasAuthority(accessWayCollection.areaConfig.get) ? <Menu.Divider /> : null}
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    return currentOperator != null ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={currentOperator.avatar}
            alt="avatar"
          />
          <span className={styles.name}>
            {`${currentOperator.name || ''}  [${currentOperator.cityName || '未知地区'}]`}
          </span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ global }) => ({
  global,
}))(AvatarDropdown);
