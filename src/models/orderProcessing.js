import {
  queryListData,
  queryListMerchantData,
  setSingleLinePrintData,
  setMultiLinePrintData,
  setSingleLineOutboundData,
  // checkSingleLineOutboundResultData,
  checkAllLineOutboundResultData,
  setMultiLineOutboundData,
  setAllLineOutboundData,
  changeLineData,
  setCommunityOutboundData,
  setCommunityPrintData,
  setSinglePrintData,
  setCommunityTransportData,
  setSingleLineTransportData,
  // checkSingleLineTransportResultData,
  checkAllLineTransportResultData,
  setSingleLineCompleteData,
  // checkSingleLineCompleteResultData,
  checkAllLineCompleteResultData,
  setUserOrderImmediatelyFinishData,
  toggleIgnoreOutboundMerchantData,
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
      const response = yield call(setSingleLinePrintData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setMultiLinePrint({ payload }, { call, put }) {
      const response = yield call(setMultiLinePrintData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setSingleLineOutbound({ payload }, { call, put }) {
      const response = yield call(setSingleLineOutboundData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    // *checkSingleLineOutboundResult({ payload }, { call, put }) {
    //   const response = yield call(checkSingleLineOutboundResultData, payload);
    //   yield put({
    //     type: 'handleCommonData',
    //     payload: response,
    //   });
    // },
    *checkAllLineOutboundResult({ payload }, { call, put }) {
      const response = yield call(checkAllLineOutboundResultData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setMultiLineOutbound({ payload }, { call, put }) {
      const response = yield call(setMultiLineOutboundData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setAllLineOutbound({ payload }, { call, put }) {
      const response = yield call(setAllLineOutboundData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *changeLine({ payload }, { call, put }) {
      const response = yield call(changeLineData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setCommunityOutbound({ payload }, { call, put }) {
      const response = yield call(setCommunityOutboundData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setCommunityPrint({ payload }, { call, put }) {
      const response = yield call(setCommunityPrintData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setSinglePrint({ payload }, { call, put }) {
      const response = yield call(setSinglePrintData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setCommunityTransport({ payload }, { call, put }) {
      const response = yield call(setCommunityTransportData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setSingleLineTransport({ payload }, { call, put }) {
      const response = yield call(setSingleLineTransportData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    // *checkSingleLineTransportResult({ payload }, { call, put }) {
    //   const response = yield call(checkSingleLineTransportResultData, payload);
    //   yield put({
    //     type: 'handleCommonData',
    //     payload: response,
    //   });
    // },
    *checkAllLineTransportResult({ payload }, { call, put }) {
      const response = yield call(checkAllLineTransportResultData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setSingleLineComplete({ payload }, { call, put }) {
      const response = yield call(setSingleLineCompleteData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    // *checkSingleLineCompleteResult({ payload }, { call, put }) {
    //   const response = yield call(checkSingleLineCompleteResultData, payload);
    //   yield put({
    //     type: 'handleCommonData',
    //     payload: response,
    //   });
    // },
    *checkAllLineCompleteResult({ payload }, { call, put }) {
      const response = yield call(checkAllLineCompleteResultData, payload);
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
    *toggleIgnoreOutboundMerchant({ payload }, { call, put }) {
      const response = yield call(toggleIgnoreOutboundMerchantData, payload);
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
