import React from 'react';
import { message } from 'antd';
import NProgress from 'nprogress';
import { connect } from 'dva';

import { getQueue } from '@/utils/tools';
import CustomAuthorization from '@/customComponents/Framework/CustomAuthorization';

let currHref = '';

class BasicLayout extends CustomAuthorization {
  // constructor(props) {
  //   super(props);
  //   this.getPageTitle = memoizeOne(this.getPageTitle);
  //   this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  // }

  initState = () => ({
    loadDataAfterMount: false,
  });

  adjustWhenDidMount = () => {
    getQueue();

    requestAnimationFrame(() => {
      message.info('初始数据正在努力加载中，需要一点点时间哦！');
    });

    // const {
    //   dispatch,
    //   route: { routes, authority },
    // } = this.props;

    // dispatch({
    //   type: 'user/fetchCurrent',
    // });

    // dispatch({
    //   type: 'setting/getSetting',
    // });

    // dispatch({
    //   type: 'menu/getMenuData',
    //   payload: { routes, authority },
    // });

    this.loadGlobalData();
    this.loadCurrentOperator();
  };

  componentDidUpdate(preProps) {
    const { loading } = this.props;
    // 浏览器地址栏中地址
    const { href } = window.location;
    // currHref 和 href 不一致时说明进行了页面跳转
    if (currHref !== href) {
      // 页面开始加载时调用 start 方法
      NProgress.start();
      // loading.global 为 false 时表示加载完毕
      if (!loading.global) {
        // 页面请求完毕时调用 done 方法
        NProgress.done();
        // 将新页面的 href 值赋值给 currHref
        currHref = href;
      }
    }

    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    const { collapsed, isMobile } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  beforeUnmount = () => {
    const queue = getQueue();
    queue.end();
  };

  render() {
    const { children } = this.props;

    return <>{children}</>;
  }
}

export default connect(({ currentOperator, global, loading }) => ({
  currentOperator,
  global,
  loading,
}))(props => <BasicLayout {...props} />);
