import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Alert,
  Row,
  Col,
  Form,
  Icon,
  Dropdown,
  Menu,
  Divider,
  Button,
  message,
  notification,
} from 'antd';

import {
  getRandomColor,
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  isUndefined,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';
import SourceDrawer from '../SourceDrawer';

import styles from './index.less';

@connect(({ product, areaManage, global, loading }) => ({
  product,
  areaManage,
  global,
  loading: loading.models.product,
}))
@Form.create()
class Index extends PagerList {
  componentAuthority = accessWayCollection.product.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '商品列表',
        paramsKey: 'b1f88ab4-fec9-41b8-a06c-33e4351bbe4f',
        loadApiPath: 'product/list',
        tableScroll: { x: 2080 },
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
      product: { data },
    } = props;

    return data;
  };

  adjustLoadRequestParams = o => {
    const d = o || {};

    if (isUndefined(d.state)) {
      d.state = 1;
    }

    return d;
  };

  handleItem = (dataId, handler) => {
    const { metaOriginalData } = this.state;
    let indexData = -1;
    metaOriginalData.list.forEach((o, index) => {
      const { productId } = o;
      if (productId === dataId) {
        indexData = index;
      }
    });

    if (indexData >= 0) {
      metaOriginalData.list[indexData] = handler(metaOriginalData.list[indexData]);
      this.setState({ metaOriginalData });
    }
  };

  deleteItem = record => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'product/remove',
      payload: {
        productsId: record.productsId,
      },
    }).then(() => {
      const {
        product: { data },
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
        this.reloadData();
      }
    });
  };

  setRecommend = record => {
    const { dispatch } = this.props;
    const { productId, isRecommend: cv } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'product/setRecommend',
      payload: {
        productId,
        select: cv !== 1 ? 1 : 0,
      },
    }).then(() => {
      const {
        product: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '推荐设置操作结果',
            description: `${record.title}${
              (record.spec || '') === '' ? '' : `(${record.spec})`
            } 已${cv !== 1 ? '设为推荐' : '取消推荐设置'}`,
          });
        });

        this.handleItem(record.productId, d => {
          const o = d;
          o.isRecommend = cv !== 1 ? 1 : 0;
          return d;
        });
      }

      this.setState({ processing: false });
    });
  };

  setHot = record => {
    const { dispatch } = this.props;
    const { productId, isHot: cv } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'product/setHot',
      payload: {
        productId,
        select: cv !== 1 ? 1 : 0,
      },
    }).then(() => {
      const {
        product: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '新品设置操作结果',
            description: `${record.title}${
              (record.spec || '') === '' ? '' : `(${record.spec})`
            } 已${cv !== 1 ? '设为新品' : '取消新品设置'}`,
          });
        });

        this.handleItem(record.productId, d => {
          const o = d;
          o.isHot = cv !== 1 ? 1 : 0;
          return d;
        });
      }

      this.setState({ processing: false });
    });
  };

  setGift = record => {
    const { dispatch } = this.props;
    const { productId, isGift: cv } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'product/setGift',
      payload: {
        productId,
        select: cv !== 1 ? 1 : 0,
      },
    }).then(() => {
      const {
        product: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '礼品设置操作结果',
            description: `${record.title}${
              (record.spec || '') === '' ? '' : `(${record.spec})`
            } 已${cv !== 1 ? '设为礼品' : '取消礼品设置'}`,
          });
        });

        this.handleItem(record.productId, d => {
          const o = d;
          o.isGift = cv !== 1 ? 1 : 0;
          return d;
        });
      }

      this.setState({ processing: false });
    });
  };

  setProductState = (record, stateValue) => {
    const { dispatch } = this.props;
    const { productId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'product/setState',
      payload: {
        productId,
        select: stateValue,
      },
    }).then(() => {
      const {
        product: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          let m = '';

          switch (stateValue) {
            case 0:
              m = '设为下架';
              break;
            case 1:
              m = '设为上架';
              break;
            case 3:
              m = '设为回收';
              break;
            default:
              break;
          }

          notification.success({
            placement: 'bottomRight',
            message: '设置操作结果',
            description: `${record.title}${
              (record.spec || '') === '' ? '' : `(${record.spec})`
            } 已${m}`,
          });
        });

        this.handleItem(record.productId, d => {
          const o = d;
          o.state = stateValue;
          return d;
        });
      }

      this.setState({ processing: false });
    });
  };

  cancelDelete = () => {
    message.info('已取消删除操作。');
  };

  goToAdd = () => {
    const { dispatch } = this.props;
    const location = {
      pathname: `/product/add`,
    };
    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    // const { pageNo } = this.state;
    const { productId } = record;
    const location = {
      pathname: `/product/edit/load/${productId}/key/basicInfo`,
      // pathname: `/product/edit/load/${productId}/${pageNo}/basicInfo`,
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

  renderSimpleFormRow = () => {
    const { dataLoading, processing } = this.state;

    const currentOperator = this.getCurrentOperator();

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            {this.renderSearchInputFormItem(
              fieldData.city,
              '',
              currentOperator == null ? '' : currentOperator.cityName || '',
              null,
              'form',
              { disabled: true },
              false,
            )}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.productId, 'productId')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.title, 'title')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchRankFormItem(true)}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchSaleTypeFormItem(true)}
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            {this.renderSearchBrandFormItem(true)}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchProductStateFormItem(true, 1)}
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
                    新增产品
                  </Button>
                </>
              ) : null}
              {this.checkAuthority(accessWayCollection.product.listSource) &&
              this.checkAuthority(accessWayCollection.product.selectFromSource) ? (
                <>
                  <Divider type="vertical" />
                  <Button
                    key="buttonImport"
                    disabled={dataLoading || processing}
                    type="primary"
                    icon="import"
                    onClick={this.showSourceDrawer}
                  >
                    从商品源导入
                  </Button>
                </>
              ) : null}
            </>,
            12,
          )}
        </Row>
      </>
    );
  };

  renderAboveTable = () => (
    <div className={styles.infoBox}>
      <Alert
        message="提示：实时可用库存指商品自由库存；临时占用库存是指被未付款订单暂时占用的库存数，超时未付款，会被释放为自由库存。"
        type="info"
        showIcon
      />
    </div>
  );

  getColumn = () => [
    {
      title: '商品名称',
      dataIndex: 'title',
      align: 'left',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
            {(record.spec || '') === '' ? '' : `(${record.spec})`}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '所属分类',
      dataIndex: 'rankId',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getRankName(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '进货价格',
      dataIndex: 'costPrice',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '服务站价格',
      dataIndex: 'stockPrice',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '微信端售价',
      dataIndex: 'salePrice',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: 'App售价',
      dataIndex: 'appSalePrice',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '推荐奖励金',
      dataIndex: 'returnPrice',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '市场价格',
      dataIndex: 'marketPrice',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            {val ? `￥${val}` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '实时可用库存',
      dataIndex: 'storeCount',
      width: 120,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 80,
      align: 'center',
      render: val => (
        <>
          <Ellipsis
            style={{
              color: getRandomColor(val + 18),
            }}
            tooltip
            lines={1}
          >
            {this.getProductStateName(val, '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '临时被占库存',
      dataIndex: 'waitPayUserOrderOccupancyStoreCount',
      width: 120,
      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: '商品货号',
      dataIndex: 'no',
      width: 100,
      align: 'center',
    },
    {
      title: '销售渠道',
      dataIndex: 'saleType',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getSaleTypeName(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '推荐',
      dataIndex: 'isRecommend',
      width: 60,
      align: 'center',
      render: val => (
        <>
          <Icon
            type={val === 1 ? 'check-circle' : 'close-circle'}
            className={val === 1 ? styles.check : styles.unCheck}
          />
        </>
      ),
    },
    {
      title: '新品',
      dataIndex: 'isHot',
      width: 60,
      align: 'center',
      render: val => (
        <>
          <Icon
            type={val === 1 ? 'check-circle' : 'close-circle'}
            className={val === 1 ? styles.check : styles.unCheck}
          />
        </>
      ),
    },
    {
      title: '礼品',
      dataIndex: 'isGift',
      width: 60,
      align: 'center',
      render: val => (
        <>
          <Icon
            type={val === 1 ? 'check-circle' : 'close-circle'}
            className={val === 1 ? styles.check : styles.unCheck}
          />
        </>
      ),
    },
    {
      title: '编号标识',
      dataIndex: 'productId',
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
      title: '添加时间',
      dataIndex: 'inTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD')}
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
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {this.checkAuthority(accessWayCollection.product.setRecommend) ? (
                  <Menu.Item key="recommend">
                    <Icon type={record.isRecommend === 1 ? 'close-circle' : 'check-circle'} />
                    {record.isRecommend === 1 ? '取消推荐' : '设为推荐'}
                  </Menu.Item>
                ) : null}
                {this.checkAuthority(accessWayCollection.product.setHot) ? (
                  <Menu.Item key="hot">
                    <Icon type={record.isHot === 1 ? 'close-circle' : 'check-circle'} />
                    {record.isHot === 1 ? '取消新品' : '设为新品'}
                  </Menu.Item>
                ) : null}

                {this.checkAuthority(accessWayCollection.product.setGift) ? (
                  <Menu.Item key="gift">
                    <Icon type={record.isGift === 1 ? 'close-circle' : 'check-circle'} />
                    {record.isGift === 1 ? '取消礼品' : '设为礼品'}
                  </Menu.Item>
                ) : null}

                {record.state !== 1 && this.checkAuthority(accessWayCollection.product.setState) ? (
                  <Menu.Item key="onLineState">
                    <Icon type="up-circle" />
                    上架
                  </Menu.Item>
                ) : null}
                {record.state !== 0 && this.checkAuthority(accessWayCollection.product.setState) ? (
                  <Menu.Item key="offLineState">
                    <Icon type="down-circle" />
                    下架
                  </Menu.Item>
                ) : null}

                {record.state !== 3 && this.checkAuthority(accessWayCollection.product.setState) ? (
                  <Menu.Item key="recoverState">
                    <Icon type="right-circle" />
                    回收
                  </Menu.Item>
                ) : null}
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

  renderOther = () => {
    const { sourceDrawerVisible } = this.state;

    if (
      this.checkAuthority(accessWayCollection.product.listSource) &&
      this.checkAuthority(accessWayCollection.product.selectFromSource)
    ) {
      return (
        <SourceDrawer
          visible={sourceDrawerVisible}
          width={1200}
          onClose={this.hideSourceDrawer}
          afterOperateSuccess={this.afterOperateSuccess}
          afterClose={this.onSourceDrawerClose}
        />
      );
    }

    return null;
  };
}

export default Index;
