import { handleListDataAssist, handleCommonDataAssist } from '@/utils/tools';

import {
  pageListData,
  getData,
  setData,
  initializeData,
  generateData,
} from '@/services/dataTableGeneratorConfig';

export default {
  namespace: 'dataTableGeneratorConfig',

  state: {},

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);

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
    *set({ payload }, { call, put }) {
      const response = yield call(setData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *initialize({ payload }, { call, put }) {
      const response = yield call(initializeData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *generate({ payload }, { call, put }) {
      const response = yield call(generateData, payload);

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
