import queryOpenFolder from '@/services/folder';

export default {
  namespace: 'folder',

  state: {},

  effects: {
    *openfolder({ payload }, { call, put }) {
      const response = yield call(queryOpenFolder, payload);
      yield put({
        type: 'handleOpenFolder',
        payload: response,
      });
    },
  },

  reducers: {
    handleOpenFolder(state, action) {
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
