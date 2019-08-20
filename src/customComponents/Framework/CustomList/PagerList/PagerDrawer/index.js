import React from 'react';
import { Drawer, Icon, message } from 'antd';

import PagerList from '@/customComponents/Framework/CustomList/PagerList';

import styles from './index.less';

class PagerDrawer extends PagerList {
  constructor(props) {
    super(props);

    const s = this.state;
    s.dataLoading = false;

    this.state = {
      ...s,
      visible: false,
      loadAfterMount: false,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = nextProps;

    return { visible };
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visible && !visiblePre) {
      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = () => {};

  initLoad = () => {
    const { loadApiPath, loadAfterMount } = this.state;

    if (loadAfterMount) {
      if ((loadApiPath || '') === '') {
        message.error('loadApiPath需要配置');
        return;
      }

      const { pageNo, pageSize } = this.state;

      this.loadData({ pageNo, pageSize });
    }
  };

  preInit = () => {
    const { visible } = this.props;
    this.setState({ visible: visible || false }, () => {
      this.setState(this.extendState(), () => {
        this.init();
      });
    });
  };

  onClose = () => {
    const { afterClose } = this.props;
    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  buildTableOtherConfig = () => ({
    styleSet: {
      height: 'calc(100% - 57px)',
    },
  });

  renderTitleIcon = () => <Icon type="read" className={styles.titleIcon} />;

  render() {
    const { width: widthDrawer } = this.props;
    const { selectDatabaseName } = this.props;
    const { visible } = this.state;

    return (
      <Drawer
        title={
          <span>
            {this.renderTitleIcon()}
            {this.getPageName()}
          </span>
        }
        destroyOnClose={false}
        className={styles.containorBox}
        width={widthDrawer}
        placement="right"
        visible={visible || false}
        selectDatabaseName={selectDatabaseName}
        maskClosable={false}
        onClose={this.onClose}
        // style={{
        //   height: 'calc(100% - 55px)',
        // }}
      >
        <div
          style={{
            height: 'calc(100vh - 103px)',
          }}
        >
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderTable()}
          </div>
        </div>
      </Drawer>
    );
  }
}

export default PagerDrawer;
