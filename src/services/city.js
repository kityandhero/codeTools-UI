import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      params,
      data: [
        { flag: '152', name: '郑州市' },
        { flag: '2', name: '开封市' },
        { flag: '3', name: '洛阳市' },
        { flag: '4', name: '平顶山市' },
        { flag: '5', name: '安阳市' },
        { flag: '6', name: '鹤壁市' },
        { flag: '7', name: '新乡市' },
        { flag: '8', name: '焦作市' },
        { flag: '9', name: '濮阳市' },
        { flag: '10', name: '许昌市' },
        { flag: '11', name: '漯河市' },
        { flag: '12', name: '三门峡市' },
        { flag: '13', name: '南阳市' },
        { flag: '14', name: '商丘市' },
        { flag: '15', name: '信阳市' },
        { flag: '16', name: '周口市' },
        { flag: '17', name: '驻马店市' },
      ],
    });

    return result;
  }

  return request('/City/List', {
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
