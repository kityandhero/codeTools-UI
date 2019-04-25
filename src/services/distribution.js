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

  return request('/Distribution/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryListOperationRecordData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pagesize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/Distribution/ListOperationRecord', {
    method: 'POST',
    body: params,
  });
}

export async function queryGetData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Distribution/Get', {
    method: 'POST',
    body: params,
  });
}

export async function RefuseData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Distribution/Refuse', {
    method: 'POST',
    body: params,
  });
}

export async function PayByWeChatData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Distribution/PayByWeChat', {
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
