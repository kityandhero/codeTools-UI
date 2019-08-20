import React from 'react';
import { routerRedux } from 'dva/router';
import { Avatar, Spin, Icon } from 'antd';
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

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const {
      urlParams: { op },
    } = this.state;

    const {
      urlParams: { op: prevOp },
    } = preState;

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
          }),
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

  pageHeaderLogo = () => {
    const { metaData } = this.state;

    return (
      <Avatar
        size="large"
        src={metaData === null ? '' : metaData.mainImageUrl || '/noImageSmall.png'}
      />
    );
  };

  getTabActiveKey = () => {
    const { match } = this.props;

    // eslint-disable-next-line no-restricted-globals
    location.hash.replace(`#${match.url}/`, '');
  };

  pageHeaderTag = () => null;

  pageHeaderTagWrapper = () => {
    const { dataLoading } = this.state;

    const antIcon = <Icon type="loading" style={{ fontSize: 14 }} spin />;

    return (
      <>
        <div className={styles.pageNameBox}>
          {this.pageHeaderTag()}
          <span>&nbsp;</span>
          <div className={styles.loadingBox}>
            {dataLoading ? <Spin indicator={antIcon} /> : null}
          </div>
        </div>
      </>
    );
  };

  pageHeaderSubTitle = () => null;

  pageHeaderContent = () => null;

  pageHeaderExtraContent = () => null;

  render() {
    const { match, children } = this.props;
    const { pageName, customTabActiveKey } = this.state;

    const tabListAvailable = [];

    (this.tabList || []).forEach(o => {
      const v = typeof o.show === 'undefined' ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    });

    const pageNameContext = pageName;

    if (customTabActiveKey) {
      return (
        <PageHeaderWrapper
          title={pageNameContext}
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
        title={pageNameContext}
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
        onBack={() => {
          this.backToList();
        }}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default LoadDataTabContainer;
