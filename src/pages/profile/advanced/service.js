import request from '@/utils/request';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
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
