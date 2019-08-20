import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListForEditData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: [
        {
          lineId: '32',
          name: '大学路中原路2号线',
          inTime: '2018-11-07 16:27:29',
          driverName: '',
          phone: '',
          phoneSpare: '',
          carNo: '豫A-',
          sort: 1,
        },
      ],
    });

    return result;
  }

  return request('/Line/ListForEdit', {
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
      data: [
        {
          lineId: '32',
          name: '大学路中原路2号线',
          inTime: '2018-11-07 16:27:29',
          driverName: '',
          phone: '',
          phoneSpare: '',
          carNo: '豫A-',
          sort: 1,
        },
      ],
    });

    return result;
  }

  return request('/Line/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryGetData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {
        lineId: '32',
        name: '大学路中原路2号线',
        inTime: '2018-11-07 16:27:29',
        driverName: '',
        phone: '',
        phoneSpare: '',
        carNo: '豫A-',
        sort: 1,
      },
    });

    return result;
  }

  return request('/Line/Get', {
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

  return request('/Line/AddBasicInfo', {
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

  return request('/Line/UpdateBasicInfo', {
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

  return request('/Line/Remove', {
    method: 'POST',
    body: params,
  });
}

export async function exportKeyData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Line/ExportKey', {
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
