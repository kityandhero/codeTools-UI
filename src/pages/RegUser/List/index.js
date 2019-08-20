import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Input, Select, Icon, Button, Dropdown, Menu, Divider } from 'antd';

import defaultSettings from '../../../../config/defaultSettings';

import {
  isInvalid,
  formatDatetime,
  getRandomColor,
  searchFromList,
  refitCommonData,
  toNumber,
  copyToClipboard,
  replaceTargetText,
  buildFieldDescription,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ regUser, global, loading }) => ({
  regUser,
  global,
  loading: loading.models.regUser,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.regUser.list;

  getApiData = props => {
    const {
      regUser: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '用户列表',
    paramsKey: '9586f7b2-74ff-49b5-b546-eb45b75a0b65',
    loadApiPath: 'regUser/list',
    dateRangeFieldName: '注册时间',
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

  regUserTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.regUserTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getRegUserTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.regUserTypeList());
    return item == null ? '未知' : item.name;
  };

  sexList = () => {
    const { global } = this.props;
    return refitCommonData(global.sexList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getSexName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', toNumber(v), this.sexList());
    return item == null ? '--' : item.name;
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { regUserId } = record;
    const location = {
      pathname: `/person/regUser/edit/load/${regUserId}/key/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  goToDetail = record => {
    const { dispatch } = this.props;
    const { regUserId } = record;
    const location = {
      pathname: `/person/regUser/detail/load/${regUserId}/key/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { dateRangeFieldName } = this.state;
    const { getFieldDecorator, dataLoading, processing } = form;

    const regUserTypeData = this.regUserTypeList();
    const regUserTypeOption = [];

    regUserTypeData.forEach(item => {
      const { name, flag } = item;
      regUserTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            <FormItem label={fieldData.regUserId}>
              {getFieldDecorator('regUserId')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.regUserId, '输入')}
                />,
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label={fieldData.nickname}>
              {getFieldDecorator('nickname')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.nickname, '输入')}
                />,
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 12)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            <FormItem label={fieldData.type}>
              {getFieldDecorator('type', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.state, '选择') },
                ],
                initialValue: regUserTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.state, '选择')}
                  style={{ width: '100%' }}
                >
                  {regUserTypeOption}
                </Select>,
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(
            <>
              <Divider type="vertical" />
              <Button
                disabled={dataLoading || processing}
                type="dashed"
                icon="export"
                onClick={this.showAddNewModal}
              >
                导出
              </Button>
            </>,
            18,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: 'Id',
      dataIndex: 'regUserId',
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
      title: '用户',
      dataIndex: 'headImgUrl',
      width: 60,
      align: 'center',
      render: (val, record) => (
        <>
          <img className={styles.img} src={val} alt={record.regUserName} />
        </>
      ),
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      width: 180,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '推荐人',
      dataIndex: 'parentHeadImgUrl',
      width: 80,
      align: 'center',
      render: (val, record) => (
        <>
          <img
            className={styles.img}
            src={val || defaultSettings.getShareLogo()}
            alt={record.parentNickname}
          />
        </>
      ),
    },
    {
      title: '推荐人昵称',
      dataIndex: 'parentNickname',
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val === '' && record.parentRealName === ''
              ? record.parentId === '0' || record.parentId === ''
                ? '平台直属'
                : '--'
              : val !== '' && record.parentRealName !== ''
              ? `${val}-${record.parentRealName}`
              : `${val}${record.parentRealName}`}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 60,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getSexName(val)}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '累计消费',
      dataIndex: 'consumption',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            ￥{val || '0'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '账户余额',
      dataIndex: 'balance',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            ￥{val || '0'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '会员积分',
      dataIndex: 'integral',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '0'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '城市',
      dataIndex: 'city',
      width: 100,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {/* {this.getCityName(val)} */}
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '会员类型',
      dataIndex: 'type',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis
            style={{
              color: getRandomColor(val + 1),
            }}
            tooltip
            lines={1}
          >
            {this.getRegUserTypeName(val, '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'inTime',
      width: 140,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
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
            onClick={() => this.goToDetail(record)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {/* <Menu.Item key="1">
                    <Icon type="delete" />
                    删除
                  </Menu.Item> */}
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

export default Standard;
