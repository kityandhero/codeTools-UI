const getList = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    list: [
      {
        name: '个',
        companyId: 2,
        defaultSet: 1,
        productUnitId: 18,
        remark: '建立默认数据',
        ip: '127.0.0.1',
        status: 2,
        statusNote: '已启用',
        adminRemark: '',
        createUserId: 6,
        inTime: '2018-09-03 19:19:52',
        updateUserId: 0,
        updateTime: '2018-09-03 19:19:52',
        key: 18,
      },
    ],
    count: 1,
    pageNo: 1,
    pageSize: 10,
    total: 1,
  });

const getData = (req, res) => res.json({});

const add = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '箱',
      companyId: 2,
      defaultSet: 0,
      productUnitId: 19,
      remark: '新增数据',
      ip: '42.236.185.177',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 20:02:06',
      updateUserId: 0,
      updateTime: '2018-09-26 20:02:06',
      key: 19,
    },
  });

const update = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '箱',
      companyId: 2,
      defaultSet: 0,
      productUnitId: 19,
      remark: '更新信息',
      ip: '42.236.185.177',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 20:02:06',
      updateUserId: 6,
      updateTime: '2018-09-26 20:02:27',
      key: 19,
    },
  });

const remove = (req, res) => res.json({});

const api = {
  'POST /api/ProductUnit/List': getList,
  'POST /api/ProductUnit/Get': getData,
  'POST /api/ProductUnit/Add': add,
  'POST /api/ProductUnit/Update': update,
  'POST /api/ProductUnit/Remove': remove,
};

export default api;
