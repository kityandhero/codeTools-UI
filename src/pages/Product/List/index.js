import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
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
  isInvalid,
  searchFromList,
  refitCommonData,
  buildFieldDescription,
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/CustomList/PagerList';

import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';
import SourceDrawer from '../SourceDrawer';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ product, areaManage, global, loading }) => ({
  product,
  areaManage,
  global,
  loading: loading.models.product,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.product.list;

  getApiData = props => {
    const {
      product: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '商品列表',
    paramsKey: 'b1f88ab4-fec9-41b8-a06c-33e4351bbe4f',
    loadApiPath: 'product/list',
    tableScroll: { x: 1780 },
  });

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  cityList = () => {
    const { global } = this.props;
    return refitCommonData(global.cityList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getCityName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.cityList());
    return item == null ? '未知' : item.name;
  };

  brandList = () => {
    const { global } = this.props;
    return refitCommonData(global.brandList, {
      key: '-10000',
      name: '不限',
      flag: '-10000',
    });
  };

  getBrandName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.brandList());
    return item == null ? '未知' : item.name;
  };

  saleTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.saleTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getSaleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.saleTypeList());
    return item == null ? '未知' : item.name;
  };

  rankList = () => {
    const { global } = this.props;
    return refitCommonData(global.rankList, {
      key: '-10000',
      name: '不限',
      flag: '-10000',
    });
  };

  getRankName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.rankList());
    return item == null ? '未知' : item.name;
  };

  productStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.productStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getProductStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.productStateList());
    return item == null ? '未知' : item.name;
  };

  handleItem = (dataId, handler) => {
    const { customData } = this.state;
    let indexData = -1;
    customData.list.forEach((o, index) => {
      const { productId } = o;
      if (productId === dataId) {
        indexData = index;
      }
    });

    if (indexData >= 0) {
      customData.list[indexData] = handler(customData.list[indexData]);
      this.setState({ customData });
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
        this.refreshGrid();
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
    const { form } = this.props;
    const { dataLoading, processing } = this.state;
    const { getFieldDecorator } = form;
    const currentOperator = this.getCurrentOperator();

    const rankData = this.rankList();
    const rankOption = [];

    rankData.forEach(item => {
      const { name, flag } = item;
      rankOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const brandData = this.brandList();
    const brandOption = [];

    brandData.forEach(item => {
      const { name, flag } = item;
      brandOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const saleTypeData = this.saleTypeList();
    const saleTypeOption = [];

    saleTypeData.forEach(item => {
      const { name, flag } = item;
      saleTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const productStateData = this.productStateList();
    const productStateOption = [];

    productStateData.forEach(item => {
      const { name, flag } = item;
      productStateOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            <FormItem label={fieldData.city}>
              <Input
                addonBefore={<Icon type="form" />}
                disabled
                value={currentOperator == null ? '' : currentOperator.cityName || ''}
              />
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.productId}>
              {getFieldDecorator('productId')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.productId, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.title}>
              {getFieldDecorator('title')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.title, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.rankId}>
              {getFieldDecorator('rankId', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.type, '选择') },
                ],
                initialValue: rankData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.type, '选择')}
                  style={{ width: '100%' }}
                >
                  {rankOption}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.saleType}>
              {getFieldDecorator('saleType', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.saleType, '选择') },
                ],
                initialValue: saleTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.saleType, '选择')}
                  style={{ width: '100%' }}
                >
                  {saleTypeOption}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            <FormItem label={fieldData.brand}>
              {getFieldDecorator('brand', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.brand, '选择') },
                ],
                initialValue: brandData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.brand, '选择')}
                  style={{ width: '100%' }}
                >
                  {brandOption}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.state}>
              {getFieldDecorator('state', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.state, '选择') },
                ],
                initialValue: productStateData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.state, '选择')}
                  style={{ width: '100%' }}
                >
                  {productStateOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(
            <Fragment>
              {this.checkAuthority(accessWayCollection.product.add) ? (
                <Fragment>
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
                </Fragment>
              ) : null}
              {this.checkAuthority(accessWayCollection.product.listSource) &&
              this.checkAuthority(accessWayCollection.product.selectFromSource) ? (
                <Fragment>
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
                </Fragment>
              ) : null}
            </Fragment>,
            12
          )}
        </Row>
      </Fragment>
    );
  };

  getColumn = () => [
    {
      title: '商品名称',
      dataIndex: 'title',
      align: 'left',
      render: (val, record) => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val}
            {(record.spec || '') === '' ? '' : `(${record.spec})`}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '所属分类',
      dataIndex: 'rankId',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {this.getRankName(val)}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '进货价格',
      dataIndex: 'costPrice',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis className={styles.price} tooltip lines={1}>
            ￥{val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '服务站价格',
      dataIndex: 'stockPrice',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis className={styles.price} tooltip lines={1}>
            ￥{val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '微信端售价',
      dataIndex: 'salePrice',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis className={styles.price} tooltip lines={1}>
            ￥{val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: 'App售价',
      dataIndex: 'appSalePrice',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis className={styles.price} tooltip lines={1}>
            ￥{val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '市场价格',
      dataIndex: 'marketPrice',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis className={styles.price} tooltip lines={1}>
            ￥{val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '库存',
      dataIndex: 'storeCount',
      width: 80,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 80,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis
            style={{
              color: getRandomColor(val + 18),
            }}
            tooltip
            lines={1}
          >
            {this.getProductStateName(val, '--')}
          </Ellipsis>
        </Fragment>
      ),
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
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {this.getSaleTypeName(val)}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '推荐',
      dataIndex: 'isRecommend',
      width: 60,
      align: 'center',
      render: val => (
        <Fragment>
          <Icon
            type={val === 1 ? 'check-circle' : 'close-circle'}
            className={val === 1 ? styles.check : styles.unCheck}
          />
        </Fragment>
      ),
    },
    {
      title: '新品',
      dataIndex: 'isHot',
      width: 60,
      align: 'center',
      render: val => (
        <Fragment>
          <Icon
            type={val === 1 ? 'check-circle' : 'close-circle'}
            className={val === 1 ? styles.check : styles.unCheck}
          />
        </Fragment>
      ),
    },
    {
      title: '礼品',
      dataIndex: 'isGift',
      width: 60,
      align: 'center',
      render: val => (
        <Fragment>
          <Icon
            type={val === 1 ? 'check-circle' : 'close-circle'}
            className={val === 1 ? styles.check : styles.unCheck}
          />
        </Fragment>
      ),
    },
    {
      title: '编号标识',
      dataIndex: 'productId',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <Fragment>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </Fragment>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </Fragment>
      ),
    },
    {
      title: '添加时间',
      dataIndex: 'inTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD')}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Fragment>
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
        </Fragment>
      ),
    },
  ];

  renderOther = () => {
    const { sourceDrawerVisible } = this.state;

    return (
      <SourceDrawer
        visible={sourceDrawerVisible}
        width={1200}
        onClose={this.hideSourceDrawer}
        afterOperateSuccess={this.afterOperateSuccess}
        afterClose={this.onSourceDrawerClose}
      />
    );
  };
}

export default Standard;
