import { changeRoleData } from '@/services/userRole';
import { pretreatmentRemoteSingleData } from '@/utils/tools';

export default {
  namespace: 'userRole',

  state: {},

  effects: {
    *changeRole({ payload }, { call, put }) {
      const response = yield call(changeRoleData, payload);
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
