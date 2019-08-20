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
  buildFieldDescription,
  copyToClipboard,
  replaceTargetText,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';
import ImageBox from '@/customComponents/ImageBox';
import defaultSettings from '../../../../config/defaultSettings';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;
const { confirm } = Modal;

@connect(({ qRCode, global, loading }) => ({
  qRCode,
  global,
  loading: loading.models.qRCode,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.qRCode.list;

  getApiData = props => {
    const {
      qRCode: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageSize: 6,
    pageName: '二维码列表',
    paramsKey: '67070125-2245-4f83-8fd0-aeb759d6e5c3',
    loadApiPath: 'qRCode/list',
  });

  handleItem = (dataId, handler) => {
    const { customData } = this.state;
    let indexData = -1;
    customData.list.forEach((o, index) => {
      const { qRCodeId } = o;
      if (qRCodeId === dataId) {
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
      title: '删除二维码',
      content: `确定要删除二维码 ${record == null ? '' : record.title} 吗？`,
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

      o.qRCodeId = record.qRCodeId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'qRCode/remove',
      payload: submitData,
    }).then(() => {
      const {
        qRCode: { data },
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
      pathname: `/qRCode/add`,
    };
    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { pageNo } = this.state;
    const { qRCodeId } = record;
    const location = {
      pathname: `/qRCode/edit/load/${qRCodeId}/${pageNo}/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'delete':
        this.removeConfirm(record);
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
              {getFieldDecorator('title')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.keywords)}
                />,
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(
            this.checkAuthority(accessWayCollection.qRCode.add) ? (
              <>
                <Divider type="vertical" />
                <Button
                  key="buttonPlus"
                  disabled={dataLoading || processing}
                  type="primary"
                  icon="plus"
                  onClick={this.goToAdd}
                >
                  新增二维码
                </Button>
              </>
            ) : null,
            6,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.title,
      dataIndex: 'title',
      width: 220,
      align: 'left',
    },
    {
      title: fieldData.imageUrl,
      dataIndex: 'imageUrl',
      width: 80,
      align: 'center',
      render: val => (
        <>
          <div className={styles.imgBox}>
            <ImageBox
              src={val || defaultSettings.defaultEmptyImage}
              loadingEffect
              errorOverlayVisible
              alt=""
            />
          </div>
        </>
      ),
    },
    {
      title: fieldData.url,
      dataIndex: 'url',

      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: fieldData.sort,
      dataIndex: 'sort',
      width: 100,
      align: 'center',
    },
    {
      title: fieldData.advertisementId,
      dataIndex: 'advertisementId',
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
      title: fieldData.inTime,
      dataIndex: 'inTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip advertisements={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.operate,
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
