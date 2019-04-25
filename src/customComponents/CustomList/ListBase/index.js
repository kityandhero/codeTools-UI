import React, { Fragment } from 'react';
import { Row, Col, Card, Form, Button, DatePicker, BackTop, Divider } from 'antd';

import { defaultListState, buildFieldDescription } from '@/utils/tools';
import CustomBase from '@/customComponents/CustomBase';
import PageHeaderWrapperCustom from '@/customComponents/PageHeaderWrapperCustom';

import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class SingleList extends CustomBase {
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  preInit = () => {
    this.setState(this.extendState(), () => {
      this.init();
    });
  };

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

  supplementLoadRequestParams = o => o;

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = data => {};

  // eslint-disable-next-line no-unused-vars
  loadData = (params, callback) => {
    // 需要继承重载
  };

  handleFormReset = () => {
    // 需要继承重载
  };

  initLoad = () => {
    // 需要继承重载
  };

  initOther = () => {
    this.initLoad();
  };

  refreshGrid = () => {
    const { lastLoadParams } = this;
    this.loadData(lastLoadParams);
  };

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      this.loadData({
        ...values,
      });
    });
  };

  renderSimpleFormButton = (expandButton, ColMd = 6) => {
    const { dataLoading } = this.state;

    return (
      <Col md={ColMd} sm={24}>
        <span className={styles.submitButtons}>
          <Button disabled={dataLoading} type="primary" icon="search" htmlType="submit">
            查询
          </Button>
          <Button
            disabled={dataLoading}
            style={{ marginLeft: 8 }}
            icon="reload"
            onClick={this.handleFormReset}
          >
            重置
          </Button>
          <Divider type="vertical" />
          <Button
            disabled={dataLoading}
            className={styles.searchButtonMarginLeft}
            icon="reload"
            onClick={this.refreshGrid}
          >
            刷新
          </Button>
          {expandButton}
        </span>
      </Col>
    );
  };

  renderSimpleFormRangePicker = (dateRangeFieldName, ColMd = 8) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

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
          })(
            <RangePicker
              style={{ width: '100%' }}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['开始时间', '结束时间']}
              onChange={this.onDateRangeChange}
            />
          )}
        </FormItem>
      </Col>
    );
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 10)}
          {this.renderSimpleFormButton(null, 12)}
        </Row>
      </Fragment>
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
    const columns = this.getColumn();

    return {
      ...this.buildTableOtherConfig(),
      columns,
    };
  };

  // eslint-disable-next-line no-unused-vars
  renderTable = config => null;

  render() {
    return (
      <PageHeaderWrapperCustom title={this.getPageName()}>
        <Card bordered={false} className={styles.containorBox}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderTable()}
          </div>
        </Card>
        {this.renderOther()}
        <BackTop />
      </PageHeaderWrapperCustom>
    );
  }
}

export default SingleList;
