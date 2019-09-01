import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Form,
  Icon,
  Dropdown,
  Badge,
  Menu,
  Divider,
  Button,
  Modal,
  notification,
} from 'antd';

import {
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

const { confirm } = Modal;

@connect(({ planSale, product, global, loading }) => ({
  planSale,
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class Index extends PagerList {
  componentAuthority = accessWayCollection.planSale.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '预售中的商品列表',
        paramsKey: 'efd50999-24ea-44ff-a333-fd28f753a1c4',
        loadApiPath: 'planSale/list',
        startTimeAlias: 'beginPlanSaleTime',
        endTimeAlias: 'endPlanSaleTime',
        dateRangeFieldName: '预售时段',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  getApiData = props => {
    const {
      planSale: { data },
    } = props;

    return data;
  };

  getPlanSaleStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 0:
        result = 'default';
        break;
      case 10:
        result = 'processing';
        break;
      case 20:
        result = 'success';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  handleItem = (dataId, handler) => {
    const { customData } = this.state;
    let indexData = -1;
    customData.list.forEach((o, index) => {
      const { planSaleId } = o;
      if (planSaleId === dataId) {
        indexData = index;
      }
    });

    if (indexData >= 0) {
      customData.list[indexData] = handler(customData.list[indexData]);
      this.setState({ customData });
    }
  };

  // deleteItem = record => {
  //   const { dispatch } = this.props;

  //   this.setState({ processing: true });

  //   dispatch({
  //     type: 'planSale/remove',
  //     payload: {
  //       planSalesId: record.planSalesId,
  //     },
  //   }).then(() => {
  //     const {
  //       planSale: { data },
  //     } = this.props;

  //     const { dataSuccess } = data;
  //     if (dataSuccess) {
  //       requestAnimationFrame(() => {
  //         notification.success({
  //           placement: 'bottomRight',
  //           message: '操作结果',
  //           description: '数据已经删除成功，请进行后续操作。',
  //         });
  //       });

  //       this.setState({ processing: false });
  //       this.reloadData();
  //     }
  //   });
  // };

  goToAdd = () => {
    const { dispatch } = this.props;

    const location = {
      pathname: `/marketing/planSale/add`,
    };

    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { productId } = record;

    const location = {
      pathname: `/product/edit/load/${productId}/key/planSale/list`,
    };

    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'recommend':
        this.setRecommend(record);
        break;
      case 'hot':
        this.setHot(record);
        break;
      case 'gift':
        this.setGift(record);
        break;
      case 'onLineState':
        this.setProductState(record, 1);
        break;
      case 'offLineState':
        this.setProductState(record, 0);
        break;
      case 'recoverState':
        this.setProductState(record, 3);
        break;
      default:
        break;
    }
  };

  showSourceDrawer = () => {
    this.setState({
      sourceDrawerVisible: true,
    });
  };

  hideSourceDrawer = () => {
    this.setState({ sourceDrawerVisible: false });
  };

  onSourceDrawerClose = () => {
    this.setState({ sourceDrawerVisible: false });
  };

  afterOperateSuccess = () => {
    const { pageSize } = this.state;

    this.loadData({ pageNo: 1, pageSize });
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'setWait':
        this.setWait(record);
        break;
      case 'setOpening':
        this.setOpening(record);
        break;
      case 'setOver':
        this.setOver(record);
        break;
      case 'remove':
        this.removeConfirm(record);
        break;
      default:
        break;
    }
  };

  setWait = record => {
    const { dispatch } = this.props;
    const { planSaleId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'planSale/setWait',
      payload: { planSaleId },
    }).then(() => {
      const {
        planSale: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已暂停',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  setOpening = record => {
    const { dispatch } = this.props;
    const { planSaleId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'planSale/setOpening',
      payload: { planSaleId },
    }).then(() => {
      const {
        planSale: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已开始',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  setOver = record => {
    const { dispatch } = this.props;
    const { planSaleId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'planSale/setOver',
      payload: { planSaleId },
    }).then(() => {
      const {
        planSale: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已完结',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  removeConfirm = record => {
    const that = this;
    const { processing } = that.state;

    confirm({
      title: '移除预售设置',
      content: `确定要移除吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        that.remove(record);
      },
      onCancel() {},
    });
  };

  remove = record => {
    const { dispatch } = this.props;
    const { planSaleId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'planSale/remove',
      payload: { planSaleId },
    }).then(() => {
      const {
        planSale: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已移除',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  renderSimpleFormRow = () => {
    const { dataLoading, processing, dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            {this.renderSearchInputFormItem(fieldData.productId, 'productId')}
          </Col>
          <Col md={6} sm={24}>
            {this.renderSearchInputFormItem(fieldData.title, 'title')}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 12)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            {this.renderSearchPlanSaleStateFormItem()}
          </Col>
          {this.renderSimpleFormButton(
            <>
              {this.checkAuthority(accessWayCollection.product.add) ? (
                <>
                  <Divider type="vertical" />
                  <Button
                    key="buttonPlus"
                    disabled={dataLoading || processing}
                    type="primary"
                    icon="plus"
                    onClick={this.goToAdd}
                  >
                    新增预售
                  </Button>
                </>
              ) : null}
            </>,
            18,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.productName,
      dataIndex: 'productName',
      align: 'left',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.beginPlanSaleTime,
      dataIndex: 'beginPlanSaleTime',
      width: 180,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm:ss')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.endPlanSaleTime,
      dataIndex: 'endPlanSaleTime',
      width: 180,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm:ss')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.outTime,
      dataIndex: 'outTime',
      width: 140,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.planSaleId,
      dataIndex: 'planSaleId',
      width: 140,
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
      title: fieldData.state,
      dataIndex: 'state',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Badge
            status={this.getPlanSaleStateBadgeStatus(val)}
            text={this.getPlanSaleStateName(val)}
          />
        </>
      ),
    },
    {
      title: fieldData.inTime,
      dataIndex: 'inTime',
      width: 180,
      fixed: 'right',
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm:ss')}
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
            disabled={!this.checkAuthority(accessWayCollection.product.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)} disabled>
                {this.checkAuthority(accessWayCollection.planSale.setWait) &&
                record.state === 10 ? (
                  <Menu.Item key="setWait">
                    <Icon type="pause-circle" />
                    暂停
                  </Menu.Item>
                ) : null}

                {this.checkAuthority(accessWayCollection.planSale.setOpening) &&
                record.state === 0 ? (
                  <Menu.Item key="setOpening">
                    <Icon type="play-circle" />
                    开始
                  </Menu.Item>
                ) : null}

                {this.checkAuthority(accessWayCollection.planSale.setOver) &&
                record.state === 10 ? (
                  <Menu.Item key="setOver">
                    <Icon type="minus-circle" />
                    完结
                  </Menu.Item>
                ) : null}

                {this.checkAuthority(accessWayCollection.planSale.remove) && record.state === 0 ? (
                  <Menu.Item key="remove">
                    <Icon type="delete" />
                    移除
                  </Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Icon type="read" />
            详情
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Index;
