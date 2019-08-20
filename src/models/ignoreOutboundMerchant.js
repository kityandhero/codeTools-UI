import { queryListData } from '@/services/ignoreOutboundMerchant';
import { pretreatmentRemotePageListData } from '@/utils/tools';

export default {
  namespace: 'ignoreOutboundMerchant',

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
