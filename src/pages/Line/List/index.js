import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Form,
  Input,
  Icon,
  Dropdown,
  Menu,
  Button,
  Divider,
  notification,
  Modal,
  message,
} from 'antd';
import moment from 'moment';

import {
  pretreatmentRequestParams,
  corsTarget,
  copyToClipboard,
  replaceTargetText,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

const FormItem = Form.Item;
const { confirm } = Modal;

@connect(({ line, global, loading }) => ({
  line,
  global,
  loading: loading.models.line,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.line.list;

  getApiData = props => {
    const {
      line: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '配送线路列表',
    paramsKey: 'c3a646bd-9b56-4dc7-9d8f-fc330fd735cc',
    loadApiPath: 'line/list',
  });

  handleItem = (dataId, handler) => {
    const { customData } = this.state;
    let indexData = -1;
    customData.list.forEach((o, index) => {
      const { lineId } = o;
      if (lineId === dataId) {
        indexData = index;
      }
    });

    if (indexData >= 0) {
      customData.list[indexData] = handler(customData.list[indexData]);
      this.setState({ customData });
    }
  };

  removeConfirm = record => {
    const that = this;
    const { processing } = that.state;

    confirm({
      title: '删除线路',
      content: `确定要删除链路 ${record == null ? '' : record.name} 吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        that.remove(record);
      },
      onCancel() {
        message.info('取消了删除操作！');
      },
    });
  };

  remove = record => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      o.lineId = record.lineId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'line/remove',
      payload: submitData,
    }).then(() => {
      const {
        line: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '数据已经删除成功，请进行后续操作。',
          });
        });

        this.setState({ processing: false });
        this.refreshGrid();
      }
    });
  };

  goToAdd = () => {
    const { dispatch } = this.props;
    const location = {
      pathname: `/logistics/line/add`,
    };
    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { pageNo } = this.state;
    const { lineId } = record;
    const location = {
      pathname: `/logistics/line/edit/load/${lineId}/${pageNo}/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  getExportKey = record => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      o.lineId = record.lineId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'line/exportKey',
      payload: submitData,
    }).then(() => {
      const {
        line: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        const {
          data: { fileKey },
        } = data;

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '执行成功，文件即将开始下载！',
          });
        });

        this.setState({ processing: false });

        const corsUrl = corsTarget();
        window.open(`${corsUrl}/Line/ExportFile?fileKey=${fileKey}`, '_self');
      }
    });
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'delete':
        this.removeConfirm(record);
        break;
      case 'export':
        this.getExportKey(record);
        break;
      default:
        break;
    }
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { dataLoading, processing } = this.state;
    const { getFieldDecorator } = form;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            <FormItem label="名称">
              {getFieldDecorator('name')(
                <Input addonBefore={<Icon type="form" />} placeholder="请输入线路名称" />
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(
            this.checkAuthority(accessWayCollection.line.add) ? (
              <>
                <Divider type="vertical" />
                <Button
                  key="buttonPlus"
                  disabled={dataLoading || processing}
                  type="primary"
                  icon="plus"
                  onClick={this.goToAdd}
                >
                  新增线路
                </Button>
              </>
            ) : null,
            6
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '线路名称',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '线路编号',
      dataIndex: 'lineId',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </>
      ),
    },
    {
      title: '司机姓名',
      dataIndex: 'driverName',
      width: 180,
      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: '司机电话',
      dataIndex: 'phone',
      width: 140,
      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: '备用电话',
      dataIndex: 'phoneSpare',
      width: 140,
      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: '排序号',
      dataIndex: 'sort',
      width: 100,
      align: 'center',
    },
    {
      title: '添加时间',
      dataIndex: 'inTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToEdit(record)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                <Menu.Item key="export">
                  <Icon type="export" />
                  导出总单
                </Menu.Item>
                <Menu.Item key="delete">
                  <Icon type="delete" />
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <Icon type="edit" />
            修改
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default List;
