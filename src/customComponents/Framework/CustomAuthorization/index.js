import { routerRedux } from 'dva/router';

import { getDerivedStateFromPropsForUrlParams, isFunction } from '@/utils/tools';
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
    return currentOperator;
  };

  reloadCurrentOperator = (callback = null) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/getCurrentOperator',
      payload: { force: true },
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };
}

export default Index;
