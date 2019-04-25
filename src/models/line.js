import {
  queryListForEditData,
  queryListData,
  queryGetData,
  addBasicInfoData,
  updateBasicInfoData,
  removeData,
  exportKeyData,
} from '@/services/line';
import {
  pretreatmentRemotePageListData,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
} from '@/utils/tools';

export default {
  namespace: 'line',

  state: {
    line: [],
  },

  effects: {
    *listForEdit({ payload }, { call, put }) {
      const response = yield call(queryListForEditData, payload);
      yield put({
        type: 'handleListData',
        payload: response,
      });
    },
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
    *remove({ payload }, { call, put }) {
      const response = yield call(removeData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *exportKey({ payload }, { call, put }) {
      const response = yield call(exportKeyData, payload);
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

      const listChanged = [];

      v.list.forEach(item => {
        const o = item;
        o.flag = item.lineId;
        o.name = item.name;

        listChanged.push(o);
      });

      v.list = listChanged;

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
