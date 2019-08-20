import {
  queryListSelectData,
  queryListData,
  queryGetData,
  addBasicInfoData,
  updateBasicInfoData,
  addModuleData,
  addMultiModuleData,
  addAllModuleData,
  updateModuleData,
  removeModuleData,
  clearModuleData,
  changeStateData,
  removeData,
} from '@/services/role';
import {
  pretreatmentRemoteListData,
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
} from '@/utils/tools';

export default {
  namespace: 'role',

  state: {},

  effects: {
    *listSelect({ payload }, { call, put }) {
      const response = yield call(queryListSelectData, payload);
      yield put({
        type: 'handleListData',
        payload: response,
      });
    },
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
    *addBasicInfo({ payload }, { call, put }) {
      const response = yield call(addBasicInfoData, payload);
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
    *addModule({ payload }, { call, put }) {
      const response = yield call(addModuleData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *addMultiModule({ payload }, { call, put }) {
      const response = yield call(addMultiModuleData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *addAllModule({ payload }, { call, put }) {
      const response = yield call(addAllModuleData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateModule({ payload }, { call, put }) {
      const response = yield call(updateModuleData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *removeModule({ payload }, { call, put }) {
      const response = yield call(removeModuleData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *clearModule({ payload }, { call, put }) {
      const response = yield call(clearModuleData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *changeState({ payload }, { call, put }) {
      const response = yield call(changeStateData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(removeData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handleListData(state, action) {
      const d = action.payload;
      const v = pretreatmentRemoteListData(d);

      return {
        ...state,
        data: v,
      };
    },
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
