import React from 'react';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button } from 'antd';
import { ConfigConsumer } from 'antd/lib/config-provider/context';

import styles from './index.less';

/**
 * 默认的 index 列容器，提供一个好看的 index
 * @param param0
 */
const DropdownButton = ({ children, menus = [], onSelect, style }) => (
  <ConfigConsumer>
    {() => {
      const menu = (
        <Menu onClick={params => onSelect && onSelect(params.key)}>
          {menus.map(item => (
            <Menu.Item key={item.key}>{item.name}</Menu.Item>
          ))}
        </Menu>
      );

      return (
        <Dropdown overlay={menu} className={styles.batchAction}>
          <Button style={style}>
            {children} <DownOutlined />
          </Button>
        </Dropdown>
      );
    }}
  </ConfigConsumer>
);

const BatchAction = ({ style, onSelect, menus = [] }) => (
  <ConfigConsumer>
    {() => {
      const menu = (
        <Menu onClick={params => onSelect && onSelect(params.key)}>
          {menus.map(item => (
            <Menu.Item key={item.key}>{item.name}</Menu.Item>
          ))}
        </Menu>
      );
      return (
        <Dropdown overlay={menu} className={styles.batchAction}>
          <a style={style}>
            <EllipsisOutlined />
          </a>
        </Dropdown>
      );
    }}
  </ConfigConsumer>
);

BatchAction.Button = DropdownButton;

export default BatchAction;
