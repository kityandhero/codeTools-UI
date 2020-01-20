import { request } from '../utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '../utils/tools';

/**
 * 综合数据
 * @param {*} params
 */
export async function queryGetData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      data: {},
    });

    return result;
  }

  return request('/MetaData/Get', {
    method: 'POST',
    body: params,
  });
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
