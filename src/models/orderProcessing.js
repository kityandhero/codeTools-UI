import {
  queryListData,
  queryListMerchantData,
  setSingleLinePrint,
  setMultiLinePrint,
  setSingleLineTransit,
  setMultiLineTransit,
  setAllLineTransit,
  changeLine,
  setCommunityTransit,
  setCommunityPrint,
  setSinglePrint,
  setCommunityDispatch,
  setSingleLineDispatch,
  setSingleLineDispatchFinish,
  setUserOrderImmediatelyFinishData,
  exportKeyData,
} from '@/services/orderProcessing';
import { pretreatmentRemoteListData, pretreatmentRemoteSingleData } from '@/utils/tools';

export default {
  namespace: 'orderProcessing',

  state: {},

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
      yield put({
        type: 'handleListData',
        payload: response,
      });
    },
    *listMerchant({ payload }, { call, put }) {
      const response = yield call(queryListMerchantData, payload);
      yield put({
        type: 'handleListMerchantData',
        payload: response,
      });
    },
    *setSingleLinePrint({ payload }, { call, put }) {
      const response = yield call(setSingleLinePrint, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setMultiLinePrint({ payload }, { call, put }) {
      const response = yield call(setMultiLinePrint, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setSingleLineTransit({ payload }, { call, put }) {
      const response = yield call(setSingleLineTransit, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setMultiLineTransit({ payload }, { call, put }) {
      const response = yield call(setMultiLineTransit, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setAllLineTransit({ payload }, { call, put }) {
      const response = yield call(setAllLineTransit, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *changeLine({ payload }, { call, put }) {
      const response = yield call(changeLine, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setCommunityTransit({ payload }, { call, put }) {
      const response = yield call(setCommunityTransit, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setCommunityPrint({ payload }, { call, put }) {
      const response = yield call(setCommunityPrint, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setSinglePrint({ payload }, { call, put }) {
      const response = yield call(setSinglePrint, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setCommunityDispatch({ payload }, { call, put }) {
      const response = yield call(setCommunityDispatch, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setSingleLineDispatch({ payload }, { call, put }) {
      const response = yield call(setSingleLineDispatch, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setSingleLineDispatchFinish({ payload }, { call, put }) {
      const response = yield call(setSingleLineDispatchFinish, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setUserOrderImmediatelyFinish({ payload }, { call, put }) {
      const response = yield call(setUserOrderImmediatelyFinishData, payload);
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
      const v = pretreatmentRemoteListData(d, listItem => {
        const o = listItem;

        if (o.userOrderMerchantCount === 0) {
          o.disabled = true;
          o.canOperate = false;
        } else {
          o.disabled = false;
          o.canOperate = true;
        }

        if (o.lineId === '0' || o.lineId === '') {
          o.needDistribution = true;
          o.disabled = true;
          o.canOperate = false;
        }

        return o;
      });

      return {
        ...state,
        data: v,
      };
    },
    handleListMerchantData(state, action) {
      const d = action.payload;
      const v = pretreatmentRemoteListData(d, listItem => {
        const o = listItem;
        if (o.lineId === '0' || o.lineId === '') {
          o.disabled = true;
          o.canOperate = false;
        } else {
          o.disabled = false;
          o.canOperate = true;
        }

        return o;
      });

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
