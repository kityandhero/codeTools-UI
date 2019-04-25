import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pagesize: 10,
      total: 645,
      pageNo: 1,
      data: [
        {
          rowId: 1,
          areaAccountRecordId: 'D1100173241027854519',
          type: 100,
          isOutIn: 1,
          isHandle: 1,
          balance: 49355.0,
          amountReceivable: 55.0,
          amountReceived: 54.67,
          serviceCost: 0.33,
          pk: 'D1100019670236831652',
          note: '订单入帐',
          inTime: '2019-01-26 11:00:17',
        },
        {
          rowId: 2,
          areaAccountRecordId: 'D1048552870232754575',
          type: 100,
          isOutIn: 1,
          isHandle: 1,
          balance: 49300.33,
          amountReceivable: 75.0,
          amountReceived: 74.55,
          serviceCost: 0.45,
          pk: 'D1048498981218551836',
          note: '订单入帐',
          inTime: '2019-01-26 10:48:55',
        },
      ],
    });

    return result;
  }

  return request('/AreaAccountRecord/List', {
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
