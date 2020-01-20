import { getCurrentData, changeOutStockTimeData } from '../services/areaConfig';
import { pretreatmentRemoteSingleData } from '../utils/tools';

export default {
  namespace: 'areaConfig',

  state: {},

  effects: {
    *getCurrent({ payload }, { call, put }) {
      const response = yield call(getCurrentData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *changeOutStockTime({ payload }, { call, put }) {
      const response = yield call(changeOutStockTimeData, payload);
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
