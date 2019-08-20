import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Form,
  Select,
  Badge,
  DatePicker,
  Input,
  Icon,
  Dropdown,
  Menu,
  message,
} from 'antd';

import {
  formatDatetime,
  refitCommonData,
  copyToClipboard,
  replaceTargetText,
  buildFieldDescription,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ goodsLogisticsProcessRequestMessage, global, loading }) => ({
  goodsLogisticsProcessRequestMessage,
  global,
  loading: loading.models.goodsLogisticsProcessRequestMessage,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.goodsLogisticsProcessRequestMessage.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      batchDate: '',
    };
  }

  getApiData = props => {
    const {
      goodsLogisticsProcessRequestMessage: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '物流操作记录',
    paramsKey: '8626f906-dbfe-4aac-8595-b9db985518e3',
    loadApiPath: 'goodsLogisticsProcessRequestMessage/list',
    dateRangeFieldName: '发生时段',
    // tableScroll: { x: 1820 },
  });

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  goodsLogisticsProcessRequestMessageTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.goodsLogisticsProcessRequestMessageTypeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  goodsLogisticsProcessRequestMessageModeList = () => {
    const { global } = this.props;
    return refitCommonData(global.goodsLogisticsProcessRequestMessageModeList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  goodsLogisticsProcessRequestMessageStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.goodsLogisticsProcessRequestMessageStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getGoodsLogisticsProcessRequestMessageStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 100:
        result = 'warning';
        break;
      case 200:
        result = 'processing';
        break;
      case 300:
        result = 'success';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  getGoodsLogisticsProcessRequestMessageAggregateCompleteBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 100:
        result = 'warning';
        break;
      case 200:
        result = 'processing';
        break;
      case 300:
        result = 'success';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  handleFormOtherReset = () => {
    this.setState({
      batchDate: '',
    });
  };

  onBatchDateChange = (date, dateString) => {
    this.setState({
      batchDate: dateString,
    });
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { batchDate } = this.state;

    d.batchDate = batchDate;

    return d;
  };

  handleMenuClick = () => {};

  reAggregate = record => {
    const { dispatch } = this.props;
    const { goodsLogisticsProcessRequestMessageId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'goodsLogisticsProcessRequestMessage/reAggregate',
      payload: {
        goodsLogisticsProcessRequestMessageId,
      },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;
      if (dataSuccess) {
        message.warn('该线路出库数据即将进行重新合计,请稍后查看');

        this.refreshGrid();
      }

      this.setState({ processing: false });
    });
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName } = this.state;
    const currentOperator = this.getCurrentOperator();

    const goodsLogisticsProcessRequestMessageTypeData = this.goodsLogisticsProcessRequestMessageTypeList();
    const goodsLogisticsProcessRequestMessageTypeOption = [];

    goodsLogisticsProcessRequestMessageTypeData.forEach(item => {
      const { name, flag } = item;
      goodsLogisticsProcessRequestMessageTypeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    const goodsLogisticsProcessRequestMessageModeData = this.goodsLogisticsProcessRequestMessageModeList();
    const goodsLogisticsProcessRequestMessageModeOption = [];

    goodsLogisticsProcessRequestMessageModeData.forEach(item => {
      const { name, flag } = item;
      goodsLogisticsProcessRequestMessageModeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    const goodsLogisticsProcessRequestMessageStateData = this.goodsLogisticsProcessRequestMessageStateList();
    const goodsLogisticsProcessRequestMessageStateOption = [];

    goodsLogisticsProcessRequestMessageStateData.forEach(item => {
      const { name, flag } = item;
      goodsLogisticsProcessRequestMessageStateOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.areaAgentId}>
              <Input
                addonBefore={<Icon type="form" />}
                disabled
                value={currentOperator == null ? '' : currentOperator.cityName || ''}
              />
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.batchDate}>
              {getFieldDecorator('batchDate', {
                rules: [
                  {
                    required: false,
                    message: buildFieldDescription(fieldData.areaAgentId, '选择'),
                  },
                ],
              })(
                <DatePicker
                  placeholder={buildFieldDescription(fieldData.batchDate, '选择')}
                  format="YYYY-MM-DD"
                  onChange={this.onBatchDateChange}
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.type}>
              {getFieldDecorator('type', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.type, '选择') },
                ],
                initialValue: goodsLogisticsProcessRequestMessageTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.type, '选择')}
                  style={{ width: '100%' }}
                >
                  {goodsLogisticsProcessRequestMessageTypeOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 9)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.mode}>
              {getFieldDecorator('mode', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.mode, '选择') },
                ],
                initialValue: goodsLogisticsProcessRequestMessageModeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.mode, '选择')}
                  style={{ width: '100%' }}
                >
                  {goodsLogisticsProcessRequestMessageModeOption}
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
                initialValue: goodsLogisticsProcessRequestMessageTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.state, '选择')}
                  style={{ width: '100%' }}
                >
                  {goodsLogisticsProcessRequestMessageStateOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(null, 14)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.batchDate,
      dataIndex: 'batchDate',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.lineName,
      dataIndex: 'lineName',
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
      title: fieldData.modeNote,
      dataIndex: 'modeNote',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.typeNote,
      dataIndex: 'typeNote',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.state,
      dataIndex: 'state',
      align: 'center',
      width: 140,
      render: (val, record) => (
        <>
          <Badge
            status={this.getGoodsLogisticsProcessRequestMessageStateBadgeStatus(val)}
            text={record.stateNote}
          />
        </>
      ),
    },
    {
      title: fieldData.aggregateComplete,
      dataIndex: 'aggregateComplete',
      align: 'center',
      width: 140,
      render: (val, record) => (
        <>
          {record.mode === 100 ? (
            <Badge
              status={this.getGoodsLogisticsProcessRequestMessageAggregateCompleteBadgeStatus(val)}
              text={record.aggregateCompleteNote}
            />
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      title: fieldData.goodsLogisticsProcessRequestMessageId,
      dataIndex: 'goodsLogisticsProcessRequestMessageId',
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
      title: fieldData.createTime,
      dataIndex: 'createTime',
      width: 200,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm', '--')}
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
            onClick={() => this.reAggregate(record)}
            disabled={
              !(record.mode === 100 && record.type === 100 && record.state === 300) ||
              !this.checkAuthority(
                accessWayCollection.goodsLogisticsProcessRequestMessage.reAggregate
              )
            }
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {/* <Menu.Item key="1">
                  <Icon type="redo" />
                  重新合计
                </Menu.Item> */}
              </Menu>
            }
          >
            <Icon type="redo" />
            重新合计
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Standard;
