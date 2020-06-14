/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useEffect } from 'react';
import { Link, connect, useIntl } from 'umi';
import { Result, Button } from 'antd';
import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout';

import RightContent from '@/components/GlobalHeader/RightContent';
import { execBasicLayoutRemoteRequest } from '@/customConfig/customLoad';
import { defaultFooterData, menuHeaderRender } from '@/customSpecialComponents/CustomAssembly';
import { getQueue } from '@/utils/tools';
import { isAntDesignPro, getAuthorityFromRouter } from '@/utils/utils';
import Authorized from '@/utils/Authorized';
import { defaultSettings } from '@/defaultSettings'; // https://umijs.org/config/

// import styles from './BasicLayout.less';

const logo = defaultSettings.getShareLogo();

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };

    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter copyright={defaultFooterData.copyright} links={defaultFooterData.links} />
);

const footerRender = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
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

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    // setSetting
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      execBasicLayoutRemoteRequest(dispatch);

      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  getQueue();

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  const { formatMessage } = useIntl();

  return (
    <>
      <ProLayout
        logo={logo}
        title={defaultSettings.getTitle()}
        // pageTitleRender={(e) => {
        //   const { title } = e;
        //   console.log(e);
        //   return title;
        // }}
        formatMessage={formatMessage}
        menuHeaderRender={(logoDom) => {
          return menuHeaderRender(logoDom, props);
        }}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          const { children: childrenArray } = menuItemProps.children || { children: [] };

          if (menuItemProps.isUrl || (childrenArray || []).length > 0 || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({ id: 'menu.home' }),
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
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ operator, global, settings }) => ({
  collapsed: global.collapsed,
  settings,
  operator,
  global,
}))(BasicLayout);
