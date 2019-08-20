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
          productId: 'D1511076131082600583',
          cityId: 152,
          rankId: 'D1538501530912920955',
          brandId: '0',
          md5: '388903da5b7e3cb7',
          no: 'TS-003',
          title: '测试产品003',
          subTitle: '测试产品003',
          habitat: '',
          description: '测试产品003',
          keywords: '测试产品003',
          mainImageUrl: '',
          costPrice: 1.0,
          stockPrice: 1.5,
          salePrice: 2.0,
          marketPrice: 2.5,
          expressPrice: 0.0,
          visitCount: 14,
          sort: 999,
          saleCount: 0,
          score: 0,
          isRecommend: 0,
          guaranteePeriod: '',
          storeCount: 98,
          isChildType: '',
          disCount: '',
          state: 1,
          isHot: 0,
          production: '',
          feature: '',
          inTime: '2018-12-19 14:33:52',
          belongCity: '',
          saleType: 1,
          storePrice: 2.0,
          unit: '箱',
          spec: '',
          productType: 1,
          endTime: '',
          returnPrice: 0.0,
          updateTime: '2018-12-19 09:41:25',
          isSku: '',
          buyType: 1,
          isGift: 1,
          userMoreNum: 0,
          merchantMoreNum: 0,
        },
      ],
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
      data: {
        userOrderId: '361261',
        userId: '30097',
        userName: '刘丽娟',
        userInfo: {
          userId: '30097',
          userName: '刘丽娟',
          integral: 0,
          accountMoney: '0.00',
        },
        isReturnMoney: '已返佣10.20元，请让站长在站长中心进行查询',
        realyPayPrice: 121.0,
        tradeNo: 'LZMH3012080120362287',
        beginTime: '2018/12/8 1:20:42',
        stateNote: '订单已关闭',
        state: 8,
        payTypeNote: '微信支付',
        content: '测试',
        receipt: '',
        consignee: '刘丽娟',
        address: '河南 - 郑州- 高新区',
        streetAddress: '祥晖苑13号楼2单元',
        phone: '15238395863',
        expressName: '尹建平',
        explain: '由尹建平站长配送',
        courierNo: '0',
        courierPrice: 0.0,
        orderType: 2,
        sendConsignee: '刘丽娟',
        sendPhone: '15238395863',
        sendAddress: '河南 - 郑州- 高新区',
        sendStreetAddress: '祥晖苑13号楼2单元',
        returnNote: '',
        returnMoney: 0.0,
        totalAmount: 121.0,
        totalProductAmount: 78.5,
        totalCount: 3,
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
          {
            productId: '420',
            title: '喜世牛肉馅饼',
            description: '喜世牛肉馅饼-10片/1150g x 1  ￥:24.80',
            spec: '10片/1150g',
            unit: '箱',
            purchasePrice: 24.8,
            count: 1,
            score: 0,
            price: 24.8,
          },
          {
            productId: '512',
            title: '安井金麦流沙包',
            description: '安井金麦流沙包-300g（10支装） x 1  ￥:13.90',
            spec: '300g（10支装）',
            unit: '箱',
            purchasePrice: 13.9,
            count: 1,
            score: 0,
            price: 13.9,
          },
        ],
      },
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
