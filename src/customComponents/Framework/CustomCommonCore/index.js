import { routerRedux } from 'dva/router';
import { message } from 'antd';

import {
  getDerivedStateFromPropsForUrlParams,
  isEqual,
  isBoolean,
  isFunction,
  defaultCommonState,
  pretreatmentRequestParams,
  cloneWithoutMethod,
} from '@/utils/tools';
import CustomCore from '@/customComponents/Framework/CustomCore';

class Index extends CustomCore {
  lastRequestingData = { type: '', payload: {} };

  constructor(props) {
    super(props);

    const defaultState = defaultCommonState();

    this.state = {
      ...defaultState,
      ...{ backPath: '' },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  doDidMountTask = () => {
    this.adjustWhenDidMount();

    this.preInit();
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => false;

  // eslint-disable-next-line no-unused-vars
  getApiData = props => ({});

  extendState = () => ({});

  initOther = () => {};

  preInit = () => {
    const extendState = this.extendState() || {};

    this.init(extendState);
  };

  init = (extendState = {}) => {
    const initState = this.initState();

    const s = { ...(extendState || {}), ...(initState || {}) };

    const sCompare = { ...s, ...this.state };

    const sCopyClone = cloneWithoutMethod(s);
    const sCompareClone = cloneWithoutMethod(sCompare);

    const isEqualState = isEqual(sCopyClone, sCompareClone);

    if (isEqualState) {
      this.initLoad();
      this.initOther();
    } else {
      this.setState(s, () => {
        this.initLoad();
        this.initOther();
      });
    }
  };

  initState = () => ({});

  // eslint-disable-next-line no-unused-vars
  beforeFirstLoadRequest = submitData => {};

  // eslint-disable-next-line no-unused-vars
  beforeReLoadRequest = submitData => {};

  // eslint-disable-next-line no-unused-vars
  beforeRequest = submitData => {};

  // eslint-disable-next-line no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line no-unused-vars
  afterGetRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line no-unused-vars
  afterGetReLoadRequestResult = (submitData, responseData) => {};

  getRequestingData() {
    return this.lastRequestingData;
  }

  setRequestingData(params, callback) {
    const d =
      params == null ? { type: '', payload: {} } : { ...{ type: '', payload: {} }, ...params };

    this.lastRequestingData = d;

    if (isFunction(callback)) {
      callback();
    }
  }

  clearRequestingData() {
    this.setRequestingData({ type: '', payload: {} });
  }

  initLoadRequestParams = (o = {}) => o;

  supplementLoadRequestParams = o => o;

  // eslint-disable-next-line no-unused-vars
  checkLoadRequestParams = o => {
    return true;
  };

  initLoad = (callback = null) => {
    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
      dataLoading,
      loadSuccess,
      loadDataAfterMount,
    } = this.state;

    if (loadDataAfterMount) {
      if ((loadApiPath || '') === '') {
        message.error('loadApiPath需要配置');
        return;
      }

      let submitData = this.initLoadRequestParams() || {};

      submitData = pretreatmentRequestParams(submitData);

      submitData = this.supplementLoadRequestParams(submitData);

      const checkResult = this.checkLoadRequestParams(submitData);

      if (checkResult) {
        if (!firstLoadSuccess) {
          this.beforeFirstLoadRequest(submitData);
        }

        if (reloadingBefore) {
          this.beforeReLoadRequest(submitData);
        }

        this.beforeRequest(submitData);

        if (dataLoading && !loadSuccess) {
          this.initLoadCore(submitData, callback);
        } else {
          this.setState(
            {
              dataLoading: true,
              loadSuccess: false,
            },
            () => {
              this.initLoadCore(submitData, callback);
            },
          );
        }
      }
    } else {
      // 加载时执行完第一次方法之后设置为true
      this.setState({ loadDataAfterMount: true });
    }
  };

  initLoadCore = (requestData, callback) => {
    const { dispatch } = this.props;

    const requestingDataPre = this.getRequestingData();

    const { loadApiPath, firstLoadSuccess } = this.state;

    // 处理频繁的相同请求
    if (
      !isEqual(requestingDataPre, {
        type: loadApiPath,
        payload: requestData,
      })
    ) {
      this.setRequestingData({ type: loadApiPath, payload: requestData });

      dispatch({
        type: loadApiPath,
        payload: requestData,
      }).then(() => {
        const originalData = this.getApiData(this.props);

        this.lastLoadParams = requestData;

        const { dataSuccess } = originalData;

        if (dataSuccess) {
          const { list: metaListData, data: metaData, extra: metaExtra } = originalData;

          this.setState({
            metaData: metaData || null,
            metaExtra: metaExtra || null,
            metaListData: metaListData || [],
            originalData,
          });

          this.afterLoadSuccess(
            metaData || null,
            metaListData || [],
            metaExtra || null,
            originalData,
          );
        }

        const { reloading: reloadingComplete } = this.state;

        if (reloadingComplete) {
          this.afterReloadSuccess();
          this.afterGetReLoadRequestResult(requestData, originalData);
        }

        this.setState({
          dataLoading: false,
          loadSuccess: dataSuccess,
          reloading: false,
          searching: false,
          refreshing: false,
          paging: false,
        });

        if (!firstLoadSuccess) {
          this.setState(
            {
              firstLoadSuccess: true,
            },
            () => {
              this.afterFirstLoadSuccess();

              this.afterGetFirstRequestResult(requestData, originalData);
            },
          );
        }

        this.afterGetRequestResult(requestData, originalData);

        if (typeof callback === 'function') {
          callback();
        }

        this.clearRequestingData();
      });
    }
  };

  getGlobalLoading = () => {
    const { global } = this.props;

    return global.globalLoading || false;
  };

  setGlobalLoading = (params, callback) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/setGlobalLoading',
      payload: isBoolean(params) ? params : false,
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  getGlobalLoadSuccess = () => {
    const { global } = this.props;

    return global.globalLoadSuccess || false;
  };

  setGlobalLoadSuccess = (params, callback) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/setGlobalLoadSuccess',
      payload: isBoolean(params) ? params : false,
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  getGlobalParams = () => {
    const { global } = this.props;

    return global.globalParams || {};
  };

  setGlobalParams = (params, callback) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/setGlobalParams',
      payload: params || {},
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  clearGlobalParams(callback) {
    this.setGlobalParams({}, callback);
  }

  // 加载公共数据
  loadGlobalData(params, reload = false) {
    if (!(isBoolean(reload) ? reload : false)) {
      const globalLoadSuccess = this.getGlobalLoadSuccess();

      if (globalLoadSuccess) {
        return;
      }
    }

    const globalLoading = this.getGlobalLoading();

    if (globalLoading) {
      return;
    }

    this.setGlobalLoading(true, () => {
      const { dispatch } = this.props;

      dispatch({
        type: 'global/get',
        payload: params || {},
      }).then(() => {
        const {
          global: { data },
        } = this.props;

        const { dataSuccess, data: metaData } = data;

        if (dataSuccess) {
          const {
            rank,
            brand,
            line,
            productState,
            productSaleType,
            productBuyType,
            productUnit,
            productSaleTimeMode,
            userOrderState,
            userOrderPayType,
            userOrderClientType,
            userOrderType,
            areaAccountRecordRevenueExpenses,
            areaAccountRecordType,
            areaDistributionState,
            areaDistributionPayType,
            merchantState,
            merchantSwitch,
            merchantPurchase,
            merchantDisplay,
            merchantPay,
            refundOrderState,
            refundOrderHandleType,
            userType,
            userManage,
            userIsSendMsg,
            userSex,
            replenishmentReasonType,
            replenishmentState,
            replenishmentType,
            replenishmentRollBackMoney,
            distributionState,
            areaManageState,
            roleState,
            storeType,
            goodsLogisticsProcessRequestMessageState,
            goodsLogisticsProcessRequestMessageType,
            goodsLogisticsProcessRequestMessageMode,
            userOrderOutboundHistoryType,
            goodsLogisticsProcessRequestMessageAggregateComplete,
            goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResult,
            statisticMode,
            statisticState,
            peopleAccountLogType,
            peopleAccountLogIsOutIn,
            peopleAccountLogInType,
            advertisementClass,
            planSaleState,
          } = metaData;

          const metaDataLoadQuery = [
            {
              data: line || [],
              setDataCache: 'global/setLine',
              dataName: '配送区域',
              dataType: 'list',
            },
            {
              data: rank || [],
              setDataCache: 'global/setRank',
              dataName: '产品类型',
              dataType: 'list',
            },
            {
              data: brand || [],
              setDataCache: 'global/setBrand',
              dataName: '商品品牌',
              dataType: 'list',
            },
            {
              data: productBuyType,
              setDataCache: 'global/setBuyType',
              dataName: '售卖对象',
              dataType: 'list',
            },
            {
              data: productSaleType,
              setDataCache: 'global/setSaleType',
              dataName: '销售类型',
              dataType: 'list',
            },
            {
              data: productUnit,
              setDataCache: 'global/setUnit',
              dataName: '产品单位',
              dataType: 'list',
            },
            {
              data: productState,
              setDataCache: 'global/setProductState',
              dataName: '产品状态',
              dataType: 'list',
            },
            {
              data: productSaleTimeMode,
              setDataCache: 'global/setProductSaleTimeMode',
              dataName: '产品状态',
              dataType: 'list',
            },
            {
              data: userOrderType,
              setDataCache: 'global/setOrderType',
              dataName: '订单类型',
              dataType: 'list',
            },
            {
              data: userOrderState,
              setDataCache: 'global/setOrderStatus',
              dataName: '订单状态',
              dataType: 'list',
            },
            {
              data: userOrderPayType,
              setDataCache: 'global/setPayType',
              dataName: '支付类型',
              dataType: 'list',
            },
            {
              data: userType,
              setDataCache: 'global/setRegUserType',
              dataName: '消费者类型',
              dataType: 'list',
            },
            {
              data: userSex,
              setDataCache: 'global/setGender',
              dataName: '性别数据',
              dataType: 'list',
            },
            {
              data: merchantState,
              setDataCache: 'global/setMerchantStatus',
              dataName: '服务站状态',
              dataType: 'list',
            },
            {
              data: userManage,
              setDataCache: 'global/setAutonomousAuthority',
              dataName: '前台管理',
              dataType: 'list',
            },
            {
              data: userIsSendMsg,
              setDataCache: 'global/setTransactionNotice',
              dataName: '交易提醒',
              dataType: 'list',
            },
            {
              data: merchantPurchase,
              setDataCache: 'global/setMerchantPurchase',
              dataName: '采购权限',
              dataType: 'list',
            },
            {
              data: merchantDisplay,
              setDataCache: 'global/setMerchantDisplay',
              dataName: '店铺前台显示',
              dataType: 'list',
            },
            {
              data: merchantPay,
              setDataCache: 'global/setMerchantPay',
              dataName: '店铺缴费',
              dataType: 'list',
            },
            {
              data: merchantSwitch,
              setDataCache: 'global/setMerchantSwitch',
              dataName: '店铺开关',
              dataType: 'list',
            },
            {
              data: refundOrderHandleType,
              setDataCache: 'global/setRefundOrderHandleType',
              dataName: '退款单处理类型',
              dataType: 'list',
            },
            {
              data: refundOrderState,
              setDataCache: 'global/setRefundOrderState',
              dataName: '退款单状态',
              dataType: 'list',
            },
            {
              data: replenishmentReasonType,
              setDataCache: 'global/setReplenishmentReasonType',
              dataName: '售后单原因集合',
              dataType: 'list',
            },
            {
              data: replenishmentState,
              setDataCache: 'global/setReplenishmentState',
              dataName: '售后单状态集合',
              dataType: 'list',
            },
            {
              data: replenishmentType,
              setDataCache: 'global/setReplenishmentType',
              dataName: '售后单类型集合',
              dataType: 'list',
            },
            {
              data: replenishmentRollBackMoney,
              setDataCache: 'global/setReplenishmentRollBackMoney',
              dataName: '售后单撤回佣金选项集合',
              dataType: 'list',
            },
            {
              data: areaAccountRecordRevenueExpenses,
              setDataCache: 'global/setAreaAccountRecordRevenueExpenses',
              dataName: '',
              dataType: 'list',
            },
            {
              data: areaAccountRecordType,
              setDataCache: 'global/setAreaAccountRecordType',
              dataName: '',
              dataType: 'list',
            },
            {
              data: areaDistributionState,
              setDataCache: 'global/setAreaDistributionState',
              dataName: '',
              dataType: 'list',
            },
            {
              data: areaDistributionPayType,
              setDataCache: 'global/setAreaDistributionPayType',
              dataName: '',
              dataType: 'list',
            },
            {
              data: userOrderClientType,
              setDataCache: 'global/setUserOrderClientType',
              dataName: '',
              dataType: 'list',
            },
            {
              data: distributionState,
              setDataCache: 'global/setDistributionState',
              dataName: '',
              dataType: 'list',
            },
            {
              data: areaManageState,
              setDataCache: 'global/setAreaManageState',
              dataName: '地区账户人员状态',
              dataType: 'list',
            },
            {
              data: roleState,
              setDataCache: 'global/setRoleState',
              dataName: '角色状态',
              dataType: 'list',
            },
            {
              data: storeType,
              setDataCache: 'global/setStoreType',
              dataName: '库存变更类型',
              dataType: 'list',
            },
            {
              data: goodsLogisticsProcessRequestMessageState,
              setDataCache: 'global/setGoodsLogisticsProcessRequestMessageState',
              dataName: '物流请求处理状态',
              dataType: 'list',
            },
            {
              data: goodsLogisticsProcessRequestMessageType,
              setDataCache: 'global/setGoodsLogisticsProcessRequestMessageType',
              dataName: '物流请求处理类型',
              dataType: 'list',
            },
            {
              data: goodsLogisticsProcessRequestMessageMode,
              setDataCache: 'global/setGoodsLogisticsProcessRequestMessageMode',
              dataName: '物流请求处理模式',
              dataType: 'list',
            },
            {
              data: userOrderOutboundHistoryType,
              setDataCache: 'global/setUserOrderOutboundHistoryType',
              dataName: '出库订单记录类型',
              dataType: 'list',
            },
            {
              data: goodsLogisticsProcessRequestMessageAggregateComplete,
              setDataCache: 'global/setGoodsLogisticsProcessRequestMessageAggregateComplete',
              dataName: '出库订单请求数据汇总状态',
              dataType: 'list',
            },
            {
              data: goodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResult,
              setDataCache:
                'global/setGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResult',
              dataName: '出库配送操作缺失状态',
              dataType: 'list',
            },
            {
              data: statisticMode,
              setDataCache: 'global/setStatisticMode',
              dataName: '统计模式',
              dataType: 'list',
            },
            {
              data: statisticState,
              setDataCache: 'global/setStatisticState',
              dataName: '统计状态',
              dataType: 'list',
            },
            {
              data: peopleAccountLogType,
              setDataCache: 'global/setPeopleAccountLogType',
              dataName: '变更类型',
              dataType: 'list',
            },
            {
              data: peopleAccountLogIsOutIn,
              setDataCache: 'global/setPeopleAccountLogIsOutIn',
              dataName: '收支类行',
              dataType: 'list',
            },
            {
              data: peopleAccountLogInType,
              setDataCache: 'global/setPeopleAccountLogInType',
              dataName: '收入方式',
              dataType: 'list',
            },
            {
              data: advertisementClass,
              setDataCache: 'global/setAdvertisementClass',
              dataName: '广告类别',
              dataType: 'list',
            },
            {
              data: planSaleState,
              setDataCache: 'global/setPlanSaleState',
              dataName: '预售状态',
              dataType: 'list',
            },
          ];

          metaDataLoadQuery.forEach(item => {
            this.loadGlobalDataCore(item.data, item.setDataCache, item.dataName, item.dataType);
          });

          this.setGlobalLoadSuccess(true);
        }

        this.setGlobalLoading(false);
      });
    });
  }

  loadGlobalDataCore = (data, setDataCache, dataName, dataType) => {
    const { dispatch } = this.props;

    if (data == null) {
      if (dataType === 'list') {
        dispatch({
          type: setDataCache,
          payload: [],
        });
      }

      if (dataType === 'object') {
        dispatch({
          type: setDataCache,
          payload: {},
        });
      }
    } else {
      if (dataType === 'list') {
        dispatch({
          type: setDataCache,
          payload: data || [],
          // }).then(() => {
          //   setTimeout(() => {
          //     notification.info({
          //       placement: 'bottomRight',
          //       message: '数据加载',
          //       description: `获取${dataName}据成功.`,
          //     });
          //   }, 500);
        });
      }

      if (dataType === 'object') {
        dispatch({
          type: setDataCache,
          payload: data,
          // }).then(() => {
          //   setTimeout(() => {
          //     notification.info({
          //       placement: 'bottomRight',
          //       message: '数据加载',
          //       description: `获取${dataName}据成功.`,
          //     });
          //   }, 500);
        });
      }
    }
  };

  pageData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ paging: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  reloadData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ reloading: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  searchData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ searching: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  refreshData = (callback = null) => {
    this.setState({ refreshing: true }, () => {
      this.initLoad(callback);
    });
  };

  reloadGlobalData = () => {
    const p = this.getGlobalParams();

    this.globalInit(p, true);
  };

  afterFirstLoadSuccess = () => {};

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {};

  afterReloadSuccess = () => {};

  backToList = () => {
    const { backPath } = this.state;

    this.goToPath(backPath);
  };

  checkWorkDoing() {
    const { dataLoading, reloading, searching, refreshing, paging, processing } = this.state;

    if (dataLoading || reloading || searching || refreshing || paging || processing) {
      message.info('数据正在处理中，请稍等一下再点哦');
      return true;
    }

    return false;
  }

  reloadFByUrl() {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    dispatch(
      routerRedux.replace({
        pathname: `${pathname.replace('/load/', '/update/')}`,
      }),
    );
  }

  renderOther = () => {
    return null;
  };
}

export default Index;
