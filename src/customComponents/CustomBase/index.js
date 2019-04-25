import { PureComponent } from 'react';
import { routerRedux } from 'dva/router';

import { checkHasAuthority } from '@/utils/authority';

class CustomBase extends PureComponent {
  componentAuthority = null;

  constructor(props) {
    super(props);

    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;

    if (this.componentAuthority == null) {
      this.preInit();
    } else if (this.checkAuthority(this.componentAuthority)) {
      this.preInit();
    } else {
      const { dispatch } = this.props;

      dispatch(routerRedux.replace('/exception/404'));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.doWorkWhenWillReceive(nextProps);
  }

  componentWillUnmount() {
    this.beforeUnmount();

    this.mounted = false;

    this.setState = () => {};

    this.afterUnmount();
  }

  beforeUnmount = () => {};

  afterUnmount = () => {};

  // eslint-disable-next-line no-unused-vars
  doWorkWhenWillReceive = nextProps => {};

  extendState = () => ({});

  preInit = () => {};

  init = () => {
    this.setState(this.initState(), () => {
      this.initOther();
    });
  };

  initState = () => ({});

  initOther = () => {};

  // eslint-disable-next-line no-unused-vars
  getApiData = props => ({});

  renderOther = () => null;

  // eslint-disable-next-line no-unused-vars
  checkAuthority = auth => checkHasAuthority(auth);

  render() {
    return null;
  }
}

export default CustomBase;
