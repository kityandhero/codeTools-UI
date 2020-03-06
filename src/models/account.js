import { handlePageListDataAssist, handleCommonDataAssist } from '../utils/tools';

import {
  queryListData,
  queryGetData,
  addBasicInfoData,
  updateBasicInfoData,
  resetPasswordData,
  changeStateData,
  removeData,
} from '../services/account';

export default {
  namespace: 'account',

  state: {},

  effects: {
    *page({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(queryGetData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *addBasicInfo({ payload }, { call, put }) {
      const response = yield call(addBasicInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *changeState({ payload }, { call, put }) {
      const response = yield call(changeStateData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(removeData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateBasicInfo({ payload }, { call, put }) {
      const response = yield call(updateBasicInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *resetPassword({ payload }, { call, put }) {
      const response = yield call(resetPasswordData, payload);
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
