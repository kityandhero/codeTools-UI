import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Select, Button, Icon, Popconfirm, notification, Input } from 'antd';

import {
  buildFieldDescription,
  pretreatmentRequestParams,
  getRandomColor,
  refitCommonData,
  searchFromList,
  isInvalid,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerDrawer from '@/customComponents/CustomList/PagerList/PagerDrawer';
import Ellipsis from '@/components/Ellipsis';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class SourceDrawer extends PagerDrawer {
  componentAuthority = accessWayCollection.product.listSource;

  // eslint-disable-next-line no-unused-vars
  doWorkWhenWillReceive = nextProps => {
    const { changeVisible } = this.state;

    if (changeVisible) {
      // 设置界面效果为加载中，减少用户误解
      this.setState({ dataLoading: true, customData: [] });

      setTimeout(() => {
        this.handleFormReset();
      }, 700);
    }
  };

  getApiData = props => {
    const {
      product: { data },
    } = props;

    return data;
  };

  initState = () => ({
    tableScroll: { x: 1220 },
    loadApiPath: 'product/listSource',
    dateRangeFieldName: '创建时间',
  });

  brandList = () => {
    const { global } = this.props;
    return refitCommonData(global.brandList, {
      key: '',
      name: '不限',
      flag: '',
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
      key: '',
      name: '不限',
      flag: '',
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
    return refitCommonData(global.productStateList.filter(o => o.flag !== 3), {
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

  refreshParentData = () => {
    const { afterOperateSuccess } = this.props;

    if (typeof afterOperateSuccess === 'function') {
      afterOperateSuccess();
    }
  };

  selectFromSource = (e, record) => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      o.productId = record.productId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'product/selectFromSource',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          product: { data },
        } = this.props;

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.refreshParentData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomLeft',
              message: '操作执行结果',
              description: `商品’${record.title}‘ 基础信息已经导入当前地区。`,
            });
          });
        }

        this.setState({ processing: false });
      }
    });
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

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
          <Col md={7} sm={24}>
            <FormItem label="标题">
              {getFieldDecorator('title')(
                <Input addonBefore={<Icon type="form" />} placeholder="请输入商品标题" />
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
          {this.renderSimpleFormButton(null, 7)}
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
      title: '微信端价格',
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
      title: 'APP价格',
      dataIndex: 'appSalePrice',
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
      title: '市场价格',
      dataIndex: 'expressPrice',
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
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <Popconfirm
            placement="topRight"
            title="将改商品添加为本地商品，确定吗？"
            onConfirm={e => this.selectFromSource(e, record)}
            disabled={!this.checkAuthority(accessWayCollection.product.selectFromSource)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" icon="import" text="选取" />
          </Popconfirm>
        </Fragment>
      ),
    },
  ];
}

export default SourceDrawer;
