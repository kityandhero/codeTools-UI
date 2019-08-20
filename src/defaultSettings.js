module.exports = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar
  defaultEmptyImage: '/noImageSmall.png', // sticky siderbar
  getPlatformName: () => {
    let result = '';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { platformName } = window.appInitCustom;

        result = platformName;
      }
    }

    return result || '';
  },
  getTitle: () => {
    let result = '商城管理系统';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { appName } = window.appInitCustom;

        result = appName;
      }
    }

    return result || '';
  },
  getLoginLogo: () => {
    let result = '/Logo.png';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { loginLogo } = window.appInitCustom;

        result = loginLogo;
      }
    }

    return result || '';
  },
  getShareLogo: () => {
    let result = '/shareLogo.png';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { shareLogo } = window.appInitCustom;

        result = shareLogo;
      }
    }

    return result || '';
  },
  getShareLogoName: () => {
    let result = '';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { shareLogoName } = window.appInitCustom;

        result = shareLogoName;
      }
    }

    return result || '';
  },
  getCompanyName: () => {
    let result = '';

    if ((window.appInitCustom || null) != null) {
      if ((window.appInitCustom.appName || null) != null) {
        const { companyName } = window.appInitCustom;

        result = companyName;
      }
    }

    return result || '';
  },
};
