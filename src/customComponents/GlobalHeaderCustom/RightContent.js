import React, { PureComponent } from 'react';
import { formatMessage, Link } from 'umi';
import { Spin, Tag, Menu, Dropdown, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { MonitorOutlined, LogoutOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { checkIsSuper } from '@/utils/authority';

import NoticeIconCustom from '../NoticeIconCustom';
import HeaderSearchCustom from '../HeaderSearchCustom';
// import SelectLangCustom from '../SelectLangCustom';

import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  render() {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
    } = this.props;

    const menuItems = [];

    if (checkIsSuper()) {
      menuItems.push({
        key: 'monitor',
        icon: <MonitorOutlined />,
        text: '监控信息',
      });
    }

    console.log(menuItems);

    const menu = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={(e) => {
          onMenuClick(e);
        }}
      >
        {menuItems.map((o) => (
          <Menu.Item key={o.key}>
            {o.icon}
            {o.text}
          </Menu.Item>
        ))}

        {menuItems.length > 0 ? <Menu.Divider /> : null}

        <Menu.Item key="logout">
          <LogoutOutlined />
          {formatMessage({ id: 'menu.account.logout' })}
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <HeaderSearchCustom
          className={`${styles.action} ${styles.search}`}
          placeholder={formatMessage({ id: 'component.globalHeader.search' })}
          dataSource={[
            formatMessage({ id: 'component.globalHeader.search.example1' }),
            formatMessage({ id: 'component.globalHeader.search.example2' }),
            formatMessage({ id: 'component.globalHeader.search.example3' }),
          ]}
          onSearch={(value) => {
            console.log('input', value);
          }}
          onPressEnter={(value) => {
            console.log('enter', value);
          }}
        />
        <Tooltip title="帮助文档">
          <Link to="/helpCenter/category/no/page" replace className={styles.action}>
            <QuestionCircleOutlined />
          </Link>
        </Tooltip>
        <NoticeIconCustom
          className={styles.action}
          count={currentUser == null ? 0 : currentUser.notifyCount || 0}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps); // eslint-disable-line
          }}
          locale={{
            emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
            clear: formatMessage({ id: 'component.noticeIcon.clear' }),
          }}
          onClear={onNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          popupAlign={{ offset: [20, -16] }}
        >
          <NoticeIconCustom.Tab
            list={noticeData.notification}
            title={formatMessage({ id: 'component.globalHeader.notification' })}
            name="notification"
            emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIconCustom.Tab
            list={noticeData.message}
            title={formatMessage({ id: 'component.globalHeader.message' })}
            name="message"
            emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
          <NoticeIconCustom.Tab
            list={noticeData.event}
            title={formatMessage({ id: 'component.globalHeader.event' })}
            name="event"
            emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          />
        </NoticeIconCustom>
        {currentUser.name ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{`${currentUser.name || ''}`}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        {/* <SelectLangCustom className={styles.action} /> */}
      </div>
    );
  }
}
