import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Input, Select, Icon, Dropdown, Menu, Button, Badge, Divider } from 'antd';

import {
  getRandomColor,
  isInvalid,
  searchFromList,
  refitCommonData,
  buildFieldDescription,
  copyToClipboard,
  replaceTargetText,
  formatDatetime,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/CustomList/PagerList';

import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.merchant.list;

  getApiData = props => {
    const {
      merchant: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '站长列表',
    paramsKey: '7713045b-a5de-44ca-bd5d-0695549eec8d',
    loadApiPath: 'merchant/list',
    dateRangeFieldName: '统计时段',
    tableScroll: { x: 2340 },
  });

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

  lineList = () => {
    const { global } = this.props;
    return refitCommonData(global.lineList, {
      key: '-10000',
      name: '不限',
      flag: '-10000',
    });
  };

  getLineName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('lineId', v, this.lineList());
    return item == null ? '未知' : item.name;
  };

  merchantStatusList = () => {
    const { global } = this.props;
    return refitCommonData(global.merchantStatusList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getMerchantStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantStatusList());
    return item == null ? '未知' : item.name;
  };

  getMerchantStatusBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'success';
        break;
      default:
        result = 'error';
        break;
    }

    return result;
  };

  merchantSwitchList = () => {
    const { global } = this.props;
    return refitCommonData(global.merchantSwitchList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getMerchantSwitchName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.merchantSwitchList());
    return item == null ? '未知' : item.name;
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { merchantId } = record;
    const location = {
      pathname: `/person/merchant/edit/load/${merchantId}/key/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  goToAudit = record => {
    const { dispatch } = this.props;
    const { merchantId } = record;
    const location = {
      pathname: `/person/merchant/edit/load/${merchantId}/key/auditInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'audit':
        this.goToAudit(record);
        break;
      default:
        break;
    }
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName, dataLoading, processing } = this.state;

    const merchantStatusData = this.merchantStatusList();
    const merchantStatusOption = [];

    merchantStatusData.forEach(item => {
      const { name, flag } = item;
      merchantStatusOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const lineData = this.lineList();
    const lineOption = [];

    lineData.forEach(item => {
      const { name, flag } = item;
      lineOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.realName}>
              {getFieldDecorator('realName')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.realName, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label={fieldData.phone}>
              {getFieldDecorator('phone')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.phone, '输入')}
                />
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 13)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.mName}>
              {getFieldDecorator('mName')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.mName, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label={fieldData.lineId}>
              {getFieldDecorator('lineId', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.lineId, '选择') },
                ],
                initialValue: lineData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.lineId, '选择')}
                  style={{ width: '100%' }}
                >
                  {lineOption}
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
                initialValue: merchantStatusData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.state, '选择')}
                  style={{ width: '100%' }}
                >
                  {merchantStatusOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(
            <Fragment>
              <Divider type="vertical" />
              <Button
                disabled={dataLoading || processing}
                type="dashed"
                icon="export"
                onClick={this.showAddNewModal}
              >
                导出
              </Button>
            </Fragment>,
            6
          )}
        </Row>
      </Fragment>
    );
  };

  getColumn = () => [
    {
      title: '服务站名',
      dataIndex: 'mName',
      width: 240,
      align: 'left',
      render: (val, record) => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(record.isCloseShop + 14),
              }}
            >
              [{this.getMerchantSwitchName(record.isCloseShop)}]
            </span>
            {val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '推荐人→站长姓名',
      dataIndex: 'shareMercahntName',
      align: 'center',
      render: (val, record) => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '无推荐'} → <span className={styles.merchantName}>{record.realName}</span>
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '站长标识',
      dataIndex: 'merchantId',
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
      title: '用户标识',
      dataIndex: 'userId',
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
      title: '状态',
      dataIndex: 'state',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <Badge
            status={this.getMerchantStatusBadgeStatus(val)}
            text={this.getMerchantStatusName(val)}
          />
        </Fragment>
      ),
    },
    {
      title: '周件',
      dataIndex: 'weeklyCount',
      width: 60,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '周销',
      dataIndex: 'weeklyAmount',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            ￥{val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '周排',
      dataIndex: 'weeklyRanking',
      width: 60,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '月件',
      dataIndex: 'monthlyCount',
      width: 60,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '月销',
      dataIndex: 'monthlyAmount',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            ￥{val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '月排',
      dataIndex: 'monthlyRanking',
      width: 60,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '段销件',
      dataIndex: 'timeSpanCount',
      width: 80,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '段销额',
      dataIndex: 'timeSpanAmount',
      width: 100,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            ￥{val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '售后数',
      dataIndex: 'afterSaleCount',
      width: 80,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '退款数',
      dataIndex: 'refundCount',
      width: 80,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '0'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '线路',
      dataIndex: 'lineId',
      width: 180,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {this.getLineName(val, '--')}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '申请时间',
      dataIndex: 'inTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '审核时间',
      dataIndex: 'handleTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
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
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                <Menu.Item key="audit">
                  <Icon type="issues-close" />
                  审核
                </Menu.Item>
              </Menu>
            }
          >
            <Icon type="read" />
            详情
          </Dropdown.Button>
        </Fragment>
      ),
    },
  ];
}

export default List;
