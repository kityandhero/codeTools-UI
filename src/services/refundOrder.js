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
          refundOrderId: '6313',
          merchantId: '358',
          regUserId: '5473',
          orderDetailId: '458272',
          userOrderId: '361214',
          refundTradeNo: 'TK1000201812087312',
          refundTrade_No: '',
          tradeNo: 'LZMH3007235419362240',
          trade_No: '4200000236201812070371491572',
          orderMoney: 39.8,
          isRollBackMoney: 2,
          num: 1,
          orderType: 2,
          ey: 38.0,
          refundDesc: '-公司缺货-',
          state: 0,
          type: 1,
          note: '下错单',
          inTime: '2018-12-08 00:05:05',
          handleState: 0,
          handleNote: '',
          handleTime: '',
          handleType: 0,
          realName: '阎姗姗',
          mName: '齐礼阎小区',
        },
      ],
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
      data: {
        refundOrderId: '6313',
        userOrderId: '361214',
        userId: '6411',
        userName: '美食孙秀敏',
        userInfo: {
          userId: '6411',
          userName: '美食孙秀敏',
          integral: '0',
          accountMoney: '0.00',
        },
        isReturnMoney: '',
        realyPayPrice: 39.8,
        tradeNo: 'LZMH3007235419362240',
        beginTime: '2018-12-07 23:54:19',
        stateNote: '',
        state: 12,
        payTypeNote: '微信支付',
        content: '',
        receipt: '',
        consignee: 'sun?xiu',
        address: '河南 , 郑州 , 二七区',
        streetAddress: '齐礼闫安置区2号院1号楼2单元1302',
        phone: '13653819613',
        expressName: '阎姗姗',
        explain: '由阎姗姗站长配送',
        courierNo: '0',
        courierPrice: 0.0,
        orderType: 2,
        sendConsignee: 'sun?xiu',
        sendPhone: '13653819613',
        sendAddress: '河南 - 郑州- 二七区',
        sendStreetAddress: '齐礼闫安置区2号院1号楼2单元1302',
        returnNote: '',
        returnMoney: 0.0,
        totalAmount: 39.8,
        totalProductAmount: 39.8,
        totalCount: 1,
        totalScore: 0,
        invoiceTaxes: 0.0,
        itemList: [
          {
            productId: '57',
            title: '爱媛果冻橙',
            description: '爱媛果冻橙-5斤 x 1  ￥:39.80',
            spec: '5斤',
            unit: '箱',
            purchasePrice: 39.8,
            count: 1,
            score: 0,
            price: 39.8,
          },
        ],
        refundNote: '下错单',
        refundMoney: 38.0,
        refundNum: 1,
        refundState: 0,
        orderDetailId: '458272',
        payTime: '2018-12-07 23:54:28',
        refundTradeNo: 'LZMH3007235419362240',
      },
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
