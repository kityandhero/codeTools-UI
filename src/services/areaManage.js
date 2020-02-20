import { request } from '../utils/request';
import { apiVirtualSuccessAccess, transferToVirtualAccess } from '../utils/tools';

export async function queryListData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/AreaManage/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryGetData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/areaManage/get', {
    method: 'POST',
    body: params,
  });
}

export async function addBasicInfoData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/AreaManage/AddBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function updateBasicInfoData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/AreaManage/UpdateBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function resetPasswordData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/AreaManage/ResetPassword', {
    method: 'POST',
    body: params,
  });
}

export async function changeStateData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/AreaManage/ChangeState', {
    method: 'POST',
    body: params,
  });
}

export async function removeData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/AreaManage/Remove', {
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
