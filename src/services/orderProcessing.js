import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      list: [
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路1',
          communityCount: 10,
        },
        {
          rowId: 2,
          lineId: 2,
          lineName: '陇海路工人路2',
          communityCount: 11,
        },
        {
          rowId: 3,
          lineId: 3,
          lineName: '陇海路工人路3',
          communityCount: 12,
        },
        {
          rowId: 4,
          lineId: 4,
          lineName: '陇海路工人路4',
          communityCount: 13,
        },
        {
          rowId: 4,
          lineId: 4,
          lineName: '陇海路工人路4',
          communityCount: 13,
        },
        {
          rowId: 4,
          lineId: 4,
          lineName: '陇海路工人路4',
          communityCount: 13,
        },
        {
          rowId: 4,
          lineId: 4,
          lineName: '陇海路工人路4',
          communityCount: 13,
        },
        {
          rowId: 4,
          lineId: 4,
          lineName: '陇海路工人路4',
          communityCount: 13,
        },
        {
          rowId: 4,
          lineId: 4,
          lineName: '陇海路工人路4',
          communityCount: 13,
        },
        {
          rowId: 4,
          lineId: 4,
          lineName: '陇海路工人路4',
          communityCount: 13,
        },
        {
          rowId: 4,
          lineId: 4,
          lineName: '陇海路工人路4',
          communityCount: 13,
        },
        {
          rowId: 4,
          lineId: 4,
          lineName: '陇海路工人路4',
          communityCount: 13,
        },
      ],
    });

    return result;
  }

  return request('/OrderProcessing/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryListMerchantData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      list: [
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
        {
          rowId: 1,
          lineId: 1,
          lineName: '陇海路工人路',
          communityId: 101,
          communityName: '帝湖花园',
          communityMerchantName: '周艳',
          productCount: 15,
          totalAmount: 107.45,
        },
      ],
    });

    return result;
  }

  return request('/OrderProcessing/ListMerchant', {
    method: 'POST',
    body: params,
  });
}

export async function queryGetData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {
        list: [],
      },
    });

    return result;
  }

  return request('/OrderProcessing/Get', {
    method: 'POST',
    body: params,
  });
}

/**
 * 单线路打印
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setSingleLinePrint(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetSingleLinePrint', {
    method: 'POST',
    body: params,
  });
}

/**
 * 多线路打印
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setMultiLinePrint(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetMultiLinePrint', {
    method: 'POST',
    body: params,
  });
}

/**
 * 单线路出库
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setSingleLineTransit(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetSingleLineTransit', {
    method: 'POST',
    body: params,
  });
}

/**
 * 多线路出库
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setMultiLineTransit(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetMultiLineTransit', {
    method: 'POST',
    body: params,
  });
}

/**
 * 地区下全线路出库
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setAllLineTransit(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetAllLineTransit', {
    method: 'POST',
    body: params,
  });
}

/**
 * 切换线路
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function changeLine(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/ChangeLine', {
    method: 'POST',
    body: params,
  });
}

/**
 * 社区出库
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setCommunityTransit(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetCommunityTransit', {
    method: 'POST',
    body: params,
  });
}

/**
 * 打印三联单社区总单
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setCommunityPrint(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetCommunityPrint', {
    method: 'POST',
    body: params,
  });
}

/**
 * 打印A4分单
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setSinglePrint(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetSinglePrint', {
    method: 'POST',
    body: params,
  });
}

/**
 * 设置社区开始配送
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setCommunityDispatch(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetCommunityDispatch', {
    method: 'POST',
    body: params,
  });
}

/**
 * 设置线路开始配送
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setSingleLineDispatch(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetSingleLineDispatch', {
    method: 'POST',
    body: params,
  });
}

/**
 * 设置线路配送完成
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function setSingleLineDispatchFinish(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetSingleLineDispatchFinish', {
    method: 'POST',
    body: params,
  });
}

/**
 * 设置订单立即完成
 * @param {*} params
 */
export async function setUserOrderImmediatelyFinishData(params) {
  return request('/OrderProcessing/SetUserOrderImmediatelyFinish', {
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

  return request('/OrderProcessing/ExportKey', {
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
