import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Select } from 'antd';

import {
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  buildFieldDescription,
  refitCommonData,
  getRandomColor,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

const FormItem = Form.Item;
const { Option } = Select;

const fieldData = {
  peopleAccountLogId: '标识',
  realName: '站长姓名',
  merchantName: '站点名',
  phone: '联系方式',
  type: '变动类型',
  typeNote: '变动类型',
  isOutIn: '收支类行',
  isOutInNote: '收支类行',
  inType: '收入来源',
  inTypeNote: '收入来源',
  money: '金额',
  note: '变更备注',
  inTime: '变更时间',
};

@connect(({ peopleAccountLog, global, loading }) => ({
  peopleAccountLog,
  global,
  loading: loading.models.peopleAccountLog,
}))
@Form.create()
class Index extends InnerPagerList {
  componentAuthority = accessWayCollection.peopleAccountLog.listByMerchant;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      batchDate: '',
    };
  }

  getApiData = props => {
    const {
      peopleAccountLog: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      merchantId: id,
      loadApiPath: 'peopleAccountLog/listByMerchant',
      dateRangeFieldName: '发生时段',
    };

    return result;
  };

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  lineList = () => {
    const { global } = this.props;
    return refitCommonData(global.lineList, {
      key: '-10000',
      name: '不限',
      flag: '-10000',
    });
  };

  typeList = () => {
    const { global } = this.props;
    return refitCommonData(global.peopleAccountLogTypeList, {
      key: '-10000',
      name: '不限',
      flag: '-10000',
    });
  };

  isOutInList = () => {
    const { global } = this.props;
    return refitCommonData(global.peopleAccountLogIsOutInList, {
      key: '-10000',
      name: '不限',
      flag: '-10000',
    });
  };

  inTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.peopleAccountLogInTypeList, {
      key: '-10000',
      name: '不限',
      flag: '-10000',
    });
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
    const { batchDate, merchantId } = this.state;

    d.batchDate = batchDate;
    d.merchantId = merchantId;

    return d;
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName } = this.state;

    const typeData = this.typeList();
    const typeOption = [];

    typeData.forEach(item => {
      const { name, flag } = item;
      typeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    const isOutInData = this.isOutInList();
    const isOutInOption = [];

    isOutInData.forEach(item => {
      const { name, flag } = item;
      isOutInOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    const inTypeData = this.inTypeList();
    const inTypeOption = [];

    inTypeData.forEach(item => {
      const { name, flag } = item;
      inTypeOption.push(
        <Option key={flag} value={flag}>
          {name}
        </Option>
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            <FormItem label={fieldData.type}>
              {getFieldDecorator('type', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.type, '选择') },
                ],
                initialValue: typeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.type, '选择')}
                  style={{ width: '100%' }}
                >
                  {typeOption}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.isOutIn}>
              {getFieldDecorator('isOutIn', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.isOutIn, '选择') },
                ],
                initialValue: isOutInData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.isOutIn, '选择')}
                  style={{ width: '100%' }}
                >
                  {isOutInOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 6)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.peopleAccountLogId,
      dataIndex: 'peopleAccountLogId',
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
      title: fieldData.realName,
      dataIndex: 'realName',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.money,
      dataIndex: 'money',
      align: 'center',
      width: 140,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val | '') === '' ? (
              '--'
            ) : (
              <span>
                {record.isOutIn === 1 ? (
                  <span
                    style={{
                      color: '#ff5500',
                    }}
                  >
                    + {val}
                  </span>
                ) : null}

                {record.isOutIn === 2 ? (
                  <span
                    style={{
                      color: '#87d068',
                    }}
                  >
                    - {val}
                  </span>
                ) : null}

                {record.isOutIn !== 1 && record.isOutIn !== 2 ? val : ''}
              </span>
            )}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.type,
      dataIndex: 'type',
      align: 'center',
      width: 160,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(val + 10),
              }}
            >
              {record.typeNote}
            </span>
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.isOutIn,
      dataIndex: 'isOutIn',
      align: 'center',
      width: 140,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            <span
              style={{
                color: getRandomColor(val + 18),
              }}
            >
              {record.isOutInNote}
            </span>
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.inType,
      dataIndex: 'inType',
      align: 'center',
      width: 180,
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {record.isOutIn === 1 ? (
              <span
                style={{
                  color: getRandomColor(val + 47),
                }}
              >
                {record.inTypeNote}
              </span>
            ) : (
              '--'
            )}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.merchantName,
      dataIndex: 'merchantName',
      align: 'center',
      width: 180,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.note,
      dataIndex: 'note',
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
      title: fieldData.inTime,
      dataIndex: 'inTime',
      width: 200,
      align: 'center',
      sorter: false,
      fixed: 'right',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
  ];
}

export default Index;
