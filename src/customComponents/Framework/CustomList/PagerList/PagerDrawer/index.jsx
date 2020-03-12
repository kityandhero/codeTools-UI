import React from 'react';
import { Drawer, Card, Divider, Tooltip, Button } from 'antd';
import { ReloadOutlined, ReadOutlined } from '@ant-design/icons';

import DensityAction from '../../DensityAction';
import ColumnSetting from '../../ColumnSetting';
import PagerList from '../index';

import styles from './index.less';

class PagerDrawer extends PagerList {
  constructor(props) {
    super(props);

    this.useParamsKey = false;

    const s = this.state;
    s.dataLoading = false;

    this.state = {
      ...s,
      ...{ visible: false, loadDataAfterMount: false },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;

    return { visible: visible || false, externalData: externalData || null };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visiblePre === false && visible === true) {
      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
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

  renderTitleIcon = () => <ReadOutlined className={styles.titleIcon} />;

  hideDrawer = () => {
    this.onClose();
  };

  render() {
    const { width: widthDrawer } = this.props;
    const { visible, listTitle, tableSize, refreshing } = this.state;

    const extraAction = this.renderExtraAction();

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
            <div className={styles.containorBox}>
              <Card bordered={false} className={styles.containorSearch}>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
              </Card>

              <div style={{ height: '1px', backgroundColor: '#f0f2f5' }} />

              <Card
                title={listTitle}
                headStyle={{ borderBottom: 0, paddingLeft: 0, paddingRight: 0 }}
                bodyStyle={{ paddingTop: 0, paddingBottom: 10, paddingLeft: 0, paddingRight: 0 }}
                bordered={false}
                className={styles.containorTable}
                extra={
                  <>
                    {extraAction}

                    {extraAction == null ? null : <Divider type="vertical" />}

                    {this.renderBatchAction()}
                    <DensityAction
                      tableSize={tableSize}
                      setTableSize={key => {
                        this.setTableSize(key);
                      }}
                    />

                    <Tooltip title="刷新本页">
                      <Button
                        shape="circle"
                        className={styles.iconAction}
                        loading={refreshing}
                        icon={<ReloadOutlined />}
                        onClick={() => {
                          this.refreshData();
                        }}
                      />
                    </Tooltip>
                    <ColumnSetting
                      columns={this.getColumn()}
                      columnsMap={this.getColumnsMap()}
                      setColumnsMap={e => {
                        this.setColumnsMap(e);
                      }}
                      setSortKeyColumns={key => {
                        this.setSortKeyColumns(key);
                      }}
                    />
                    {/* <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  disabled={processing}
                  onClick={e => {
                    this.validate(e, this.formRef.current);
                  }}
                  loading={processing}
                >
                  保存
                </Button> */}
                  </>
                }
              >
                <div className={styles.tableList}>
                  {this.renderAboveTable()}
                  {this.renderTable()}
                </div>
              </Card>
            </div>

            {this.renderOther()}
          </div>
        </div>
      </Drawer>
    );
  }
}

export default PagerDrawer;
