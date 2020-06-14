import { appInitCustom } from '@/customConfig/config';

export const defaultSettings = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar
  getPlatformName: () => {
    let result = '';

    if ((appInitCustom || null) != null) {
      if ((appInitCustom.appName || null) != null) {
        const { platformName } = appInitCustom;

        result = platformName;
      }
    }

    return result || '';
  },
  getTitle: () => {
    let result = '代码生成器';

    if ((appInitCustom || null) != null) {
      if ((appInitCustom.appName || null) != null) {
        const { appName } = appInitCustom;

        result = appName;
      }
    }

    return result || '';
  },
  getLoginLogo: () => {
    let result = '/Logo.png';

    if ((appInitCustom || null) != null) {
      if ((appInitCustom.appName || null) != null) {
        const { loginLogo } = appInitCustom;

        result = loginLogo;
      }
    }

    return result || '';
  },
  getShareLogo: () => {
    let result = '/shareLogo.png';

    if ((appInitCustom || null) != null) {
      if ((appInitCustom.appName || null) != null) {
        const { shareLogo } = appInitCustom;

        result = shareLogo;
      }
    }

    return result || '';
  },
  getShareLogoName: () => {
    let result = '';

    if ((appInitCustom || null) != null) {
      if ((appInitCustom.appName || null) != null) {
        const { shareLogoName } = appInitCustom;

        result = shareLogoName;
      }
    }

    return result || '';
  },
  getCompanyName: () => {
    let result = '';

    if ((appInitCustom || null) != null) {
      if ((appInitCustom.appName || null) != null) {
        const { companyName } = appInitCustom;

        result = companyName;
      }
    }

    return result || '';
  },
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
