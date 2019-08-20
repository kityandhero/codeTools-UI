import accessWayCollection from '../src/utils/accessWayCollection';

export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        authority: [accessWayCollection.super, accessWayCollection.dashboard.analysis],
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            icon: 'area-chart',
            authority: [accessWayCollection.super, accessWayCollection.dashboard.analysis],
            component: './Dashboard/Analysis',
          },
          // {
          //   path: '/dashboard/monitor',
          //   name: 'monitor',
          //   component: './Dashboard/Monitor',
          // },
          // {
          //   path: '/dashboard/workplace',
          //   name: 'workplace',
          //   component: './Dashboard/Workplace',
          // },
        ],
      },
      {
        name: 'product',
        icon: 'shop',
        path: '/product',
        authority: [
          accessWayCollection.super,
          accessWayCollection.product.add,
          accessWayCollection.product.list,
          accessWayCollection.product.listSaleCount,
        ],
        routes: [
          {
            path: '/product/add',
            name: 'add',
            icon: 'plus-square',
            authority: [accessWayCollection.super, accessWayCollection.product.add],
            component: './Product/Add',
          },
          {
            path: '/product/list/:pageKey',
            hideInMenu: true,
            component: './Product/List',
          },
          { path: '/product/list/', redirect: '/product/list/no' },
          {
            path: '/product/list/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.product.list],
          },
          {
            path: '/product/listSaleCount/:pageKey',
            hideInMenu: true,
            component: './Product/ListSaleCount',
          },
          { path: '/product/listSaleCount/', redirect: '/product/listSaleCount/no' },
          {
            path: '/product/listSaleCount/no',
            name: 'listSaleCount',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.product.listSaleCount],
          },
          {
            path: '/product/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './Product/Edit',
            routes: [
              {
                path: '/product/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './Product/Edit/BasicInfo',
              },
              {
                path: '/product/edit/:op/:id/:pageKey/contentInfo',
                name: 'contentInfo',
                component: './Product/Edit/ContentInfo',
              },
              {
                path: '/product/edit/:op/:id/:pageKey/imageContentInfo',
                name: 'imageContentInfo',
                component: './Product/Edit/ImageContentInfo',
              },
              {
                path: '/product/edit/:op/:id/:pageKey/planSale',
                name: 'planSale',
                routes: [
                  {
                    path: '/product/edit/:op/:id/:pageKey/planSale',
                    redirect: '/product/edit/:op/:id/:pageKey/planSale/list',
                  },
                  {
                    path: '/product/edit/:op/:id/:pageKey/planSale/list',
                    component: './Product/Edit/PlanSale/List',
                  },
                ],
              },
              {
                path: '/product/edit/:op/:id/:pageKey/operateLog',
                name: 'log',
                routes: [
                  {
                    path: '/product/edit/:op/:id/:pageKey/operateLog',
                    redirect: '/product/edit/:op/:id/:pageKey/operateLog/list',
                  },
                  {
                    path: '/product/edit/:op/:id/:pageKey/operateLog/list',
                    component: './Product/Edit/OperateLog/List',
                  },
                ],
              },
              {
                path: '/product/edit/:op/:id/:pageKey/storeChange',
                name: 'storeChange',
                routes: [
                  {
                    path: '/product/edit/:op/:id/:pageKey/storeChange',
                    redirect: '/product/edit/:op/:id/:pageKey/storeChange/list',
                  },
                  {
                    path: '/product/edit/:op/:id/:pageKey/storeChange/list',
                    component: './Product/Edit/StoreChange/List',
                  },
                ],
              },
              {
                path: '/product/edit/:op/:id/:pageKey/saleRecord',
                name: 'saleRecord',
                routes: [
                  {
                    path: '/product/edit/:op/:id/:pageKey/saleRecord',
                    redirect: '/product/edit/:op/:id/:pageKey/saleRecord/list',
                  },
                  {
                    path: '/product/edit/:op/:id/:pageKey/saleRecord/list',
                    component: './Product/Edit/SaleRecord/List',
                  },
                ],
              },
              {
                path: '/product/edit/:op/:id/:pageKey/refundRecord',
                name: 'refundRecord',
                routes: [
                  {
                    path: '/product/edit/:op/:id/:pageKey/refundRecord',
                    redirect: '/product/edit/:op/:id/:pageKey/refundRecord/list',
                  },
                  {
                    path: '/product/edit/:op/:id/:pageKey/refundRecord/list',
                    component: './Product/Edit/RefundRecord/List',
                  },
                ],
              },
              {
                path: '/product/edit/:op/:id/:pageKey/replenishmentRecord',
                name: 'replenishmentRecord',
                routes: [
                  {
                    path: '/product/edit/:op/:id/:pageKey/replenishmentRecord',
                    redirect: '/product/edit/:op/:id/:pageKey/replenishmentRecord/list',
                  },
                  {
                    path: '/product/edit/:op/:id/:pageKey/replenishmentRecord/list',
                    component: './Product/Edit/ReplenishmentRecord/List',
                  },
                ],
              },
              {
                path: '/product/edit/:op/:id/:pageKey/goodsOutboundLineRecord',
                name: 'goodsOutboundLineRecord',
                routes: [
                  {
                    path: '/product/edit/:op/:id/:pageKey/goodsOutboundLineRecord',
                    redirect: '/product/edit/:op/:id/:pageKey/goodsOutboundLineRecord/list',
                  },
                  {
                    path: '/product/edit/:op/:id/:pageKey/goodsOutboundLineRecord/list',
                    component: './Product/Edit/GoodsOutboundLineRecord/List',
                  },
                ],
              },
              {
                path: '/product/edit/:op/:id/:pageKey/goodsOutboundMerchantRecord',
                name: 'goodsOutboundMerchantRecord',
                routes: [
                  {
                    path: '/product/edit/:op/:id/:pageKey/goodsOutboundMerchantRecord',
                    redirect: '/product/edit/:op/:id/:pageKey/goodsOutboundMerchantRecord/list',
                  },
                  {
                    path: '/product/edit/:op/:id/:pageKey/goodsOutboundMerchantRecord/list',
                    component: './Product/Edit/GoodsOutboundMerchantRecord/List',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'order',
        icon: 'shopping-cart',
        path: '/order',
        authority: [
          accessWayCollection.super,
          accessWayCollection.userOrder.listUserPaymentOrder,
          accessWayCollection.refundOrder.list,
          accessWayCollection.replenishment.list,
        ],
        routes: [
          {
            path: '/order/payment',
            name: 'payment',
            icon: 'bars',
            authority: [
              accessWayCollection.super,
              accessWayCollection.userOrder.listUserPaymentOrder,
            ],
            routes: [
              {
                path: '/order/payment',
                redirect: '/order/payment/list/no',
              },
              {
                path: '/order/payment/list/:pageKey',
                name: 'list',
                hideInMenu: true,
                component: './UserOrder/List',
              },
              {
                path: '/order/payment/detail/:op/:id/:pageKey',
                name: 'detail',
                hideInMenu: true,
                component: './UserOrder/Detail',
                routes: [
                  {
                    path: '/order/payment/detail/:op/:id/:pageKey/basicInfo',
                    name: 'basicInfo',
                    component: './UserOrder/Detail/BasicInfo',
                  },
                  {
                    path: '/order/payment/detail/:op/:id/:pageKey/operationRecord',
                    name: 'operationRecord',
                    routes: [
                      {
                        path: '/order/payment/detail/:op/:id/:pageKey/operationRecord/list',
                        name: 'list',
                        component: './UserOrder/Detail/OperationRecord/List',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: '/order/refund',
            name: 'refund',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.refundOrder.list],
            routes: [
              {
                path: '/order/refund',
                redirect: '/order/refund/list/no',
              },
              {
                path: '/order/refund/list/:pageKey',
                name: 'list',
                hideInMenu: true,
                component: './RefundOrder/List',
              },
              {
                path: '/order/refund/detail/:op/:id/:pageKey',
                name: 'detail',
                hideInMenu: true,
                component: './RefundOrder/Detail',
                routes: [
                  // {
                  //   path: '/order/refund/detail/:op/:id/:pageKey/basicInfo',
                  //   name: 'basicInfo',
                  //   component: './RefundOrder/Detail/BasicInfo',
                  // },
                  {
                    path: '/order/refund/detail/:op/:id/:pageKey/refundInfo',
                    name: 'refundInfo',
                    component: './RefundOrder/Detail/RefundInfo',
                  },
                  {
                    path: '/order/refund/detail/:op/:id/:pageKey/operationRecord',
                    name: 'operationRecord',
                    routes: [
                      {
                        path: '/order/refund/detail/:op/:id/:pageKey/operationRecord/list',
                        name: 'list',
                        component: './RefundOrder/Detail/OperationRecord/List',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: '/order/replenishment',
            name: 'replenishment',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.replenishment.list],
            routes: [
              {
                path: '/order/replenishment',
                redirect: '/order/replenishment/list/no',
              },
              {
                path: '/order/replenishment/list/:pageKey',
                name: 'list',
                hideInMenu: true,
                component: './Replenishment/List',
              },
              {
                path: '/order/replenishment/detail/:op/:id/:pageKey',
                name: 'detail',
                hideInMenu: true,
                component: './Replenishment/Detail',
                routes: [
                  // {
                  //   path: '/order/replenishment/detail/:op/:id/:pageKey/basicInfo',
                  //   name: 'basicInfo',
                  //   component: './RefundOrder/Detail/BasicInfo',
                  // },
                  {
                    path: '/order/replenishment/detail/:op/:id/:pageKey/replenishmentInfo',
                    name: 'replenishmentInfo',
                    component: './Replenishment/Detail/ReplenishmentInfo',
                  },
                  {
                    path: '/order/replenishment/detail/:op/:id/:pageKey/operationRecord',
                    name: 'operationRecord',
                    routes: [
                      {
                        path: '/order/replenishment/detail/:op/:id/:pageKey/operationRecord/list',
                        name: 'list',
                        component: './Replenishment/Detail/OperationRecord/List',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'orderProcessing',
        icon: 'reconciliation',
        path: '/orderProcessing',
        authority: [accessWayCollection.super, accessWayCollection.orderProcessing.list],
        routes: [
          {
            path: '/orderProcessing/list/:state/:tag',
            hideInMenu: true,
            component: './OrderProcessing/List',
          },
          {
            path: '/orderProcessing/list/1/waitDeliver',
            name: 'waitDeliver',
            icon: 'bars',
            component: './OrderProcessing/List',
          },
          {
            path: '/orderProcessing/list/3/outbound',
            name: 'outbound',
            icon: 'bars',
            component: './OrderProcessing/List',
          },
          {
            path: '/orderProcessing/list/2/dispatching',
            name: 'dispatching',
            icon: 'bars',
            component: './OrderProcessing/List',
          },
          {
            path: '/orderProcessing/list/7/completedCompleted',
            name: 'completedCompleted',
            icon: 'bars',
            component: './OrderProcessing/List',
          },
          {
            path: '/orderProcessing/edit/:op/:id/:state',
            name: 'edit',
            hideInMenu: true,
            component: './OrderProcessing/Edit',
            routes: [
              {
                path: '/orderProcessing/edit/:op/:id/:state/basicInfo',
                name: 'basicInfo',
                component: './OrderProcessing/Edit/BasicInfo',
              },
            ],
          },
        ],
      },
      {
        name: 'subentryData',
        icon: 'bar-chart',
        path: '/subentryData',
        authority: [
          accessWayCollection.super,
          accessWayCollection.goodsLogisticsProcessRequestMessage.list,
          accessWayCollection.goodsOutboundAggregate.list,
          accessWayCollection.goodsOutboundLineAggregate.list,
          accessWayCollection.goodsOutboundLineRecord.list,
          accessWayCollection.goodsOutboundMerchantAggregate.list,
          accessWayCollection.goodsOutboundMerchantRecord.list,
          accessWayCollection.goodsOutboundRecord.list,
          accessWayCollection.ignoreOutboundMerchant.list,
          accessWayCollection.userOrderOutboundHistory.list,
          // accessWayCollection.areaRankSaleStatistic.list,
        ],
        routes: [
          {
            name: 'logistics',
            icon: 'retweet',
            path: '/subentryData/logistics',
            authority: [
              accessWayCollection.super,
              accessWayCollection.goodsLogisticsProcessRequestMessage.list,
              accessWayCollection.goodsOutboundAggregate.list,
              accessWayCollection.goodsOutboundLineAggregate.list,
              accessWayCollection.goodsOutboundLineRecord.list,
              accessWayCollection.goodsOutboundMerchantAggregate.list,
              accessWayCollection.goodsOutboundMerchantRecord.list,
              accessWayCollection.goodsOutboundRecord.list,
              accessWayCollection.ignoreOutboundMerchant.list,
              accessWayCollection.userOrderOutboundHistory.list,
              accessWayCollection.areaRankSaleStatistic.list,
            ],
            routes: [
              {
                path: '/subentryData/logistics/goodsLogisticsProcessRequestMessage',
                name: 'goodsLogisticsProcessRequestMessage',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.goodsLogisticsProcessRequestMessage.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/goodsLogisticsProcessRequestMessage',
                    redirect: '/subentryData/logistics/goodsLogisticsProcessRequestMessage/list/no',
                  },
                  {
                    path:
                      '/subentryData/logistics/goodsLogisticsProcessRequestMessage/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './GoodsLogisticsProcessRequestMessage/List',
                  },
                  {
                    path:
                      '/subentryData/logistics/goodsLogisticsProcessRequestMessage/detail/:op/:id/:pageKey',
                    name: 'detail',
                    hideInMenu: true,
                    component: './GoodsLogisticsProcessRequestMessage/Detail',
                    routes: [
                      {
                        path:
                          '/subentryData/logistics/goodsLogisticsProcessRequestMessage/detail/:op/:id/:pageKey/basicInfo',
                        name: 'basicInfo',
                        component: './GoodsLogisticsProcessRequestMessage/Detail/BasicInfo',
                      },
                    ],
                  },
                ],
              },
              {
                path: '/subentryData/logistics/goodsOutboundMerchantRecord',
                name: 'goodsOutboundMerchantRecord',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.goodsOutboundMerchantRecord.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/goodsOutboundMerchantRecord',
                    redirect: '/subentryData/logistics/goodsOutboundMerchantRecord/list/no',
                  },
                  {
                    path: '/subentryData/logistics/goodsOutboundMerchantRecord/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './GoodsOutboundMerchantRecord/List',
                  },
                ],
              },
              {
                path: '/subentryData/logistics/goodsOutboundLineRecord',
                name: 'goodsOutboundLineRecord',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.goodsOutboundLineRecord.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/goodsOutboundLineRecord',
                    redirect: '/subentryData/logistics/goodsOutboundLineRecord/list/no',
                  },
                  {
                    path: '/subentryData/logistics/goodsOutboundLineRecord/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './GoodsOutboundLineRecord/List',
                  },
                ],
              },
              {
                path: '/subentryData/logistics/goodsOutboundRecord',
                name: 'goodsOutboundRecord',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.goodsOutboundRecord.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/goodsOutboundRecord',
                    redirect: '/subentryData/logistics/goodsOutboundRecord/list/no',
                  },
                  {
                    path: '/subentryData/logistics/goodsOutboundRecord/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './GoodsOutboundRecord/List',
                  },
                ],
              },
              {
                path: '/subentryData/logistics/goodsOutboundMerchantAggregate',
                name: 'goodsOutboundMerchantAggregate',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.goodsOutboundMerchantAggregate.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/goodsOutboundMerchantAggregate',
                    redirect: '/subentryData/logistics/goodsOutboundMerchantAggregate/list/no',
                  },
                  {
                    path: '/subentryData/logistics/goodsOutboundMerchantAggregate/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './GoodsOutboundMerchantAggregate/List',
                  },
                ],
              },
              {
                path: '/subentryData/logistics/goodsOutboundLineAggregate',
                name: 'goodsOutboundLineAggregate',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.goodsOutboundLineAggregate.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/goodsOutboundLineAggregate',
                    redirect: '/subentryData/logistics/goodsOutboundLineAggregate/list/no',
                  },
                  {
                    path: '/subentryData/logistics/goodsOutboundLineAggregate/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './GoodsOutboundLineAggregate/List',
                  },
                ],
              },
              {
                path: '/subentryData/logistics/goodsOutboundAggregate',
                name: 'goodsOutboundAggregate',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.goodsOutboundAggregate.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/goodsOutboundAggregate',
                    redirect: '/subentryData/logistics/goodsOutboundAggregate/list/no',
                  },
                  {
                    path: '/subentryData/logistics/goodsOutboundAggregate/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './GoodsOutboundAggregate/List',
                  },
                ],
              },
              {
                path: '/subentryData/logistics/ignoreOutboundMerchant',
                name: 'ignoreOutboundMerchant',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.ignoreOutboundMerchant.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/ignoreOutboundMerchant',
                    redirect: '/subentryData/logistics/ignoreOutboundMerchant/list/no',
                  },
                  {
                    path: '/subentryData/logistics/ignoreOutboundMerchant/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './IgnoreOutboundMerchant/List',
                  },
                ],
              },
              {
                path: '/subentryData/logistics/userOrderOutboundHistory',
                name: 'userOrderOutboundHistory',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.userOrderOutboundHistory.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/userOrderOutboundHistory',
                    redirect: '/subentryData/logistics/userOrderOutboundHistory/list/no',
                  },
                  {
                    path: '/subentryData/logistics/userOrderOutboundHistory/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './UserOrderOutboundHistory/List',
                  },
                ],
              },
              {
                path: '/subentryData/logistics/goodsLogisticsProcessRequestMessageDayInspect',
                name: 'goodsLogisticsProcessRequestMessageDayInspect',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.userOrderOutboundHistory.list,
                ],
                routes: [
                  {
                    path: '/subentryData/logistics/goodsLogisticsProcessRequestMessageDayInspect',
                    redirect:
                      '/subentryData/logistics/goodsLogisticsProcessRequestMessageDayInspect/list/no',
                  },
                  {
                    path:
                      '/subentryData/logistics/goodsLogisticsProcessRequestMessageDayInspect/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './GoodsLogisticsProcessRequestMessageDayInspect/List',
                  },
                ],
              },
            ],
          },
          {
            name: 'statistic',
            icon: 'schedule',
            path: '/subentryData/statistic',
            authority: [accessWayCollection.super, accessWayCollection.areaRankSaleStatistic.list],
            routes: [
              // {
              //   path: '/statistic/areaAccountInCome',
              //   name: 'areaAccountInCome',
              //   icon: 'bars',
              //   routes: [
              //     {
              //       path: '/statistic/areaAccountInCome',
              //       redirect: '/statistic/areaAccountInCome/list/no',
              //     },
              //     {
              //       path: '/statistic/areaAccountInCome/list/:pageKey',
              //       name: 'list',
              //       hideInMenu: true,
              //       component: './AreaAccountInComeStatistic/List',
              //     },
              //     {
              //       path: '/statistic/areaAccountInCome/detail/:op/:id/:pageKey',
              //       name: 'detail',
              //       hideInMenu: true,
              //       component: './AreaAccountInComeStatistic/Detail',
              //       routes: [
              //         {
              //           path: '/statistic/areaAccountInCome/detail/:op/:id/:pageKey/basicInfo',
              //           name: 'basicInfo',
              //           component: './AreaAccountInComeStatistic/Detail/BasicInfo',
              //         },
              //       ],
              //     },
              //   ],
              // },
              {
                path: '/subentryData/statistic/areaRankSale',
                name: 'areaRankSale',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.areaRankSaleStatistic.list,
                ],
                routes: [
                  {
                    path: '/subentryData/statistic/areaRankSale',
                    redirect: '/subentryData/statistic/areaRankSale/list/no',
                  },
                  {
                    path: '/subentryData/statistic/areaRankSale/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './AreaRankSaleStatistic/List',
                  },
                  {
                    path: '/subentryData/statistic/areaRankSale/detail/:op/:id/:pageKey',
                    name: 'detail',
                    hideInMenu: true,
                    component: './AreaRankSaleStatistic/Detail',
                    routes: [
                      {
                        path:
                          '/subentryData/statistic/areaRankSale/detail/:op/:id/:pageKey/basicInfo',
                        name: 'basicInfo',
                        component: './AreaRankSaleStatistic/Detail/BasicInfo',
                      },
                    ],
                  },
                ],
              },
              {
                path: '/subentryData/statistic/merchantStatistics',
                name: 'merchantStatistics',
                icon: 'bars',
                authority: [
                  accessWayCollection.super,
                  accessWayCollection.areaRankSaleStatistic.list,
                ],
                routes: [
                  {
                    path: '/subentryData/statistic/merchantStatistics',
                    redirect: '/subentryData/statistic/merchantStatistics/list/no',
                  },
                  {
                    path: '/subentryData/statistic/merchantStatistics/list/:pageKey',
                    name: 'list',
                    hideInMenu: true,
                    component: './MerchantStatistics/List',
                  },
                  // {
                  //   path: '/subentryData/statistic/merchantStatistics/detail/:op/:id/:pageKey',
                  //   name: 'detail',
                  //   hideInMenu: true,
                  //   component: './MerchantStatistics/Detail',
                  //   routes: [
                  //     {
                  //       path:
                  //         '/subentryData/statistic/merchantStatistics/detail/:op/:id/:pageKey/basicInfo',
                  //       name: 'basicInfo',
                  //       component: './MerchantStatistics/Detail/BasicInfo',
                  //     },
                  //   ],
                  // },
                ],
              },
              //   {
              //     path: '/statistic/areaSaleAmountRank',
              //     name: 'areaSaleAmountRank',
              //     icon: 'bars',
              //     routes: [
              //       {
              //         path: '/statistic/areaSaleAmountRank',
              //         redirect: '/statistic/areaSaleAmountRank/list/no',
              //       },
              //       {
              //         path: '/statistic/areaSaleAmountRank/list/:pageKey',
              //         name: 'list',
              //         hideInMenu: true,
              //         component: './AreaSaleAmountRankStatistic/List',
              //       },
              //       {
              //         path: '/statistic/areaSaleAmountRank/detail/:op/:id/:pageKey',
              //         name: 'detail',
              //         hideInMenu: true,
              //         component: './AreaSaleAmountRankStatistic/Detail',
              //         routes: [
              //           {
              //             path: '/statistic/areaSaleAmountRank/detail/:op/:id/:pageKey/basicInfo',
              //             name: 'basicInfo',
              //             component: './AreaSaleAmountRankStatistic/Detail/BasicInfo',
              //           },
              //         ],
              //       },
              //     ],
              //   },
              //   {
              //     path: '/statistic/areaSaleCountRank',
              //     name: 'areaSaleCountRank',
              //     icon: 'bars',
              //     routes: [
              //       {
              //         path: '/statistic/areaSaleCountRank',
              //         redirect: '/statistic/areaSaleCountRank/list/no',
              //       },
              //       {
              //         path: '/statistic/areaSaleCountRank/list/:pageKey',
              //         name: 'list',
              //         hideInMenu: true,
              //         component: './AreaSaleCountRankStatistic/List',
              //       },
              //       {
              //         path: '/statistic/areaSaleCountRank/detail/:op/:id/:pageKey',
              //         name: 'detail',
              //         hideInMenu: true,
              //         component: './AreaSaleCountRankStatistic/Detail',
              //         routes: [
              //           {
              //             path: '/statistic/areaSaleCountRank/detail/:op/:id/:pageKey/basicInfo',
              //             name: 'basicInfo',
              //             component: './AreaSaleCountRankStatistic/Detail/BasicInfo',
              //           },
              //         ],
              //       },
              //     ],
              //   },
              //   {
              //     path: '/statistic/areaSale',
              //     name: 'areaSale',
              //     icon: 'bars',
              //     routes: [
              //       {
              //         path: '/statistic/areaSale',
              //         redirect: '/statistic/areaSale/list/no',
              //       },
              //       {
              //         path: '/statistic/areaSale/list/:pageKey',
              //         name: 'list',
              //         hideInMenu: true,
              //         component: './AreaSaleStatistic/List',
              //       },
              //       {
              //         path: '/statistic/areaSale/detail/:op/:id/:pageKey',
              //         name: 'detail',
              //         hideInMenu: true,
              //         component: './AreaSaleStatistic/Detail',
              //         routes: [
              //           {
              //             path: '/statistic/areaSale/detail/:op/:id/:pageKey/basicInfo',
              //             name: 'basicInfo',
              //             component: './AreaSaleStatistic/Detail/BasicInfo',
              //           },
              //         ],
              //       },
              //     ],
              //   },
              //   {
              //     path: '/statistic/repairRecord',
              //     name: 'repairRecord',
              //     icon: 'bars',
              //     routes: [
              //       {
              //         path: '/statistic/repairRecord',
              //         redirect: '/statistic/repairRecord/list/no',
              //       },
              //       {
              //         path: '/statistic/repairRecord/list/:pageKey',
              //         name: 'list',
              //         hideInMenu: true,
              //         component: './StatisticRepairRecord/List',
              //       },
              //     ],
              //   },
            ],
          },
        ],
      },
      {
        name: 'person',
        icon: 'team',
        path: '/person',
        authority: [
          accessWayCollection.super,
          accessWayCollection.regUser.list,
          accessWayCollection.merchant.list,
        ],
        routes: [
          {
            path: '/person/regUser',
            name: 'regUser',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.regUser.list],
            routes: [
              {
                path: '/person/regUser',
                redirect: '/person/regUser/list/no',
              },
              {
                path: '/person/regUser/list/:pageKey',
                name: 'list',
                hideInMenu: true,
                authority: [accessWayCollection.super, accessWayCollection.regUser.list],
                component: './RegUser/List',
              },
              // {
              //   path: '/person/regUser/edit/:op/:id/:pageKey',
              //   name: 'edit',
              //   hideInMenu: true,
              //   component: './Product/Edit',
              //   routes: [
              //     {
              //       path: '/person/regUser/edit/:op/:id/:pageKey/basicInfo',
              //       name: 'basicInfo',
              //       component: './RegUser/Edit/BasicInfo',
              //     },
              //     {
              //       path: '/person/regUser/edit/:op/:id/:pageKey/balanceInfo',
              //       name: 'balanceInfo',
              //       component: './RegUser/Edit/BalanceInfo',
              //     },
              //   ],
              // },
              {
                path: '/person/regUser/detail/:op/:id/:pageKey',
                name: 'detail',
                hideInMenu: true,
                component: './RegUser/Detail',
                routes: [
                  {
                    path: '/person/regUser/detail/:op/:id/:pageKey/basicInfo',
                    name: 'basicInfo',
                    component: './RegUser/Detail/BasicInfo',
                  },
                ],
              },
            ],
          },
          {
            path: '/person/merchant',
            name: 'merchant',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.merchant.list],
            routes: [
              {
                path: '/person/merchant',
                redirect: '/person/merchant/list/no',
              },
              {
                path: '/person/merchant/list/:pageKey',
                name: 'list',
                hideInMenu: true,
                authority: [accessWayCollection.super, accessWayCollection.merchant.list],
                component: './Merchant/List',
              },
              {
                path: '/person/merchant/edit/:op/:id/:pageKey',
                name: 'edit',
                hideInMenu: true,
                component: './Merchant/Edit',
                routes: [
                  {
                    path: '/person/merchant/edit/:op/:id/:pageKey/basicInfo',
                    name: 'basicInfo',
                    component: './Merchant/Edit/BasicInfo',
                  },
                  {
                    path: '/person/merchant/edit/:op/:id/:pageKey/updateParent',
                    name: 'updateParent',
                    component: './Merchant/Edit/UpdateParent',
                  },
                  {
                    path: '/person/merchant/edit/:op/:id/:pageKey/auditInfo',
                    name: 'auditInfo',
                    component: './Merchant/Edit/AuditInfo',
                  },
                  {
                    path: '/person/merchant/edit/:op/:id/:pageKey/peopleAccountLogRecord',
                    name: 'peopleAccountLogRecord',
                    routes: [
                      {
                        path: '/person/merchant/edit/:op/:id/:pageKey/peopleAccountLogRecord',
                        redirect:
                          '/person/merchant/edit/:op/:id/:pageKey/peopleAccountLogRecord/list',
                      },
                      {
                        path: '/person/merchant/edit/:op/:id/:pageKey/peopleAccountLogRecord/list',
                        component: './Merchant/Edit/PeopleAccountLogRecord/List',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'logistics',
        icon: 'fullscreen',
        path: '/logistics',
        authority: [accessWayCollection.super, accessWayCollection.line.add],
        routes: [
          {
            name: 'line',
            icon: 'swap',
            path: '/logistics/line',
            routes: [
              {
                path: '/logistics/line/add',
                name: 'add',
                icon: 'plus-square',
                authority: [accessWayCollection.super, accessWayCollection.line.add],
                component: './Line/Add',
              },
              {
                path: '/logistics/line/list/:pageKey',
                hideInMenu: true,
                component: './Line/List',
              },
              {
                path: '/logistics/line/list/no',
                name: 'list',
                icon: 'bars',
                authority: [accessWayCollection.super, accessWayCollection.line.list],
                component: './Line/List',
              },
              {
                path: '/logistics/line/edit/:op/:id/:pageKey',
                name: 'edit',
                hideInMenu: true,
                component: './Line/Edit',
                routes: [
                  {
                    path: '/logistics/line/edit/:op/:id/:pageKey/basicInfo',
                    name: 'basicInfo',
                    component: './Line/Edit/BasicInfo',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'finance',
        icon: 'strikethrough',
        path: '/finance',
        authority: [
          accessWayCollection.super,
          accessWayCollection.areaAccountRecord.list,
          accessWayCollection.areaDistribution.add,
          accessWayCollection.areaDistribution.list,
          accessWayCollection.distribution.list,
        ],
        routes: [
          {
            path: '/finance/areaAccount',
            name: 'areaAccount',
            icon: 'money-collect',
            authority: [
              accessWayCollection.super,
              accessWayCollection.areaAccountRecord.list,
              accessWayCollection.areaDistribution.list,
            ],
            routes: [
              {
                path: '/finance/areaAccount',
                redirect: '/finance/areaAccount/detail',
              },
              {
                path: '/finance/areaAccount/detail',
                name: 'detail',
                hideInMenu: true,
                component: './AreaAccount/Detail',
                routes: [
                  {
                    path: '/finance/areaAccount/detail',
                    redirect: '/finance/areaAccount/detail/areaAccountRecord',
                  },
                  {
                    path: '/finance/areaAccount/detail/areaAccountRecord',
                    hideInMenu: true,
                    routes: [
                      {
                        path: '/finance/areaAccount/detail/areaAccountRecord',
                        redirect: '/finance/areaAccount/detail/areaAccountRecord/list',
                      },
                      {
                        path: '/finance/areaAccount/detail/areaAccountRecord/list',
                        hideInMenu: true,
                        component: './AreaAccount/Detail/AreaAccountRecord/List',
                      },
                    ],
                  },
                  {
                    path: '/finance/areaAccount/detail/areaDistribution',
                    hideInMenu: true,
                    routes: [
                      {
                        path: '/finance/areaAccount/detail/areaDistribution',
                        redirect: '/finance/areaAccount/detail/areaDistribution/list',
                      },
                      {
                        path: '/finance/areaAccount/detail/areaDistribution/list',
                        hideInMenu: true,
                        component: './AreaAccount/Detail/AreaDistribution/List',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: '/finance/areaWithdrawal',
            name: 'areaWithdrawal',
            icon: 'money-collect',
            authority: [accessWayCollection.super, accessWayCollection.areaDistribution.add],
            component: './AreaWithdrawal',
            routes: [
              {
                path: '/finance/areaWithdrawal',
                redirect: '/finance/areaWithdrawal/apply',
              },
              {
                path: '/finance/areaWithdrawal/apply',
                hideInMenu: true,
                component: './AreaWithdrawal/Apply',
                routes: [
                  {
                    path: '/finance/areaWithdrawal/apply',
                    redirect: '/finance/areaWithdrawal/apply/fillIn',
                  },
                  {
                    path: '/finance/areaWithdrawal/apply/fillIn',
                    hideInMenu: true,
                    component: './AreaWithdrawal/Apply/FillIn',
                  },
                  {
                    path: '/finance/areaWithdrawal/apply/confirm',
                    hideInMenu: true,
                    component: './AreaWithdrawal/Apply/Confirm',
                  },
                  {
                    path: '/finance/areaWithdrawal/apply/success',
                    hideInMenu: true,
                    component: './AreaWithdrawal/Apply/Success',
                  },
                ],
              },
            ],
          },
          {
            path: '/finance/distribution',
            name: 'distribution',
            icon: 'money-collect',
            authority: [accessWayCollection.super, accessWayCollection.distribution.list],
            routes: [
              {
                path: '/finance/distribution',
                redirect: '/finance/distribution/list/no',
              },
              {
                path: '/finance/distribution/list/:pageKey',
                hideInMenu: true,
                component: './Distribution/List',
              },
              {
                path: '/finance/distribution/edit/:op/:id/:pageKey',
                hideInMenu: true,
                component: './Distribution/Edit',
                routes: [
                  {
                    path: '/finance/distribution/edit/:op/:id/:pageKey/applyInfo',
                    name: 'applyInfo',
                    component: './Distribution/Edit/ApplyInfo',
                  },
                  {
                    path: '/finance/distribution/edit/:op/:id/:pageKey/operationRecord',
                    name: 'operationRecord',
                    routes: [
                      {
                        path: '/finance/distribution/edit/:op/:id/:pageKey/operationRecord/list',
                        name: 'list',
                        component: './Distribution/Edit/OperationRecord/List',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'account',
        icon: 'team',
        path: '/account',
        authority: [
          accessWayCollection.super,
          accessWayCollection.areaManage.list,
          accessWayCollection.role.list,
        ],
        routes: [
          {
            path: '/account/areaManage',
            name: 'areaManage',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.areaManage.list],
            routes: [
              {
                path: '/account/areaManage',
                redirect: '/account/areaManage/list/no',
              },
              {
                path: '/account/areaManage/add',
                name: 'add',
                hideInMenu: true,
                component: './AreaManage/Add',
              },
              {
                path: '/account/areaManage/list/:pageKey',
                hideInMenu: true,
                component: './AreaManage/List',
              },
              {
                path: '/account/areaManage/edit/:op/:id/:pageKey',
                name: 'edit',
                hideInMenu: true,
                component: './AreaManage/Edit',
                routes: [
                  {
                    path: '/account/areaManage/edit/:op/:id/:pageKey/basicInfo',
                    name: 'basicInfo',
                    component: './AreaManage/Edit/BasicInfo',
                  },
                  {
                    path: '/account/areaManage/edit/:op/:id/:pageKey/roleInfo',
                    name: 'basicInfo',
                    component: './AreaManage/Edit/RoleInfo',
                  },
                  {
                    path: '/account/areaManage/edit/:op/:id/:pageKey/resetPassword',
                    name: 'basicInfo',
                    component: './AreaManage/Edit/ResetPassword',
                  },
                ],
              },
            ],
          },
          {
            path: '/account/role',
            name: 'role',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.role.list],
            routes: [
              {
                path: '/account/role',
                redirect: '/account/role/list/no',
              },
              {
                path: '/account/role/list/:pageKey',
                hideInMenu: true,
                component: './Role/List',
              },
              {
                path: '/account/role/edit/:op/:id/:pageKey',
                name: 'edit',
                hideInMenu: true,
                component: './Role/Edit',
                routes: [
                  {
                    path: '/account/role/edit/:op/:id/:pageKey/basicInfo',
                    name: 'basicInfo',
                    component: './Role/Edit/BasicInfo',
                  },
                  {
                    path: '/account/role/edit/:op/:id/:pageKey/moduleInfo',
                    name: 'moduleInfo',
                    component: './Role/Edit/ModuleInfo',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'advertisement',
        icon: 'picture',
        path: '/advertisement',
        authority: [accessWayCollection.super, accessWayCollection.advertisement.list],
        routes: [
          {
            path: '/advertisement/add',
            name: 'add',
            icon: 'plus-square',
            hideInMenu: true,
            authority: [accessWayCollection.super, accessWayCollection.advertisement.addBasicInfo],
            component: './Advertisement/Add',
          },
          {
            path: '/advertisement/list/:pageKey',
            hideInMenu: true,
            component: './Advertisement/List',
          },
          {
            path: '/advertisement/list/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.advertisement.list],
          },
          {
            path: '/advertisement/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './Advertisement/Edit',
            routes: [
              {
                path: '/advertisement/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './Advertisement/Edit/BasicInfo',
              },
            ],
          },
        ],
      },
      {
        name: 'qRCode',
        icon: 'picture',
        path: '/qRCode',
        authority: [accessWayCollection.super, accessWayCollection.qRCode.list],
        routes: [
          {
            path: '/qRCode/add',
            name: 'add',
            icon: 'plus-square',
            hideInMenu: true,
            authority: [accessWayCollection.super, accessWayCollection.qRCode.addBasicInfo],
            component: './QRCode/Add',
          },
          {
            path: '/qRCode/list/:pageKey',
            hideInMenu: true,
            component: './QRCode/List',
          },
          {
            path: '/qRCode/list/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.qRCode.list],
          },
          {
            path: '/qRCode/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './QRCode/Edit',
            routes: [
              {
                path: '/qRCode/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './QRCode/Edit/BasicInfo',
              },
            ],
          },
        ],
      },
      {
        name: 'callCenter',
        icon: 'picture',
        path: '/callCenter',
        authority: [accessWayCollection.super, accessWayCollection.callCenter.list],
        routes: [
          {
            path: '/callCenter/add',
            name: 'add',
            icon: 'plus-square',
            hideInMenu: true,
            authority: [accessWayCollection.super, accessWayCollection.callCenter.addBasicInfo],
            component: './CallCenter/Add',
          },
          {
            path: '/callCenter/list/:pageKey',
            hideInMenu: true,
            component: './CallCenter/List',
          },
          {
            path: '/callCenter/list/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.callCenter.list],
          },
          {
            path: '/callCenter/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './CallCenter/Edit',
            routes: [
              {
                path: '/callCenter/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './CallCenter/Edit/BasicInfo',
              },
            ],
          },
        ],
      },
      {
        path: '/currentOperator',
        name: 'currentOperator',
        icon: 'user',
        routes: [
          {
            path: '/currentOperator',
            redirect: '/currentOperator/setting',
          },
          {
            path: '/currentOperator/setting',
            name: 'setting',
            icon: 'bars',
            component: './CurrentOperator/Setting',
            routes: [
              {
                path: '/currentOperator/setting',
                redirect: '/currentOperator/setting/base',
              },
              {
                path: '/currentOperator/setting/base',
                component: './CurrentOperator/Setting/Base',
              },
              {
                path: '/currentOperator/setting/password',
                component: './CurrentOperator/Setting/Password',
              },
              {
                path: '/currentOperator/setting/security',
                component: './CurrentOperator/Setting/Security',
              },
            ],
          },
        ],
      },
      {
        name: 'system',
        icon: 'setting',
        hideInMenu: true,
        path: '/system',
        routes: [
          {
            name: 'areaConfig',
            icon: 'form',
            path: '/system/areaConfig',
            component: './AreaConfig',
            routes: [
              {
                path: '/system/areaConfig',
                redirect: '/system/areaConfig/changeOutStockTime',
              },
              {
                path: '/system/areaConfig/changeOutStockTime',
                component: './AreaConfig/ChangeOutStockTime',
              },
              {
                path: '/system/areaConfig/editMasterWarehouse',
                component: './AreaConfig/EditMasterWarehouse',
              },
            ],
          },
        ],
      },
      {
        name: 'helpCenter',
        icon: 'question',
        path: '/helpCenter',
        routes: [
          {
            path: '/helpCenter/category',
            name: 'category',
            icon: 'form',
            redirect: '/helpCenter/category/no',
          },
          {
            path: '/helpCenter/category/:categoryId',
            hideInMenu: true,
            component: './HelpCenter',
            routes: [
              {
                path: '/helpCenter/category/:categoryId',
                redirect: '/helpCenter/category/:categoryId/list',
              },
              {
                path: '/helpCenter/category/:categoryId/list',
                component: './HelpCenter/List',
              },
              {
                path: '/helpCenter/category/:categoryId/detail/:id/:pageKey',
                component: './HelpCenter/Detail',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
