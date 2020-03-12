import { request } from '../utils/request';
import { apiVirtualSuccessAccess, transferToVirtualAccess } from '../utils/tools';

export async function listData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      list: [],
    });

    return result;
  }

  return request('/business/dataColumn/list', {
    method: 'POST',
    body: params,
  });
}

export async function getData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/dataColumn/get', {
    method: 'POST',
    body: params,
  });
}

export async function setData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/dataColumn/set', {
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
