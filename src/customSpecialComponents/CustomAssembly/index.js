import React from 'react';
import {
  DashboardOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ReconciliationOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import defaultSettings from '@/defaultSettings'; // https://umijs.org/config/
import IconInfo from '@/customComponents/IconInfo';

export const defaultFooterData = {
  copyright: defaultSettings.getCompanyName(),
  links: [
    {
      key: 'dataCenter',
      title: <IconInfo icon={<DashboardOutlined />} text="数据中心" />,
      href: '/#/dashboard/analysis',
      blankTarget: false,
    },
    {
      key: 'product',
      title: <IconInfo icon={<ShopOutlined />} text="数据中心" />,
      href: '/#/product/pageList',
      blankTarget: false,
    },
    {
      key: 'order',
      title: <IconInfo icon={<ShoppingCartOutlined />} text="数据中心" />,
      href: '/#/order/pageList',
      blankTarget: false,
    },
    {
      key: 'orderProcessing',
      title: <IconInfo icon={<ReconciliationOutlined />} text="数据中心" />,
      href: '/#/orderProcessing/list/1/waitDeliver',
      blankTarget: false,
    },
    {
      key: 'user',
      title: <IconInfo icon={<TeamOutlined />} text="数据中心" />,
      href: '/#/person/listRegUser',
      blankTarget: false,
    },
  ],
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
