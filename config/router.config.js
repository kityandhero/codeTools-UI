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
          {
            path: '/product/list/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.product.list],
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
            path: '/orderProcessing/list/3/transit',
            name: 'transit',
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
                    path: '/person/merchant/edit/:op/:id/:pageKey/auditInfo',
                    name: 'auditInfo',
                    component: './Merchant/Edit/AuditInfo',
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
        authority: [
          accessWayCollection.super,
          accessWayCollection.line.add,
          accessWayCollection.line.list,
        ],
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
