import React from 'react';
import { Form, Row, Col, Card, Tooltip, Button, DatePicker, BackTop, Divider } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { defaultListState, buildFieldDescription } from '../../../../utils/tools';
import CustomAuthorization from '../../CustomAuthorization';
import { tableSizeConfig } from '../../../StandardTableCustom';

import DensityAction from '../DensityAction';
import ColumnSetting from '../ColumnSetting';

import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class SingleList extends CustomAuthorization {
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
      ...{
        listTitle: '检索结果',
        tableSize: tableSizeConfig.middle,
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

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.searchData({ formValues: values });
    });
  };

  renderSimpleFormButton = (ColMd = 6) => {
    const { reloading, searching } = this.state;

    return (
      <Col md={ColMd} sm={24}>
        <span className={styles.submitButtons}>
          <Button loading={searching} type="primary" icon={<SearchOutlined />} htmlType="submit">
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
    const { form } = this.props;
    const { getFieldDecorator } = form;

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
        <FormItem label={dateRangeFieldName}>
          {getFieldDecorator('dateRange', {
            rules: [
              {
                required: false,
                message: buildFieldDescription(dateRangeFieldName, '选择'),
              },
            ],
          })(<RangePicker {...p} />)}
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

  renderSimpleForm = () => (
    <Form onSubmit={this.handleSearch} layout="inline">
      {this.renderSimpleFormRow()}
    </Form>
  );

  renderForm = () => this.renderSimpleForm();

  // eslint-disable-next-line arrow-body-style
  buildTableOtherConfig = () => {
    // 可以配置额外的Table属性

    return {};
  };

  buildTableConfig = () => {
    const { tableSize } = this.state;

    const columns = this.getColumn();

    return {
      ...this.buildTableOtherConfig(),
      columns,
      size: tableSize,
    };
  };

  setTableSize = key => {
    this.setState({ tableSize: key });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderTable = config => null;

  renderAboveTable = () => null;

  renderExtraAction = () => null;

  renderBatchAction = () => null;

  render() {
    const { listTitle, tableSize, refreshing } = this.state;

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
                {this.renderExtraAction()}
                {this.renderBatchAction()}
                <Divider type="vertical" />
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
                <ColumnSetting columns={this.getColumn()} />
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
