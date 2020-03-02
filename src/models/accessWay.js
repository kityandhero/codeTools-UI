import { pageData, getData } from '../services/accessWay';
import { handlePageListDataAssist, handleCommonDataAssist } from '../utils/tools';

export default {
  namespace: 'accessWay',

  state: {},

  effects: {
    *page({ payload }, { call, put }) {
      const response = yield call(pageData, payload);
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
