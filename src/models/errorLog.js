import { handlePageListDataAssist, handleCommonDataAssist } from '../utils/tools';

import { listData, getData } from '../services/errorLog';

export default {
  namespace: 'errorLog',

  state: {},

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(listData, payload);
      yield put({
        type: 'handlePageListData',
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
    handlePageListData(state, action) {
      return handlePageListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
  },
};
