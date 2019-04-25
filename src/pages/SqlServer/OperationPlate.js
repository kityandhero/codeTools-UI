import React, { PureComponent, Fragment } from 'react';
// import ReactDOM from 'react-dom';
// import moment from 'moment';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  // List,
  Avatar,
  Input,
  Button,
  // Select,
  // DatePicker,
  // Checkbox,
  Tooltip,
  Radio,
  // Drawer,
  BackTop,
  Spin,
  // Divider,
  message,
  notification,
} from 'antd';

import Ellipsis from '@/components/Ellipsis';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import OpenModal from './OpenModal';
import RecordModal from './RecordModal';
import DrawerNhibernate from '../Nhibernate/DrawerNhibernate';
import DrawerDapperBySelfBuild from '../DapperBySelfBuild/DrawerDapperBySelfBuild';

import styles from './OperationPlate.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect(({ sqlserver, folder, loading }) => ({
  sqlserver,
  folder,
  loading: loading.models.sqlserver,
}))
@Form.create()
class OperationPlate extends PureComponent {
  state = {
    connectionString: '',
    // version: '',
    // mounted: false,
    folderOpening: false,
    openVisible: false,
    recordVisible: false,
    loadDatabase: false,
    loadDataEntity: false,
    nhibernatePanelVisible: false,
    dapperBySelfBuildPanelVisible: false,
    tablelist: '',
    databaseList: [],
    selecteddataTableDataRows: [],
    dataTableData: {
      count: 0,
      list: [],
      pagination: {},
    },
    selectDatabase: {},
    // metaData: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const conn = localStorage.getItem('sqlServerConnectionString') || '';
    const version = localStorage.getItem('sqlServerVersion') || '';

    if (conn !== '' && version !== '') {
      this.setState({
        loadDatabase: true,
      });
      dispatch({
        type: 'sqlserver/open',
        payload: {
          conn,
          version,
          dbtype: 'SqlServer',
        },
      }).then(() => {
        const {
          sqlserver: { data },
        } = this.props;

        const { message: messageText, data: databaseList } = data;
        if (messageText !== '') {
          message.error(messageText);
        }

        this.afterOpenOk(databaseList || [], conn, version);

        notification.success({
          placement: 'bottomRight',
          message: '操作结果',
          description: '已通过数据库连接字符串缓存成功连接数据库。',
        });
      });
    }
  }

  componentWillUnmount() {}

  onChange = e => {
    const tag = e.target.value;
    const { dispatch } = this.props;
    const { databaseList } = this.state;
    let seleteItem = {};

    databaseList.forEach(element => {
      if (element.tag === tag) {
        seleteItem = element;
        this.setState({ selectDatabase: seleteItem });
      }
    });

    if (seleteItem !== {}) {
      this.setState({ loadDataEntity: true });
      dispatch({
        type: 'sqlserver/getlist',
        payload: {
          conntag: seleteItem.tag,
          pageNo: 1,
          pageSize: 10,
        },
      }).then(() => {
        this.handleResultData();

        notification.success({
          placement: 'bottomRight',
          message: '操作结果',
          description: `已打开数据路${seleteItem.name}。`,
        });
      });
    }
  };

  openFolder = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.setState({ folderOpening: true });

    dispatch({
      type: 'folder/openfolder',
      payload: {
        timespan: new Date().getTime(),
      },
    }).then(() => {
      this.setState({ folderOpening: false });
      message.success('已打开代码文件夹。');
    });
  };

  refreshGrid = pageNo => {
    const { dispatch } = this.props;
    const { dataTableData, selectDatabase } = this.state;
    const { pagination } = dataTableData;

    const params = {
      pageNo: (pageNo || 1) <= 1 ? 1 : pageNo,
      pageSize: pagination.pageSize,
      conntag: selectDatabase.tag,
    };

    this.setState({ loadDataEntity: true });

    dispatch({
      type: 'sqlserver/getlist',
      payload: params,
    }).then(() => {
      this.handleResultData();
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues, selectDatabase } = this.state;

    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      conntag: selectDatabase.tag,
      ...formValues,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    this.setState({ loadDataEntity: true });

    dispatch({
      type: 'sqlserver/getlist',
      payload: params,
    }).then(() => {
      this.handleResultData();
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    const { selectDatabase } = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    this.setState({ loadDataEntity: true });

    dispatch({
      type: 'sqlserver/getlist',
      payload: {
        conntag: selectDatabase.tag,
        pageNo: 1,
        pageSize: 10,
      },
    }).then(() => {
      this.handleResultData();
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    const { selectDatabase } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      this.setState({ loadDataEntity: true });

      dispatch({
        type: 'sqlserver/getlist',
        payload: {
          conntag: selectDatabase.tag,
          ...values,
        },
      }).then(() => {
        this.handleResultData();
      });
    });
  };

  handleResultData = () => {
    this.setState({ loadDataEntity: false });
    const {
      sqlserver: { data },
    } = this.props;

    const {
      message: messageText,
      data: {
        dataTable: { total, list, pageNo, pageSize },
      },
    } = data;

    if (messageText !== '') {
      message.error(messageText);
    }

    const listData = list.map(item => {
      const o = item;
      o.key = item.rowNumber;
      return o;
    });

    this.setState({
      dataTableData: {
        count: total,
        list: listData,
        pagination: {
          total,
          pageSize,
          current: parseInt(pageNo, 10) || 1,
        },
      },
    });
  };

  showOpenModal = () => {
    this.setState({
      openVisible: true,
    });
    this.setState({
      loadDatabase: true,
    });
  };

  showRecordModal = () => {
    this.setState({
      recordVisible: true,
    });
    this.setState({
      recordVisible: true,
    });
  };

  afterOpenOk = (databaseArray, conn) => {
    this.setState({
      openVisible: false,
    });
    this.setState({
      databaseList: databaseArray,
    });
    this.setState({
      connectionString: conn,
    });

    this.setState({
      loadDatabase: false,
    });
  };

  afterRecordOk = (databaseArray, conn) => {
    this.setState({
      recordVisible: false,
    });
    this.setState({
      databaseList: databaseArray,
    });
    this.setState({
      connectionString: conn,
    });

    this.setState({
      loadDatabase: false,
    });
  };

  afterOpenCanel = () => {
    this.setState({
      openVisible: false,
    });
    this.setState({
      loadDatabase: false,
    });
  };

  afterRecordCanel = () => {
    this.setState({
      recordVisible: false,
    });
    this.setState({
      loadDatabase: false,
    });
  };

  handleSelectRows = rows => {
    const list = [];
    rows.forEach(o => {
      list.push(`${o.name}|${o.dataEntityType}`);
    });

    const v = list.join();

    this.setState({
      tablelist: v,
    });
    this.setState({
      selecteddataTableDataRows: rows,
    });
  };

  showNhibernatePanelDrawer = () => {
    this.setState({
      nhibernatePanelVisible: true,
    });
  };

  afterNhibernatePanelDrawerCancel = () => {
    this.setState({
      nhibernatePanelVisible: false,
    });
  };

  showDapperBySelfBuildPanelDrawer = () => {
    this.setState({
      dapperBySelfBuildPanelVisible: true,
    });
  };

  afterDapperBySelfBuildPanelDrawerCancel = () => {
    this.setState({
      dapperBySelfBuildPanelVisible: false,
    });
  };

  clearConnectionCatch = () => {
    localStorage.removeItem('sqlServerConnectionString');
    localStorage.removeItem('sqlServerVersion');
    notification.success({
      placement: 'bottomRight',
      message: '操作结果',
      description: '数据库链接缓存已经清除！',
    });
  };

  renderDatabaseList() {
    const { databaseList, loadDatabase } = this.state;

    const list = databaseList || [];

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    let result = '没有数据库列表信息';

    if (list.length > 0) {
      result = (
        <Spin spinning={loadDatabase}>
          <RadioGroup onChange={this.onChange}>
            {list.map(item => (
              <Radio style={radioStyle} key={item.tag} value={item.tag}>
                {item.name}
              </Radio>
            ))}
          </RadioGroup>
        </Spin>
      );
    }

    return result;
  }

  renderSimpleForm() {
    const { form } = this.props;

    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="关键词">
              {getFieldDecorator('keywords')(<Input placeholder="请输入数据表表名" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="架构">
              {getFieldDecorator('schema')(<Input placeholder="请输入架构名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" icon="search" htmlType="submit" onClick={this.handleSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} icon="reload" onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { dispatch } = this.props;
    const {
      folderOpening,
      openVisible,
      recordVisible,
      loadDataEntity,
      loadDatabase,
      databaseList,
      dataTableData,
      selecteddataTableDataRows,
      connectionString,
      nhibernatePanelVisible,
      dapperBySelfBuildPanelVisible,
      selectDatabase,
      tablelist,
    } = this.state;

    const { name: selectDatabaseName } = selectDatabase;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <img className={styles.imgInfo} src="./database.png" alt="database" />
          <Avatar size="large" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            <span
              style={{
                marginRight: '10px',
              }}
            >
              链接数据库，生成数据层
            </span>
            <Tooltip placement="top" title="打开数据库">
              <Button
                shape="circle"
                size="small"
                type="primary"
                icon="folder-add"
                onClick={this.showOpenModal}
              />
            </Tooltip>
            <Tooltip placement="top" title="数据库链接记录">
              <Button
                shape="circle"
                size="small"
                type="primary"
                icon="database"
                onClick={this.showRecordModal}
                style={{
                  marginLeft: '10px',
                }}
              />
            </Tooltip>
            {/* <Tooltip placement="top" title="清除数据库链接缓存">
              <Button
                shape="circle"
                size="small"
                type="primary"
                icon="delete"
                onClick={this.clearConnectionCatch}
                style={{
                  marginLeft: '10px',
                }}
              />
            </Tooltip> */}
            <Tooltip placement="top" title="打开代码生成文件夹">
              <Button
                shape="circle"
                size="small"
                type="primary"
                icon="folder-open"
                loading={folderOpening}
                disabled={folderOpening}
                onClick={this.openFolder}
                style={{
                  marginLeft: '10px',
                }}
              />
            </Tooltip>
            <OpenModal
              visible={openVisible}
              dispatch={dispatch}
              afterOK={this.afterOpenOk}
              afterCancel={this.afterOpenCanel}
            />
            <RecordModal
              visible={recordVisible}
              dispatch={dispatch}
              afterOK={this.afterRecordOk}
              afterCancel={this.afterRecordCanel}
            />
          </div>
          <div>{`当前连接字符串：${connectionString}`}</div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>数据库数</p>
          <p>{(databaseList || []).length}个</p>
        </div>
        <div className={styles.statItem}>
          <p>数据表数</p>
          <p>{dataTableData.count}个</p>
        </div>
        <div className={styles.statItem}>
          <p>当前页</p>
          <p>第{dataTableData.pagination.current || 0}页</p>
        </div>
      </div>
    );

    const columnsDatatable = [
      {
        title: '序号',
        dataIndex: 'rowNumber',
        width: 80,
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '全名',
        dataIndex: 'key',
        render: (val, record) => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {record.name}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '表名',
        dataIndex: 'name',
        width: 280,
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val.split('.').length === 2 ? val.split('.')[1] : val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '架构名',
        dataIndex: 'schema',
        width: 100,
        align: 'center',
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '类型',
        dataIndex: 'dataEntityType',
        width: 100,
        align: 'center',
        render: () => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {'数据表'}
            </Ellipsis>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper content={pageHeaderContent} extraContent={extraContent}>
        <Card
          style={{ marginBottom: 24 }}
          title="数据库列表"
          bordered={false}
          // bodyStyle={{ padding: 0 }}
        >
          {this.renderDatabaseList()}
        </Card>
        <Card bordered={false} className={styles.activeCard} title="数据表列表">
          <div className={styles.tableList}>
            <Spin spinning={loadDatabase}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <div className={styles.tableListOperator}>
                <span>
                  <Button
                    disabled={
                      (selectDatabaseName || '') === '' || selecteddataTableDataRows.length === 0
                    }
                    onClick={this.showNhibernatePanelDrawer}
                  >
                    生成基于Nhabernate的数据层
                  </Button>
                  <Button
                    disabled={
                      (selectDatabaseName || '') === '' || selecteddataTableDataRows.length === 0
                    }
                    onClick={this.showDapperBySelfBuildPanelDrawer}
                  >
                    生成基于自有的数据层
                  </Button>
                  <Button
                    disabled={
                      (selectDatabaseName || '') === '' || selecteddataTableDataRows.length === 0
                    }
                    // onClick={this.showNhibernatePanelDrawer}
                  >
                    生成基于自定义模板的数据层
                  </Button>
                </span>
              </div>
            </Spin>
            <StandardTable
              selectedRows={selecteddataTableDataRows}
              loading={loadDataEntity}
              data={dataTableData}
              columns={columnsDatatable}
              expandedRowRender={record => (
                <div>
                  <p>
                    <span className="bold">文件名称：</span>
                    {record.name}
                  </p>
                </div>
              )}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <DrawerNhibernate
          visible={nhibernatePanelVisible}
          selectDatabaseName={selectDatabaseName}
          afterCancel={this.afterNhibernatePanelDrawerCancel}
          dbtype="SqlServer"
          tablelist={tablelist}
          conntag={selectDatabase.tag}
        />
        <DrawerDapperBySelfBuild
          visible={dapperBySelfBuildPanelVisible}
          selectDatabaseName={selectDatabaseName}
          afterCancel={this.afterDapperBySelfBuildPanelDrawerCancel}
          dbtype="SqlServer"
          tablelist={tablelist}
          conntag={selectDatabase.tag}
        />
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default OperationPlate;
