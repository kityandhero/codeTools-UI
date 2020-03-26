import { handleCommonDataAssist } from '@/utils/tools';

import { queryGetData } from '@/services/metaData';

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
      return handleCommonDataAssist(state, action);
    },
  },
};
