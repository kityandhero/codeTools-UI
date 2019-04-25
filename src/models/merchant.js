import {
  queryListData,
  queryGetData,
  updateBasicInfoData,
  changeLineData,
  passData,
  refuseData,
} from '@/services/merchant';
import { pretreatmentRemotePageListData, pretreatmentRemoteSingleData } from '@/utils/tools';

export default {
  namespace: 'merchant',

  state: {},

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(queryGetData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateBasicInfo({ payload }, { call, put }) {
      const response = yield call(updateBasicInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *changeLine({ payload }, { call, put }) {
      const response = yield call(changeLineData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *pass({ payload }, { call, put }) {
      const response = yield call(passData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *refuse({ payload }, { call, put }) {
      const response = yield call(refuseData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handlePageListData(state, action) {
      const d = action.payload;
      const v = pretreatmentRemotePageListData(d);

      return {
        ...state,
        data: v,
      };
    },
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
