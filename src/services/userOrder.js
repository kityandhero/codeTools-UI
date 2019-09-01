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

  return request('/UserOrder/ListUserPaymentOrder', {
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

  return request('/UserOrder/ListOperationRecord', {
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

  return request('/UserOrder/Get', {
    method: 'POST',
    body: params,
  });
}

/**
 * 确认发货
 * @param {*} params
 */
export async function sendOutData(params) {
  return request('/UserOrder/ConfirmSend', {
    method: 'POST',
    body: params,
  });
}

/**
 * 生成佣金并发送消息
 * @param {*} params
 */
export async function grantBrokerageData(params) {
  return request('/UserOrder/WxPay', {
    method: 'POST',
    body: params,
  });
}

/**
 * 撤回佣金
 * @param {*} params
 */
export async function withdrawBrokerageData(params) {
  return request('/UserOrder/WithdrawBrokerage', {
    method: 'POST',
    body: params,
  });
}

/**
 * 完成订单
 * @param {*} params
 */
export async function finishOrderData(params) {
  return request('/UserOrder/ConfirmOver', {
    method: 'POST',
    body: params,
  });
}

/**
 * 打印小票
 * @param {*} params
 */
export async function printSmallTicketData(params) {
  return request('/UserOrder/Print', {
    method: 'POST',
    body: params,
  });
}

/**
 * 打印订单
 * @param {*} params
 */
export async function printOrderData(params) {
  return request('/UserOrder/PrintOrder', {
    method: 'POST',
    body: params,
  });
}

/**
 * 打印同城快递
 * @param {*} params
 */
export async function printKuaiDiData(params) {
  return request('/UserOrder/PrintKuaiDi', {
    method: 'POST',
    body: params,
  });
}

/**
 * 关闭订单
 * @param {*} params
 */
export async function closeOrderData(params) {
  return request('/UserOrder/CloseOrder', {
    method: 'POST',
    body: params,
  });
}

/**
 * 修复订单
 * @param {*} params
 */
export async function repairOrderData(params) {
  return request('/UserOrder/RepairNoPayOrder', {
    method: 'POST',
    body: params,
  });
}

/**
 * 订单退款
 * @param {*} params
 */
export async function refundData(params) {
  return request('/UserOrder/Refund', {
    method: 'POST',
    body: params,
  });
}

/**
 * 变更实付款
 * @param {*} params
 */
export async function changePayAmountData(params) {
  return request('/UserOrder/ChangePayAmount', {
    method: 'POST',
    body: params,
  });
}

/**
 * 社区订单信息
 * @param {*} params
 */
export async function queryListMerchantUserOrderData(params) {
  return request('/UserOrder/ListMerchantUserOrder', {
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
