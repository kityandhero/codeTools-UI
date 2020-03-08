import React from 'react';
import {
  Form,
  Row,
  Col,
  Card,
  Alert,
  Tooltip,
  Button,
  DatePicker,
  BackTop,
  Divider,
  message,
} from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  defaultListState,
  buildFieldDescription,
  isArray,
  isUndefined,
} from '../../../../utils/tools';
import CustomAuthorization from '../../CustomAuthorization';
import { tableSizeConfig } from '../../../StandardTableCustom';

import DensityAction from '../DensityAction';
import ColumnSetting from '../ColumnSetting';
import BatchAction from '../BatchAction';

import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class SingleList extends CustomAuthorization {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    this.columnsOtherConfig = [];

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
      ...{
        listTitle: '检索结果',
        tableSize: tableSizeConfig.middle,
        counterSetColumnsOtherConfig: 0,
      },
    };
  }

  onDateRangeChange = (dates, dateStrings) => {
    this.setState({
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedDataTableDataRows: rows,
    });
  };

  getPageName = () => {
    const { pageName } = this.state;

    return pageName;
  };

  getColumn = () => [];

  getColumnMerged = () => {
    let columns = [];

    const columnsSource = this.getColumn();

    const columnsOtherConfigArray = this.columnsOtherConfig || [];

    if (isArray(columnsOtherConfigArray)) {
      if (columnsOtherConfigArray.length > 0) {
        if (columnsSource.length !== columnsOtherConfigArray.length) {
          this.restoreColumnsOtherConfigArray();
        } else {
          columnsSource.forEach((item, index) => {
            const c = { ...item, ...columnsOtherConfigArray[index] };

            const { show } = c || { show: true };

            if (show) {
              columns.push(c);
            }
          });
        }
      } else {
        this.restoreColumnsOtherConfigArray();
        columns = columnsSource;
      }
    } else {
      columns = columnsSource;
    }

    return columns;
  };

  handleFormReset = () => {
    // 需要继承重载
  };

  // 其他项重置
  handleFormOtherReset = () => {};

  handleSearch = e => {
    e.preventDefault();

    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchForm();

    const { validateFields } = form;

    validateFields()
      .then(fieldsValue => {
        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.searchData({ formValues: values });
      })
      .catch(error => {
        const { errorFields } = error;

        const m = [];

        Object.values(errorFields).forEach(o => {
          m.push(o.errors[0]);
        });

        const maxLength = 5;
        let beyondMax = false;

        if (m.length > maxLength) {
          m.length = maxLength;

          beyondMax = true;
        }

        let errorMessage = m.join(', ');

        if (beyondMax) {
          errorMessage += ' ...';
        }

        message.warn(errorMessage);
      });
  };

  getSearchForm = () => {
    return this.formRef.current;
  };

  renderSimpleFormButton = (ColMd = 6) => {
    const { reloading, searching } = this.state;

    return (
      <Col md={ColMd} sm={24}>
        <span className={styles.submitButtons}>
          <Button
            loading={searching}
            type="primary"
            icon={<SearchOutlined />}
            onClick={e => {
              this.handleSearch(e);
            }}
          >
            查询
          </Button>
          <Button
            loading={reloading}
            style={{ marginLeft: 8 }}
            icon={<ReloadOutlined />}
            onClick={() => {
              this.handleFormReset();
            }}
          >
            重置
          </Button>
        </span>
      </Col>
    );
  };

  renderSimpleFormRangePicker = (dateRangeFieldName, ColMd = 8, rangePickerProps = null) => {
    const p = {
      ...{
        style: { width: '100%' },
        showTime: { format: 'HH:mm' },
        format: 'YYYY-MM-DD HH:mm',
        placeholder: ['开始时间', '结束时间'],
        onChange: (dates, dateStrings) => {
          this.onDateRangeChange(dates, dateStrings);
        },
        ...(rangePickerProps || {}),
      },
    };

    return (
      <Col md={ColMd} sm={24}>
        <FormItem
          label={dateRangeFieldName}
          rules={[
            {
              required: false,
              message: buildFieldDescription(dateRangeFieldName, '选择'),
            },
          ]}
        >
          <RangePicker {...p} />
        </FormItem>
      </Col>
    );
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 10)}
          {this.renderSimpleFormButton(null, 12)}
        </Row>
      </>
    );
  };

  renderSimpleFormInitialValues = () => {
    return {};
  };

  renderSimpleForm = () => (
    <Form
      ref={this.formRef}
      initialValues={this.renderSimpleFormInitialValues()}
      onSubmit={this.handleSearch}
      layout="horizontal"
    >
      {this.renderSimpleFormRow()}
    </Form>
  );

  renderForm = () => this.renderSimpleForm();

  // eslint-disable-next-line arrow-body-style
  buildTableOtherConfig = () => {
    // 可以配置额外的Table属性

    return {};
  };

  restoreColumnsOtherConfigArray = () => {
    const columnsOtherConfigArray = this.getColumn().map(item => {
      return { dataIndex: item.dataIndex, show: true, fixed: item.fixed || '' };
    });

    this.columnsOtherConfig = columnsOtherConfigArray;
  };

  buildTableConfig = () => {
    const { tableSize } = this.state;

    const columns = this.getColumnMerged();

    return {
      ...this.buildTableOtherConfig(),
      columns,
      size: tableSize,
    };
  };

  setTableSize = key => {
    this.setState({ tableSize: key });
  };

  setColumnsMap = e => {
    if (Object.keys(e || {}).length === 0) {
      this.restoreColumnsOtherConfigArray();
    } else {
      const columnsOtherConfigArrayChanged = (this.columnsOtherConfig || []).map(item => {
        const { dataIndex } = item;

        if (!isUndefined(e[dataIndex])) {
          const d = e[dataIndex];

          d.show = isUndefined(d.show) ? true : d.show;

          return { ...item, ...d };
        }

        return item;
      });

      this.columnsOtherConfig = columnsOtherConfigArrayChanged;
    }

    const { counterSetColumnsOtherConfig } = this.state;

    this.setState({ counterSetColumnsOtherConfig: counterSetColumnsOtherConfig + 1 });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSortKeyColumns = e => {};

  getColumnsMap = () => {
    const o = {};

    (this.columnsOtherConfig || []).forEach(item => {
      const { dataIndex } = item;

      const temp = { ...{}, ...item };

      if (temp.delete) {
        temp.delete('dataIndex');
      }

      o[`${dataIndex}`] = temp;
    });

    return o;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBatchActionSelect = key => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderTable = config => null;

  renderAlertContent = () => {
    return '';
  };

  renderAlertOption = () => {};

  renderAboveTable = () => {
    const content = this.renderAlertContent();
    const option = this.renderAlertOption();

    if (!content && !option) {
      return null;
    }

    return (
      <div className={styles.alertContainor}>
        <Alert
          message={
            <div className={styles.alertInfo}>
              <div className={styles.alertContent}>{content}</div>
              {option && <div className={styles.alertOption}>{option}</div>}
            </div>
          }
          type="info"
          showIcon
        />
      </div>
    );
  };

  renderExtraAction = () => null;

  renderBatchActionMenu = () => [];

  renderBatchAction = () => {
    const { showSelect, selectedDataTableDataRows } = this.state;

    const selectRows = isArray(selectedDataTableDataRows) ? selectedDataTableDataRows : [];

    if (showSelect) {
      const batchActionMenu = this.renderBatchActionMenu();

      if ((batchActionMenu || []).length > 0) {
        return (
          <>
            <BatchAction.Button
              onSelect={key => {
                this.onBatchActionSelect(key);
              }}
              menus={batchActionMenu}
              disabled={selectRows.length === 0}
            >
              批量操作
            </BatchAction.Button>

            <Divider type="vertical" />
          </>
        );
      }
    }

    return null;
  };

  render() {
    const { listTitle, tableSize, refreshing } = this.state;

    const extraAction = this.renderExtraAction();

    return (
      <PageHeaderWrapper title={this.getPageName()}>
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
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default SingleList;
