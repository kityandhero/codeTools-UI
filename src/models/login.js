import { history } from 'umi';
import { message } from 'antd';
import { stringify } from 'querystring';

import { accountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { pretreatmentRemoteSingleData } from '@/utils/tools';
import { setToken, clearCustomData } from '@/customConfig/storageAssist';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);

      const data = pretreatmentRemoteSingleData(response);

      if (data.dataSuccess) {
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        clearCustomData();

        message.info('退出登录成功！', 0.6);

        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const d = payload;
      const v = pretreatmentRemoteSingleData(d);

      v.data.userName = v.data.name;
      v.data.id = v.data.accountId;
      v.data.type = 1;
      v.data.role = [];

      const { data } = v;
      const { currentAuthority, token: tokenValue, code, role } = data;

      setAuthority(currentAuthority);
      setToken(tokenValue);

      return {
        ...state,
        status: code,
        role,
      };
    },
  },
};
