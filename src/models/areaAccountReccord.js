import {
  queryListData,
  queryListRevenueExpensesData,
  queryListTypeData,
} from '@/services/areaAccountRecord';
import { pretreatmentRemotePageListData, pretreatmentRemoteListData } from '@/utils/tools';

export default {
  namespace: 'areaAccountRecord',

  state: {
    areaAccountRecord: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *listRevenueExpenses({ payload }, { call, put }) {
      const response = yield call(queryListRevenueExpensesData, payload);
      yield put({
        type: 'handleListData',
        payload: response,
      });
    },
    *listType({ payload }, { call, put }) {
      const response = yield call(queryListTypeData, payload);
      yield put({
        type: 'handleListData',
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
  },
};
