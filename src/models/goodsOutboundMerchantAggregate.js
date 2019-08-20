import { queryListData } from '@/services/goodsOutboundMerchantAggregate';
import { pretreatmentRemotePageListData } from '@/utils/tools';

export default {
  namespace: 'goodsOutboundMerchantAggregate',

  state: {},

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
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
  },
};
