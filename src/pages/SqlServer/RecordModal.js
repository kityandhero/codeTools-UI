import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Modal, message, notification, Divider, Table } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import styles from './RecordModal.less';

@connect(({ sqlServer, loading }) => ({
  sqlServer,
  loading: loading.models.sqlServer,
}))
class RecordModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      metaData: [],
      dataLoading: false,
      opening: false,
      visible: false,
    };
  }

  componentDidMount() {
    const { visible } = this.props;
    this.setState({ visible });

    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  loadData = () => {
    const { dispatch } = this.props;

    this.setState({
      dataLoading: true,
    });
    dispatch({
      type: 'sqlServer/listcache',
      payload: {
        timespan: new Date().getTime(),
      },
    }).then(() => {
      this.setState({
        dataLoading: false,
      });

      const {
        sqlServer: { data },
      } = this.props;

      const { message: messageText, data: listData } = data;
      if (messageText !== '') {
        message.error(messageText);
      }

      this.setState({
        metaData: listData,
      });
    });
  };

  handleOpen = record => {
    const { dispatch, afterOK } = this.props;
    this.setState({ opening: true });
    const submitValue = record;
    submitValue.conn = record.connectionString;
    submitValue.dbtype = 'SqlServer';

    dispatch({
      type: 'sqlServer/open',
      payload: submitValue,
    }).then(() => {
      this.setState({ opening: false });
      const {
        sqlServer: { data },
      } = this.props;

      const { message: messageText, data: databaseList } = data;
      if (messageText !== '') {
        message.error(messageText);
      }

      afterOK(databaseList || [], submitValue.conn);

      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '已通过数据库连接字符串成功连接数据库。',
      });
    });
  };

  handleRemove = record => {
    const { dispatch } = this.props;
    this.setState({
      dataLoading: true,
    });

    dispatch({
      type: 'sqlServer/removecache',
      payload: {
        id: record.id,
      },
    }).then(() => {
      this.setState({ dataLoading: false });
      const {
        sqlServer: { data },
      } = this.props;

      const { message: messageText } = data;
      if (messageText !== '') {
        message.error(messageText);
      }

      this.loadData();

      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '已经删除指定的数据库链接缓存。',
      });
    });
  };

  handleCancel = e => {
    e.preventDefault();
    const { afterCancel } = this.props;
    this.setState({ visible: false });
    afterCancel();
  };

  render() {
    const { visible, dataLoading, metaData, opening } = this.state;

    const listData = (metaData || []).map(item => {
      const o = item;
      o.key = o.id;
      return o;
    });

    const columnsDatatable = [
      {
        title: '记录名',
        dataIndex: 'name',
        width: 200,
        render: val => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {val}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '标识',
        dataIndex: 'id',
        align: 'center',
        render: (val, record) => (
          <Fragment>
            <Ellipsis tooltip lines={1}>
              {record.id}
            </Ellipsis>
          </Fragment>
        ),
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleOpen(record)}>打开</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleRemove(record)}>删除</a>
          </Fragment>
        ),
      },
    ];

    return (
      <Modal
        title="Sql Server 数据库打开记录"
        visible={visible}
        // onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={700}
        className={styles.customModalContainor}
      >
        <Table
          loading={dataLoading || opening}
          dataSource={listData}
          pagination={false}
          columns={columnsDatatable}
          expandedRowRender={record => (
            <div>
              <p>{record.connectionString}</p>
            </div>
          )}
        />
      </Modal>
    );
  }
}

export default RecordModal;
