import { queryGetData } from '../services/metaData';
import { pretreatmentRemoteSingleData } from '../utils/tools';

export default {
  namespace: 'metaData',

  state: {
    metaData: {},
  },

  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(queryGetData, payload);
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
