import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import defaultSettings from '../../config/defaultSettings'; // https://umijs.org/config/
import SelectLang from '../components/SelectLang';

import styles from './UserLayout.less';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '/index.html#/user/login',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '/index.html#/user/login',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '/index.html#/user/login',
  },
];

const copyright = (
  <>
    2018 {defaultSettings.getPlatformName()}体验技术部出品{' '}
    <a href="http://www.beian.miit.gov.cn" without="true" rel="noopener noreferrer" target="_blank">
      豫ICP备15014426号
    </a>
  </>
);

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;

  const { breadcrumb } = getMenuData(routes);

  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={defaultSettings.getLoginLogo()} />
                <span className={styles.title}>
                  {defaultSettings.getPlatformName()} 商城管理系统
                </span>
              </Link>
            </div>
            <div className={styles.desc}>聚焦优质产品，提供优质服务，把健康带给您！</div>
          </div>
          {children}
        </div>
        <DefaultFooter links={links} copyright={copyright} />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
