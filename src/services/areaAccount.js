import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryGetCurrentData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {
        balance: 1452.25,
      },
    });

    return result;
  }

  return request('/AreaAccount/GetCurrent', {
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
