import { routerRedux } from 'dva/router';
import { message } from 'antd';

import {
  getDerivedStateFromPropsForUrlParams,
  isEqual,
  isFunction,
  defaultCommonState,
  pretreatmentRequestParams,
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

    this.init();
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => false;

  // eslint-disable-next-line no-unused-vars
  getApiData = props => ({});

  /**
   * 处理其他需要在组件挂在之后执行的流程
   *
   * @memberof Index
   */
  initOther = () => {};

  init = () => {
    this.initLoad();
    this.initOther();
  };

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

  initLoadRequestParams = o => o || {};

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
            }
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
        const metaOriginalData = this.getApiData(this.props);

        this.lastLoadParams = requestData;

        const { dataSuccess } = metaOriginalData;

        if (dataSuccess) {
          const { list: metaListData, data: metaData, extra: metaExtra } = metaOriginalData;

          this.setState({
            metaData: metaData || null,
            metaExtra: metaExtra || null,
            metaListData: metaListData || [],
            metaOriginalData,
          });

          this.afterLoadSuccess(
            metaData || null,
            metaListData || [],
            metaExtra || null,
            metaOriginalData
          );
        }

        const { reloading: reloadingComplete } = this.state;

        if (reloadingComplete) {
          this.afterReloadSuccess();
          this.afterGetReLoadRequestResult(requestData, metaOriginalData);
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

              this.afterGetFirstRequestResult(requestData, metaOriginalData);
            }
          );
        }

        this.afterGetRequestResult(requestData, metaOriginalData);

        if (typeof callback === 'function') {
          callback();
        }

        this.clearRequestingData();
      });
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

  reloadGlobalData = (callback = null) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/getMetaData',
      payload: { force: true },
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
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

  reloadByUrl() {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    dispatch(
      routerRedux.replace({
        pathname: `${pathname.replace('/load/', '/update/')}`,
      })
    );
  }

  renderOther = () => {
    return null;
  };
}

export default Index;
