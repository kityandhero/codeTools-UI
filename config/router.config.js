import accessWayCollection from '../src/customConfig/accessWayCollection';

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
        name: 'connection',
        icon: 'shop',
        path: '/connection',
        // authority: [
        //   accessWayCollection.super,
        //   accessWayCollection.connection.add,
        //   accessWayCollection.connection.list,
        //   accessWayCollection.connection.listSaleCount,
        // ],
        routes: [
          {
            path: '/connection/add',
            name: 'add',
            icon: 'plus-square',
            // authority: [accessWayCollection.super, accessWayCollection.connection.add],
            component: './Connection/Add',
          },
          {
            path: '/connection/list/:pageKey',
            hideInMenu: true,
            component: './Connection/List',
          },
          { path: '/connection/list/', redirect: '/connection/list/no' },
          {
            path: '/connection/list/no',
            name: 'list',
            icon: 'bars',
            // authority: [accessWayCollection.super, accessWayCollection.connection.list],
          },
          {
            path: '/connection/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './Connection/Edit',
            routes: [
              {
                path: '/connection/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './Connection/Edit/BasicInfo',
              },
              // {
              //   path: '/connection/edit/:op/:id/:pageKey/operateLog',
              //   name: 'log',
              //   routes: [
              //     {
              //       path: '/connection/edit/:op/:id/:pageKey/operateLog',
              //       redirect: '/connection/edit/:op/:id/:pageKey/operateLog/list',
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
            path: '/account/areaManage',
            name: 'areaManage',
            icon: 'bars',
            authority: [accessWayCollection.super],
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
                    path: '/account/areaManage/edit/:op/:id/:pageKey/resetPassword',
                    name: 'basicInfo',
                    component: './AreaManage/Edit/ResetPassword',
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
