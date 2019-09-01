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

  return request('/RefundOrder/List', {
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

  return request('/RefundOrder/ListOperationRecord', {
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

  return request('/RefundOrder/Get', {
    method: 'POST',
    body: params,
  });
}

/**
 * 调整退款金额
 * @param {*} params
 */
export async function changeRefundAmountData(params) {
  return request('/RefundOrder/ChangeRefundAmount', {
    method: 'POST',
    body: params,
  });
}

/**
 * 拒绝退款
 * @param {*} params
 */
export async function refuseData(params) {
  return request('/RefundOrder/Refuse', {
    method: 'POST',
    body: params,
  });
}

/**
 * 立即退款
 * @param {*} params
 */
export async function immediatelyRefundData(params) {
  return request('/RefundOrder/ImmediatelyRefund', {
    method: 'POST',
    body: params,
  });
}

/**
 * 删除数据
 * @param {*} params
 */
export async function removeData(params) {
  return request('/RefundOrder/Remove', {
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
