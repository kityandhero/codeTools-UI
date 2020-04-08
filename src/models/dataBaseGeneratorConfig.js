import { handleListDataAssist, handleCommonDataAssist } from '@/utils/tools';

import {
  listData,
  getData,
  getByConnectionIdData,
  setData,
  generateData,
  openProjectFolderData,
} from '@/services/databaseGeneratorConfig';

export default {
  namespace: 'databaseGeneratorConfig',

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
    *getByConnectionId({ payload }, { call, put }) {
      const response = yield call(getByConnectionIdData, payload);

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
    *generate({ payload }, { call, put }) {
      const response = yield call(generateData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *openProjectFolder({ payload }, { call, put }) {
      const response = yield call(openProjectFolderData, payload);

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
