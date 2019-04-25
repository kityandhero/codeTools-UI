import queryCreateCode from '@/services/dapperbyselfbuildcreator';

export default {
  namespace: 'dapperbyselfbuildcreator',

  state: {},

  effects: {
    *createcode({ payload }, { call, put }) {
      const response = yield call(queryCreateCode, payload);
      yield put({
        type: 'handlecreatecode',
        payload: response,
      });
    },
  },

  reducers: {
    handlecreatecode(state, action) {
      let d = action.payload;
      if (d === undefined) {
        d = {};
      }

      return {
        ...state,
        data: d,
      };
    },
  },
};
