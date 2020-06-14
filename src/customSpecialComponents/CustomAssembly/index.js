import React from 'react';
import { Link } from 'umi';
import TextAnimal from 'rc-texty';
import { Typography } from 'antd';
import {
  DashboardOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ReconciliationOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { appInitCustom } from '@/customConfig/config';
import IconInfo from '@/customComponents/IconInfo';

const { Title } = Typography;

export const defaultFooterData = {
  copyright: appInitCustom.copyright,
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

export function menuHeaderRender(logoDom, config) {
  return (
    <Link to="/">
      {logoDom}
      {config.collapsed ? null : (
        <Title
          level={1}
          style={{
            margin: ' 0 0 0 12px',
            fontSize: '20px',
            color: 'white',
            fontWeight: '600',
          }}
        >
          <TextAnimal type="alpha" mode="smooth">
            {appInitCustom == null ? '' : appInitCustom.leftBarText || ''}
          </TextAnimal>
        </Title>
      )}
    </Link>
  );
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
