import { queryGetCurrentData } from '@/services/areaAccount';
import { pretreatmentRemoteSingleData } from '@/utils/tools';

export default {
  namespace: 'areaAccount',

  state: {
    areaAccount: [],
  },

  effects: {
    *getCurrent({ payload }, { call, put }) {
      const response = yield call(queryGetCurrentData, payload);
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
