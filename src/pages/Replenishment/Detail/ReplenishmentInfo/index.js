import React from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
  Radio,
  Form,
  DatePicker,
  Input,
  Spin,
  Table,
  BackTop,
  Divider,
  Descriptions,
  Icon,
} from 'antd';
import Zmage from 'react-zmage';

import {
  refitFieldDecoratorOption,
  buildFieldDescription,
  isInvalid,
  isMoney,
  searchFromList,
  refitCommonData,
  formatMoneyToChinese,
  stringToMoment,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import Ellipsis from '@/customComponents/Ellipsis';

import TabPageBase from '../../TabPageBase';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Item: Description } = Descriptions;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10, offset: 4 },
  },
};

@connect(({ replenishment, global, loading }) => ({
  replenishment,
  global,
  loading: loading.models.replenishment,
}))
@Form.create()
class ReplenishmentInfo extends TabPageBase {
  componentAuthority = accessWayCollection.replenishment.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      refundAmount: 0,
      refundNote: '',
      replenishmentId: null,
      replenishmentRollBackMoney: 1,
      replenishmentStateMode: 1,
      // replenishmentState: 0,
      replenishmentImageList: [],
      replenishmentOutboundTime: '',
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      replenishmentId: id,
      loadApiPath: 'replenishment/get',
      submitApiPath: 'replenishment/agree',
    };

    return result;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { replenishmentId, replenishmentStateMode, replenishmentOutboundTime } = this.state;

    d.replenishmentStateMode = replenishmentStateMode;
    d.replenishmentId = replenishmentId;
    if (replenishmentStateMode === 1) {
      d.outboundTime = replenishmentOutboundTime;
    }

    return d;
  };

  afterLoadSuccess = d => {
    const {
      refundMoney,
      //  replenishmentState,
      replenishmentImageList: imageList,
      replenishmentOutboundTime,
    } = d;

    const replenishmentImageList = [];

    imageList.forEach((item, index) => {
      const o = {
        key: `image_${index}`,
        src: item,
      };

      replenishmentImageList.push(o);
    });

    this.setState({
      refundAmount: refundMoney,
      // replenishmentState,
      replenishmentImageList,
      replenishmentOutboundTime,
    });
  };

  replenishmentStateModeList = () => {
    const list = [{ key: 1, flag: 1, name: '同意售后' }, { key: 2, flag: 2, name: '转到退款处理' }];

    return refitCommonData(list);
  };

  replenishmentStateList = () => {
    const { global } = this.props;

    return refitCommonData(global.replenishmentStateList);
  };

  getReplenishmentStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentStateList());
    return item == null ? '未知' : item.name;
  };

  replenishmentRollBackMoneyList = () => {
    const { global } = this.props;

    return refitCommonData(global.replenishmentRollBackMoneyList);
  };

  getReplenishmentRollBackMoneyName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.replenishmentRollBackMoneyList());
    return item == null ? '未知' : item.name;
  };

  orderStatusList = () => {
    const { global } = this.props;

    return refitCommonData(global.orderStatusList);
  };

  getOrderStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.orderStatusList());
    return item == null ? '未知' : item.name;
  };

  payTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.payTypeList);
  };

  getPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.payTypeList());
    return item == null ? '未知' : item.name;
  };

  unitList = () => {
    const { global } = this.props;
    return refitCommonData(global.unitList);
  };

  getUnitName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.unitList());
    return item == null ? '未知' : item.name;
  };

  handleReplenishmentStateModeChange = e => {
    const {
      target: { value: v },
    } = e;

    this.setState({ replenishmentStateMode: v });
  };

  handleRollBackMoneyChange = e => {
    const {
      target: { value: v },
    } = e;

    this.setState({ replenishmentRollBackMoney: v });
  };

  handleOutboundTimeChange = (date, dateString) => {
    this.setState({
      replenishmentOutboundTime: dateString,
    });
  };

  formContent = () => {
    const { form } = this.props;
    const {
      metaData,
      processing,
      dataLoading,
      loadSuccess,
      refundAmount,
      refundNote,
      // replenishmentState,
      replenishmentStateMode,
      replenishmentRollBackMoney,
      replenishmentImageList,
      replenishmentOutboundTime,
    } = this.state;
    const { getFieldDecorator } = form;

    const itemList = [];
    // let oneData = {};
    let dataCount = 0;
    let totalCount = 0;
    let totalAmount = 0;
    let totalScore = 0;

    if (metaData !== null) {
      (metaData.itemList || []).forEach(o => {
        const v = o;
        v.key = o.productId;
        v.other = '--';
        itemList.push(v);

        totalCount += o.count;
        totalAmount += o.price;
        totalScore += o.score;
      });

      dataCount = itemList.length;

      itemList.push({
        key: 'sum',
        title: '总计',
        count: totalCount,
        score: totalScore,
        price: totalAmount.toFixed(2),
        other: '--',
      });

      // if (dataCount === 1) {
      //   [oneData] = itemList;
      // }
    }

    const replenishmentItemList = [];
    // let oneData = {};
    let replenishmentDataCount = 0;
    let replenishmentTotalCount = 0;
    let replenishmentTotalAmount = 0;
    let replenishmentTotalScore = 0;

    if (metaData !== null) {
      (metaData.replenishmentItemList || []).forEach(o => {
        const v = o;
        v.key = o.productId;
        v.other = '--';
        replenishmentItemList.push(v);

        replenishmentTotalCount += o.count;
        replenishmentTotalAmount += o.price;
        replenishmentTotalScore += o.score;
      });

      replenishmentDataCount = replenishmentItemList.length;

      replenishmentItemList.push({
        key: 'sum',
        title: '总计',
        count: replenishmentTotalCount,
        score: replenishmentTotalScore,
        price: replenishmentTotalAmount.toFixed(2),
        other: '--',
      });

      replenishmentItemList.push({
        key: '售后类型',
        title: '售后类型',
        spec: metaData == null ? '' : metaData.replenishmentTypeNote || '',
      });

      replenishmentItemList.push({
        key: '售后原因',
        title: '售后原因',
        spec: metaData == null ? '' : metaData.replenishmentReason || '',
      });

      replenishmentItemList.push({
        key: '售后备注',
        title: '售后备注',
        spec: metaData == null ? '' : metaData.replenishmentNote || '',
      });

      replenishmentItemList.push({
        key: '售后图片',
        title: '售后图片',
        spec: metaData == null ? '' : metaData.replenishmentNote || '',
      });

      replenishmentDataCount = replenishmentItemList.length;

      // if (replenishmentDataCount === 1) {
      //   [oneData] = replenishmentItemList;
      // }
    }

    const replenishmentStateModeData = this.replenishmentStateModeList();
    const replenishmentStateModeOption = [];

    replenishmentStateModeData.forEach(item => {
      const { name, flag } = item;
      replenishmentStateModeOption.push(
        <Radio key={flag} value={flag}>
          {name}
        </Radio>,
      );
    });

    const replenishmentRollBackMoneyData = this.replenishmentRollBackMoneyList();
    const replenishmentRollBackMoneyOption = [];

    replenishmentRollBackMoneyData.forEach(item => {
      const { name, flag } = item;
      replenishmentRollBackMoneyOption.push(
        <Radio key={flag} value={flag}>
          {name}
        </Radio>,
      );
    });

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === dataCount) {
        obj.props.colSpan = 0;
      }
      return obj;
    };

    const canOperateStateSet = new Set([0, 1, 3, 4, 5, 7]);

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'title',
        width: 200,
        align: 'left',
        render: (text, row, index) => {
          if (index < dataCount) {
            return (
              <Ellipsis tooltip lines={1}>
                {text}
              </Ellipsis>
            );
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width: 200,
        align: 'left',
        render: renderContent,
      },
      {
        title: '单位',
        dataIndex: 'unit',
        width: 100,
        align: 'center',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'purchasePrice',
        width: 100,
        align: 'center',
        render: renderContent,
      },
      {
        title: '数量',
        dataIndex: 'count',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index < dataCount.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '积分',
        dataIndex: 'score',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index < dataCount.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'price',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index < dataCount.length) {
            return <span>{text}</span>;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '其他信息',
        dataIndex: 'other',
        align: 'right',
        render: (text, row, index) => {
          if (index < dataCount.length) {
            return <span>{text}</span>;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];

    const replenishmentColumns = [
      {
        title: '商品名称',
        dataIndex: 'title',
        width: 200,
        align: 'left',
        render: (text, row, index) => {
          if (index < replenishmentDataCount - 5) {
            return (
              <Ellipsis tooltip lines={1}>
                {text}
              </Ellipsis>
            );
          }

          if (index === replenishmentDataCount - 5) {
            return {
              children: <span style={{ fontWeight: 600 }}>{text}</span>,
              props: {
                colSpan: 4,
              },
            };
          }

          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '规格',
        dataIndex: 'spec',
        width: 200,
        align: 'left',
        render: (text, row, index) => {
          if (index === replenishmentDataCount - 5) {
            return {
              children: null,
              props: {
                colSpan: 0,
              },
            };
          }

          if (index >= replenishmentDataCount - 4) {
            return {
              children:
                index >= replenishmentDataCount - 1 ? (
                  (replenishmentImageList || []).length > 0 ? (
                    (replenishmentImageList || []).map(item => (
                      <div key={`image_${item.key}`} className={styles.imageItemBox}>
                        <Zmage src={item.src} alt="放大图片并并滑动预览" />
                      </div>
                    ))
                  ) : (
                    '无图片'
                  )
                ) : (
                  <span>{text}</span>
                ),
              props: {
                colSpan: 7,
              },
            };
          }

          return <span>{text}</span>;
        },
      },
      {
        title: '单位',
        dataIndex: 'unit',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index >= replenishmentDataCount - 5) {
            return {
              children: null,
              props: {
                colSpan: 0,
              },
            };
          }

          return <span>{text}</span>;
        },
      },
      {
        title: '单价',
        dataIndex: 'purchasePrice',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index >= replenishmentDataCount - 5) {
            return {
              children: null,
              props: {
                colSpan: 0,
              },
            };
          }

          return <span>{text}</span>;
        },
      },
      {
        title: '数量',
        dataIndex: 'count',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index >= replenishmentDataCount - 4) {
            return {
              children: null,
              props: {
                colSpan: 0,
              },
            };
          }

          return <span>{text}</span>;
        },
      },
      {
        title: '积分',
        dataIndex: 'score',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index >= replenishmentDataCount - 4) {
            return {
              children: null,
              props: {
                colSpan: 0,
              },
            };
          }

          return <span>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'price',
        width: 100,
        align: 'center',
        render: (text, row, index) => {
          if (index >= replenishmentDataCount - 4) {
            return {
              children: null,
              props: {
                colSpan: 0,
              },
            };
          }

          return <span>{text}</span>;
        },
      },
      {
        title: '其他信息',
        dataIndex: 'other',
        align: 'right',
        render: (text, row, index) => {
          if (index >= replenishmentDataCount - 1) {
            return {
              children: null,
              props: {
                colSpan: 0,
              },
            };
          }

          return <span>{text}</span>;
        },
      },
    ];

    return (
      <>
        <div className={styles.containorBox}>
          <Card className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <Descriptions
                title={`订单信息 [流水号：${metaData === null ? '' : metaData.tradeNo || ''}]`}
                size="large"
                style={{ marginBottom: 32 }}
              >
                <Description label="配送费">
                  {isMoney(metaData === null ? '' : metaData.courierPrice)
                    ? `￥${metaData === null ? '' : metaData.courierPrice}`
                    : ''}
                </Description>
                <Description label="总单合计金额">
                  {isMoney(metaData === null ? '' : metaData.totalAmount)
                    ? `￥${metaData === null ? '' : metaData.totalAmount}`
                    : ''}{' '}
                  ({formatMoneyToChinese(metaData === null ? '' : metaData.totalAmount)})
                </Description>
                <Description label="下单时间">
                  {metaData === null ? '' : metaData.beginTime || ''}
                </Description>
                <Description label="支付时间">
                  {metaData === null ? '' : metaData.payTime || ''}
                </Description>
                <Description label="收货人">
                  {metaData === null
                    ? ''
                    : `${metaData.sendConsignee} | ${metaData.sendPhone}` || ''}
                </Description>
                <Description label="收货地址">
                  {metaData === null
                    ? ''
                    : `  ${metaData.sendAddress} | ${metaData.sendStreetAddress}` || ''}
                </Description>
              </Descriptions>
              <Divider style={{ marginBottom: 32 }} />
              <div className={styles.title}>订单商品</div>
              <Table columns={columns} dataSource={itemList} pagination={false} />
            </Spin>
          </Card>
          <Card className={styles.card} bordered={false}>
            <Spin spinning={dataLoading || processing}>
              <div className={styles.title}>
                售后商品
                <span style={{ fontSize: '12px', marginLeft: '10px' }}>
                  (针对已经售后补发出库的物品，请谨慎操作，已经出库的商品转退款会造成商品库存不准确)
                </span>
              </div>
              <Table
                columns={replenishmentColumns}
                dataSource={replenishmentItemList}
                pagination={false}
              />

              <Form style={{ marginTop: '20px' }}>
                {/* {replenishmentState === 0 ? (
                  <> */}
                {canOperateStateSet.has(metaData === null ? -1 : metaData.replenishmentState) ? (
                  <FormItem {...formItemLayout} label={fieldData.replenishmentState}>
                    <RadioGroup
                      value={replenishmentStateMode}
                      onChange={this.handleReplenishmentStateModeChange}
                    >
                      {replenishmentStateModeOption}
                    </RadioGroup>
                  </FormItem>
                ) : null}
                {replenishmentStateMode === 1 ? (
                  <FormItem {...formItemLayout} label={fieldData.replenishmentOutboundTime}>
                    <DatePicker
                      value={
                        (replenishmentOutboundTime || '') === ''
                          ? null
                          : stringToMoment(replenishmentOutboundTime)
                      }
                      allowClear={false}
                      disabledDate={v => {
                        const today = new Date();
                        return (
                          v <
                          new Date(
                            `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
                          )
                        );
                      }}
                      onChange={this.handleOutboundTimeChange}
                    />
                  </FormItem>
                ) : null}
                {replenishmentStateMode === 2 ? (
                  <FormItem {...formItemLayout} label={fieldData.refundAmount}>
                    {getFieldDecorator(
                      'refundAmount',
                      refitFieldDecoratorOption(
                        refundAmount || 0,
                        refundAmount || 0,
                        refundAmount || 0,
                        {
                          rules: [
                            {
                              required: false,
                              message: buildFieldDescription(fieldData.refundAmount, '输入'),
                            },
                          ],
                        },
                      ),
                    )(
                      <Input
                        addonBefore={<Icon type="money-collect" />}
                        placeholder={buildFieldDescription(fieldData.refundAmount)}
                      />,
                    )}
                  </FormItem>
                ) : null}
                {replenishmentStateMode === 2 ? (
                  <FormItem {...formItemLayout} label={fieldData.replenishmentRollBackMoney}>
                    <RadioGroup
                      value={replenishmentRollBackMoney}
                      onChange={this.handleRollBackMoneyChange}
                    >
                      {replenishmentRollBackMoneyOption}
                    </RadioGroup>
                  </FormItem>
                ) : null}
                <FormItem {...formItemLayout} label={fieldData.refundNote}>
                  {getFieldDecorator(
                    'note',
                    refitFieldDecoratorOption(refundNote || '', refundNote || '', '', {
                      rules: [
                        {
                          required: false,
                          message: buildFieldDescription(fieldData.refundNote),
                        },
                      ],
                    }),
                  )(
                    <TextArea
                      placeholder={buildFieldDescription(fieldData.refundNote)}
                      autosize={{ minRows: 3, maxRows: 5 }}
                    />,
                  )}
                </FormItem>
                {this.checkAuthority(accessWayCollection.replenishment.agree) ? (
                  <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                    <Button
                      type="primary"
                      icon="check"
                      loading={processing}
                      disabled={
                        dataLoading ||
                        processing ||
                        !loadSuccess ||
                        !canOperateStateSet.has(
                          metaData === null ? -1 : metaData.replenishmentState,
                        )
                      }
                      onClick={this.validate}
                    >
                      确定
                    </Button>
                  </FormItem>
                ) : null}
                {/* </>
                ) : (
                  <>
                    <FormItem {...formItemLayout} label={fieldData.replenishmentState}>
                      {this.getReplenishmentStateName(
                        metaData === null ? 0 : metaData.replenishmentState || 0
                      )}
                    </FormItem>
                    {replenishmentState === 3 ? (
                      <FormItem {...formItemLayout} label={fieldData.refundAmount}>
                        ￥{metaData === null ? 0 : metaData.refundMoney || 0}
                      </FormItem>
                    ) : null}
                    {replenishmentState === 3 ? (
                      <FormItem {...formItemLayout} label={fieldData.replenishmentRollBackMoney}>
                        {this.getReplenishmentRollBackMoneyName(
                          metaData === null ? 0 : metaData.refundRollBackMoney || 0
                        )}
                      </FormItem>
                    ) : null}
                    <FormItem {...formItemLayout} label={fieldData.refundNote}>
                      {metaData === null ? '无备注' : metaData.refundNote || '无备注'}
                    </FormItem>
                  </>
                )} */}
              </Form>
            </Spin>
          </Card>
        </div>
        <BackTop />
      </>
    );
  };
}

export default ReplenishmentInfo;
