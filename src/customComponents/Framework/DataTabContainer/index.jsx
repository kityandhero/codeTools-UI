import React from 'react';
import Texty from 'rc-texty';
import { Descriptions, Row, Col, message } from 'antd';
import { PictureOutlined, LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { defaultEmptyImage } from '@/utils/constants';
import { isArray, copyToClipboard, formatDatetime, stringIsNullOrWhiteSpace } from '@/utils/tools';

import DataSingleView from '../DataSingleView/DataLoad';

import styles from './index.less';

const { Item: Description } = Descriptions;

const avatarImageLoadResultCollection = {
  wait: -1,
  success: 1,
  fail: 0,
};

class DataTabContainer extends DataSingleView {
  needSetFormValueAfterLoad = false;

  tabList = [];

  showPageHeaderAvatar = true;

  defaultAvatarIcon = (<PictureOutlined />);

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      customTabActiveKey: false,
      avatarImageLoadResult: avatarImageLoadResultCollection.wait,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          location: { pathname },
        } = this.props;

        this.redirectToPath(`${pathname.replace('/update/', '/load/')}`);
      }
    }
  };

  handleTabChange = (key) => {
    const { match } = this.props;

    (this.tabList || []).forEach((item) => {
      if (item.key === key) {
        this.redirectToPath(`${match.url.replace('/update', '/load')}/${item.key}`);
      }
    });
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => {
    return null;
  };

  pageHeaderTag = () => null;

  pageHeaderTagWrapper = () => {
    return (
      <>
        <div className={styles.pageTagBox}>{this.pageHeaderTag()}</div>
      </>
    );
  };

  pageHeaderAvatar = () => {
    return null;
  };

  decoratePageHeaderAvatar = () => {
    if (this.showPageHeaderAvatar) {
      const { dataLoading, reloading, avatarImageLoadResult } = this.state;

      let avatar = null;

      if (dataLoading) {
        avatar = { icon: <LoadingOutlined /> };
      }

      if (reloading) {
        avatar = { icon: <ReloadOutlined spin /> };
      }

      if (!dataLoading && !reloading) {
        avatar = this.pageHeaderAvatar();

        if ((avatar || null) == null) {
          avatar = { icon: this.defaultAvatarIcon };
        } else {
          const { src } = avatar;

          if (stringIsNullOrWhiteSpace(src || '')) {
            avatar = { icon: this.defaultAvatarIcon };
          } else {
            if (avatarImageLoadResult === avatarImageLoadResultCollection.wait) {
              const that = this;

              avatar = {
                src,
                onError: () => {
                  that.setState({
                    avatarImageLoadResult: avatarImageLoadResultCollection.fail,
                  });

                  return true;
                },
              };
            }

            if (avatarImageLoadResult === avatarImageLoadResultCollection.success) {
              avatar = { src };
            }

            if (avatarImageLoadResult === avatarImageLoadResultCollection.fail) {
              avatar = {
                src: defaultEmptyImage,
                onError: () => {
                  message.error('加载默认图片失败');

                  return true;
                },
              };
            }
          }
        }
      }

      return avatar;
    }

    return null;
  };

  pageHeaderTitlePrefix = () => {
    return '';
  };

  pageHeaderTitle = () => {
    const { pageName } = this.state;

    const headerTitlePrefix = this.pageHeaderTitlePrefix() || '';

    return (
      <span className={styles.pageNameBox}>
        <Row>
          <Col> {stringIsNullOrWhiteSpace(headerTitlePrefix) ? '' : `${headerTitlePrefix}：`}</Col>
          <Col flex="auto">
            <Texty type="alpha" mode="smooth">
              {pageName}
            </Texty>
          </Col>
        </Row>
      </span>
    );
  };

  pageHeaderSubTitle = () => null;

  pageHeaderContentData = () => null;

  pageHeaderContent = () => {
    const list = this.pageHeaderContentData();

    if (isArray(list)) {
      const dataList = list.map((o, index) => {
        const d = { ...{}, ...o };

        d.key = `item_${index}`;

        return { ...{ canCopy: false }, ...d };
      });

      return (
        <Descriptions className={styles.headerList} size="small">
          {dataList.map((item) => {
            return (
              <Description key={item.key} label={item.label}>
                {item.value}
                {item.canCopy && (item.canCopy || null) != null ? (
                  <a
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      copyToClipboard(item.copyData || item.value);
                    }}
                  >
                    [复制]
                  </a>
                ) : null}
              </Description>
            );
          })}
        </Descriptions>
      );
    }

    return null;
  };

  pageHeaderExtraContentData = () => null;

  pageHeaderExtraContent = () => {
    const data = this.pageHeaderExtraContentData();

    if ((data || null) == null) {
      return null;
    }

    const v = { ...{ textLabel: '描述', text: '', tileLabel: '时间', time: new Date() }, ...data };

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>创建日期</div>
          <div className={styles.heading}>
            {formatDatetime(v.time, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(v.time, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>{v.textLabel}</div>
          <div className={styles.heading}>{v.text}</div>
        </Col>
      </Row>
    );
  };

  render() {
    const { children } = this.props;
    const { customTabActiveKey } = this.state;

    let tabListAvailable = [];

    (this.tabList || []).forEach((o) => {
      const v = typeof o.show === 'undefined' ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    });

    tabListAvailable = this.adjustTabListAvailable(tabListAvailable);

    if (customTabActiveKey) {
      return (
        <PageHeaderWrapper
          className={styles.customContainor}
          avatar={this.decoratePageHeaderAvatar()}
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
          // onBack={() => {
          //   this.backToList();
          // }}
        >
          {children}
        </PageHeaderWrapper>
      );
    }

    return (
      <PageHeaderWrapper
        className={styles.customContainor}
        avatar={this.decoratePageHeaderAvatar()}
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
        tabProps={{
          type: 'card',
          size: 'small',
          tabBarStyle: {
            marginBottom: 0,
          },
          tabBarGutter: 3,
        }}
        // onBack={() => {
        //   this.backToList();
        // }}
      >
        {children}
        {this.renderOther()}
      </PageHeaderWrapper>
    );
  }
}

export default DataTabContainer;
