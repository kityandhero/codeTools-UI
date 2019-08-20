import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/Product/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryListSaleCountData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/Product/ListSaleCount', {
    method: 'POST',
    body: params,
  });
}

export async function queryListSourceData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/Product/ListSource', {
    method: 'POST',
    body: params,
  });
}

export async function queryListPlanSaleData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      list: [],
      extra: { pageNo: 1, pageSize: 10, total: 3 },
    });

    return result;
  }

  return request('/Product/ListPlanSale', {
    method: 'POST',
    body: params,
  });
}

export async function queryListLogData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      list: [],
      extra: { pageNo: 1, pageSize: 10, total: 3 },
    });

    return result;
  }

  return request('/Product/ListLog', {
    method: 'POST',
    body: params,
  });
}

export async function queryListStoreChangeData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      list: [],
      extra: {
        pageNo: 1,
        pageSize: 10,
        total: 65,
      },
    });

    return result;
  }

  return request('/product/listStoreChange', {
    method: 'POST',
    body: params,
  });
}

export async function listSaleRecordData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      list: [],
      extra: {
        pageNo: 1,
        pageSize: 10,
        total: 65,
      },
    });

    return result;
  }

  return request('/product/listSaleRecord', {
    method: 'POST',
    body: params,
  });
}

export async function listRefundRecordData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      list: [],
      extra: {
        pageNo: 1,
        pageSize: 10,
        total: 65,
      },
    });

    return result;
  }

  return request('/product/listRefundRecord', {
    method: 'POST',
    body: params,
  });
}

export async function listReplenishmentRecordData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      list: [],
      extra: {
        pageNo: 1,
        pageSize: 10,
        total: 65,
      },
    });

    return result;
  }

  return request('/product/listReplenishmentRecord', {
    method: 'POST',
    body: params,
  });
}

export async function queryListImageData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      list: [],
      extra: {
        pageNo: 1,
        pageSize: 10,
        total: 65,
      },
    });

    return result;
  }

  return request('/Product/ListImage', {
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

  return request('/Product/Get', {
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

  return request('/Product/AddBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function updateImageSortData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/UpdateImageSort', {
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
  return request('/Product/UpdateBasicInfo', {
    method: 'POST',
    body: params,
  });
}

/**
 * 更新库存
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function updateStoreCountData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }
  return request('/Product/UpdateStoreCount', {
    method: 'POST',
    body: params,
  });
}

export async function updateContentInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/updateContentInfo', {
    method: 'POST',
    body: params,
  });
}

export async function updateImageContentInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/UpdateImageContentInfo', {
    method: 'POST',
    body: params,
  });
}

export async function setRecommendData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/SetRecommend', {
    method: 'POST',
    body: params,
  });
}

export async function setHotData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/SetHot', {
    method: 'POST',
    body: params,
  });
}

export async function setGiftData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/SetGift', {
    method: 'POST',
    body: params,
  });
}

export async function setStateData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/SetState', {
    method: 'POST',
    body: params,
  });
}

export async function removeData(params) {
  return request('/Product/Remove', {
    method: 'POST',
    body: params,
  });
}

export async function addImageData(params) {
  return request('/Product/AddImage', {
    method: 'POST',
    body: params,
  });
}

export async function removeImageData(params) {
  return request('/Product/RemoveImage', {
    method: 'POST',
    body: params,
  });
}

export async function selectFromSourceData(params) {
  return request('/Product/SelectFromSource', {
    method: 'POST',
    body: params,
  });
}

export async function exportStoreKeyData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/ExportStoreKey', {
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
