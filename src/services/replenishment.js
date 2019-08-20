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
      data: {
        serialNumber: '154254',
        amount: 6.9,
        remark: '孜然味的',
        expressPrice: 0.0,
        inTime: '2018-08-04T14:32:15',
        state: 1,
        warehouseAddress: '郑州市金水区丰庆路与博卉路交叉口向东300米路南',
        auditor: '丽丽',
        deliveryman: '秦焕娟',
        deliveryDescription: '由秦焕娟站长配送',
        receiveTime: '2018-11-02 16:40:12',
        contact: '一心只为一人/高茹',
        taxes: 0.1,
        refund: 0,
        refundReason: '',
        purseBalance: 12,
        purseScore: 3,
        address: '秦焕娟  |  13937188783  |  河南 - 郑州- 二七区 郑飞小区109号楼302',
        payType: 1,
        list: [
          {
            rowId: 1,
            cityId: 152,
            serialNumber: '154254',
            orderId: 33,
            contact: '一心只为一人/高茹',
            regUserType: 1,
            status: 2,
            amount: 6.9,
            inTime: '2018-08-04T14:32:15',
            orderType: 1,
            sellerName: '张三',
            productName: '伊赛牛肉块',
            spec: '0.8斤x2包',
            unit: 1,
            salePrice: 6.9,
            expressPrice: 0.0,
            count: 1,
            score: 1,
            remark: '孜然味的',
            warehouseAddress: '郑州市金水区丰庆路与博卉路交叉口向东300米路南',
            auditor: '丽丽',
            deliveryman: '秦焕娟',
            deliveryDescription: '由秦焕娟站长配送',
            receiveTime: '2018-11-02 16:40:12',
            state: 1,
            payType: 2,
            totalProductAmount: 6.9,
            taxes: 0.1,
            refund: 0,
            refundReason: '',
            purseBalance: 12,
            purseScore: 3,
            address: '秦焕娟  |  13937188783  |  河南 - 郑州- 二七区 郑飞小区109号楼302',
          },
          {
            rowId: 1,
            cityId: 152,
            serialNumber: '154254',
            orderId: 33,
            contact: '一心只为一人/高茹',
            regUserType: 1,
            status: 2,
            amount: 6.9,
            inTime: '2018-08-04T14:32:15',
            orderType: 1,
            sellerName: '张三',
            productName: '伊赛牛肉块',
            spec: '0.8斤x2包',
            unit: 1,
            salePrice: 6.9,
            expressPrice: 0.0,
            count: 1,
            score: 1,
            remark: '孜然味的',
            warehouseAddress: '郑州市金水区丰庆路与博卉路交叉口向东300米路南',
            auditor: '丽丽',
            deliveryman: '秦焕娟',
            deliveryDescription: '由秦焕娟站长配送',
            receiveTime: '2018-11-02 16:40:12',
            state: 1,
            payType: 2,
            totalProductAmount: 6.9,
            taxes: 0.1,
            refund: 0,
            refundReason: '',
            purseBalance: 12,
            purseScore: 3,
            address: '秦焕娟  |  13937188783  |  河南 - 郑州- 二七区 郑飞小区109号楼302',
          },
          {
            rowId: 1,
            cityId: 152,
            serialNumber: '154254',
            orderId: 33,
            contact: '一心只为一人/高茹',
            regUserType: 1,
            status: 2,
            amount: 6.9,
            inTime: '2018-08-04T14:32:15',
            orderType: 1,
            sellerName: '张三',
            productName: '伊赛牛肉块',
            spec: '0.8斤x2包',
            unit: 1,
            salePrice: 6.9,
            expressPrice: 0.0,
            count: 1,
            score: 1,
            remark: '孜然味的',
            warehouseAddress: '郑州市金水区丰庆路与博卉路交叉口向东300米路南',
            auditor: '丽丽',
            deliveryman: '秦焕娟',
            deliveryDescription: '由秦焕娟站长配送',
            receiveTime: '2018-11-02 16:40:12',
            state: 1,
            payType: 2,
            totalProductAmount: 6.9,
            taxes: 0.1,
            refund: 0,
            refundReason: '',
            purseBalance: 12,
            purseScore: 3,
            address: '秦焕娟  |  13937188783  |  河南 - 郑州- 二七区 郑飞小区109号楼302',
          },
          {
            rowId: 1,
            cityId: 152,
            serialNumber: '154254',
            orderId: 33,
            contact: '一心只为一人/高茹',
            regUserType: 1,
            status: 2,
            amount: 6.9,
            inTime: '2018-08-04T14:32:15',
            orderType: 1,
            sellerName: '张三',
            productName: '伊赛牛肉块',
            spec: '0.8斤x2包',
            unit: 1,
            salePrice: 6.9,
            expressPrice: 0.0,
            count: 1,
            score: 1,
            remark: '孜然味的',
            warehouseAddress: '郑州市金水区丰庆路与博卉路交叉口向东300米路南',
            auditor: '丽丽',
            deliveryman: '秦焕娟',
            deliveryDescription: '由秦焕娟站长配送',
            receiveTime: '2018-11-02 16:40:12',
            state: 1,
            payType: 2,
            totalProductAmount: 6.9,
            taxes: 0.1,
            refund: 0,
            refundReason: '',
            purseBalance: 12,
            purseScore: 3,
            address: '秦焕娟  |  13937188783  |  河南 - 郑州- 二七区 郑飞小区109号楼302',
          },
        ],
      },
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
