import { queryNotices } from '@/services/api';
import { pretreatmentRemoteListData } from '@/utils/tools';

export default {
  namespace: 'global',

  state: {
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
    refundOrderReturnStoreList: [{ flag: 0, name: '否' }, { flag: 1, name: '是' }],
    refundOrderStateList: [],
    replenishmentReasonTypeList: [],
    replenishmentStateList: [],
    replenishmentTypeList: [],
    isUpStoreList: [{ flag: 0, name: '否' }, { flag: 1, name: '是' }],
    isUpAppList: [{ flag: 0, name: '否' }, { flag: 1, name: '是' }],
    isUpWxList: [{ flag: 0, name: '否' }, { flag: 1, name: '是' }],
    areaAccountRecordRevenueExpensesList: [],
    areaAccountRecordTypeList: [],
    areaAccountRecordIsHandleList: [{ flag: 0, name: '结算中' }, { flag: 1, name: '已结算' }],
    areaDistributionStateList: [],
    areaDistributionPayTypeList: [],
    areaDistributionTempData: null,
    userOrderClientTypeList: [],
    productStoreChangeTypeList: [{ flag: 1, name: '减少' }, { flag: 2, name: '增加' }],
    distributionStateList: [],
    areaManageStateList: [],
    roleStateList: [],
  },

  effects: {
    *setCurrentOperator({ payload }, { put }) {
      yield put({
        type: 'handleCurrentOperator',
        payload,
      });
    },
    *setAMapObject({ payload }, { put }) {
      yield put({
        type: 'handleAmapObject',
        payload,
      });
    },
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
    *setRank({ payload }, { put }) {
      yield put({
        type: 'changeRankList',
        payload,
      });
    },
    *setBrand({ payload }, { put }) {
      yield put({
        type: 'changeBrandList',
        payload,
      });
    },
    *setBuyType({ payload }, { put }) {
      yield put({
        type: 'changeBuyTypeList',
        payload,
      });
    },
    *setSaleType({ payload }, { put }) {
      yield put({
        type: 'changeSaleTypeList',
        payload,
      });
    },
    *setUnit({ payload }, { put }) {
      yield put({
        type: 'changeUnitList',
        payload,
      });
    },
    *setProductState({ payload }, { put }) {
      yield put({
        type: 'changeProductStateList',
        payload,
      });
    },
    *setOrderType({ payload }, { put }) {
      yield put({
        type: 'changeOrderTypeList',
        payload,
      });
    },
    *setOrderStatus({ payload }, { put }) {
      yield put({
        type: 'changeOrderStatusList',
        payload,
      });
    },
    *setPayType({ payload }, { put }) {
      yield put({
        type: 'changePayTypeList',
        payload,
      });
    },
    *setRegUserType({ payload }, { put }) {
      yield put({
        type: 'changeRegUserTypeList',
        payload,
      });
    },
    *setCity({ payload }, { put }) {
      yield put({
        type: 'changeCityList',
        payload,
      });
    },
    *setGender({ payload }, { put }) {
      yield put({
        type: 'changeGenderList',
        payload,
      });
    },
    *setMerchantStatus({ payload }, { put }) {
      yield put({
        type: 'changeMerchantStatusList',
        payload,
      });
    },
    *setLine({ payload }, { put }) {
      yield put({
        type: 'changeLineList',
        payload,
      });
    },
    *setRegUserLevel({ payload }, { put }) {
      yield put({
        type: 'changeRegUserLevelList',
        payload,
      });
    },
    *setAutonomousAuthority({ payload }, { put }) {
      yield put({
        type: 'changeAutonomousAuthorityList',
        payload,
      });
    },
    *setTransactionNotice({ payload }, { put }) {
      yield put({
        type: 'changeTransactionNoticeList',
        payload,
      });
    },
    *setMerchantPurchase({ payload }, { put }) {
      yield put({
        type: 'changeMerchantPurchaseList',
        payload,
      });
    },
    *setMerchantDisplay({ payload }, { put }) {
      yield put({
        type: 'changeMerchantDisplayList',
        payload,
      });
    },
    *setMerchantPay({ payload }, { put }) {
      yield put({
        type: 'changeMerchantPayList',
        payload,
      });
    },
    *setMerchantSwitch({ payload }, { put }) {
      yield put({
        type: 'changeMerchantSwitchList',
        payload,
      });
    },
    *setRefundOrderHandleType({ payload }, { put }) {
      yield put({
        type: 'changeRefundOrderHandleTypeList',
        payload,
      });
    },
    *setRefundOrderState({ payload }, { put }) {
      yield put({
        type: 'changeRefundOrderStateList',
        payload,
      });
    },
    *setReplenishmentReasonType({ payload }, { put }) {
      yield put({
        type: 'changeReplenishmentReasonTypeList',
        payload,
      });
    },
    *setReplenishmentState({ payload }, { put }) {
      yield put({
        type: 'changeReplenishmentStateList',
        payload,
      });
    },
    *setReplenishmentType({ payload }, { put }) {
      yield put({
        type: 'changeReplenishmentTypeList',
        payload,
      });
    },
    *setReplenishmentRollBackMoney({ payload }, { put }) {
      yield put({
        type: 'changeReplenishmentRollBackMoneyList',
        payload,
      });
    },
    *setAreaAccountRecordRevenueExpenses({ payload }, { put }) {
      yield put({
        type: 'changeAreaAccountRecordRevenueExpensesList',
        payload,
      });
    },
    *setAreaAccountRecordType({ payload }, { put }) {
      yield put({
        type: 'changeAreaAccountRecordTypeList',
        payload,
      });
    },
    *setAreaDistributionState({ payload }, { put }) {
      yield put({
        type: 'changeAreaDistributionStateList',
        payload,
      });
    },
    *setAreaDistributionPayType({ payload }, { put }) {
      yield put({
        type: 'changeAreaDistributionPayTypeList',
        payload,
      });
    },
    *setAreaDistributionTempData({ payload }, { put }) {
      yield put({
        type: 'changeAreaDistributionTempData',
        payload,
      });
    },
    *setUserOrderClientType({ payload }, { put }) {
      yield put({
        type: 'changeUserOrderClientTypeList',
        payload,
      });
    },
    *setDistributionState({ payload }, { put }) {
      yield put({
        type: 'changeDistributionStateList',
        payload,
      });
    },
    *setAreaManageState({ payload }, { put }) {
      yield put({
        type: 'changeAreaManageStateList',
        payload,
      });
    },
    *setRoleState({ payload }, { put }) {
      yield put({
        type: 'changeRoleStateList',
        payload,
      });
    },
  },

  reducers: {
    handleCurrentOperator(state, { payload }) {
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
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      const d = payload;
      const v = pretreatmentRemoteListData(d);

      return {
        ...state,
        data: v,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    changeRankList(state, { payload }) {
      return {
        ...state,
        rankList: payload,
      };
    },
    changeBrandList(state, { payload }) {
      return {
        ...state,
        brandList: payload,
      };
    },
    changeBuyTypeList(state, { payload }) {
      return {
        ...state,
        buyTypeList: payload,
      };
    },
    changeSaleTypeList(state, { payload }) {
      return {
        ...state,
        saleTypeList: payload,
      };
    },
    changeUnitList(state, { payload }) {
      return {
        ...state,
        unitList: payload,
      };
    },
    changeProductStateList(state, { payload }) {
      return {
        ...state,
        productStateList: payload,
      };
    },
    changeOrderTypeList(state, { payload }) {
      return {
        ...state,
        orderTypeList: payload,
      };
    },
    changeOrderStatusList(state, { payload }) {
      return {
        ...state,
        orderStatusList: payload,
      };
    },
    changePayTypeList(state, { payload }) {
      return {
        ...state,
        payTypeList: payload,
      };
    },
    changeRegUserTypeList(state, { payload }) {
      return {
        ...state,
        regUserTypeList: payload,
      };
    },
    changeCityList(state, { payload }) {
      return {
        ...state,
        cityList: payload,
      };
    },
    changeGenderList(state, { payload }) {
      return {
        ...state,
        sexList: payload,
      };
    },
    changeMerchantStatusList(state, { payload }) {
      return {
        ...state,
        merchantStatusList: payload,
      };
    },
    changeLineList(state, { payload }) {
      return {
        ...state,
        lineList: payload,
      };
    },
    changeAutonomousAuthorityList(state, { payload }) {
      return {
        ...state,
        autonomousAuthorityList: payload,
      };
    },
    changeTransactionNoticeList(state, { payload }) {
      return {
        ...state,
        transactionNoticeList: payload,
      };
    },
    changeMerchantPurchaseList(state, { payload }) {
      return {
        ...state,
        merchantPurchaseList: payload,
      };
    },
    changeMerchantDisplayList(state, { payload }) {
      return {
        ...state,
        merchantDisplayList: payload,
      };
    },
    changeMerchantPayList(state, { payload }) {
      return {
        ...state,
        merchantPayList: payload,
      };
    },
    changeMerchantSwitchList(state, { payload }) {
      return {
        ...state,
        merchantSwitchList: payload,
      };
    },
    changeRefundOrderHandleTypeList(state, { payload }) {
      return {
        ...state,
        refundOrderHandleTypeList: payload,
      };
    },
    changeRefundOrderStateList(state, { payload }) {
      return {
        ...state,
        refundOrderStateList: payload,
      };
    },
    changeReplenishmentReasonTypeList(state, { payload }) {
      return {
        ...state,
        replenishmentReasonTypeList: payload,
      };
    },
    changeReplenishmentStateList(state, { payload }) {
      return {
        ...state,
        replenishmentStateList: payload,
      };
    },
    changeReplenishmentTypeList(state, { payload }) {
      return {
        ...state,
        replenishmentTypeList: payload,
      };
    },
    changeReplenishmentRollBackMoneyList(state, { payload }) {
      return {
        ...state,
        replenishmentRollBackMoneyList: payload,
      };
    },
    changeAreaAccountRecordRevenueExpensesList(state, { payload }) {
      return {
        ...state,
        areaAccountRecordRevenueExpensesList: payload,
      };
    },
    changeAreaAccountRecordTypeList(state, { payload }) {
      return {
        ...state,
        areaAccountRecordTypeList: payload,
      };
    },
    changeAreaDistributionStateList(state, { payload }) {
      return {
        ...state,
        areaDistributionStateList: payload,
      };
    },
    changeAreaDistributionPayTypeList(state, { payload }) {
      return {
        ...state,
        areaDistributionPayTypeList: payload,
      };
    },
    changeAreaDistributionTempData(state, { payload }) {
      return {
        ...state,
        areaDistributionTempData: payload,
      };
    },
    changeUserOrderClientTypeList(state, { payload }) {
      return {
        ...state,
        userOrderClientTypeList: payload,
      };
    },
    changeDistributionStateList(state, { payload }) {
      return {
        ...state,
        distributionStateList: payload,
      };
    },
    changeAreaManageStateList(state, { payload }) {
      return {
        ...state,
        areaManageStateList: payload,
      };
    },
    changeRoleStateList(state, { payload }) {
      return {
        ...state,
        roleStateList: payload,
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
