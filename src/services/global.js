import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

/**
 * 综合数据
 * @param {*} params
 */
export async function queryGetData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      data: {
        productState: [
          { flag: 0, name: '下架' },
          { flag: 1, name: '上架' },
          { flag: 3, name: '回收' },
        ],
        productSaleType: [{ flag: 1, name: '大众商品' }, { flag: 2, name: '站长专供' }],
        productBuyType: [{ flag: 1, name: '现货商品' }, { flag: 2, name: '预售商品' }],
        productUnit: [
          { flag: '箱', name: '箱' },
          { flag: '提', name: '提' },
          { flag: '件', name: '件' },
          { flag: '盒', name: '盒' },
          { flag: '片', name: '片' },
          { flag: '包', name: '包' },
          { flag: '框', name: '框' },
          { flag: '个', name: '个' },
          { flag: '瓶', name: '瓶' },
          { flag: '罐', name: '罐' },
          { flag: '袋', name: '袋' },
        ],
        userOrderState: [
          { flag: 0, name: '未支付' },
          { flag: 1, name: '已支付' },
          { flag: 2, name: '已发货' },
          { flag: 3, name: '待配送' },
          { flag: 4, name: '确认收货' },
          { flag: 5, name: '正在退换货' },
          { flag: 6, name: '删除' },
          { flag: 7, name: '完成' },
          { flag: 8, name: '关闭订单' },
          { flag: 9, name: '全额退款' },
          { flag: 10, name: '部分退款' },
          { flag: 11, name: '售后' },
          { flag: 12, name: '退款' },
        ],
        userOrderPayType: [
          { flag: 0, name: '暂未支付' },
          { flag: 1, name: '微信支付' },
          { flag: 2, name: '支付宝支付' },
          { flag: 3, name: '银联支付' },
          { flag: 4, name: '到店支付' },
          { flag: 5, name: '微信扫码' },
          { flag: 6, name: '余额支付' },
        ],
        userOrderClientType: [
          { flag: 0, name: '未知' },
          { flag: 1, name: '微信' },
          { flag: 2, name: 'App' },
        ],
        userOrderType: [{ flag: 1, name: '普通订单' }, { flag: 2, name: '店铺订单' }],
        areaAccountRecordRevenueExpenses: [{ flag: 2, name: '支出' }, { flag: 1, name: '收入' }],
        areaAccountRecordType: [{ flag: 100, name: '订单结算' }, { flag: 200, name: '提现' }],
        areaDistributionState: [
          { flag: 0, name: '审核中' },
          { flag: 1, name: '已审核' },
          { flag: 2, name: '已驳回' },
        ],
        areaDistributionPayType: [
          { flag: 0, name: '未打款' },
          { flag: 1, name: '银联' },
          { flag: 2, name: '线下转账' },
        ],
        merchantState: [
          { flag: 0, name: '未审核' },
          { flag: 1, name: '已审核' },
          { flag: 2, name: '未通过' },
        ],
        merchantSwitch: [{ flag: 0, name: '关闭' }, { flag: 1, name: '开启' }],
        merchantPurchase: [{ flag: 0, name: '关闭' }, { flag: 1, name: '开启' }],
        merchantDisplay: [{ flag: 0, name: '不显示' }, { flag: 1, name: '显示' }],
        merchantPay: [{ flag: 0, name: '未缴费' }, { flag: 1, name: '已缴费' }],
        refundOrderState: [{ flag: 0, name: '未处理' }, { flag: 1, name: '已处理' }],
        refundOrderHandleType: [
          { flag: 0, name: '待操作' },
          { flag: 1, name: '已退款' },
          { flag: 2, name: '拒绝退款' },
        ],
        userType: [{ flag: 0, name: '普通会员' }, { flag: 1, name: '服务站长' }],
        userManage: [{ flag: 0, name: '关闭' }, { flag: 1, name: '开启' }],
        userIsSendMsg: [{ flag: 0, name: '关闭' }, { flag: 1, name: '开启' }],
        userSex: [
          { flag: '0', name: '未知' },
          { flag: '1', name: '男' },
          { flag: '2', name: '女' },
        ],
        replenishmentReasonType: [
          { flag: 1, name: '公司缺货' },
          { flag: 2, name: '订单漏配' },
          { flag: 3, name: '坏果残果损耗补货' },
        ],
        replenishmentState: [
          { flag: 0, name: '未处理' },
          { flag: 1, name: '已处理' },
          { flag: 3, name: '转退款' },
          { flag: 4, name: '补货出库' },
          { flag: 5, name: '补货配送' },
          { flag: 7, name: '处理完成' },
        ],
        replenishmentType: [{ flag: 1, name: '缺货补发' }, { flag: 3, name: '损坏补发' }],
        replenishmentRollBackMoney: [{ flag: 0, name: '不撤回' }, { flag: 1, name: '撤回' }],
      },
    });

    return result;
  }

  return request('/MetaData/Get', {
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
