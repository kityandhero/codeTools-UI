import {
  pretreatmentRemoteSingleData,
  getMetaDataCache,
  setMetaDataCache,
  getCurrentOperatorCache,
  setCurrentOperatorCache,
} from '../utils/tools';

import { queryNotices } from '../services/user';
import { queryGetData } from '../services/global';
import { getCurrentBasicInfoData } from '../services/operator';

const GlobalModel = {
  namespace: 'global',

  state: {
    globalLoading: false,
    globalLoadSuccess: false,
    currentOperatorLoading: false,
    currentOperatorLoadSuccess: false,
    currentOperator: null,
    collapsed: false,
    amapObject: null,
    notices: [],
    databaseTypeList: [],
  },

  effects: {
    *getMetaData({ payload }, { call, put }) {
      const { force } = payload || { force: false };
      let result = {};
      let fromRemote = force || false;

      if (!force) {
        result = getMetaDataCache();

        if ((result || null) == null) {
          fromRemote = true;
          result = {};
        }
      }

      if (fromRemote) {
        const response = yield call(queryGetData, payload);

        const data = pretreatmentRemoteSingleData(response);

        const { dataSuccess, data: metaData } = data;

        if (dataSuccess) {
          const { databaseTypeList } = metaData;

          result = {
            databaseTypeList,
          };

          setMetaDataCache(result);
        }
      }

      yield put({
        type: 'changeMetaData',
        payload: result,
      });
    },
    *getCurrentOperator({ payload }, { call, put }) {
      const { force } = payload || { force: false };
      let result = {};
      let fromRemote = force || false;

      if (!force) {
        result = getCurrentOperatorCache();

        if ((result || null) == null) {
          fromRemote = true;
          result = {};
        }
      }

      if (fromRemote) {
        const response = yield call(getCurrentBasicInfoData, payload);

        const data = pretreatmentRemoteSingleData(response);

        const { dataSuccess, data: metaData } = data;

        if (dataSuccess) {
          result = metaData;

          setCurrentOperatorCache(result);
        }
      }

      yield put({
        type: 'changeCurrentOperator',
        payload,
      });
    },
    *setAMapObject({ payload }, { put }) {
      yield put({
        type: 'handleAmapObject',
        payload,
      });
    },
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        })
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
    *setAreaDistributionTempData({ payload }, { put }) {
      yield put({
        type: 'changeAreaDistributionTempData',
        payload,
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
    changeMetaData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeCurrentOperatorLoading(state, { payload }) {
      return {
        ...state,
        currentOperatorLoading: payload,
      };
    },
    changeCurrentOperatorLoadSuccess(state, { payload }) {
      return {
        ...state,
        currentOperatorLoadSuccess: payload,
      };
    },
    changeCurrentOperator(state, { payload }) {
      return {
        ...state,
        currentOperator: payload,
      };
    },
    handleAmapObject(state, { payload }) {
      return {
        ...state,
        amapObject: payload,
      };
    },
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload }
    ) {
      return { ...state, collapsed: payload };
    },
    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload }
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    changeAreaDistributionTempData(state, { payload }) {
      return {
        ...state,
        areaDistributionTempData: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
