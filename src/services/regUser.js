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
          regUserId: '97611',
          userGroupId: 0,
          parentId: '0',
          createAppId: 'wx410279f41d1a81fa',
          nickname: '我有一头小毛驴',
          sex: '2',
          country: '中国',
          city: '鹤壁',
          province: '河南',
          headImgUrl:
            'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoGCeqsTZZZGAeUJtwXXVscNibLtT3Y8zWKGTEcTat7cN69Lia0t1MrVG01eQRZLnKjMX1J1wAibnEJA/132',
          phone: '',
          type: 0,
          inTime: '2018-12-08 01:07:33',
          state: '',
          qqAppid: '',
          integral: 0,
          birthday: '',
          email: '',
          psw: '',
          userName: '',
          wxNo: '',
          headImgPath: '',
          qrcodeImgPath: '',
          shareImgPath: '',
          noId: '',
          bankName: '',
          bankNo: '',
          address: '',
          qrcodeCreateTime: '',
          endTime: '',
          lat: '0',
          lng: '0',
          isReceiveOTMsg: 0,
          lastMerchantId: '0',
          isManage: 0,
          yunUserId: '',
          yunPsw: '',
          parentNickname: '',
          parentHeadImgUrl: '',
          parentRealName: '',
        },
      ],
    });

    return result;
  }

  return request('/RegUser/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryGetData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {
        regUserId: '97611',
        userGroupId: 0,
        parentId: '0',
        createAppId: 'wx410279f41d1a81fa',
        nickname: '我有一头小毛驴',
        sex: '2',
        country: '中国',
        city: '鹤壁',
        province: '河南',
        headImgUrl:
          'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoGCeqsTZZZGAeUJtwXXVscNibLtT3Y8zWKGTEcTat7cN69Lia0t1MrVG01eQRZLnKjMX1J1wAibnEJA/132',
        phone: '',
        type: 0,
        inTime: '2018-12-08 01:07:33',
        state: '',
        qqAppid: '',
        integral: 0,
        birthday: '',
        email: '',
        psw: '',
        userName: '',
        wxNo: '',
        headImgPath: '',
        qrcodeImgPath: '',
        shareImgPath: '',
        noId: '',
        bankName: '',
        bankNo: '',
        address: '',
        qrcodeCreateTime: '',
        endTime: '',
        lat: '0',
        lng: '0',
        isReceiveOTMsg: 0,
        lastMerchantId: '0',
        isManage: 0,
        yunUserId: '',
        yunPsw: '',
        parentNickname: '',
        parentHeadImgUrl: '',
        parentRealName: '',
      },
    });

    return result;
  }

  return request('/RegUser/Get', {
    method: 'POST',
    body: params,
  });
}

export async function updateBasicInfoData(params) {
  return request('/RegUser/updateBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function updateBalanceInfoData(params) {
  return request('/RegUser/updateBalanceInfo', {
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
