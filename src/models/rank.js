import { queryListData } from '@/services/rank';
import { pretreatmentRemoteListData } from '@/utils/tools';

export default {
  namespace: 'rank',

  state: {
    rank: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
      yield put({
        type: 'handleListData',
        payload: response,
      });
    },
  },

  reducers: {
    handleListData(state, action) {
      const d = action.payload;
      const v = pretreatmentRemoteListData(d);

      const listChanged = [];

      v.list.forEach(item => {
        const o = item;
        o.flag = item.rankId;
        o.name = item.name;

        listChanged.push(o);
      });

      v.list = listChanged;

      return {
        ...state,
        data: v,
      };
    },
  },
};
