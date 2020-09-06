import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Drawer, Layout, Affix, Card, Divider, Tag, Tooltip, Button, Row, Col } from 'antd';
import { CloseCircleOutlined, ReloadOutlined, ReadOutlined } from '@ant-design/icons';

import DensityAction from '../../DataListView/DensityAction';
import ColumnSetting from '../../DataListView/ColumnSetting';

import SinglePage from '../SinglePage';

import styles from './index.less';

const { Footer, Content } = Layout;

class SinglePageDrawer extends SinglePage {
  loadDataAfterMount = false;

  reloadWhenShow = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      visible: false,
      dataLoading: false,
      showBottomBar: true,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;

    return { visible, externalData };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visible && !visiblePre) {
      if (this.reloadWhenShow) {
        const that = this;

        setTimeout(() => {
          that.reloadData();
        }, 460);
      }

      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {};

  onClose = () => {
    const { afterClose } = this.props;
    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  // buildTableOtherConfig = () => ({
  //   styleSet: {
  //     height: 'calc(100% - 57px)',
  //   },
  // });

  renderTitleIcon = () => <ReadOutlined className={styles.titleIcon} />;

  renderContentContainor = () => {
    const { reloadAnimalShow, listTitle, tableSize, refreshing, renderSearchForm } = this.state;
    const extraAction = this.renderExtraAction();

    return (
      <div className={styles.tableList}>
        <div className={styles.containorBox}>
          {renderSearchForm ? (
            <>
              <Card bordered={false} className={styles.containorSearch}>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
              </Card>

              <div style={{ height: '1px', backgroundColor: '#f0f2f5' }} />
            </>
          ) : null}

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

                <Tooltip title="立即刷新">
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
              {this.renderLisView()}
            </div>
          </Card>
        </div>

        {this.renderOther()}
      </div>
    );
  };

  renderBottomBar = () => {
    return (
      <Footer>
        <Affix offsetBottom={0}>
          <div className={styles.bottomBar}>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                {this.renderButton()}
              </Col>
            </Row>
          </div>
        </Affix>
      </Footer>
    );
  };

  renderButton = () => {
    const { dataLoading, processing } = this.state;

    return (
      <>
        <Button
          type="default"
          disabled={dataLoading || processing}
          onClick={(e) => {
            this.onClose(e);
          }}
        >
          <CloseCircleOutlined />
          关闭
        </Button>
      </>
    );
  };

  render() {
    const { width: widthDrawer } = this.props;
    const { visible, showBottomBar, renderSearchForm } = this.state;

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
        bodyStyle={{
          paddingBottom: 0,
          paddingTop: renderSearchForm ? '24px' : 0,
        }}
        // style={{
        //   height: 'calc(100% - 55px)',
        // }}
      >
        <div className={styles.mainContainor}>
          <Layout>
            {/* <Header>Header</Header> */}
            <Content>{this.renderContentContainor()}</Content>
            {showBottomBar ? this.renderBottomBar() : null}
          </Layout>
        </div>
      </Drawer>
    );
  }
}

export default SinglePageDrawer;
