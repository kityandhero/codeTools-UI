import request from '@/utils/request';

export async function queryBasicProfile() {
  return request('/api/profile/basic');
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
