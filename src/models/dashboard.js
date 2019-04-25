import {
  showAnalysisData,
  getSaleCountData,
  getSaleAmountData,
  getAreaAccountBalanceData,
  getReplenishmentStatisticData,
  getSaleAmountRangeData,
  getSaleCountRangeData,
  getSearchData,
  getRankStatisticData,
  getStoreStatisticData,
} from '@/services/dashboard';
import { pretreatmentRemoteSingleData } from '@/utils/tools';

export default {
  namespace: 'dashboard',

  state: {
    dashboard: [],
  },

  effects: {
    *showAnalysis({ payload }, { call, put }) {
      const response = yield call(showAnalysisData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getSaleCount({ payload }, { call, put }) {
      const response = yield call(getSaleCountData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getSaleAmount({ payload }, { call, put }) {
      const response = yield call(getSaleAmountData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getAreaAccountBalance({ payload }, { call, put }) {
      const response = yield call(getAreaAccountBalanceData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getReplenishmentStatistic({ payload }, { call, put }) {
      const response = yield call(getReplenishmentStatisticData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getSaleAmountRange({ payload }, { call, put }) {
      const response = yield call(getSaleAmountRangeData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getSaleCountRange({ payload }, { call, put }) {
      const response = yield call(getSaleCountRangeData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getSearch({ payload }, { call, put }) {
      const response = yield call(getSearchData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getRankStatistic({ payload }, { call, put }) {
      const response = yield call(getRankStatisticData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getStoreStatistic({ payload }, { call, put }) {
      const response = yield call(getStoreStatisticData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
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
