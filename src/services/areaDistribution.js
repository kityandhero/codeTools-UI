import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pagesize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/AreaDistribution/List', {
    method: 'POST',
    body: params,
  });
}

export async function addBasicInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/AreaDistribution/AddBasicInfo', {
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
