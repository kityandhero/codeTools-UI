import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [
        {
          rowId: 1,
          replenishmentId: '5466',
          orderId: '341648',
          userId: '20095',
          merchantId: '685',
          orderDetail: '437222',
          num: 2,
          type: 1,
          reasonType: 1,
          reason: '公司缺货',
          note: '没货，请退款，谢谢',
          state: 7,
          inTime: '2018-12-07 23:38:37',
          tradeNo: 'LZMH3007083953342674',
          lineId: 14,
          realName: '段彩灵',
          mName: '普罗旺世6期',
          nickname: '小宝的妈妈',
        },
      ],
    });

    return result;
  }

  return request('/Replenishment/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryListOperationRecordData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/Replenishment/ListOperationRecord', {
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

  return request('/Replenishment/Get', {
    method: 'POST',
    body: params,
  });
}

/**
 * 处理售后
 * @param {*} params
 */
export async function agreeData(params) {
  return request('/Replenishment/Agree', {
    method: 'POST',
    body: params,
  });
}

/**
 * 删除数据
 * @param {*} params
 */
export async function removeData(params) {
  return request('/Replenishment/Remove', {
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
