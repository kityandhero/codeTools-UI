export default {
  navTheme: 'dark',
  primaryColor: '#1890FF',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: '代码生成工具',
  pwa: false,
  iconfontUrl: '',
  defaultEmptyImage: '/noImageSmall.png',
  getPlatformName: () => {
    let result = '';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { platformName } = window.appInitCustom;

        result = platformName;
      }
    }

    return result || '量子美食';
  },
  getTitle: () => {
    let result = '';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { appName } = window.appInitCustom;

        result = appName;
      }
    }

    return result || '代码生成工具';
  },
  getLoginLogo: () => {
    let result = '';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { loginLogo } = window.appInitCustom;

        result = loginLogo;
      }
    }

    return result || '/Logo.png';
  },
  getShareLogo: () => {
    let result = '';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { shareLogo } = window.appInitCustom;

        result = shareLogo;
      }
    }

    return result || '/shareLogo.png';
  },
  getShareLogoName: () => {
    let result = '';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { shareLogoName } = window.appInitCustom;

        result = shareLogoName;
      }
    }

    return result || '量子商城系统';
  },
  getCompanyName: () => {
    let result = '';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { companyName } = window.appInitCustom;

        result = companyName;
      }
    }

    return result || '量子美食科技有限公司';
  },
};
