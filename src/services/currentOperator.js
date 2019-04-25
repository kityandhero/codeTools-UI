import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function getCurrentData() {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      name: 'Li Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      email: 'Test@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '量子美食－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    });

    return result;
  }

  return request('/CurrentOperator/GetCurrent');
}

export async function getCurrentBasicInfoData() {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {
        name: '张三',
        cityId: 410100000000,
        phone: '0752-268888888',
        loginName: 'admin',
        inTime: '2018-10-30 00:00:00',
        cityName: '郑州市',
      },
    });

    return result;
  }

  return request('/CurrentOperator/GetCurrentBasicInfo');
}

export async function updateCurrentBasicInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/CurrentOperator/UpdateCurrentBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function changeCurrentPasswordData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/CurrentOperator/ChangeCurrentPassword', {
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
