import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListSelectData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/Role/ListSelect', {
    method: 'POST',
    body: params,
  });
}

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [{}],
    });

    return result;
  }

  return request('/Role/List', {
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

  return request('/Role/Get', {
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

  return request('/Role/AddBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function updateBasicInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Role/UpdateBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function addModuleData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Role/AddModule', {
    method: 'POST',
    body: params,
  });
}

export async function addMultiModuleData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Role/AddMultiModule', {
    method: 'POST',
    body: params,
  });
}

export async function addAllModuleData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Role/AddAllModule', {
    method: 'POST',
    body: params,
  });
}

export async function updateModuleData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Role/UpdateModule', {
    method: 'POST',
    body: params,
  });
}

export async function removeModuleData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Role/RemoveModule', {
    method: 'POST',
    body: params,
  });
}

export async function clearModuleData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Role/ClearModule', {
    method: 'POST',
    body: params,
  });
}

export async function changeStateData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Role/ChangeState', {
    method: 'POST',
    body: params,
  });
}

export async function removeData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Role/Remove', {
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
