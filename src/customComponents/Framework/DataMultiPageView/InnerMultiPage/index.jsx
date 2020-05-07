import React from 'react';
import { Card, Button, Tooltip, Divider, BackTop } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import DensityAction from '../../DataListView/DensityAction';
import ColumnSetting from '../../DataListView/ColumnSetting';

import MultiPage from '../MultiPage';

import styles from './index.less';

class InnerMultiPage extends MultiPage {
  constructor(props) {
    super(props);

    const defaultState = this.state;

    this.useParamsKey = false;

    this.state = {
      ...defaultState,
    };
  }

  render() {
    const { listTitle, tableSize, refreshing } = this.state;

    const extraAction = this.renderExtraAction();

    return (
      <>
        <div className={styles.containorBox}>
          <Card bordered={false} className={styles.containorSearch}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
          </Card>

          <Card
            title={listTitle}
            headStyle={{ borderBottom: '0px' }}
            bodyStyle={{ paddingTop: '0', paddingBottom: 10 }}
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
        <BackTop />
      </>
    );
  }
}

export default InnerMultiPage;
