import React from 'react';
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
      title: <IconInfo icon={<ShopOutlined />} text="商品管理" />,
      href: '/#/product/pageList',
      blankTarget: false,
    },
    {
      key: 'order',
      title: <IconInfo icon={<ShoppingCartOutlined />} text="订单管理" />,
      href: '/#/order/pageList',
      blankTarget: false,
    },
    {
      key: 'orderProcessing',
      title: <IconInfo icon={<ReconciliationOutlined />} text="物流配送" />,
      href: '/#/orderProcessing/list/1/waitDeliver',
      blankTarget: false,
    },
    {
      key: 'user',
      title: <IconInfo icon={<TeamOutlined />} text="个人中心" />,
      href: '/#/person/listRegUser',
      blankTarget: false,
    },
  ],
};

export function menuHeaderRender(logoDom, config) {
  const { global } = config;
  const { currentOperator } = global || {
    currentOperator: { platform: { shortName: '平台简称' } },
  };

  const { platform } = currentOperator || { platform: { shortName: '平台简称' } };

  const { shortName } = platform || { shortName: '平台简称' };

  return (
    <>
      {logoDom}
      {config.collapsed ? null : (
        <Title
          level={1}
          style={{
            margin: ' 0 0 0 12px',
            fontSize: '20px',
            color: 'white',
            fontWeight: '600',
            lineHeight: '32px',
          }}
        >
          <TextAnimal type="alpha" mode="smooth">
            {appInitCustom == null ? '' : shortName || '平台简称'}
          </TextAnimal>
        </Title>
      )}
    </>
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
