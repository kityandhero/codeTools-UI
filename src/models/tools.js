import { handleCommonDataAssist } from '@/utils/tools';
import { openFolderData } from '@/services/tools';

export default {
  namespace: 'tools',

  state: {},

  effects: {
    *openFolder({ payload }, { call, put }) {
      const response = yield call(openFolderData, payload);

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
