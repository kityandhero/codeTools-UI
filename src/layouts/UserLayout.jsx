import React from 'react';
import { connect, Link } from 'umi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';

import { formatMessage } from '@/utils/tools';
import SelectLang from '@/components/SelectLang';
import { defaultSettings } from '@/defaultSettings';
import { showSelectLanguage, showLogoInLoginView, appInitCustom } from '@/customConfig/config';

import styles from './UserLayout.less';

const UserLayout = (props) => {
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

  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    title: defaultSettings.getTitle(),
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>{showSelectLanguage() ? <SelectLang /> : null}</div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                {showLogoInLoginView() ? (
                  <img alt="logo" className={styles.logo} src={defaultSettings.getShareLogo()} />
                ) : null}
                <span className={styles.title}>
                  {appInitCustom == null ? '未设置名称' : appInitCustom.appName || '未设置名称'}
                </span>
              </Link>
            </div>
            <div className={styles.desc}>
              {appInitCustom == null ? '' : appInitCustom.appDescription || ''}
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
          links={[]}
          copyright={appInitCustom == null ? '' : appInitCustom.copyright || ''}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
