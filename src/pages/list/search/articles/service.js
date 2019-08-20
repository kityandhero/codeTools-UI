import request from '@/utils/request';

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
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
