import { parse } from 'qs';
import { saveJsonToLocalStorage } from '@/utils/tools';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return saveJsonToLocalStorage('antd-pro-authority', proAuthority);
}
