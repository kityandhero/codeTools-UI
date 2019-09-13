import React from 'react';
import { routerRedux } from 'dva/router';
import {
  // Avatar,
  Spin,
  Icon,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import LoadDataForm from '@/customComponents/Framework/CustomForm/LoadDataForm';

import styles from './index.less';

class LoadDataTabContainer extends LoadDataForm {
  tabList = [];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      customTabActiveKey: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParamsPrev } = preState;

    if ((urlParams || null) == null || (urlParamsPrev || null) == null) {
      return;
    }

    const { op } = urlParams;

    const { op: prevOp } = urlParamsPrev;

    const { dataLoading } = this.state;

    if (!dataLoading) {
      if (
        (prevOp === 'load' && op === 'update') ||
        this.checkNeedUpdate(preProps, preState, snapshot)
      ) {
        this.reloadData();

        const {
          dispatch,
          location: { pathname },
        } = this.props;

        dispatch(
          routerRedux.replace({
            pathname: `${pathname.replace('/update/', '/load/')}`,
          })
        );
      }
    }
  };

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    let location = {};

    (this.tabList || []).forEach(item => {
      if (item.key === key) {
        location = {
          pathname: `${match.url.replace('/update', '/load')}/${item.key}`,
        };

        dispatch(routerRedux.replace(location));
      }
    });
  };

  getTabActiveKey = () => {
    const {
      match,
      location: { pathname },
    } = this.props;

    return pathname
      .replace(/\//g, '-')
      .replace(`${match.url.replace(/\//g, '-')}-`, '')
      .replace(/-/g, '/');
  };

  pageHeaderTag = () => null;

  pageHeaderTagWrapper = () => {
    const { dataLoading } = this.state;

    const antIcon = <Icon type="loading" style={{ fontSize: 14 }} spin />;

    return (
      <>
        <div className={styles.pageTagBox}>
          {this.pageHeaderTag()}
          <span>&nbsp;</span>
          <div className={styles.loadingBox}>
            {dataLoading ? <Spin indicator={antIcon} /> : null}
          </div>
        </div>
      </>
    );
  };

  pageHeaderAvatar = () => {
    return { src: '/noImageSmall.png' };
  };

  pageHeaderTitle = () => {
    const { pageName } = this.state;

    return <span className={styles.pageNameBox}>{pageName}</span>;
  };

  pageHeaderSubTitle = () => null;

  pageHeaderContent = () => null;

  pageHeaderExtraContent = () => null;

  render() {
    const { match, children } = this.props;
    const { customTabActiveKey } = this.state;

    const tabListAvailable = [];

    (this.tabList || []).forEach(o => {
      const v = typeof o.show === 'undefined' ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    });

    if (customTabActiveKey) {
      return (
        <PageHeaderWrapper
          className={styles.wrapperContainor}
          // avatar={this.pageHeaderAvatar()}
          title={this.pageHeaderTitle()}
          subTitle={this.pageHeaderSubTitle()}
          tags={this.pageHeaderTagWrapper()}
          extra={this.pageHeaderAction()}
          // eslint-disable-next-line no-restricted-globals
          tabActiveKey={this.getTabActiveKey()}
          content={this.pageHeaderContent()}
          extraContent={this.pageHeaderExtraContent()}
          tabList={tabListAvailable}
          // tabBarExtraContent={<Button>Extra Action</Button>}
          onTabChange={this.handleTabChange}
        >
          {children}
        </PageHeaderWrapper>
      );
    }

    return (
      <PageHeaderWrapper
        avatar={this.pageHeaderAvatar()}
        title={this.pageHeaderTitle()}
        subTitle={this.pageHeaderSubTitle()}
        tags={this.pageHeaderTagWrapper()}
        extra={this.pageHeaderAction()}
        // eslint-disable-next-line no-restricted-globals
        tabActiveKey={location.hash.replace(`#${match.url}/`, '')}
        content={this.pageHeaderContent()}
        extraContent={this.pageHeaderExtraContent()}
        tabList={tabListAvailable}
        // tabBarExtraContent={<Button>Extra Action</Button>}
        onTabChange={this.handleTabChange}
        // onBack={() => {
        //   this.backToList();
        // }}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default LoadDataTabContainer;
