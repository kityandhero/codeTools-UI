/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { Icon } from 'antd';
import ProLayout from '@ant-design/pro-layout';
import GlobalFooter from '@ant-design/pro-layout/lib/GlobalFooter';

import defaultSettings from '../../config/defaultSettings'; // https://umijs.org/config/
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { isAntDesignPro } from '@/utils/utils';
import { getQueue } from '@/utils/tools';

import logo from '../assets/logo.svg';

import styles from './BasicLayout.less';

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList => {
  return menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });
};

const footerRender = (_, defaultDom) => {
  if (!isAntDesignPro()) {
    return (
      <GlobalFooter
        className={styles.containorBox}
        links={[
          {
            key: 'dataCenter',
            title: (
              <>
                <Icon type="dashboard" />
                <span className={styles.footerLinkTitle}>数据中心</span>
              </>
            ),
            href: '/#/dashboard/analysis',
          },
          {
            key: 'product',
            title: (
              <>
                <Icon type="shop" />
                <span className={styles.footerLinkTitle}>商品管理</span>
              </>
            ),
            href: '/#/product/list',
          },
          {
            key: 'order',
            title: (
              <>
                <Icon type="shopping-cart" />
                <span className={styles.footerLinkTitle}>订单管理</span>
              </>
            ),
            href: '/#/order/payment',
          },
          {
            key: 'orderProcessing',
            title: (
              <>
                <Icon type="reconciliation" />
                <span className={styles.footerLinkTitle}>订单处理</span>
              </>
            ),
            href: '/#/orderProcessing/list/1/waitDeliver',
          },
          {
            key: 'user',
            title: (
              <>
                <Icon type="team" />
                <span className={styles.footerLinkTitle}>用户管理</span>
              </>
            ),
            href: '/#/person/listRegUser',
          },
        ]}
        copyright={
          <>
            Copyright <Icon type="copyright" /> 2018 {defaultSettings.getCompanyName()}
          </>
        }
      />
    );

    // return defaultDom;
  }

  return (
    <>
      {defaultDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout = props => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'global/getMetaData',
        payload: { force: false },
      });
      dispatch({
        type: 'global/getCurrentOperator',
        payload: { force: false },
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  getQueue();

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
            defaultMessage: 'Home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      formatMessage={formatMessage}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ operator, global, settings }) => ({
  collapsed: global.collapsed,
  settings,
  operator,
  global,
}))(BasicLayout);
