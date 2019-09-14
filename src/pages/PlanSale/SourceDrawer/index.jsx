import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, Popconfirm } from 'antd';

import { getRandomColor, isFunction } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerDrawer from '@/customComponents/Framework/CustomList/PagerList/PagerDrawer';
import Ellipsis from '@/customComponents/Ellipsis';

import { fieldData } from '../../Product/Common/data';
import styles from './index.less';

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class Index extends PagerDrawer {
  componentAuthority = accessWayCollection.product.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        tableScroll: { x: 1220 },
        loadApiPath: 'product/list',
        dateRangeFieldName: '添加时间',
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

  getPageName = () => {
    return '请选择预售商品';
  };

  selectRecord = (e, record) => {
    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(record);
    }

    this.hideDrawer();
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
      title: fieldData.title,
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
      title: fieldData.rankId,
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
      title: fieldData.costPrice,
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
      title: fieldData.stockPrice,
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
      title: fieldData.salePrice,
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
      title: fieldData.appSalePrice,
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
      title: fieldData.expressPrice,
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
      title: fieldData.state,
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
      title: fieldData.saleType,
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
            title="选择此产品进行预售，确定吗？"
            onConfirm={e => this.selectRecord(e, record)}
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

export default Index;
