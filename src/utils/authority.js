import accessWayCollection from '@/utils/accessWayCollection';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

function getAllAuthorityCore() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString = localStorage.getItem('antd-pro-authority');
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || [];
}

export function getAllAuthority() {
  return getAllAuthorityCore();
}

export function checkHasAuthority(auth) {
  const list = getAllAuthorityCore();
  const superAuth = accessWayCollection.super;

  const isSuper = (list || []).find(o => o === superAuth);

  if (isSuper === superAuth) {
    return true;
  }

  const v = (list || []).find(o => o === auth);

  return v !== undefined;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
