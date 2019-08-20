import {
  pretreatmentRemotePageListData,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
} from '@/utils/tools';

import {
  queryListData,
  queryGetData,
  addBasicInfoData,
  updateBasicInfoData,
  setWaitData,
  setOpeningData,
  setOverData,
  removeData,
} from '@/services/planSale';

export default {
  namespace: 'planSale',

  state: {
    line: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
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
    *updateBasicInfo({ payload }, { call, put }) {
      const response = yield call(updateBasicInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setWait({ payload }, { call, put }) {
      const response = yield call(setWaitData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setOpening({ payload }, { call, put }) {
      const response = yield call(setOpeningData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setOver({ payload }, { call, put }) {
      const response = yield call(setOverData, payload);
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
  },

  reducers: {
    handleListData(state, action) {
      const d = action.payload;
      const v = pretreatmentRemoteListData(d);

      return {
        ...state,
        data: v,
      };
    },
    handlePageListData(state, action) {
      const d = action.payload;
      const v = pretreatmentRemotePageListData(d);

      return {
        ...state,
        data: v,
      };
    },
    handleCommonData(state, action) {
      const d = action.payload;
      const v = pretreatmentRemoteSingleData(d);

      return {
        ...state,
        data: v,
      };
    },
  },
};
