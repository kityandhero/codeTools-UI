import { queryGetMenuData } from '../services/areaHelpCategory';
import { pretreatmentRemoteSingleData } from '../utils/tools';

export default {
  namespace: 'areaHelpCategory',

  state: {},

  effects: {
    *getMenu({ payload }, { call, put }) {
      const response = yield call(queryGetMenuData, payload);
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
