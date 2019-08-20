import { queryGetMasterData, setMasterBasicInfoData } from '@/services/warehouse';
import { pretreatmentRemoteSingleData } from '@/utils/tools';

export default {
  namespace: 'warehouse',

  state: {},

  effects: {
    *getMaster({ payload }, { call, put }) {
      const response = yield call(queryGetMasterData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setMasterBasicInfo({ payload }, { call, put }) {
      const response = yield call(setMasterBasicInfoData, payload);
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
