import {
  pretreatmentRemotePageListData,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
} from '@/utils/tools';

import {
  listData,
  listProductData,
  getData,
  addBasicInfoData,
  updateBasicInfoData,
  updateStoreCountData,
  setOnlineData,
  setOfflineData,
  setOverData,
  removeData,
} from '@/services/discountActivities';

export default {
  namespace: 'discountActivities',

  state: {
    line: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(listData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *listProduct({ payload }, { call, put }) {
      const response = yield call(listProductData, payload);
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
    *updateStoreCount({ payload }, { call, put }) {
      const response = yield call(updateStoreCountData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setOnline({ payload }, { call, put }) {
      const response = yield call(setOnlineData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setOffline({ payload }, { call, put }) {
      const response = yield call(setOfflineData, payload);
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
