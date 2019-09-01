import {
  pretreatmentRemoteSingleData,
  getMetaDataCache,
  setMetaDataCache,
  getCurrentOperatorCache,
  setCurrentOperatorCache,
} from '@/utils/tools';

import { queryNotices } from '@/services/user';
import { queryGetData } from '@/services/global';
import { getCurrentBasicInfoData } from '@/services/operator';

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
    rankList: [],
    brandList: [],
    buyTypeList: [],
    saleTypeList: [],
    unitList: [],
    productStateList: [],
    productSaleTimeModeList: [],
    orderTypeList: [],
    orderStatusList: [],
    payTypeList: [],
    regUserTypeList: [],
    cityList: [],
    sexList: [],
    lineList: [],
    autonomousAuthorityList: [],
    transactionNoticeList: [],
    merchantStatusList: [],
    merchantPurchaseList: [],
    merchantDisplayList: [],
    merchantPayList: [],
    merchantSwitchList: [],
    refundOrderHandleTypeList: [],
    refundOrderReturnStoreList: [{ key: 0, flag: 0, name: '否' }, { key: 1, flag: 1, name: '是' }],
    refundOrderStateList: [],
    replenishmentStateModeList: [
      { key: 1, flag: 1, name: '同意售后' },
      { key: 2, flag: 2, name: '转到退款处理' },
    ],
    orderMessageList: [{ key: 0, flag: 0, name: '不接受' }, { key: 1, flag: 1, name: '接受' }],
    replenishmentReasonTypeList: [],
    replenishmentStateList: [],
    replenishmentTypeList: [],
    isUpStoreList: [{ key: 0, flag: 0, name: '否' }, { key: 1, flag: 1, name: '是' }],
    isUpAppList: [{ key: 0, flag: 0, name: '否' }, { key: 1, flag: 1, name: '是' }],
    isUpWxList: [{ key: 0, flag: 0, name: '否' }, { key: 1, flag: 1, name: '是' }],
    areaAccountRecordRevenueExpensesList: [],
    areaAccountRecordTypeList: [],
    areaAccountRecordIsHandleList: [
      { key: 0, flag: 0, name: '结算中' },
      { key: 1, flag: 1, name: '已结算' },
    ],
    areaDistributionStateList: [],
    areaDistributionPayTypeList: [],
    areaDistributionTempData: null,
    userOrderClientTypeList: [],
    productStoreChangeTypeList: [
      { key: 1, flag: 1, name: '减少' },
      { key: 2, flag: 2, name: '增加' },
    ],
    distributionStateList: [],
    areaManageStateList: [],
    roleStateList: [],
    storeTypeList: [],
    goodsLogisticsProcessRequestMessageStateList: [],
    goodsLogisticsProcessRequestMessageTypeList: [],
    goodsLogisticsProcessRequestMessageModeList: [],
    userOrderOutboundHistoryTypeList: [],
    goodsLogisticsProcessRequestMessageAggregateCompleteList: [],
    goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList: [],
    statisticModeList: [],
    statisticStateList: [],
    peopleAccountLogTypeList: [],
    peopleAccountLogIsOutInList: [],
    peopleAccountLogInTypeList: [],
    advertisementClassList: [],
    planSaleStateList: [],
    merchantSaleStatisticShowModeList: [],
    discountActivitiesGoodsTypeList: [],
    discountActivitiesStateList: [],
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
          const {
            rank: rankList,
            brand: brandList,
            line: lineList,
            productState: productStateList,
            productSaleType: saleTypeList,
            productBuyType: buyTypeList,
            productUnit: unitList,
            productSaleTimeMode: productSaleTimeModeList,
            userOrderState: orderStatusList,
            userOrderPayType: payTypeList,
            userOrderClientType: userOrderClientTypeList,
            userOrderType: orderTypeList,
            areaAccountRecordRevenueExpenses: areaAccountRecordRevenueExpensesList,
            areaAccountRecordType: areaAccountRecordTypeList,
            areaDistributionState: areaDistributionStateList,
            areaDistributionPayType: areaDistributionPayTypeList,
            merchantState: merchantStatusList,
            merchantSwitch: merchantSwitchList,
            merchantPurchase: merchantPurchaseList,
            merchantDisplay: merchantDisplayList,
            merchantPay: merchantPayList,
            refundOrderState: refundOrderStateList,
            refundOrderHandleType: refundOrderHandleTypeList,
            userType: regUserTypeList,
            userManage: autonomousAuthorityList,
            userIsSendMsg: transactionNoticeList,
            userSex: sexList,
            replenishmentReasonType: replenishmentReasonTypeList,
            replenishmentState: replenishmentStateList,
            replenishmentType: replenishmentTypeList,
            replenishmentRollBackMoney: replenishmentRollBackMoneyList,
            distributionState: distributionStateList,
            areaManageState: areaManageStateList,
            roleState: roleStateList,
            storeType: storeTypeList,
            goodsLogisticsProcessRequestMessageState: goodsLogisticsProcessRequestMessageStateList,
            goodsLogisticsProcessRequestMessageType: goodsLogisticsProcessRequestMessageTypeList,
            goodsLogisticsProcessRequestMessageMode: goodsLogisticsProcessRequestMessageModeList,
            userOrderOutboundHistoryType: userOrderOutboundHistoryTypeList,
            goodsLogisticsProcessRequestMessageAggregateComplete: goodsLogisticsProcessRequestMessageAggregateCompleteList,
            goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResult: goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList,
            statisticMode: statisticModeList,
            statisticState: statisticStateList,
            peopleAccountLogType: peopleAccountLogTypeList,
            peopleAccountLogIsOutIn: peopleAccountLogIsOutInList,
            peopleAccountLogInType: peopleAccountLogInTypeList,
            advertisementClass: advertisementClassList,
            planSaleState: planSaleStateList,
            merchantSaleStatisticShowMode: merchantSaleStatisticShowModeList,
            discountActivitiesGoodsType: discountActivitiesGoodsTypeList,
            discountActivitiesState: discountActivitiesStateList,
          } = metaData;

          result = {
            rankList,
            brandList,
            lineList,
            productStateList,
            saleTypeList,
            buyTypeList,
            unitList,
            productSaleTimeModeList,
            orderStatusList,
            payTypeList,
            userOrderClientTypeList,
            orderTypeList,
            areaAccountRecordRevenueExpensesList,
            areaAccountRecordTypeList,
            areaDistributionStateList,
            areaDistributionPayTypeList,
            merchantStatusList,
            merchantSwitchList,
            merchantPurchaseList,
            merchantDisplayList,
            merchantPayList,
            refundOrderStateList,
            refundOrderHandleTypeList,
            regUserTypeList,
            autonomousAuthorityList,
            transactionNoticeList,
            sexList,
            replenishmentReasonTypeList,
            replenishmentStateList,
            replenishmentTypeList,
            replenishmentRollBackMoneyList,
            distributionStateList,
            areaManageStateList,
            roleStateList,
            storeTypeList,
            goodsLogisticsProcessRequestMessageStateList,
            goodsLogisticsProcessRequestMessageTypeList,
            goodsLogisticsProcessRequestMessageModeList,
            userOrderOutboundHistoryTypeList,
            goodsLogisticsProcessRequestMessageAggregateCompleteList,
            goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultList,
            statisticModeList,
            statisticStateList,
            peopleAccountLogTypeList,
            peopleAccountLogIsOutInList,
            peopleAccountLogInTypeList,
            advertisementClassList,
            planSaleStateList,
            merchantSaleStatisticShowModeList,
            discountActivitiesGoodsTypeList,
            discountActivitiesStateList,
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
        state => state.global.notices.filter(item => !item.read).length,
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
        state => state.global.notices.filter(item => !item.read).length,
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
        }),
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
      { payload },
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
      { payload },
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
