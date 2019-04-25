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
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            icon: 'area-chart',
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
        path: '/database',
        name: 'database',
        icon: 'database',
        routes: [
          {
            path: '/database/sqlServer',
            name: 'sqlServer',
            component: './SqlServer/OperationPlate',
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
