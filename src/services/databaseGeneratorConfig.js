import request from '@/utils/request';
import {
  apiVirtualSuccessAccess,
  transferToVirtualAccess,
} from '@/customConfig/apiVirtualAccessAssist';

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

export async function setMybatisGeneratorConfigData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/setMybatisGeneratorConfig', {
    method: 'POST',
    data: params,
  });
}

export async function setMybatisPlusGeneratorConfigData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/setMybatisPlusGeneratorConfig', {
    method: 'POST',
    data: params,
  });
}

export async function setCustomGeneratorConfigData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/setCustomGeneratorConfig', {
    method: 'POST',
    data: params,
  });
}

export async function generateData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/generate', {
    method: 'POST',
    data: params,
  });
}

export async function openProjectFolderData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [{}],
    });

    return result;
  }

  return request('/business/databaseGeneratorConfig/openProjectFolder', {
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
