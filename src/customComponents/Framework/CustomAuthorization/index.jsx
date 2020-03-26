import { history } from 'umi';

import { getDerivedStateFromPropsForUrlParams, isFunction } from '@/utils/tools';
import { checkHasAuthority } from '@/utils/authority';
import CustomCommonWrapper from '../CustomCommonWrapper';

class Index extends CustomCommonWrapper {
  componentAuthority = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  doDidMountTask = () => {
    let needDoOther = false;

    if (this.componentAuthority == null) {
      this.init();
      needDoOther = true;
    } else if (this.checkAuthority(this.componentAuthority)) {
      this.init();
      needDoOther = true;
    } else {
      history.replace('/exception/404');
    }

    if (needDoOther) {
      this.adjustWhenDidMount();
    }
  };

  checkAuthority = (auth) => checkHasAuthority(auth);

  getOperator = () => {
    const {
      global: { operator },
    } = this.props;
    return operator;
  };

  reloadOperator = (callback = null) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/getOperator',
      payload: { force: true },
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };
}

export default Index;
