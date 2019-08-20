import React from 'react';
import { Drawer, Icon, message } from 'antd';

import SingleList from '@/customComponents/Framework/CustomList/SingleList';

import styles from './index.less';

class ListDrawer extends SingleList {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      visible: false,
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
    const { loadApiPath } = this.state;

    if ((loadApiPath || '') === '') {
      message.error('loadApiPath需要配置');
      return;
    }

    const { pageNo, pageSize } = this.state;

    this.loadData({ pageNo, pageSize });
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

export default ListDrawer;
