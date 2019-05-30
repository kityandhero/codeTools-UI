export function getConfigData() {
  let corsTargetProduction = 'http://localhost:9090';

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
    corsTargetDevelopment: 'http://localhost:9090',
    // corsTargetProduction: 'https://api2.yurukeji.com.cn',
    corsTargetProduction,
  };
}

export function checkDevelopment() {
  return process.env.NODE_ENV === 'development' || window.location.hostname === 'area.lz.a.com';
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
