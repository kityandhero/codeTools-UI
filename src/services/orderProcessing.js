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
export async function setSingleLinePrintData(params) {
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
export async function setMultiLinePrintData(params) {
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
export async function setSingleLineOutboundData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetSingleLineOutbound', {
    method: 'POST',
    body: params,
  });
}

// /**
//  * 检查单线路出库结果
//  *
//  * @export
//  * @param {*} params
//  * @returns
//  */
// export async function checkSingleLineOutboundResultData(params) {
//   if (useVirtualAccess()) {
//     const result = await apiVirtualSuccessAccess({
//       data: {},
//     });

//     return result;
//   }

//   return request('/OrderProcessing/CheckSingleLineOutboundResult', {
//     method: 'POST',
//     body: params,
//   });
// }

/**
 * 检查全线路出库结果
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function checkAllLineOutboundResultData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/CheckAllLineOutboundResult', {
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
export async function setMultiLineOutboundData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetMultiLineOutbound', {
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
export async function setAllLineOutboundData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetAllLineOutbound', {
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
export async function changeLineData(params) {
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
export async function setCommunityOutboundData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetCommunityOutbound', {
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
export async function setCommunityPrintData(params) {
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
export async function setSinglePrintData(params) {
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
export async function setCommunityTransportData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetCommunityTransport', {
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
export async function setSingleLineTransportData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetSingleLineTransport', {
    method: 'POST',
    body: params,
  });
}

// /**
//  * 检查单线路开始配送结果
//  *
//  * @export
//  * @param {*} params
//  * @returns
//  */
// export async function checkSingleLineTransportResultData(params) {
//   if (useVirtualAccess()) {
//     const result = await apiVirtualSuccessAccess({
//       data: {},
//     });

//     return result;
//   }

//   return request('/OrderProcessing/CheckSingleLineTransportResult', {
//     method: 'POST',
//     body: params,
//   });
// }

/**
 * 检查全线路开始配送结果
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function checkAllLineTransportResultData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/CheckAllLineTransportResult', {
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
export async function setSingleLineCompleteData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/SetSingleLineComplete', {
    method: 'POST',
    body: params,
  });
}

// /**
//  * 检查单线路配送完成结果
//  *
//  * @export
//  * @param {*} params
//  * @returns
//  */
// export async function checkSingleLineCompleteResultData(params) {
//   if (useVirtualAccess()) {
//     const result = await apiVirtualSuccessAccess({
//       data: {},
//     });

//     return result;
//   }

//   return request('/OrderProcessing/CheckSingleLineCompleteResult', {
//     method: 'POST',
//     body: params,
//   });
// }

/**
 * 检查全线路配送完成结果
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function checkAllLineCompleteResultData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/CheckAllLineCompleteResult', {
    method: 'POST',
    body: params,
  });
}

/**
 * 设置/取消站点今日不配送
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function toggleIgnoreOutboundMerchantData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/OrderProcessing/ToggleIgnoreOutboundMerchant', {
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
