import request from '@/utils/request';
import {
  apiVirtualSuccessAccess,
  transferToVirtualAccess,
} from '@/customConfig/apiVirtualAccessAssist';

export async function openFolderData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [{}],
    });

    return result;
  }

  return request('/business/tools/openFolder', {
    method: 'POST',
    data: params,
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
