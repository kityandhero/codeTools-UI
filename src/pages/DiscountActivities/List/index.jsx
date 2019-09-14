import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Icon, Dropdown, Menu, Divider, Button, notification, Modal } from 'antd';

import {
  getRandomColor,
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  isUndefined,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

import styles from './index.less';

const { confirm } = Modal;

@connect(({ discountActivities, areaManage, global, loading }) => ({
  discountActivities,
  areaManage,
  global,
  loading: loading.models.discountActivities,
}))
@Form.create()
class Index extends PagerList {
  componentAuthority = accessWayCollection.discountActivities.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '抢购活动列表',
        paramsKey: 'd010b13e-cdd6-4735-8910-1393def3c016',
        loadApiPath: 'discountActivities/list',
        dateRangeFieldName: '活动时段',
        tableScroll: { x: 2200 },
      },
    };
  }

  getApiData = props => {
    const {
      discountActivities: { data },
    } = props;

    return data;
  };

  goToAdd = () => {
    const { dispatch } = this.props;
    const location = {
      pathname: `/marketing/discount/add`,
    };
    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;

    const { discountActivitiesId } = record;
    const location = {
      pathname: `/marketing/discount/edit/load/${discountActivitiesId}/key/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'setOnline':
        this.setOnline(record);
        break;
      case 'setOffline':
        this.setOffline(record);
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

  setOnline = record => {
    const { dispatch } = this.props;
    const { discountActivitiesId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'discountActivities/setOnline',
      payload: { discountActivitiesId },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;

      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '抢购已上线',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  setOffline = record => {
    const { dispatch } = this.props;
    const { discountActivitiesId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'discountActivities/setOffline',
      payload: { discountActivitiesId },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;

      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '抢购已下线',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  setOver = record => {
    const { dispatch } = this.props;
    const { discountActivitiesId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'discountActivities/setOver',
      payload: { discountActivitiesId },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;

      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '抢购已结束',
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
      title: '移除抢购活动',
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
    const { discountActivitiesId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'discountActivities/remove',
      payload: { discountActivitiesId },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;

      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '抢购已移除',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName, dataLoading, processing } = this.state;

    const currentOperator = this.getCurrentOperator();

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
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
            {this.renderSearchInputFormItem(fieldData.activitiesTitle, 'activitiesTitle')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.discountActivitiesId, 'discountActivitiesId')}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 9)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(fieldData.goodsTitle, 'goodsTitle')}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchDiscountActivitiesGoodsTypeFormItem(true)}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchDiscountActivitiesStateFormItem(true)}
          </Col>
          {this.renderSimpleFormButton(
            <>
              {this.checkAuthority(accessWayCollection.discountActivities.add) ? (
                <>
                  <Divider type="vertical" />
                  <Button
                    key="buttonPlus"
                    disabled={dataLoading || processing}
                    type="primary"
                    icon="plus"
                    onClick={this.goToAdd}
                  >
                    新增活动
                  </Button>
                </>
              ) : null}
            </>,
            9,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.activitiesTitle,
      dataIndex: 'activitiesTitle',
      width: 220,
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
      title: fieldData.goodsTitle,
      dataIndex: 'goods',
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || null) == null ? '--' : (val.title || '') === '' ? '--' : `${val.title}`}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.activitiesStoreCount,
      dataIndex: 'activitiesStoreCount',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {isUndefined(val) ? '--' : val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.activitiesSalePrice,
      dataIndex: 'activitiesSalePrice',
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
      title: fieldData.stockPrice,
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
      title: fieldData.inviterRewardPrice,
      dataIndex: 'inviterRewardPrice',
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
      title: fieldData.saleStartTime,
      dataIndex: 'saleStartTime',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.saleEndTime,
      dataIndex: 'saleEndTime',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.orderExpireMinute,
      dataIndex: 'orderExpireMinute',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val ? `${val}分钟` : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.state,
      dataIndex: 'state',
      width: 100,
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
            {this.getDiscountActivitiesStateName(val, '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.isCanRefund,
      dataIndex: 'isCanRefund',
      width: 110,
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
            {val === 0 ? '不可退' : '可退'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.limitCustomerByCount,
      dataIndex: 'limitCustomerByCount',
      width: 120,
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val ? val + ((record.spec || '') === '' ? '' : `(${record.spec})`) : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.limitMerchantByCount,
      dataIndex: 'limitMerchantByCount',
      width: 120,
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val ? val + ((record.spec || '') === '' ? '' : `(${record.spec})`) : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.goodsType,
      dataIndex: 'goodsType',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis
            style={{
              color: getRandomColor(val + 10),
            }}
            tooltip
            lines={1}
          >
            {this.getDiscountActivitiesGoodsTypeName(val, '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.discountActivitiesId,
      dataIndex: 'discountActivitiesId',
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
            disabled={!this.checkAuthority(accessWayCollection.discountActivities.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {record.state !== 10 &&
                this.checkAuthority(accessWayCollection.discountActivities.setOnline) ? (
                  <Menu.Item key="setOnline">
                    <Icon type="up-circle" />
                    上架
                  </Menu.Item>
                ) : null}
                {record.state !== 0 &&
                this.checkAuthority(accessWayCollection.discountActivities.setOffline) ? (
                  <Menu.Item key="setOffline">
                    <Icon type="down-circle" />
                    下架
                  </Menu.Item>
                ) : null}

                {record.state !== 20 &&
                this.checkAuthority(accessWayCollection.discountActivities.setOver) ? (
                  <Menu.Item key="setOver">
                    <Icon type="right-circle" />
                    完结
                  </Menu.Item>
                ) : null}

                {record.state !== -1 &&
                this.checkAuthority(accessWayCollection.discountActivities.remove) ? (
                  <Menu.Item key="remove">
                    <Icon type="right-circle" />
                    移除
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
}

export default Index;
