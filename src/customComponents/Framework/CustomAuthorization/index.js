import { routerRedux } from 'dva/router';

import { getDerivedStateFromPropsForUrlParams, isBoolean, isFunction } from '@/utils/tools';
import { checkHasAuthority } from '@/utils/authority';
import CustomCommon from '@/customComponents/Framework/CustomCommon';

class Index extends CustomCommon {
  componentAuthority = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  doDidMountTask = () => {
    let needDoOther = false;

    if (this.componentAuthority == null) {
      this.preInit();
      needDoOther = true;
    } else if (this.checkAuthority(this.componentAuthority)) {
      this.preInit();
      needDoOther = true;
    } else {
      const { dispatch } = this.props;

      dispatch(routerRedux.replace('/exception/404'));
    }

    if (needDoOther) {
      this.adjustWhenDidMount();
    }
  };

  checkAuthority = auth => checkHasAuthority(auth);

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator || null;
  };

  getCurrentOperatorLoading = () => {
    const { global } = this.props;

    return global.currentOperatorLoading || false;
  };

  setCurrentOperatorLoading = (params, callback) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/setCurrentOperatorLoading',
      payload: isBoolean(params) ? params : false,
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  getCurrentOperatorLoadSuccess = () => {
    const { global } = this.props;

    return global.currentOperatorLoadSuccess || false;
  };

  setCurrentOperatorLoadSuccess = (params, callback) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/setCurrentOperatorLoadSuccess',
      payload: isBoolean(params) ? params : false,
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  // 加载当前用户信息
  loadCurrentOperator(reload = false) {
    if (!(isBoolean(reload) ? reload : false)) {
      const currentOperatorLoadSuccess = this.getCurrentOperatorLoadSuccess();

      if (currentOperatorLoadSuccess) {
        return;
      }
    }

    const currentOperatorLoading = this.getCurrentOperatorLoading();

    if (currentOperatorLoading) {
      return;
    }

    this.setCurrentOperatorLoading(true, () => {
      const { dispatch } = this.props;

      dispatch({
        type: 'currentOperator/getCurrentBasicInfo',
        payload: {},
      }).then(() => {
        const {
          currentOperator: { data },
        } = this.props;

        const { dataSuccess, data: metaData } = data;

        if (dataSuccess) {
          this.setCurrentOperator(metaData);

          this.setCurrentOperatorLoadSuccess(true);
        }

        this.setCurrentOperatorLoading(false);
      });
    });
  }

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  setCurrentOperator = (params, callback) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/setCurrentOperator',
      payload: params || null,
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  reloadCurrentOperator = () => {
    this.loadCurrentOperator(true);
  };
}

export default Index;
