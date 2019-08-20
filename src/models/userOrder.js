import {
  queryListData,
  queryListOperationRecordData,
  queryGetData,
  sendOutData,
  grantBrokerageData,
  withdrawBrokerageData,
  finishOrderData,
  printSmallTicketData,
  printOrderData,
  printKuaiDiData,
  closeOrderData,
  repairOrderData,
  refundData,
  changePayAmountData,
  queryListMerchantUserOrderData,
} from '@/services/userOrder';
import {
  pretreatmentRemotePageListData,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
} from '@/utils/tools';

export default {
  namespace: 'userOrder',

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
    *listMerchantUserOrder({ payload }, { call, put }) {
      const response = yield call(queryListMerchantUserOrderData, payload);
      yield put({
        type: 'handleListData',
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
    *sendOut({ payload }, { call, put }) {
      const response = yield call(sendOutData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *grantBrokerage({ payload }, { call, put }) {
      const response = yield call(grantBrokerageData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *withdrawBrokerage({ payload }, { call, put }) {
      const response = yield call(withdrawBrokerageData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *finishOrder({ payload }, { call, put }) {
      const response = yield call(finishOrderData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *printSmallTicket({ payload }, { call, put }) {
      const response = yield call(printSmallTicketData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *printOrder({ payload }, { call, put }) {
      const response = yield call(printOrderData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *printKuaiDi({ payload }, { call, put }) {
      const response = yield call(printKuaiDiData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *closeOrder({ payload }, { call, put }) {
      const response = yield call(closeOrderData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *repairOrder({ payload }, { call, put }) {
      const response = yield call(repairOrderData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *refund({ payload }, { call, put }) {
      const response = yield call(refundData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *changePayAmount({ payload }, { call, put }) {
      const response = yield call(changePayAmountData, payload);
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
    handleListData(state, action) {
      const d = action.payload;
      const v = pretreatmentRemoteListData(d);

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
