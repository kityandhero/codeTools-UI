import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryGetMenuData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pagesize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/AreaHelpCategory/GetMenu', {
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
