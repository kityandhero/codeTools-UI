import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: [
        {
          name: '张三',
          bankNo: 1001,
          bankName: '工商银行',
          bankCardNo: '600620620015874589',
        },
        {
          name: '李四',
          bankNo: 1002,
          bankName: '兴业银行',
          bankCardNo: '608560620015874589',
        },
      ],
    });

    return result;
  }

  return request('/AreaBank/List', {
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
