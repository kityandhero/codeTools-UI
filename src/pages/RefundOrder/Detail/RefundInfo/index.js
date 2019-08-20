import React from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
  Radio,
  Form,
  Input,
  Spin,
  Table,
  BackTop,
  Divider,
  Descriptions,
  Icon,
  message,
} from 'antd';

import {
  refitFieldDecoratorOption,
  buildFieldDescription,
  isInvalid,
  isMoney,
  searchFromList,
  refitCommonData,
  formatMoneyToChinese,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import Ellipsis from '@/customComponents/Ellipsis';

import TabPageBase from '../../TabPageBase';
import HandleRefundModal from '../HandleRefundModal';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const { TextArea, Group: InputGroup } = Input;
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

@connect(({ refundOrder, global, loading }) => ({
  refundOrder,
  global,
  loading: loading.models.refundOrder,
}))
@Form.create()
class RefundInfo extends TabPageBase {
  componentAuthority = accessWayCollection.refundOrder.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      refundAmount: 0,
      note: '',
      changeRefundAmountModalVisible: false,
      refundOrderId: null,
      userOrderId: null,
      handleType: 1,
      refundState: 0,
      returnStore: 0,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      refundOrderId: id,
      loadApiPath: 'refundOrder/get',
      submitApiPath: '',
    };

    return result;
  };

  refundOrderHandleTypeList = () => {
    const { global } = this.props;

    const list = [];

    (global.refundOrderHandleTypeList || []).forEach(item => {
      const o = item;

      if (o.flag !== 0) {
        list.push(o);
      }
    });

    return refitCommonData(list);
  };

  getRefundOrderHandleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderHandleTypeList());
    return item == null ? '未知' : item.name;
  };

  refundOrderReturnStoreList = () => {
    const { global } = this.props;

    const list = [];

    (global.refundOrderReturnStoreList || []).forEach(item => {
      const o = item;

      if (o.flag !== -1) {
        list.push(o);
      }
    });

    return refitCommonData(list);
  };

  getRefundOrderReturnStoreName = (v, defaultValue = '未知') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.refundOrderReturnStoreList());
    return item == null ? defaultValue : item.name;
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

  afterLoadSuccess = d => {
    const { refundMoney, userOrderId, refundState, handleType, returnStore } = d;

    this.setState({
      refundAmount: refundMoney,
      userOrderId,
      refundState,
      handleType,
      returnStore,
    });
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { refundOrderId, userOrderId, returnStore, handleType } = this.state;

    d.refundOrderId = refundOrderId;
    d.returnStore = returnStore;

    if (handleType === 1) {
      d.userOrderId = userOrderId;
    }

    if (handleType === 2) {
      d.returnStore = 0;
    }

    return d;
  };

  showChangeRefundAmountModal = () => {
    const { changeRefundAmountModalVisible } = this.state;
    if (!changeRefundAmountModalVisible) {
      this.setState({ changeRefundAmountModalVisible: true });
    }
  };

  afterChangeRefundAmountModalOk = data => {
    this.setState({
      changeRefundAmountModalVisible: false,
    });

    const { dataSuccess, message: messageText, clientMessage } = data;
    if (dataSuccess) {
      message.success(clientMessage, 4);

      this.reloadData();
    } else {
      message.error(messageText);
    }
  };

  afterChangeRefundAmountModalCancel = () => {
    this.setState({
      changeRefundAmountModalVisible: false,
    });
  };

  handleHandleTypeChange = e => {
    const {
      target: { value: v },
    } = e;

    const submitApiPath = `refundOrder/${v === 2 ? 'refuse' : 'immediatelyRefund'}`;

    this.setState({ handleType: v, submitApiPath });
  };

  handleReturnStoreChange = e => {
    const {
      target: { value: v },
    } = e;

    this.setState({ returnStore: v });
  };

  formContent = () => {
    const { form } = this.props;
    const {
      metaData,
      processing,
      dataLoading,
      loadSuccess,
      refundAmount,
      note,
      refundOrderId,
      userOrderId,
      changeRefundAmountModalVisible,
      handleType,
      refundState,
      returnStore,
      submitApiPath,
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
        price: totalAmount,
        other: '--',
      });

      // if (dataCount === 1) {
      //   [oneData] = itemList;
      // }
    }

    const refundItemList = [];
    // let oneData = {};
    let refundDataCount = 0;
    let refundTotalCount = 0;
    let refundTotalAmount = 0;
    let refundTotalScore = 0;

    if (metaData !== null) {
      (metaData.refundItemList || []).forEach(o => {
        const v = o;
        v.key = o.productId;
        v.other = '--';
        refundItemList.push(v);

        refundTotalCount += o.count;
        refundTotalAmount += o.price;
        refundTotalScore += o.score;
      });

      refundDataCount = refundItemList.length;

      refundItemList.push({
        key: 'sum',
        title: '总计',
        count: refundTotalCount,
        score: refundTotalScore,
        price: refundTotalAmount.toFixed(2),
        other: '--',
      });

      refundItemList.push({
        key: '退款备注',
        title: '退款备注',
        spec: metaData === null ? '' : metaData.refundNote || '',
      });

      refundDataCount = refundItemList.length;

      // if (refundDataCount === 1) {
      //   [oneData] = refundItemList;
      // }
    }

    const handleTypeData = this.refundOrderHandleTypeList();
    const handleTypeOption = [];

    handleTypeData.forEach(item => {
      const { name, flag } = item;
      handleTypeOption.push(
        <Radio key={flag} value={flag}>
          {flag === 1 ? '同意退款' : name}
        </Radio>
      );
    });

    const returnStoreData = this.refundOrderReturnStoreList();
    const returnStoreOption = [];

    returnStoreData.forEach(item => {
      const { name, flag } = item;
      returnStoreOption.push(
        <Radio key={flag} value={flag}>
          {name}
        </Radio>
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

    const refundColumns = [
      {
        title: '商品名称',
        dataIndex: 'title',
        width: 200,
        align: 'left',
        render: (text, row, index) => {
          if (index < refundDataCount - 2) {
            return (
              <Ellipsis tooltip lines={1}>
                {text}
              </Ellipsis>
            );
          }

          if (index === refundDataCount - 2) {
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
          if (index === refundDataCount - 2) {
            return {
              children: null,
              props: {
                colSpan: 0,
              },
            };
          }

          if (index === refundDataCount - 1) {
            return {
              children: <span>{text}</span>,
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
          if (index >= refundDataCount - 2) {
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
          if (index >= refundDataCount - 2) {
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
          if (index >= refundDataCount - 1) {
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
          if (index >= refundDataCount - 1) {
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
          if (index >= refundDataCount - 1) {
            return {
              children: <span>{text}</span>,
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
          if (index >= refundDataCount - 1) {
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
          <Card
            title={`退款处理${refundState === 0 ? '' : '【已处理】'}`}
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <div className={styles.title}>退款商品</div>
              <Table columns={refundColumns} dataSource={refundItemList} pagination={false} />

              <Form style={{ marginTop: '20px' }}>
                {refundState === 0 ? (
                  <>
                    <FormItem {...formItemLayout} label={fieldData.handleType}>
                      <RadioGroup value={handleType} onChange={this.handleHandleTypeChange}>
                        {handleTypeOption}
                      </RadioGroup>
                    </FormItem>
                    {handleType === 1 ? (
                      <FormItem {...formItemLayout} label={fieldData.returnStore}>
                        <RadioGroup value={returnStore} onChange={this.handleReturnStoreChange}>
                          {returnStoreOption}
                        </RadioGroup>
                      </FormItem>
                    ) : null}
                    {handleType === 1 ? (
                      <FormItem {...formItemLayout} label={fieldData.refundChannel}>
                        微信或支付宝原路退回
                      </FormItem>
                    ) : null}
                    {handleType === 1 ? (
                      <FormItem {...formItemLayout} label={fieldData.refundAmount}>
                        <InputGroup compact>
                          <Input
                            addonBefore={<Icon type="money-collect" />}
                            disabled={
                              !this.checkAuthority(
                                accessWayCollection.refundOrder.changeRefundAmount
                              )
                            }
                            readOnly
                            value={refundAmount}
                            addonAfter={
                              this.checkAuthority(
                                accessWayCollection.refundOrder.changeRefundAmount
                              ) ? (
                                <>
                                  <Button
                                    icon="edit"
                                    style={{
                                      border: '0px solid #d9d9d9',
                                      backgroundColor: '#fafafa',
                                      height: '30px',
                                    }}
                                    disabled={dataLoading || processing || !loadSuccess}
                                    title="调整退款金额"
                                    onClick={e => this.showChangeRefundAmountModal(e)}
                                  >
                                    调整金额
                                  </Button>
                                </>
                              ) : null
                            }
                          />
                        </InputGroup>
                      </FormItem>
                    ) : null}
                    <FormItem {...formItemLayout} label={fieldData.note}>
                      {getFieldDecorator(
                        'note',
                        refitFieldDecoratorOption(note || '', note || '', '', {
                          rules: [
                            {
                              required: false,
                              message: buildFieldDescription(fieldData.note),
                            },
                          ],
                        })
                      )(
                        <TextArea
                          placeholder={buildFieldDescription(fieldData.note)}
                          autosize={{ minRows: 3, maxRows: 5 }}
                        />
                      )}
                    </FormItem>
                    {this.checkAuthority(accessWayCollection.refundOrder.immediatelyRefund) &&
                    this.checkAuthority(accessWayCollection.refundOrder.refuse) ? (
                      <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button
                          type="primary"
                          icon="check"
                          loading={processing}
                          disabled={
                            dataLoading || processing || !loadSuccess || submitApiPath === ''
                          }
                          onClick={this.validate}
                        >
                          确定
                        </Button>
                      </FormItem>
                    ) : null}
                  </>
                ) : (
                  <>
                    <FormItem {...formItemLayout} label={fieldData.handleType}>
                      {this.getRefundOrderHandleTypeName(
                        metaData === null ? 2 : metaData.refundHandleType || 2
                      )}
                    </FormItem>
                    {handleType === 1 ? (
                      <FormItem {...formItemLayout} label={fieldData.returnStore}>
                        {this.getRefundOrderReturnStoreName(
                          metaData === null ? 0 : metaData.returnStore || 0,
                          '--'
                        )}
                      </FormItem>
                    ) : null}
                    {handleType === 1 ? (
                      <FormItem {...formItemLayout} label={fieldData.refundChannel}>
                        微信或支付宝原路退回
                      </FormItem>
                    ) : null}
                    {handleType === 1 ? (
                      <FormItem {...formItemLayout} label={fieldData.refundAmount}>
                        ￥{metaData === null ? 0 : metaData.refundMoney || 0}
                      </FormItem>
                    ) : null}
                    <FormItem {...formItemLayout} label={fieldData.note}>
                      {metaData === null ? '无备注' : metaData.note || '无备注'}
                    </FormItem>
                  </>
                )}
              </Form>
            </Spin>
          </Card>
        </div>
        <HandleRefundModal
          refundOrderId={refundOrderId}
          refundAmount={refundAmount}
          userOrderId={userOrderId}
          visible={changeRefundAmountModalVisible}
          afterOK={this.afterChangeRefundAmountModalOk}
          afterCancel={this.afterChangeRefundAmountModalCancel}
        />
        <BackTop />
      </>
    );
  };
}

export default RefundInfo;
