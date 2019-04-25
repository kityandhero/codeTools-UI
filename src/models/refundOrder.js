import {
  queryListData,
  queryListOperationRecordData,
  queryGetData,
  changeRefundAmountData,
  refuseData,
  immediatelyRefundData,
  removeData,
} from '@/services/refundOrder';
import { pretreatmentRemotePageListData, pretreatmentRemoteSingleData } from '@/utils/tools';

export default {
  namespace: 'refundOrder',

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
    *changeRefundAmount({ payload }, { call, put }) {
      const response = yield call(changeRefundAmountData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *refuse({ payload }, { call, put }) {
      const response = yield call(refuseData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *immediatelyRefund({ payload }, { call, put }) {
      const response = yield call(immediatelyRefundData, payload);
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
