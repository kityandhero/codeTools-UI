import request from '@/utils/request';
import { apiVirtualSuccessAccess, transferToVirtualAccess } from '@/utils/tools';

export async function listData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      list: [],
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/list', {
    method: 'POST',
    data: params,
  });
}

export async function getData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/get', {
    method: 'POST',
    data: params,
  });
}

export async function getByConnectionIdData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/getByConnectionId', {
    method: 'POST',
    data: params,
  });
}

export async function setData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/set', {
    method: 'POST',
    data: params,
  });
}

export async function generateAllData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/generateAll', {
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
