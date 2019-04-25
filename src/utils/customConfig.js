export function getConfigData() {
  return {
    corsTargetDevelopment: '',
    corsTargetProduction: '',
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
