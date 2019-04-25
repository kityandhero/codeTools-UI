import { queryListData } from '@/services/brand';
import { pretreatmentRemoteListData } from '@/utils/tools';

export default {
  namespace: 'brand',

  state: {
    brand: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
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
  },
};
