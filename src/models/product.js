import {
  queryListData,
  queryListSaleCountData,
  queryListSourceData,
  queryListPlanSaleData,
  queryListLogData,
  queryListStoreChangeData,
  listSaleRecordData,
  listRefundRecordData,
  listReplenishmentRecordData,
  queryListImageData,
  queryGetData,
  addBasicInfoData,
  updateStoreCountData,
  updateBasicInfoData,
  updateImageSortData,
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
  exportStoreKeyData,
} from '@/services/product';
import {
  pretreatmentRemotePageListData,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
} from '@/utils/tools';

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
    *listSaleCount({ payload }, { call, put }) {
      const response = yield call(queryListSaleCountData, payload);
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
    *listPlanSale({ payload }, { call, put }) {
      const response = yield call(queryListPlanSaleData, payload);
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
    *listSaleRecord({ payload }, { call, put }) {
      const response = yield call(listSaleRecordData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *listRefundRecord({ payload }, { call, put }) {
      const response = yield call(listRefundRecordData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *listReplenishmentRecord({ payload }, { call, put }) {
      const response = yield call(listReplenishmentRecordData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *listImage({ payload }, { call, put }) {
      const response = yield call(queryListImageData, payload);
      yield put({
        type: 'handleListData',
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
    *updateImageSort({ payload }, { call, put }) {
      const response = yield call(updateImageSortData, payload);
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
    *exportStoreKey({ payload }, { call, put }) {
      const response = yield call(exportStoreKeyData, payload);
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
    handleListData(state, action) {
      const d = action.payload;
      const v = pretreatmentRemoteListData(d);

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
