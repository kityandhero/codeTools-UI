import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Icon, Badge, Input, Button, Popconfirm } from 'antd';

import {
  replaceTargetText,
  getRandomColor,
  copyToClipboard,
  formatDatetime,
  buildFieldDescription,
} from '@/utils/tools';
import PagerDrawer from '@/customComponents/Framework/CustomList/PagerList/PagerDrawer';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

const FormItem = Form.Item;

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
@Form.create()
class Index extends PagerDrawer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageSize: 8,
        tableScroll: { x: 1320 },
        loadApiPath: 'merchant/list',
        dateRangeFieldName: '创建时间',
        customData: [],
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, sourceData } = nextProps;

    return { visible, sourceData };
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    const { dataLoading, visible, sourceData } = this.state;

    if (sourceData != null && visible && !dataLoading) {
      // 设置界面效果为加载中，减少用户误解
      this.setState({ dataLoading: true, customData: [] });

      setTimeout(() => {
        this.handleFormReset();
      }, 700);
    }
  };

  getApiData = props => {
    const {
      merchant: { data },
    } = props;

    return data;
  };

  getPageName = () => '选择站长上级';

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

  select = (e, record) => {
    const { afterSelect } = this.props;

    if (typeof afterSelect === 'function') {
      afterSelect(record);
    }
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={8} sm={24}>
            <FormItem label={fieldData.merchantId}>
              {getFieldDecorator('merchantId')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.merchantId, '输入')}
                />,
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 16)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={8} sm={24}>
            {this.renderSearchInputFormItem(fieldData.realName, 'realName')}
          </Col>
          {this.renderSimpleFormButton(null, 16)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '服务站名',
      dataIndex: 'mName',
      width: 240,
      align: 'left',
      render: (val, record) => (
        <>
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
        </>
      ),
    },
    {
      title: '站长姓名',
      dataIndex: 'realName',
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '站长标识',
      dataIndex: 'merchantId',
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
      title: '用户标识',
      dataIndex: 'userId',
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
      title: '状态',
      dataIndex: 'state',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Badge
            status={this.getMerchantStatusBadgeStatus(val)}
            text={this.getMerchantStatusName(val)}
          />
        </>
      ),
    },
    {
      title: '线路',
      dataIndex: 'lineId',
      width: 180,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {this.getLineName(val, '--')}
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
          <Popconfirm
            placement="topRight"
            title="选择此站长，确定吗？"
            onConfirm={e => this.select(e, record)}
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
