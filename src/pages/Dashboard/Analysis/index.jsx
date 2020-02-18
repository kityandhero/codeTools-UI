import React from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import {
  Row,
  Col,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Spin,
  Alert,
} from 'antd';
import numeral from 'numeral';
import { GridContent } from '@ant-design/pro-layout';

import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '../../../customComponents/Charts';
import { formatDatetime, pretreatmentRequestParams } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import LoadDataForm from '../../../customComponents/Framework/CustomForm/LoadDataForm';
import Trend from '../../../customComponents/Trend';
import NumberInfo from '../../../customComponents/NumberInfo';
import Yuan from '../../../utils/Yuan';

import styles from './index.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

@connect(({ dashboard, chart, loading }) => ({
  dashboard,
  chart,
  loading: loading.models.dashboard,
}))
class Analysis extends LoadDataForm {
  componentAuthority = accessWayCollection.dashboard.analysis;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadDataAfterMount: false,
        saleAmountLoading: true,
        saleAmountData: {
          totalSaleAmount: 0,
          totalSaleAmountTime: '',
          todaySaleAmount: 0,
          dayChainRelativeRatio: 0,
          weekChainRelativeRatio: 0,
        },
        saleCountLoading: true,
        saleCountData: {
          totalSaleCount: 0,
          todaySaleCount: 0,
          saleCountRange: [],
        },
        areaAccountBalanceLoading: true,
        areaAccountBalanceData: {
          totalAreaAccountBalance: 0,
          availableAreaAccountBalance: 0,
          areaAccountBalanceRange: [],
        },
        replenishmentStatisticLoading: true,
        replenishmentStatisticData: {
          rate: 0.0,
          replenishmentCount: 0,
          saleCount: 0,
        },
        saleAmountRangeLoading: true,
        saleAmountRangeData: {
          saleAmountRange: [],
          topMerchantList: [],
        },
        saleCountRangeLoading: true,
        saleCountRangeData: {
          saleCountRange: [],
          topMerchantList: [],
        },
        searchDataLoading: true,
        searchData: {
          searchRange: [],
          topSearchList: [],
        },
        saleRangeMode: '',
        saleStartTime: null,
        saleEndTime: null,
        rankStatisticLoading: true,
        rankStatisticData: {
          totalSaleAmountOnLine: 0,
          totalSaleAmountOffLine: 0,
          rankSale: [],
          rankSaleOnLine: [],
          rankSaleOffLine: [],
        },
        salesType: 'all',
        currentTabKey: '',
        offlineDataLoading: true,
        offlineData: [],
        offlineChartData: [],
      },
    };
  }

  preInit = () => {
    this.loadShowAnalysis();
  };

  beforeUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  };

  loadShowAnalysis = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'dashboard/showAnalysis',
      payload: {},
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          this.loadSaleAmount();
          this.loadSaleCount();
          this.loadAreaAccountBalance();
          this.loadReplenishmentStatistic();
          this.loadSaleAmountRange();
          this.loadSaleCountRange();
          this.loadSearchRange();
          this.loadRankStatistic();
          this.loadStoreStatistic();
        }
      }
    });
  };

  loadSaleCount = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      return o;
    });

    this.setState({ saleCountLoading: true });

    dispatch({
      type: 'dashboard/getSaleCount',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const { totalSaleCount, todaySaleCount, saleCountRange: saleCountRangeData } = metaData;

          const saleCountRange = [];

          (saleCountRangeData || []).forEach(item => {
            const o = {
              x: item.title,
              y: item.data,
            };

            saleCountRange.push(o);
          });

          const saleCountData = {
            totalSaleCount,
            todaySaleCount,
            saleCountRange,
          };

          this.setState({ saleCountData });
        }

        this.setState({ saleCountLoading: false });
      }
    });
  };

  loadSaleAmount = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      return o;
    });

    this.setState({ saleAmountLoading: true });

    dispatch({
      type: 'dashboard/getSaleAmount',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const {
            totalSaleAmount,
            totalSaleAmountTime,
            todaySaleAmount,
            dayChainRelativeRatio,
            weekChainRelativeRatio,
          } = metaData;

          const saleAmountData = {
            totalSaleAmount,
            totalSaleAmountTime,
            todaySaleAmount,
            dayChainRelativeRatio,
            weekChainRelativeRatio,
          };

          this.setState({ saleAmountData });
        }

        this.setState({ saleAmountLoading: false });
      }
    });
  };

  loadAreaAccountBalance = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      return o;
    });

    this.setState({ areaAccountBalanceLoading: true });

    dispatch({
      type: 'dashboard/getAreaAccountBalance',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const {
            totalAreaAccountBalance,
            availableAreaAccountBalance,
            areaAccountBalanceRange: areaAccountBalanceRangeData,
          } = metaData;

          const areaAccountBalanceRange = [];

          (areaAccountBalanceRangeData || []).forEach(item => {
            const o = {
              x: item.title,
              y: item.data,
            };

            areaAccountBalanceRange.push(o);
          });

          const areaAccountBalanceData = {
            totalAreaAccountBalance,
            availableAreaAccountBalance,
            areaAccountBalanceRange,
          };

          this.setState({ areaAccountBalanceData });
        }

        this.setState({ areaAccountBalanceLoading: false });
      }
    });
  };

  loadReplenishmentStatistic = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      return o;
    });

    this.setState({ replenishmentStatisticLoading: true });

    dispatch({
      type: 'dashboard/getReplenishmentStatistic',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const { rate, replenishmentCount, saleCount } = metaData;

          const replenishmentStatisticData = {
            rate,
            replenishmentCount,
            saleCount,
          };

          this.setState({ replenishmentStatisticData });
        }

        this.setState({ replenishmentStatisticLoading: false });
      }
    });
  };

  loadSaleAmountRange = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const { saleRangeMode, saleStartTime, saleEndTime } = this.state;
      const o = d;

      o.mode = saleRangeMode || 'today';
      o.startTime = saleStartTime;
      o.endTime = saleEndTime;

      return o;
    });

    this.setState({ saleAmountRangeLoading: true });

    dispatch({
      type: 'dashboard/getSaleAmountRange',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const { saleAmountRange: saleAmountRangeSource, topMerchantList } = metaData;

          const saleAmountRange = [];

          (saleAmountRangeSource || []).forEach(item => {
            const o = {
              x: item.title,
              y: item.data,
            };

            saleAmountRange.push(o);
          });

          const saleAmountRangeData = {
            saleAmountRange,
            topMerchantList,
          };

          this.setState({ saleAmountRangeData });
        }

        this.setState({ saleAmountRangeLoading: false });
      }
    });
  };

  loadSaleCountRange = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const { saleRangeMode, saleStartTime, saleEndTime } = this.state;
      const o = d;

      o.mode = saleRangeMode || 'today';
      o.startTime = saleStartTime;
      o.endTime = saleEndTime;

      return o;
    });

    this.setState({ saleCountRangeLoading: true });

    dispatch({
      type: 'dashboard/getSaleCountRange',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const { saleCountRange: saleCountRangeSource, topMerchantList } = metaData;

          const saleCountRange = [];

          (saleCountRangeSource || []).forEach(item => {
            const o = {
              x: item.title,
              y: item.data,
            };

            saleCountRange.push(o);
          });

          const saleCountRangeData = {
            saleCountRange,
            topMerchantList,
          };

          this.setState({ saleCountRangeData });
        }

        this.setState({ saleCountRangeLoading: false });
      }
    });
  };

  loadSearchRange = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      return o;
    });

    this.setState({ searchDataLoading: true });

    dispatch({
      type: 'dashboard/getSearch',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const {
            totalSearchCount,
            averageSearch,
            searchRange: searchRangeSource,
            topSearchList,
          } = metaData;

          const searchRange = [];

          (searchRangeSource || []).forEach(item => {
            const o = {
              x: item.title,
              y: item.data,
            };

            searchRange.push(o);
          });

          const searchData = {
            totalSearchCount,
            averageSearch,
            searchRange,
            topSearchList,
          };

          this.setState({ searchData });
        }

        this.setState({ searchDataLoading: false });
      }
    });
  };

  loadRankStatistic = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      return o;
    });

    this.setState({ rankStatisticLoading: true });

    dispatch({
      type: 'dashboard/getRankStatistic',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const {
            totalSaleAmountOnLine,
            totalSaleAmountOffLine,
            rankList: rankListData,
            onLineRankList: onLineRankListData,
            offLineRankList: offLineRankListData,
          } = metaData;

          const rankSale = [];
          const rankSaleOnLine = [];
          const rankSaleOffLine = [];

          (rankListData || []).forEach(item => {
            rankSale.push({
              x: item.rankName,
              y: item.saleAmount,
            });
          });

          (onLineRankListData || []).forEach(item => {
            rankSaleOnLine.push({
              x: item.rankName,
              y: item.saleAmount,
            });
          });

          (offLineRankListData || []).forEach(item => {
            rankSaleOffLine.push({
              x: item.rankName,
              y: item.saleAmount,
            });
          });

          const rankStatisticData = {
            totalSaleAmountOnLine,
            totalSaleAmountOffLine,
            rankSale,
            rankSaleOnLine,
            rankSaleOffLine,
          };

          this.setState({ rankStatisticData });
        }

        this.setState({ rankStatisticLoading: false });
      }
    });
  };

  loadStoreStatistic = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      return o;
    });

    this.setState({ offlineDataLoading: true });

    dispatch({
      type: 'dashboard/getStoreStatistic',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const { offlineData, offlineChartData } = metaData;

          this.setState({ offlineData, offlineChartData });
        }

        this.setState({ offlineDataLoading: false });
      }
    });
  };

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = (dates, dateStrings) => {
    this.setState(
      {
        saleRangeMode: 'custom',
        saleStartTime: dateStrings[0],
        saleEndTime: dateStrings[1],
      },
      () => {
        this.loadSaleCountRange();
        this.loadSaleAmountRange();
      }
    );
  };

  saleRangeChange = type => {
    this.setState(
      {
        saleRangeMode: type,
        saleStartTime: null,
        saleEndTime: null,
      },
      () => {
        this.loadSaleCountRange();
        this.loadSaleAmountRange();
      }
    );
  };

  isActive(type) {
    const { saleRangeMode } = this.state;

    const ck = saleRangeMode || 'today';

    if (ck === type) {
      return styles.currentDate;
    }
    return '';
  }

  render() {
    const {
      saleAmountLoading,
      saleAmountData,
      saleCountLoading,
      saleCountData,
      areaAccountBalanceLoading,
      areaAccountBalanceData,
      replenishmentStatisticLoading,
      replenishmentStatisticData,
      saleAmountRangeLoading,
      saleAmountRangeData,
      saleCountRangeLoading,
      saleCountRangeData,
      searchDataLoading,
      searchData,
      saleRangeMode,
      rankStatisticLoading,
      rankStatisticData,
      salesType,
      currentTabKey,
      offlineDataLoading,
      offlineData,
      offlineChartData,
    } = this.state;

    const { rankSale, rankSaleOnLine, rankSaleOffLine } = rankStatisticData;

    let salesPieData;
    if (salesType === 'all') {
      salesPieData = rankSale;
    } else {
      salesPieData = salesType === 'online' ? rankSaleOnLine : rankSaleOffLine;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <LegacyIcon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a
            disabled={saleAmountRangeLoading || saleCountRangeLoading}
            className={this.isActive('today')}
            onClick={() => this.saleRangeChange('today')}
          >
            今日
          </a>
          <a
            disabled={saleAmountRangeLoading || saleCountRangeLoading}
            className={this.isActive('week')}
            onClick={() => this.saleRangeChange('week')}
          >
            本周
          </a>
          <a
            disabled={saleAmountRangeLoading || saleCountRangeLoading}
            className={this.isActive('month')}
            onClick={() => this.saleRangeChange('month')}
          >
            本月
          </a>
          <a
            disabled={saleAmountRangeLoading || saleCountRangeLoading}
            className={this.isActive('year')}
            onClick={() => this.saleRangeChange('year')}
          >
            全年
          </a>
        </div>
        <RangePicker
          disabled={saleAmountRangeLoading || saleCountRangeLoading}
          placeholder={['开始时间', '结束时间']}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );

    const columns = [
      {
        title: '排名',
        dataIndex: 'ranking',
        key: 'ranking',
      },
      {
        title: '搜索关键词',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '用户数',
        dataIndex: 'userCount',
        key: 'userCount',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },
      {
        title: '周涨幅',
        dataIndex: 'changeRate',
        key: 'changeRate',
        sorter: (a, b) => a.changeRate - b.changeRate,
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ];

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle={
              <FormattedMessage
                id="app.analysis.conversion-rate"
                defaultMessage="Conversion Rate"
              />
            }
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const RankingNoSupportBox = () => (
      <div className={styles.rankingNoSupportBox}>
        <Alert message="暂不支持自定时间段站长排名" type="info" showIcon />
      </div>
    );

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <Spin spinning={saleAmountLoading}>
              <ChartCard
                bordered={false}
                title="总销售量"
                action={
                  <>
                    <Tooltip
                      title={`每隔10分钟统计一次,本次统计时间为${formatDatetime(
                        saleAmountData.totalSaleAmountTime,
                        'YYYY-MM-DD HH:mm'
                      )}`}
                    >
                      <LegacyIcon type="info-circle-o" />
                    </Tooltip>
                  </>
                }
                total={() => <Yuan>{saleAmountData.totalSaleAmount}</Yuan>}
                // total={`￥${numeral(saleAmountData.todaySaleAmount).format('0,0.00')}`}
                footer={
                  <Field
                    label="今日目前销售额"
                    value={`￥${numeral(saleAmountData.todaySaleAmount).format('0,0.00')}`}
                  />
                }
                contentHeight={46}
              >
                <Trend
                  flag={saleAmountData.weekChainRelativeRatio >= 0 ? 'up' : 'down'}
                  style={{ marginRight: 16 }}
                >
                  周环比
                  <span className={styles.trendText}>
                    {Math.abs(saleAmountData.weekChainRelativeRatio) * 100}%
                  </span>
                </Trend>
                <Trend flag={saleAmountData.dayChainRelativeRatio >= 0 ? 'up' : 'down'}>
                  日环比
                  <span className={styles.trendText}>
                    {Math.abs(saleAmountData.dayChainRelativeRatio) * 100}%
                  </span>
                </Trend>
              </ChartCard>
            </Spin>
          </Col>
          <Col {...topColResponsiveProps}>
            <Spin spinning={saleCountLoading}>
              <ChartCard
                bordered={false}
                title="总订单量"
                action={
                  <Tooltip
                    title={`每隔10分钟统计一次,本次统计时间为${formatDatetime(
                      saleAmountData.totalSaleAmountTime,
                      'YYYY-MM-DD HH:mm'
                    )}`}
                  >
                    <LegacyIcon type="info-circle-o" />
                  </Tooltip>
                }
                total={saleCountData.totalSaleCount}
                footer={
                  <Field label="今日目前订单量" value={`${saleCountData.todaySaleCount}笔`} />
                }
                contentHeight={46}
              >
                <MiniArea color="#975FE4" data={saleCountData.saleCountRange} />
              </ChartCard>
            </Spin>
          </Col>
          <Col {...topColResponsiveProps}>
            <Spin spinning={areaAccountBalanceLoading}>
              <ChartCard
                bordered={false}
                title="总收入"
                action={
                  <Tooltip
                    title={`每隔10分钟统计一次,本次统计时间为${formatDatetime(
                      saleAmountData.totalSaleAmountTime,
                      'YYYY-MM-DD HH:mm'
                    )}`}
                  >
                    <LegacyIcon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Yuan>{areaAccountBalanceData.totalAreaAccountBalance}</Yuan>}
                footer={
                  <>
                    <Field
                      label="目前可提金额"
                      value={
                        <>
                          {`￥${numeral(areaAccountBalanceData.availableAreaAccountBalance).format(
                            '0,0'
                          )}`}
                          {/* <a href="/" className={styles.withdrawal}>
                          [提现]
                        </a> */}
                        </>
                      }
                    />
                  </>
                }
                contentHeight={46}
              >
                <MiniBar data={areaAccountBalanceData.areaAccountBalanceRange} />
              </ChartCard>
            </Spin>
          </Col>
          <Col {...topColResponsiveProps}>
            <Spin spinning={replenishmentStatisticLoading}>
              <ChartCard
                bordered={false}
                title="售后占比"
                action={
                  <Tooltip
                    title={`每隔10分钟统计一次,本次统计时间为${formatDatetime(
                      saleAmountData.totalSaleAmountTime,
                      'YYYY-MM-DD HH:mm'
                    )}`}
                  >
                    <LegacyIcon type="info-circle-o" />
                  </Tooltip>
                }
                total={`${Math.abs(replenishmentStatisticData.rate) * 100}%`}
                footer={
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <Trend flag="up" style={{ marginRight: 16 }}>
                      订单量
                      <span className={styles.trendText}>
                        {replenishmentStatisticData.saleCount}
                      </span>
                    </Trend>
                    <Trend flag="up">
                      售后量
                      <span className={styles.trendText}>
                        {replenishmentStatisticData.replenishmentCount}
                      </span>
                    </Trend>
                  </div>
                }
                contentHeight={46}
              >
                <MiniProgress
                  percent={Math.abs(replenishmentStatisticData.rate) * 100}
                  strokeWidth={8}
                  target={1}
                  color="#13C2C2"
                />
              </ChartCard>
            </Spin>
          </Col>
        </Row>

        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <Spin spinning={saleAmountRangeLoading || saleCountRangeLoading}>
            <div className={styles.salesCard}>
              <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
                <TabPane tab="销售额" key="sales">
                  <Row>
                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesBar}>
                        <Bar
                          height={295}
                          title="销售趋势"
                          data={saleAmountRangeData.saleAmountRange}
                        />
                      </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesRank}>
                        <div className={styles.salesRankInner}>
                          <h4 className={styles.rankingTitle}>站长销售额排名</h4>
                          <ul className={styles.rankingList}>
                            {(saleAmountRangeData.topMerchantList || []).map((item, i) => (
                              <li key={`saleAmountMerchant_${item.ranking}`}>
                                <span
                                  className={`${styles.rankingItemNumber} ${
                                    i < 3 ? styles.active : ''
                                  }`}
                                >
                                  {item.ranking}
                                </span>
                                <span
                                  className={styles.rankingItemTitle}
                                  title={item.name || '暂无排名'}
                                >
                                  {item.name || '暂无排名'}
                                </span>
                                <span className={styles.rankingItemValue}>
                                  ￥{numeral(item.amount).format('0,0')}
                                </span>
                              </li>
                            ))}
                          </ul>
                          {saleRangeMode === 'custom' ? <RankingNoSupportBox /> : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="订单量" key="views">
                  <Row>
                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesBar}>
                        <Bar
                          height={292}
                          title="订单量趋势"
                          data={saleCountRangeData.saleCountRange}
                        />
                      </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesRank}>
                        <div className={styles.salesRankInner}>
                          <h4 className={styles.rankingTitle}>站长订单量排名</h4>
                          <ul className={styles.rankingList}>
                            {(saleCountRangeData.topMerchantList || []).map((item, i) => (
                              <li key={`saleCountMerchant_${item.ranking}`}>
                                <span
                                  className={`${styles.rankingItemNumber} ${
                                    i < 3 ? styles.active : ''
                                  }`}
                                >
                                  {item.ranking}
                                </span>
                                <span
                                  className={styles.rankingItemTitle}
                                  title={item.name || '暂无排名'}
                                >
                                  {item.name || '暂无排名'}
                                </span>
                                <span>{item.count}</span>
                              </li>
                            ))}
                          </ul>
                          {saleRangeMode === 'custom' ? <RankingNoSupportBox /> : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </Spin>
        </Card>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} title="线上热门搜索" extra={iconGroup} style={{ marginTop: 24 }}>
              <Spin spinning={searchDataLoading}>
                <Row gutter={68}>
                  <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                    <NumberInfo
                      subTitle={
                        <span>
                          搜索用户数
                          <Tooltip title="指标说明">
                            <LegacyIcon style={{ marginLeft: 8 }} type="info-circle-o" />
                          </Tooltip>
                        </span>
                      }
                      gap={8}
                      total={numeral(searchData.totalSearchCount).format('0,0')}
                      status="up"
                      subTotal={0}
                    />
                    <MiniArea line height={45} data={searchData.searchRange} />
                  </Col>
                  <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                    <NumberInfo
                      subTitle={
                        <span>
                          人均搜索次数
                          <Tooltip title="指标说明">
                            <LegacyIcon style={{ marginLeft: 8 }} type="info-circle-o" />
                          </Tooltip>
                        </span>
                      }
                      total={searchData.averageSearch}
                      status="down"
                      subTotal={0}
                      gap={8}
                    />
                    <MiniArea line height={45} data={searchData.searchRange} />
                  </Col>
                </Row>
                <Table
                  rowKey={record => record.ranking}
                  size="small"
                  columns={columns}
                  dataSource={searchData.topSearchList}
                  pagination={false}
                />
              </Spin>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.salesCard}
              bordered={false}
              title="月销售额类别占比"
              bodyStyle={{ padding: 24 }}
              extra={
                <div className={styles.salesCardExtra}>
                  {iconGroup}
                  <div className={styles.salesTypeRadio}>
                    <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value="all">全部渠道</Radio.Button>
                      <Radio.Button value="online">线上</Radio.Button>
                      <Radio.Button value="stores">门店</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <Spin spinning={rankStatisticLoading}>
                <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>
                <Pie
                  hasLegend
                  subTitle="月销售额"
                  total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
                  data={salesPieData}
                  valueFormat={value => <Yuan>{value}</Yuan>}
                  height={248}
                  lineWidth={4}
                />
              </Spin>
            </Card>
          </Col>
        </Row>

        <Card
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Spin spinning={offlineDataLoading}>
            <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
              {offlineData.map(shop => (
                <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.key}>
                  <div style={{ padding: '0 24px' }}>
                    <TimelineChart
                      height={400}
                      data={offlineChartData}
                      titleMap={{
                        y1: '客流量',
                        y2: '订单量',
                      }}
                    />
                  </div>
                </TabPane>
              ))}
            </Tabs>
          </Spin>
        </Card>
      </GridContent>
    );
  }
}

export default Analysis;
