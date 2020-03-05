import { getMenuData } from '../services/helpCategory';

import { handleCommonDataAssist } from '../utils/tools';

export default {
  namespace: 'business/helpCategory',

  state: {},

  effects: {
    *getMenu({ payload }, { call, put }) {
      const response = yield call(getMenuData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
  },
};
