import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, Popconfirm, notification } from 'antd';

import { pretreatmentRequestParams, getRandomColor } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerDrawer from '@/customComponents/Framework/CustomList/PagerList/PagerDrawer';
import Ellipsis from '@/customComponents/Ellipsis';

import { fieldData } from '../Common/data';
import styles from './index.less';

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class SourceDrawer extends PagerDrawer {
  componentAuthority = accessWayCollection.product.listSource;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        tableScroll: { x: 1220 },
        loadApiPath: 'product/listSource',
        dateRangeFieldName: '创建时间',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    const { firstLoadSuccess } = this.state;

    // 未加载数据过数据的时候，进行加载
    if (!firstLoadSuccess) {
      // 设置界面效果为加载中，减少用户误解
      this.setState({ dataLoading: true });

      setTimeout(() => {
        this.handleFormReset(false);
      }, 700);
    }
  };

  getApiData = props => {
    const {
      product: { data },
    } = props;

    return data;
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
    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={7} sm={24}>
            {this.renderSearchInputFormItem(fieldData.title, 'title')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchRankFormItem(true)}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchProductStateFormItem(true)}
          </Col>
          {this.renderSimpleFormButton(null, 7)}
        </Row>
      </>
    );
  };

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
            ￥{val}
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
            ￥{val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '微信端价格',
      dataIndex: 'salePrice',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            ￥{val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: 'APP价格',
      dataIndex: 'appSalePrice',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            ￥{val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '市场价格',
      dataIndex: 'expressPrice',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis className={styles.price} tooltip lines={1}>
            ￥{val}
          </Ellipsis>
        </>
      ),
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
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
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
        </>
      ),
    },
  ];
}

export default SourceDrawer;
