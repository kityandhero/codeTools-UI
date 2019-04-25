// import { message } from 'antd';
import {
  queryDatabaseCache,
  removeDatabaseCache,
  queryDatabaseList,
  queryDataEntityList,
} from '@/services/sqlserver';

export default {
  namespace: 'sqlserver',

  state: {
    statisticExist: [],
  },

  effects: {
    *open({ payload }, { call, put }) {
      const response = yield call(queryDatabaseList, payload);
      yield put({
        type: 'handleOpen',
        payload: response,
      });
    },
    *listcache({ payload }, { call, put }) {
      const response = yield call(queryDatabaseCache, payload);
      yield put({
        type: 'handleListCache',
        payload: response,
      });
    },
    *removecache({ payload }, { call, put }) {
      const response = yield call(removeDatabaseCache, payload);
      yield put({
        type: 'handleRemoveCache',
        payload: response,
      });
    },
    *getlist({ payload }, { call, put }) {
      const response = yield call(queryDataEntityList, payload);
      yield put({
        type: 'handleList',
        payload: response,
      });
    },
  },

  reducers: {
    handleOpen(state, action) {
      let d = action.payload;
      if (d === undefined) {
        d = {};
      }

      return {
        ...state,
        data: d,
      };
    },
    handleListCache(state, action) {
      let d = action.payload;
      if (d === undefined) {
        d = [];
      }

      return {
        ...state,
        data: d,
      };
    },
    handleRemoveCache(state, action) {
      let d = action.payload;
      if (d === undefined) {
        d = {};
      }

      return {
        ...state,
        data: d,
      };
    },
    handleList(state, action) {
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
