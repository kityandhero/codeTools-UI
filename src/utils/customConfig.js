export function getConfigData() {
  return {
    corsTargetDevelopment: 'http://areaapi.lz.a.com',
    // corsTargetProduction: 'https://api2.yurukeji.com.cn',
    corsTargetProduction: 'http://api2.yurukeji.cn',
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
