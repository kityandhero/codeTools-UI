import {
  queryListData,
  queryListOperationRecordData,
  queryGetData,
  PayByWeChatData,
  RefuseData,
} from '@/services/distribution';
import { pretreatmentRemotePageListData, pretreatmentRemoteSingleData } from '@/utils/tools';

export default {
  namespace: 'distribution',

  state: {},

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *listOperationRecord({ payload }, { call, put }) {
      const response = yield call(queryListOperationRecordData, payload);
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
    *payByWeChat({ payload }, { call, put }) {
      const response = yield call(PayByWeChatData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *refuse({ payload }, { call, put }) {
      const response = yield call(RefuseData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
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
