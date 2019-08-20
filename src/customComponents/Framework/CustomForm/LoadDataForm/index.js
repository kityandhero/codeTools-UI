import React from 'react';
import { BackTop, Button, Avatar } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { getDerivedStateFromPropsForUrlParams, defaultFormState } from '@/utils/tools';
import LoadDataCore from '@/customComponents/Framework/CustomForm/LoadDataCore';

import styles from './index.less';

class Index extends LoadDataCore {
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  pageHeaderLogo = () => <Avatar shape="square" icon="plus" />;

  pageHeaderAction = () => {
    const { backPath } = this.state;

    if ((backPath || '') === '') {
      return null;
    }

    return (
      <>
        <div className={styles.backButtonBox}>
          <Button
            icon="rollback"
            onClick={e => {
              this.backToList(e);
            }}
            size="small"
          >
            列表页
          </Button>
        </div>
      </>
    );
  };

  formContent = () => null;

  render() {
    const { pageName } = this.state;

    return (
      <PageHeaderWrapper title={pageName} logo={this.pageHeaderLogo()}>
        <div className={styles.containorBox}>
          {this.formContent()}
          {this.renderOther()}
        </div>
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default Index;
