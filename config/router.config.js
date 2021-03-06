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
          accessWayCollection.connectionConfig.pageList,
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
            path: '/connectionConfig/pageList/:pageKey',
            hideInMenu: true,
            component: './ConnectionConfig/PageList',
          },
          { path: '/connectionConfig/pageList/', redirect: '/connectionConfig/pageList/no' },
          {
            path: '/connectionConfig/pageList/no',
            name: 'pageList',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.connectionConfig.pageList],
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
              {
                path: '/connectionConfig/edit/:op/:id/:pageKey/databaseGeneratorConfig',
                name: 'databaseGeneratorConfig',
                component: './ConnectionConfig/Edit/DatabaseGeneratorConfig',
              },
              {
                path: '/connectionConfig/edit/:op/:id/:pageKey/dataTable',
                name: 'dataTable',
                routes: [
                  {
                    path: '/connectionConfig/edit/:op/:id/:pageKey/dataTable',
                    redirect: '/connectionConfig/edit/:op/:id/:pageKey/dataTable/pageList',
                  },
                  {
                    path: '/connectionConfig/edit/:op/:id/:pageKey/dataTable/pageList',
                    component: './ConnectionConfig/Edit/DataTable/PageList',
                  },
                ],
              },
              // {
              //   path: '/connectionConfig/edit/:op/:id/:pageKey/operateLog',
              //   name: 'log',
              //   routes: [
              //     {
              //       path: '/connectionConfig/edit/:op/:id/:pageKey/operateLog',
              //       redirect: '/connectionConfig/edit/:op/:id/:pageKey/operateLog/pageList',
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
                redirect: '/account/account/pageList/no',
              },
              {
                path: '/account/account/add',
                name: 'add',
                hideInMenu: true,
                component: './Account/Add',
              },
              {
                path: '/account/account/pageList/:pageKey',
                hideInMenu: true,
                component: './Account/PageList',
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
          accessWayCollection.accessWay.pageList,
        ],
        routes: [
          {
            path: '/accessWay/pageList/:pageKey',
            hideInMenu: true,
            component: './AccessWay/PageList',
          },
          { path: '/accessWay/pageList/', redirect: '/accessWay/pageList/no' },
          {
            path: '/accessWay/pageList/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.accessWay.pageList],
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
        authority: [accessWayCollection.super, accessWayCollection.errorLog.pageList],
        routes: [
          {
            path: '/errorLog/pageList/:pageKey',
            hideInMenu: true,
            component: './ErrorLog/PageList',
          },
          { path: '/errorLog/pageList/', redirect: '/errorLog/pageList/no' },
          {
            path: '/errorLog/pageList/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.errorLog.pageList],
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
              {
                path: '/errorLog/edit/:op/:id/:pageKey/paramInfo',
                name: 'paramInfo',
                component: './ErrorLog/Edit/ParamInfo',
              },
              {
                path: '/errorLog/edit/:op/:id/:pageKey/stackTraceInfo',
                name: 'stackTraceInfo',
                component: './ErrorLog/Edit/StackTraceInfo',
              },
            ],
          },
        ],
      },
      {
        name: 'generalLog',
        icon: 'shop',
        path: '/generalLog',
        authority: [accessWayCollection.super, accessWayCollection.generalLog.pageList],
        routes: [
          {
            path: '/generalLog/pageList/:pageKey',
            hideInMenu: true,
            component: './GeneralLog/PageList',
          },
          { path: '/generalLog/pageList/', redirect: '/generalLog/pageList/no' },
          {
            path: '/generalLog/pageList/no',
            name: 'list',
            icon: 'bars',
            authority: [accessWayCollection.super, accessWayCollection.generalLog.pageList],
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
      {
        path: '/customConfig',
        name: 'customConfig',
        icon: 'user',
        authority: [accessWayCollection.currentCustomer],
        routes: [
          { path: '/customConfig', redirect: '/customConfig/category' },
          {
            path: '/customConfig/category',
            name: 'category',
            icon: 'form',
            hideChildrenInMenu: true,
            authority: [accessWayCollection.currentCustomer],
            component: './CustomConfig',
            routes: [
              { path: '/customConfig/category', redirect: '/customConfig/category/no' },
              {
                path: '/customConfig/category/:category',
                redirect: '/customConfig/category/:category/list',
              },
              {
                path: '/customConfig/category/:category/list',
                name: 'list',
                icon: 'bars',
                component: './CustomConfig/List',
              },
            ],
          },
        ],
      },
      {
        name: 'helpCenter',
        icon: 'question',
        path: '/helpCenter',
        authority: [accessWayCollection.currentCustomer],
        routes: [
          { path: '/helpCenter', redirect: '/helpCenter/category' },
          { path: '/helpCenter/category/', redirect: '/helpCenter/category/no' },
          {
            path: '/helpCenter/category',
            name: 'category',
            icon: 'form',
            authority: [accessWayCollection.currentCustomer],
          },
          {
            path: '/helpCenter/category/:helpCategoryId',
            name: 'category',
            icon: 'form',
            hideInMenu: true,
            component: './HelpCenter',
            routes: [
              {
                path: '/helpCenter/category/:helpCategoryId',
                redirect: '/helpCenter/category/:helpCategoryId/pageList',
              },
              {
                path: '/helpCenter/category/:helpCategoryId/pageList',
                component: './HelpCenter/PageList',
              },
              {
                path: '/helpCenter/category/:helpCategoryId/detail/:id/:pageKey',
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
