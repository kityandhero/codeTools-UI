import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Input, Select, Icon, Dropdown, Menu, Badge } from 'antd';
import moment from 'moment';

import {
  getRandomColor,
  isInvalid,
  searchFromList,
  refitCommonData,
  buildFieldDescription,
  copyToClipboard,
  replaceTargetText,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ distribution, global, loading }) => ({
  distribution,
  global,
  loading: loading.models.distribution,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.distribution.list;

  getApiData = props => {
    const {
      distribution: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '站长提现申请列表',
    paramsKey: '16d01ecf-4e13-4e53-9c3f-4e5251a6a539',
    loadApiPath: 'distribution/list',
    dateRangeFieldName: '提交时间',
  });

  distributionStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.distributionStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getDistributionStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.distributionStateList());
    return item == null ? '未知' : item.name;
  };

  getDistributionStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 0:
        result = 'processing';
        break;
      case 1:
        result = 'error';
        break;
      case 2:
        result = 'success';
        break;
      default:
        result = 'default';
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

  handleItem = (dataId, handler) => {
    const { customData } = this.state;
    let indexData = -1;
    customData.list.forEach((o, index) => {
      const { distributionId } = o;
      if (distributionId === dataId) {
        indexData = index;
      }
    });

    if (indexData >= 0) {
      customData.list[indexData] = handler(customData.list[indexData]);
      this.setState({ customData });
    }
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    // const { pageNo } = this.state;
    const { distributionId } = record;
    const location = {
      pathname: `/finance/distribution/edit/load/${distributionId}/key/applyInfo`,
      // pathname: `/distribution/edit/load/${distributionId}/${pageNo}/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  handleMenuClick = e => {
    const { key } = e;

    switch (key) {
      // case 'recommend':
      //   this.setRecommend(record);
      //   break;
      default:
        break;
    }
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName } = this.state;

    const distributionStateData = this.distributionStateList();
    const distributionStateOption = [];

    distributionStateData.forEach(item => {
      const { name, flag } = item;
      distributionStateOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.keyword}>
              {getFieldDecorator('keyword')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.keyword, '输入')}
                />
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label={fieldData.state}>
              {getFieldDecorator('state', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.state, '选择') },
                ],
                initialValue: distributionStateData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.state, '选择')}
                  style={{ width: '100%' }}
                >
                  {distributionStateOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 4)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '账户名称',
      dataIndex: 'name',
      align: 'left',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(record.isCloseShop + 14),
                marginRight: '3px',
              }}
            >
              [{this.getMerchantSwitchName(record.isCloseShop)}]
            </span>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '提现类型',
      dataIndex: 'type',
      width: 100,
      align: 'center',
      render: val => <>{val === 0 ? '微信' : '银行'}</>,
    },
    {
      title: '总金额',
      dataIndex: 'amount',
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
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Badge
            status={this.getDistributionStateBadgeStatus(val)}
            text={this.getDistributionStateName(val)}
          />
        </>
      ),
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      width: 160,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD HH:mm')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '支付流水号',
      dataIndex: 'paymentNo',
      width: 252,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      width: 160,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD HH:mm')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '数据标识',
      dataIndex: 'distributionId',
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
                {/* <Menu.Item key="recommend">
                    <Icon type={record.isRecommend === 1 ? 'close-circle' : 'check-circle'} />
                    {record.isRecommend === 1 ? '取消推荐' : '设为推荐'}
                  </Menu.Item> */}
              </Menu>
            }
          >
            <Icon type="edit" />
            详情
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Standard;
