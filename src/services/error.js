import { request } from '../utils/request';

export default async function queryError(code) {
  return request(`/api/${code}`);
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
