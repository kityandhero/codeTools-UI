import { handleCommonDataAssist } from '@/utils/tools';

import { getCurrentData, changeOutStockTimeData } from '../services/areaConfig';

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
      return handleCommonDataAssist(state, action);
    },
  },
};
