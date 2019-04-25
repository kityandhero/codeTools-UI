const getList = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    list: [
      {
        name: '默认仓库',
        code: '001',
        companyId: 2,
        address: '',
        defaultSet: 1,
        warehouseId: 4,
        remark: '建立默认仓库',
        ip: '127.0.0.1',
        status: 2,
        statusNote: '已启用',
        adminRemark: '',
        createUserId: 6,
        inTime: '2018-09-03 19:19:10',
        updateUserId: 0,
        updateTime: '2018-09-03 19:19:10',
        key: 4,
      },
      {
        name: '郑州东仓2',
        code: 'zz012',
        companyId: 2,
        address: 'Test',
        defaultSet: 0,
        warehouseId: 5,
        remark: '新增数据',
        ip: '42.236.185.177',
        status: 2,
        statusNote: '已启用',
        adminRemark: '',
        createUserId: 6,
        inTime: '2018-09-26 20:17:31',
        updateUserId: 0,
        updateTime: '2018-09-26 20:17:31',
        key: 5,
      },
    ],
    count: 2,
    pageNo: 1,
    pageSize: 10,
    total: 2,
  });

const getData = (req, res) => res.json({});

const add = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '郑州东仓2',
      code: 'zz012',
      companyId: 2,
      address: 'Test',
      defaultSet: 0,
      warehouseId: 5,
      remark: '新增数据',
      ip: '42.236.185.177',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 20:17:31',
      updateUserId: 0,
      updateTime: '2018-09-26 20:17:31',
      key: 5,
    },
  });

const updateInfo = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '默认仓库',
      code: '101',
      companyId: 2,
      address: 'Test',
      defaultSet: 1,
      warehouseId: 4,
      remark: '更新信息',
      ip: '127.0.0.1',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-03 19:19:10',
      updateUserId: 6,
      updateTime: '2018-09-26 20:18:47',
      key: 4,
    },
  });

const setDefault = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '默认仓库',
      code: '101',
      companyId: 2,
      address: 'Test',
      defaultSet: 1,
      warehouseId: 4,
      remark: '设为默认仓库',
      ip: '127.0.0.1',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-03 19:19:10',
      updateUserId: 6,
      updateTime: '2018-09-26 20:19:15',
      key: 4,
    },
  });

const updateStatus = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '郑州东仓2',
      code: 'zz012',
      companyId: 2,
      address: 'Test',
      defaultSet: 0,
      warehouseId: 5,
      remark: '更新状态',
      ip: '42.236.185.177',
      status: -2,
      statusNote: '已禁用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 20:17:31',
      updateUserId: 6,
      updateTime: '2018-09-26 20:19:55',
      key: 5,
    },
  });

const remove = (req, res) => res.json({});

const api = {
  'POST /api/Warehouse/List': getList,
  'POST /api/Warehouse/Get': getData,
  'POST /api/Warehouse/Add': add,
  'POST /api/Warehouse/UpdateInfo': updateInfo,
  'POST /api/Warehouse/SetDefault': setDefault,
  'POST /api/Warehouse/UpdateStatus': updateStatus,
  'POST /api/Warehouse/Remove': remove,
};

export default api;
