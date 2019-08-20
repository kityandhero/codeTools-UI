import React from 'react';
import { connect } from 'dva';
import {
  Alert,
  Row,
  Col,
  Form,
  Input,
  Select,
  Icon,
  Badge,
  DatePicker,
  notification,
  Divider,
  Button,
  message,
} from 'antd';

import {
  isInvalid,
  searchFromList,
  refitCommonData,
  buildFieldDescription,
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  corsTarget,
  pretreatmentRequestParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';

import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ product, areaManage, global, loading }) => ({
  product,
  areaManage,
  global,
  loading: loading.models.product,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.product.listSaleCount;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      dateUpdateTimeRangeFieldName: '修改时段',
      startUpdateTime: '',
      endUpdateTime: '',
    };
  }

  getApiData = props => {
    const {
      product: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '商品库存销量列表',
    paramsKey: 'b1f88ab4-fec9-41b8-a06c-33e4351bbe4f',
    loadApiPath: 'product/listSaleCount',
    dateRangeFieldName: '销售时段',
    tableScroll: { x: 2150 },
  });

  handleFormOtherReset = () => {
    this.setState({
      startUpdateTime: '',
      endUpdateTime: '',
    });
  };

  supplementLoadRequestParams = d => {
    const o = d;

    const { startUpdateTime, endUpdateTime } = this.state;

    if ((startUpdateTime || '') !== '') {
      o.startUpdateTime = startUpdateTime;
    }

    if ((endUpdateTime || '') !== '') {
      o.endUpdateTime = endUpdateTime;
    }

    delete o.dateRange;

    return o;
  };

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

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

  brandList = () => {
    const { global } = this.props;
    return refitCommonData(global.brandList, {
      key: '-10000',
      name: '不限',
      flag: '-10000',
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

  productStateList = () => {
    const { global } = this.props;
    return refitCommonData(global.productStateList, {
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

  getProductStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 3:
        result = 'warning';
        break;
      case 1:
        result = 'success';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  onUpdateTimeRangeChange = (dates, dateStrings) => {
    this.setState({
      startUpdateTime: dateStrings[0],
      endUpdateTime: dateStrings[1],
    });
  };

  getExportKey = () => {
    const { dispatch } = this.props;

    const { form } = this.props;
    let values = {};

    form.validateFields((err, fieldsValue) => {
      if (err) {
        message.error(err);

        return;
      }

      values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
    });

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      const { startUpdateTime, endUpdateTime } = this.state;

      return { ...o, ...values, startUpdateTime, endUpdateTime };
    });

    this.setState({ processing: true });

    dispatch({
      type: 'product/exportStoreKey',
      payload: submitData,
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;

      if (dataSuccess) {
        const {
          data: { fileKey, filter },
        } = data;

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '执行成功，文件即将开始下载！',
          });
        });

        this.setState({ processing: false });

        const corsUrl = corsTarget();
        window.open(
          `${corsUrl}/Product/ExportStoreFile?${
            filter === '' ? '' : `${filter}&`
          }fileKey=${fileKey}`,
          '_self',
        );
      }

      this.setState({ processing: false });
    });
  };

  renderUpdateTimeRangePicker = (dateUpdateTimeRangeFieldName, ColMd = 8) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Col md={ColMd} sm={24}>
        <FormItem label={dateUpdateTimeRangeFieldName}>
          {getFieldDecorator('updateTimeRange', {
            rules: [
              {
                required: false,
                message: buildFieldDescription(dateUpdateTimeRangeFieldName, '选择'),
              },
            ],
          })(
            <RangePicker
              style={{ width: '100%' }}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['起始时间', '结束时间']}
              onChange={this.onUpdateTimeRangeChange}
            />,
          )}
        </FormItem>
      </Col>
    );
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const {
      dateRangeFieldName,
      dateUpdateTimeRangeFieldName,
      dataLoading,
      processing,
    } = this.state;
    const currentOperator = this.getCurrentOperator();

    const rankData = this.rankList();

    const brandData = this.brandList();
    const brandOption = [];

    brandData.forEach(item => {
      const { name, flag } = item;
      brandOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    const saleTypeData = this.saleTypeList();
    const saleTypeOption = [];

    saleTypeData.forEach(item => {
      const { name, flag } = item;
      saleTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    const productStateData = this.productStateList();
    const productStateOption = [];

    productStateData.forEach(item => {
      const { name, flag } = item;
      productStateOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            <FormItem label={fieldData.city}>
              <Input
                addonBefore={<Icon type="form" />}
                disabled
                value={currentOperator == null ? '' : currentOperator.cityName || ''}
              />
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label={fieldData.productId}>
              {getFieldDecorator('productId')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.productId, '输入')}
                />,
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label={fieldData.title}>
              {getFieldDecorator('title')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.title, '输入')}
                />,
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <FormItem label={fieldData.rankId}>
              {getFieldDecorator('rankId', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.rankId, '选择') },
                ],
                initialValue: rankData[0].rankId,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.rankId, '选择')}
                  style={{ width: '100%' }}
                >
                  {this.renderRankOption()}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label={fieldData.saleType}>
              {getFieldDecorator('saleType', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.saleType, '选择') },
                ],
                initialValue: saleTypeData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.saleType, '选择')}
                  style={{ width: '100%' }}
                >
                  {saleTypeOption}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
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
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderUpdateTimeRangePicker(dateUpdateTimeRangeFieldName, 8)}
          {this.renderSimpleFormButton(
            <>
              <Divider type="vertical" />
              <Button
                disabled={dataLoading || processing}
                type="dashed"
                icon="export"
                onClick={this.getExportKey}
              >
                导出库存信息
              </Button>
            </>,
            8,
          )}
        </Row>
      </>
    );
  };

  renderAboveTable = () => (
    <div className={styles.infoBox}>
      <Alert
        message="提示：实时可用库存指商品自由库存；临时占用库存是指被未付款订单暂时占用的库存数，超时未付款，会被释放为自由库存。"
        type="info"
        showIcon
      />
    </div>
  );

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
      title: '微信端售价',
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
      title: 'App售价',
      dataIndex: 'appSalePrice',
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
      title: '今日销量',
      dataIndex: 'todaySaleCount',
      width: 100,
      align: 'center',
    },
    {
      title: '实时可用库存',
      dataIndex: 'storeCount',
      width: 120,
      align: 'center',
    },
    {
      title: '临时被占库存',
      dataIndex: 'waitPayUserOrderOccupancyStoreCount',
      width: 120,
      align: 'center',
    },
    {
      title: '阶段销量',
      dataIndex: 'saleCount',
      width: 100,
      align: 'center',
    },
    {
      title: '阶段退款商品数量',
      dataIndex: 'refundCount',
      width: 220,
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
            {record.refundCount > 0
              ? `（返还库存${record.refundCountReturnStore},不返还${record.refundCountNoReturnStore}）`
              : ''}
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
          <Badge
            status={this.getProductStateBadgeStatus(val)}
            text={this.getProductStateName(val, '--')}
          />
        </>
      ),
    },
    {
      title: '商品货号',
      dataIndex: 'no',
      width: 100,
      align: 'center',
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
      title: '编号标识',
      dataIndex: 'productId',
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
      title: '添加时间',
      dataIndex: 'inTime',
      width: 160,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '最后修改时间',
      dataIndex: 'updateTime',
      width: 160,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm')}
          </Ellipsis>
        </>
      ),
    },
  ];
}

export default Standard;
