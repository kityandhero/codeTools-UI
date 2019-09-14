export function getConfigData() {
  let corsTargetProduction = 'https://api2.yurukeji.com.cn';

  if (window.appInitCustom != null) {
    if (window.appInitCustom.apiPrefix != null) {
      if (window.appInitCustom.apiPrefix.corsTargetProduction != null) {
        const {
          apiPrefix: { corsTargetProduction: corsTargetProductionRemote },
        } = window.appInitCustom;

        corsTargetProduction = corsTargetProductionRemote;
      }
    }
  }

  return {
    // corsTargetDevelopment: 'https://api2.yurukeji.com.cn',
    // corsTargetDevelopment: 'http://api2.b.com',
    corsTargetDevelopment: 'http://areaapi.lz.a.com',
    corsTargetProduction,
  };
}

export function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export const goodsTypeCollection = {
  product: 1,
  simpleTicket: 2,
  lineTicket: 3,
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
