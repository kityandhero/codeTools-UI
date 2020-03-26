import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import { BarsOutlined } from '@ant-design/icons';

import { Link } from 'umi';

const { SubMenu } = Menu;

export default class BaseMenu extends PureComponent {
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => this.getSubMenuOrItem(item, parent))
      .filter((item) => item);
  };

  getSelectedMenuKeys = () => {
    const result = [];

    const { currentCategoryId } = this.props;

    if ((currentCategoryId || '') !== '') {
      result.push(currentCategoryId);
    }

    // const { params } = match;
    // const { categoryId } = params;
    // const { flatMenuKeys } = this.props;
    // return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());

    return result;
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item) => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some((child) => child.name)) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                <BarsOutlined />
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.helpCategoryId}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.helpCategoryId}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  getMenuItemPath = (item) => {
    const { name } = item;
    const itemPath = `/helpCenter/category/${item.helpCategoryId}`;
    const icon = <BarsOutlined />;
    // const { target } = item;

    const {
      // location,
      isMobile,
      onCollapse,
    } = this.props;
    return (
      <Link
        to={itemPath}
        replace
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  render() {
    const {
      openKeys,
      theme,
      // location: { pathname },
      collapsed,
    } = this.props;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }
    const { handleOpenChange, menuData } = this.props;

    return (
      <Menu
        key="2be2d3a3-308c-4e44-bfc4-56f86c2424bb"
        mode="inline"
        theme={theme}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        {...props}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
  }
}
