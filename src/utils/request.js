import fetch from 'dva/fetch';
import {
  notification,
  //  message
} from 'antd';
import router from 'umi/router';
import hash from 'hash.js';

import {
  // useVirtualAccess,
  getTokenKeyName,
  corsTarget,
  getToken,
} from './tools';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const errorText = codeMessage[response.status] || response.statusText;

  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errorText,
  });

  const error = new Error(errorText);

  error.name = response.status;
  error.response = response;

  throw error;
};

const cachedSave = (response, hashCode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashCode, content);
        sessionStorage.setItem(`${hashCode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} urlParam       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(urlParam, option) {
  const options = {
    ...option,
  };

  const corsUrl = corsTarget();
  // const url = transferToVirtualAccess() ? urlParam : `${corsUrl}${urlParam}`;
  const url = `${corsUrl}${urlParam}`;

  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashCode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const tokenSet = {};

  tokenSet[`${getTokenKeyName()}`] = getToken() || '';

  const defaultOptions = {
    // credentials: 'include',
    headers: {
      ...tokenSet,
    },
  };

  const newOptions = {
    ...defaultOptions,
    ...options,
  };

  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  // const expirys = options.expirys && 60;
  // // options.expirys !== false, return the cache,
  // if (options.expirys !== false) {
  //   const cached = sessionStorage.getItem(hashCode);
  //   const whenCached = sessionStorage.getItem(`${hashCode}:timestamp`);
  //   if (cached !== null && whenCached !== null) {
  //     const age = (Date.now() - whenCached) / 1000;
  //     if (age < expirys) {
  //       const response = new Response(new Blob([cached]));
  //       return response.json();
  //     }
  //     sessionStorage.removeItem(hashCode);
  //     sessionStorage.removeItem(`${hashCode}:timestamp`);
  //   }
  // }

  return (
    fetch(url, newOptions)
      .then(checkStatus)
      .then(response => cachedSave(response, hashCode))
      .then(response => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        if (newOptions.method === 'DELETE' || response.code === 204) {
          return response.text();
        }
        return response.json();
      })
      // .then(response => {
      //   const { code } = response;

      //   if (code !== undefined) {
      //     if (code === 405) {
      //       throw new Error('405');
      //     }

      //     if (code === 451) {
      //       const { message: messageText } = response;
      //       message.error(messageText);
      //     }

      //     if (code === 452) {
      //       const { message: messageText } = response;
      //       message.error(messageText);
      //       throw new Error('452');
      //     }

      //     if (code === 500) {
      //       const { message: messageText } = response;
      //       message.error(messageText);
      //     }

      //     if (code === 201) {
      //       const { message: messageText } = response;
      //       message.error(messageText);
      //     }

      //     if (code === 1001) {
      //       const { message: messageText } = response;

      //       message.error(messageText);
      //     }
      //   }

      //   return response;
      // })
      .catch(e => {
        const status = e.name;
        if (status === 401) {
          // @HACK
          /* eslint-disable no-underscore-dangle */
          window.g_app._store.dispatch({
            type: 'login/logout',
          });
          return;
        }
        // environment should not be used
        if (status === 403) {
          router.push('/exception/403');
          return;
        }
        if (status <= 504 && status >= 500) {
          router.push('/exception/500');
          return;
        }
        if (status >= 404 && status < 422) {
          router.push('/exception/404');
        }
      })
  );
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
