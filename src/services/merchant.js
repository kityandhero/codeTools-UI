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
          merchantId: '2614',
          userId: '73143',
          mName: '东建材',
          realName: '张艳云',
          phone: '15939022659',
          cardNo: '',
          province: '河南',
          city: '郑州',
          district: '金水区',
          address: '郑汴路与中州大道往西200米路南东建材',
          lng: '0',
          lat: '0',
          zoom: '0',
          cardUrl: '',
          reverseUrl: '',
          state: 0,
          inTime: '2018-12-07 23:18:14',
          isPay: 0,
          md5: '49f20a09bb1e11c4',
          isDisplay: 1,
          lineId: '0',
          isClose: 0,
          isCloseShop: 1,
          phoneSpare: '',
          handleTime: '',
          shareMercahntName: '',
          timeSpanCount: 0,
          timeSpanAmount: 0,
          afterSaleCount: 0,
          refundCount: 0,
          monthlyCount: 0,
          monthlyAmount: 0.0,
          monthlyRanking: 0,
          weeklyCount: 0,
          weeklyAmount: 0.0,
          weeklyRanking: 0,
        },
      ],
    });
    return result;
  }

  return request('/Merchant/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryGetData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {
        merchantId: '2614',
        userId: '73143',
        mName: '东建材',
        realName: '张艳云',
        phone: '15939022659',
        cardNo: '',
        province: '河南',
        city: '郑州',
        district: '金水区',
        address: '郑汴路与中州大道往西200米路南东建材',
        lng: '0',
        lat: '0',
        zoom: '0',
        cardUrl: '',
        reverseUrl: '',
        state: 0,
        inTime: '2018-12-07 23:18:14',
        isPay: 0,
        md5: '49f20a09bb1e11c4',
        isDisplay: 1,
        lineId: '0',
        isClose: 0,
        isCloseShop: 1,
        phoneSpare: '',
        handleTime: '',
        shareMercahntName: '',
        timeSpanCount: 0,
        timeSpanAmount: 0,
        afterSaleCount: 0,
        refundCount: 0,
        monthlyCount: 0,
        monthlyAmount: 0.0,
        monthlyRanking: 0,
        weeklyCount: 0,
        weeklyAmount: 0.0,
        weeklyRanking: 0,
      },
    });
    return result;
  }

  return request('/Merchant/Get', {
    method: 'POST',
    body: params,
  });
}

export async function updateBasicInfoData(params) {
  return request('/Merchant/updateBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function changeLineData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Merchant/ChangeLine', {
    method: 'POST',
    body: params,
  });
}

export async function passData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Merchant/Pass', {
    method: 'POST',
    body: params,
  });
}

export async function refuseData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Merchant/Refuse', {
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
