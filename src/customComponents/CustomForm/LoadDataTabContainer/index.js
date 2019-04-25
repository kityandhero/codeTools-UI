import React from 'react';
import { routerRedux } from 'dva/router';
import { Avatar } from 'antd';

import LoadDataForm from '@/customComponents/CustomForm/LoadDataForm';
import PageHeaderWrapperCustom from '@/customComponents/PageHeaderWrapperCustom';

class LoadDataTabContainer extends LoadDataForm {
  tabList = [];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      customTabActiveKey: false,
    };
  }

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    let location = {};

    (this.tabList || []).forEach(item => {
      if (item.key === key)
        location = {
          pathname: `${match.url.replace('/update', '/load')}/${item.key}`,
        };
      dispatch(routerRedux.replace(location));
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

  pageHeaderContent = () => null;

  pageHeaderExtraContent = () => null;

  render() {
    const { match, children } = this.props;
    const { pageName, dataLoading, customTabActiveKey } = this.state;

    const tabListAvailable = [];

    (this.tabList || []).forEach(o => {
      const v = typeof o.show === 'undefined' ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    });

    if (customTabActiveKey) {
      return (
        <PageHeaderWrapperCustom
          title={pageName}
          logo={this.pageHeaderLogo()}
          action={this.pageHeaderAction()}
          customLoading={dataLoading}
          // eslint-disable-next-line no-restricted-globals
          tabActiveKey={this.getTabActiveKey()}
          content={this.pageHeaderContent()}
          extraContent={this.pageHeaderExtraContent()}
          tabList={tabListAvailable}
          onTabChange={this.handleTabChange}
        >
          {children}
        </PageHeaderWrapperCustom>
      );
    }

    return (
      <PageHeaderWrapperCustom
        title={pageName}
        logo={this.pageHeaderLogo()}
        action={this.pageHeaderAction()}
        customLoading={dataLoading}
        // eslint-disable-next-line no-restricted-globals
        tabActiveKey={location.hash.replace(`#${match.url}/`, '')}
        content={this.pageHeaderContent()}
        extraContent={this.pageHeaderExtraContent()}
        tabList={tabListAvailable}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapperCustom>
    );
  }
}

export default LoadDataTabContainer;
