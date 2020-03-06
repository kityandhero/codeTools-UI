import { handleListDataAssist, handleCommonDataAssist } from '../utils/tools';

import { listData, getData } from '../services/helpCategory';

export default {
  namespace: 'helpCategory',

  state: {},

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(listData, payload);
      yield put({
        type: 'handleListData',
        payload: response,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
  },
};
