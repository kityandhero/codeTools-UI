import { queryListData } from '@/services/city';
import { pretreatmentRemoteListData } from '@/utils/tools';

export default {
  namespace: 'city',

  state: {
    city: [],
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
