import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: [
        { flag: '11', name: '新鲜蔬菜' },
        { flag: '10', name: '休闲零食' },
        { flag: '9', name: '干菜调料' },
        { flag: '8', name: '生活用品' },
        { flag: '7', name: '特色食品' },
        { flag: '6', name: '冰冻食品' },
        { flag: '5', name: '米面粮油' },
        { flag: '3', name: '酒水饮料' },
        { flag: '2', name: '地方特产' },
        { flag: '1', name: '新鲜水果' },
      ],
    });

    return result;
  }

  return request('/Rank/List', {
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
