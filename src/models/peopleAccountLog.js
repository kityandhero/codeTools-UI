import {
  pretreatmentRemotePageListData,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
} from '@/utils/tools';

import { listByMerchantData } from '@/services/peopleAccountLog';

export default {
  namespace: 'peopleAccountLog',

  state: {},

  effects: {
    *listByMerchant({ payload }, { call, put }) {
      const response = yield call(listByMerchantData, payload);
      yield put({
        type: 'handlePageListData',
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
