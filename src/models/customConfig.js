import { handleListDataAssist, handleCommonDataAssist } from '../utils/tools';

import { listData, setData } from '../services/customConfig';

export default {
  namespace: 'customConfig',

  state: {},

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(listData, payload);
      yield put({
        type: 'handleListData',
        payload: response,
      });
    },
    *set({ payload }, { call, put }) {
      const response = yield call(setData, payload);
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
