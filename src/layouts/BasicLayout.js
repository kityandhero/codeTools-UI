import React, { Suspense } from 'react';
import {
  Layout,
  message,
  //  notification
} from 'antd';
import DocumentTitle from 'react-document-title';
import NProgress from 'nprogress';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import Media from 'react-media';
import { formatMessage } from 'umi/locale';
import Authorized from '@/utils/Authorized';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import Exception403 from '../pages/Exception/403';
import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
import { title } from '../defaultSettings';
import styles from './BasicLayout.less';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));
const logo = '/shareLogo.png';
const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

let currHref = '';

class BasicLayout extends React.PureComponent {
  mounted = false;

  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  componentDidMount() {
    this.mounted = true;

    requestAnimationFrame(() => {
      message.info('初始数据正在努力加载中，需要一点点时间哦！');
    });

    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });

    // this.loadMetaData();
    // this.loadCommonData();
  }

  componentDidUpdate(preProps) {
    const { loading } = this.props;
    // 浏览器地址栏中地址
    const { href } = window.location;
    // currHref 和 href 不一致时说明进行了页面跳转
    if (currHref !== href) {
      // 页面开始加载时调用 start 方法
      NProgress.start();
      // loading.global 为 false 时表示加载完毕
      if (!loading.global) {
        // 页面请求完毕时调用 done 方法
        NProgress.done();
        // 将新页面的 href 值赋值给 currHref
        currHref = href;
      }
    }

    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    const { collapsed, isMobile } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.setState = () => {};
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  matchParamsPath = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey];
  };

  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.forEach(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  getPageTitle = (pathname, breadcrumbNameMap) => {
    const currRouterData = this.matchParamsPath(pathname, breadcrumbNameMap);

    if (!currRouterData) {
      return title;
    }
    const pageName = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name,
    });

    return `${pageName} - ${title}`;
  };

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  loadCommonData = () => {
    const dataLoadQuery = [
      {
        request: 'rank/list',
        handleResponse: props => {
          const {
            rank: { data },
          } = props;
          return data;
        },
        setDataCache: 'global/setRank',
        dataName: '产品类型',
        dataType: 'list',
      },
      {
        request: 'brand/list',
        handleResponse: props => {
          const {
            brand: { data },
          } = props;
          return data;
        },
        setDataCache: 'global/setBrand',
        dataName: '商品品牌',
        dataType: 'list',
      },
      {
        request: 'line/listForEdit',
        handleResponse: props => {
          const {
            line: { data },
          } = props;
          return data;
        },
        setDataCache: 'global/setLine',
        dataName: '配送区域',
        dataType: 'list',
      },
      {
        request: 'currentOperator/getCurrentBasicInfo',
        handleResponse: props => {
          const {
            currentOperator: { data },
          } = props;
          return data;
        },
        setDataCache: 'global/setCurrentOperator',
        dataName: '',
        dataType: 'object',
      },
    ];

    dataLoadQuery.forEach(item => {
      this.loadCommonDataCore(
        item.request,
        item.handleResponse,
        item.setDataCache,
        item.dataName,
        item.dataType
      );
    });
  };

  loadMetaData = () => {
    const { dispatch } = this.props;

    // try {
    dispatch({
      type: 'metaData/get',
      payload: {},
    }).then(() => {
      if (this.mounted) {
        const {
          metaData: { data },
        } = this.props;

        if (data != null) {
          const { dataSuccess, data: metaData } = data;

          if (dataSuccess) {
            const {
              productState,
              productSaleType,
              productBuyType,
              productUnit,
              userOrderState,
              userOrderPayType,
              userOrderClientType,
              userOrderType,
              areaAccountRecordRevenueExpenses,
              areaAccountRecordType,
              areaDistributionState,
              areaDistributionPayType,
              merchantState,
              merchantSwitch,
              merchantPurchase,
              merchantDisplay,
              merchantPay,
              refundOrderState,
              refundOrderHandleType,
              userType,
              userManage,
              userIsSendMsg,
              userSex,
              replenishmentReasonType,
              replenishmentState,
              replenishmentType,
              replenishmentRollBackMoney,
              distributionState,
              areaManageState,
              roleState,
            } = metaData;

            const metaDataLoadQuery = [
              {
                data: productBuyType,
                setDataCache: 'global/setBuyType',
                dataName: '售卖对象',
                dataType: 'list',
              },
              {
                data: productSaleType,
                setDataCache: 'global/setSaleType',
                dataName: '销售类型',
                dataType: 'list',
              },
              {
                data: productUnit,
                setDataCache: 'global/setUnit',
                dataName: '产品单位',
                dataType: 'list',
              },
              {
                data: productState,
                setDataCache: 'global/setProductState',
                dataName: '产品状态',
                dataType: 'list',
              },
              {
                data: userOrderType,
                setDataCache: 'global/setOrderType',
                dataName: '订单类型',
                dataType: 'list',
              },
              {
                data: userOrderState,
                setDataCache: 'global/setOrderStatus',
                dataName: '订单状态',
                dataType: 'list',
              },
              {
                data: userOrderPayType,
                setDataCache: 'global/setPayType',
                dataName: '支付类型',
                dataType: 'list',
              },
              {
                data: userType,
                setDataCache: 'global/setRegUserType',
                dataName: '消费者类型',
                dataType: 'list',
              },
              {
                data: userSex,
                setDataCache: 'global/setGender',
                dataName: '性别数据',
                dataType: 'list',
              },
              {
                data: merchantState,
                setDataCache: 'global/setMerchantStatus',
                dataName: '服务站状态',
                dataType: 'list',
              },
              {
                data: userManage,
                setDataCache: 'global/setAutonomousAuthority',
                dataName: '前台管理',
                dataType: 'list',
              },
              {
                data: userIsSendMsg,
                setDataCache: 'global/setTransactionNotice',
                dataName: '交易提醒',
                dataType: 'list',
              },
              {
                data: merchantPurchase,
                setDataCache: 'global/setMerchantPurchase',
                dataName: '采购权限',
                dataType: 'list',
              },
              {
                data: merchantDisplay,
                setDataCache: 'global/setMerchantDisplay',
                dataName: '店铺前台显示',
                dataType: 'list',
              },
              {
                data: merchantPay,
                setDataCache: 'global/setMerchantPay',
                dataName: '店铺缴费',
                dataType: 'list',
              },
              {
                data: merchantSwitch,
                setDataCache: 'global/setMerchantSwitch',
                dataName: '店铺开关',
                dataType: 'list',
              },
              {
                data: refundOrderHandleType,
                setDataCache: 'global/setRefundOrderHandleType',
                dataName: '退款单处理类型',
                dataType: 'list',
              },
              {
                data: refundOrderState,
                setDataCache: 'global/setRefundOrderState',
                dataName: '退款单状态',
                dataType: 'list',
              },
              {
                data: replenishmentReasonType,
                setDataCache: 'global/setReplenishmentReasonType',
                dataName: '售后单原因集合',
                dataType: 'list',
              },
              {
                data: replenishmentState,
                setDataCache: 'global/setReplenishmentState',
                dataName: '售后单状态集合',
                dataType: 'list',
              },
              {
                data: replenishmentType,
                setDataCache: 'global/setReplenishmentType',
                dataName: '售后单类型集合',
                dataType: 'list',
              },
              {
                data: replenishmentRollBackMoney,
                setDataCache: 'global/setReplenishmentRollBackMoney',
                dataName: '售后单撤回佣金选项集合',
                dataType: 'list',
              },
              {
                data: areaAccountRecordRevenueExpenses,
                setDataCache: 'global/setAreaAccountRecordRevenueExpenses',
                dataName: '',
                dataType: 'list',
              },
              {
                data: areaAccountRecordType,
                setDataCache: 'global/setAreaAccountRecordType',
                dataName: '',
                dataType: 'list',
              },
              {
                data: areaDistributionState,
                setDataCache: 'global/setAreaDistributionState',
                dataName: '',
                dataType: 'list',
              },
              {
                data: areaDistributionPayType,
                setDataCache: 'global/setAreaDistributionPayType',
                dataName: '',
                dataType: 'list',
              },
              {
                data: userOrderClientType,
                setDataCache: 'global/setUserOrderClientType',
                dataName: '',
                dataType: 'list',
              },
              {
                data: distributionState,
                setDataCache: 'global/setDistributionState',
                dataName: '',
                dataType: 'list',
              },
              {
                data: areaManageState,
                setDataCache: 'global/setAreaManageState',
                dataName: '地区账户人员状态',
                dataType: 'list',
              },
              {
                data: roleState,
                setDataCache: 'global/setRoleState',
                dataName: '角色状态',
                dataType: 'list',
              },
            ];

            metaDataLoadQuery.forEach(item => {
              this.loadDataCore(item.data, item.setDataCache, item.dataName, item.dataType);
            });
          }
        }
      }
    });
  };

  loadCommonDataCore = (request, handleResponse, setDataCache, dataName, dataType) => {
    const { dispatch } = this.props;

    // try {
    dispatch({
      type: request,
      payload: {},
    }).then(() => {
      if (this.mounted) {
        const data = handleResponse(this.props);

        let d = null;

        if (data != null) {
          const { dataSuccess } = data;

          if (dataSuccess) {
            if (dataType === 'list') {
              const { list: listData } = data;

              d = listData;
            }

            if (dataType === 'object') {
              const { data: metaData } = data;

              d = metaData;
            }
          }
        }

        this.loadDataCore(d, setDataCache, dataName, dataType);
      }
    });
    // } catch (e) {
    //   console.dir(request);
    // }
  };

  loadDataCore = (data, setDataCache, dataName, dataType) => {
    const { dispatch } = this.props;

    if (data == null) {
      if (dataType === 'list') {
        dispatch({
          type: setDataCache,
          payload: [],
        });
      }

      if (dataType === 'object') {
        dispatch({
          type: setDataCache,
          payload: [],
        });
      }
    } else {
      if (dataType === 'list') {
        dispatch({
          type: setDataCache,
          payload: data || [],
          // }).then(() => {
          //   setTimeout(() => {
          //     notification.info({
          //       placement: 'bottomRight',
          //       message: '数据加载',
          //       description: `获取${dataName}据成功.`,
          //     });
          //   }, 500);
        });
      }

      if (dataType === 'object') {
        dispatch({
          type: setDataCache,
          payload: data,
          // }).then(() => {
          //   setTimeout(() => {
          //     notification.info({
          //       placement: 'bottomRight',
          //       message: '数据加载',
          //       description: `获取${dataName}据成功.`,
          //     });
          //   }, 500);
        });
      }
    }
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      route: { routes },
      fixedHeader,
    } = this.props;

    const isTop = PropsLayout === 'topmenu';
    const routerConfig = this.getRouterAuthority(pathname, routes);
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            <Authorized authority={routerConfig} noMatch={<Exception403 />}>
              {children}
            </Authorized>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={<PageLoading />}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

export default connect(
  ({
    global,
    setting,
    menu,
    rank,
    brand, // city,
    line,
    currentOperator,
    metaData,
    loading,
  }) => ({
    collapsed: global.collapsed,
    layout: setting.layout,
    menuData: menu.menuData,
    breadcrumbNameMap: menu.breadcrumbNameMap,
    ...setting,
    rank,
    brand, // city,
    line,
    currentOperator,
    metaData,
    loading,
  })
)(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
