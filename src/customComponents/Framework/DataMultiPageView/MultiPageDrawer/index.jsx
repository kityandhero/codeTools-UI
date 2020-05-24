import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Drawer, Card, Divider, Tag, Tooltip, Button, Row, Col } from 'antd';
import { ReloadOutlined, ReadOutlined } from '@ant-design/icons';

import { isFunction } from '@/utils/tools';

import DensityAction from '../../DataListView/DensityAction';
import ColumnSetting from '../../DataListView/ColumnSetting';

import MultiPage from '../MultiPage';

import styles from './index.less';

class MultiPageDrawer extends MultiPage {
  reloadWhenShow = false;

  constructor(props) {
    super(props);

    this.useParamsKey = false;

    const s = this.state;
    s.dataLoading = false;

    this.state = {
      ...s,
      ...{ visible: false, reloadAnimalShow: false },
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    const { firstLoadSuccess } = this.state;

    // 未加载数据过数据的时候，进行加载
    if (!firstLoadSuccess) {
      // 设置界面效果为加载中，减少用户误解
      this.setState({ dataLoading: true });

      setTimeout(() => {
        this.handleFormReset(false);
      }, 700);
    } else if (this.reloadWhenShow) {
      const that = this;

      setTimeout(() => {
        that.setState({ reloadAnimalShow: true }, () => {
          setTimeout(() => {
            that.reloadData({}, () => {
              setTimeout(() => {
                that.setState({ reloadAnimalShow: false });
              }, 350);
            });
          }, 450);
        });
      }, 350);
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

  selectRecord = (e, record) => {
    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(record);
    }

    this.hideDrawer();
  };

  render() {
    const { width: widthDrawer } = this.props;
    const { visible, reloadAnimalShow, listTitle, tableSize, refreshing } = this.state;

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
                title={
                  <Row>
                    <Col flex="70px"> {listTitle}</Col>
                    <Col flex="auto">
                      <QueueAnim>
                        {reloadAnimalShow ? (
                          <div key="3069dd18-f530-43ab-b96d-a86f8079358f">
                            <Tag color="gold">即将刷新</Tag>
                          </div>
                        ) : null}
                      </QueueAnim>
                    </Col>
                  </Row>
                }
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
                      setTableSize={(key) => {
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
                      setColumnsMap={(e) => {
                        this.setColumnsMap(e);
                      }}
                      setSortKeyColumns={(key) => {
                        this.setSortKeyColumns(key);
                      }}
                    />
                  </>
                }
              >
                <div>
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

export default MultiPageDrawer;
