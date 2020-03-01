import accessWayCollection from '../src/customConfig/accessWayCollection';

export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/dashboard/analysis' },
      {
        name: 'connectionConfig',
        icon: 'shop',
        path: '/connectionConfig',
        authority: [
          accessWayCollection.super,
          accessWayCollection.connectionConfig.addBasicInfo,
          accessWayCollection.connectionConfig.list,
        ],
        routes: [
          {
            path: '/connectionConfig/add',
            name: 'add',
            icon: 'plus-square',
            authority: [
              accessWayCollection.super,
              accessWayCollection.connectionConfig.addBasicInfo,
            ],
            component: './ConnectionConfig/Add',
          },
          {
            path: '/connectionConfig/list/:pageKey',
            hideInMenu: true,
            component: './ConnectionConfig/List',
          },
          { path: '/connectionConfig/list/', redirect: '/connectionConfig/list/no' },
          {
            path: '/connectionConfig/list/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.connectionConfig.list],
          },
          {
            path: '/connectionConfig/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './ConnectionConfig/Edit',
            routes: [
              {
                path: '/connectionConfig/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './ConnectionConfig/Edit/BasicInfo',
              },
              // {
              //   path: '/connectionConfig/edit/:op/:id/:pageKey/operateLog',
              //   name: 'log',
              //   routes: [
              //     {
              //       path: '/connectionConfig/edit/:op/:id/:pageKey/operateLog',
              //       redirect: '/connectionConfig/edit/:op/:id/:pageKey/operateLog/list',
              //     },
              //   ],
              // },
            ],
          },
        ],
      },
      {
        name: 'account',
        icon: 'team',
        path: '/account',
        authority: [accessWayCollection.super],
        routes: [
          {
            path: '/account/account',
            name: 'account',
            icon: 'bars',
            authority: [accessWayCollection.super],
            routes: [
              {
                path: '/account/account',
                redirect: '/account/account/list/no',
              },
              {
                path: '/account/account/add',
                name: 'add',
                hideInMenu: true,
                component: './Account/Add',
              },
              {
                path: '/account/account/list/:pageKey',
                hideInMenu: true,
                component: './Account/List',
              },
              {
                path: '/account/account/edit/:op/:id/:pageKey',
                name: 'edit',
                hideInMenu: true,
                component: './Account/Edit',
                routes: [
                  {
                    path: '/account/account/edit/:op/:id/:pageKey/basicInfo',
                    name: 'basicInfo',
                    component: './Account/Edit/BasicInfo',
                  },
                  {
                    path: '/account/account/edit/:op/:id/:pageKey/resetPassword',
                    name: 'basicInfo',
                    component: './Account/Edit/ResetPassword',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'accessWay',
        icon: 'shop',
        path: '/accessWay',
        authority: [
          accessWayCollection.super,
          accessWayCollection.accessWay.addBasicInfo,
          accessWayCollection.accessWay.list,
        ],
        routes: [
          {
            path: '/accessWay/list/:pageKey',
            hideInMenu: true,
            component: './AccessWay/List',
          },
          { path: '/accessWay/list/', redirect: '/accessWay/list/no' },
          {
            path: '/accessWay/list/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.accessWay.list],
          },
          {
            path: '/accessWay/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './AccessWay/Edit',
            routes: [
              {
                path: '/accessWay/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './AccessWay/Edit/BasicInfo',
              },
            ],
          },
        ],
      },
      {
        name: 'errorLog',
        icon: 'shop',
        path: '/errorLog',
        authority: [accessWayCollection.super, accessWayCollection.errorLog.list],
        routes: [
          {
            path: '/errorLog/list/:pageKey',
            hideInMenu: true,
            component: './ErrorLog/List',
          },
          { path: '/errorLog/list/', redirect: '/errorLog/list/no' },
          {
            path: '/errorLog/list/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.errorLog.list],
          },
          {
            path: '/errorLog/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './ErrorLog/Edit',
            routes: [
              {
                path: '/errorLog/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './ErrorLog/Edit/BasicInfo',
              },
            ],
          },
        ],
      },
      {
        name: 'generalLog',
        icon: 'shop',
        path: '/generalLog',
        authority: [accessWayCollection.super, accessWayCollection.generalLog.list],
        routes: [
          {
            path: '/generalLog/list/:pageKey',
            hideInMenu: true,
            component: './GeneralLog/List',
          },
          { path: '/generalLog/list/', redirect: '/generalLog/list/no' },
          {
            path: '/generalLog/list/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.generalLog.list],
          },
          {
            path: '/generalLog/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './GeneralLog/Edit',
            routes: [
              {
                path: '/generalLog/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './GeneralLog/Edit/BasicInfo',
              },
            ],
          },
        ],
      },
      {
        path: '/operator',
        name: 'operator',
        icon: 'user',
        authority: [accessWayCollection.currentCustomer],
        routes: [
          {
            path: '/operator',
            redirect: '/operator/setting',
          },
          {
            path: '/operator/setting',
            name: 'setting',
            icon: 'bars',
            authority: [accessWayCollection.currentCustomer],
            component: './Operator/Setting',
            routes: [
              {
                path: '/operator/setting',
                redirect: '/operator/setting/base',
              },
              {
                path: '/operator/setting/base',
                component: './Operator/Setting/Base',
              },
              {
                path: '/operator/setting/password',
                component: './Operator/Setting/Password',
              },
              {
                path: '/operator/setting/security',
                component: './Operator/Setting/Security',
              },
            ],
          },
        ],
      },
      // {
      //   name: 'system',
      //   icon: 'setting',
      //   hideInMenu: true,
      //   path: '/system',
      //   routes: [
      //     {
      //       name: 'areaConfig',
      //       icon: 'form',
      //       path: '/system/areaConfig',
      //       component: './AreaConfig',
      //       routes: [
      //         {
      //           path: '/system/areaConfig',
      //           redirect: '/system/areaConfig/changeOutStockTime',
      //         },
      //         {
      //           path: '/system/areaConfig/changeOutStockTime',
      //           component: './AreaConfig/ChangeOutStockTime',
      //         },
      //         {
      //           path: '/system/areaConfig/editMasterWarehouse',
      //           component: './AreaConfig/EditMasterWarehouse',
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        name: 'helpCenter',
        icon: 'question',
        path: '/helpCenter',
        authority: [accessWayCollection.currentCustomer],
        routes: [
          { path: '/helpCenter/category/', redirect: '/helpCenter/category/no' },
          {
            path: '/helpCenter/category',
            name: 'category',
            icon: 'form',
            authority: [accessWayCollection.currentCustomer],
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
