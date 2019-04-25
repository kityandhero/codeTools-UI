import {
  queryListData,
  queryListSourceData,
  queryListLogData,
  queryListStoreChangeData,
  queryGetData,
  addBasicInfoData,
  updateStoreCountData,
  updateBasicInfoData,
  updateContentInfoData,
  updateImageContentInfoData,
  setRecommendData,
  setHotData,
  setGiftData,
  setStateData,
  removeData,
  removeImageData,
  addImageData,
  selectFromSourceData,
} from '@/services/product';
import { pretreatmentRemotePageListData, pretreatmentRemoteSingleData } from '@/utils/tools';

export default {
  namespace: 'product',

  state: {},

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryListData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *listSource({ payload }, { call, put }) {
      const response = yield call(queryListSourceData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *listLog({ payload }, { call, put }) {
      const response = yield call(queryListLogData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *listStoreChange({ payload }, { call, put }) {
      const response = yield call(queryListStoreChangeData, payload);
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
    *updateStoreCount({ payload }, { call, put }) {
      const response = yield call(updateStoreCountData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateContentInfo({ payload }, { call, put }) {
      const response = yield call(updateContentInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateImageContentInfo({ payload }, { call, put }) {
      const response = yield call(updateImageContentInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setRecommend({ payload }, { call, put }) {
      const response = yield call(setRecommendData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setHot({ payload }, { call, put }) {
      const response = yield call(setHotData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setGift({ payload }, { call, put }) {
      const response = yield call(setGiftData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setState({ payload }, { call, put }) {
      const response = yield call(setStateData, payload);
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
    *addImage({ payload }, { call, put }) {
      const response = yield call(addImageData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *removeImage({ payload }, { call, put }) {
      const response = yield call(removeImageData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *selectFromSource({ payload }, { call, put }) {
      const response = yield call(selectFromSourceData, payload);
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
