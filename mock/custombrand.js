const getList = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    list: [
      {
        name: '自有品牌',
        companyId: 2,
        defaultSet: 1,
        customBrandId: 92,
        remark: '建立默认数据',
        ip: '127.0.0.1',
        status: 2,
        statusNote: '已启用',
        adminRemark: '',
        createUserId: 6,
        inTime: '2018-09-03 19:19:49',
        updateUserId: 0,
        updateTime: '2018-09-03 19:19:49',
        key: 92,
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
      name: '玉树',
      companyId: 2,
      defaultSet: 0,
      customBrandId: 93,
      remark: '新增数据',
      ip: '42.236.185.177',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 19:57:54',
      updateUserId: 0,
      updateTime: '2018-09-26 19:57:54',
      key: 93,
    },
  });

const update = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '玉树',
      companyId: 2,
      defaultSet: 0,
      customBrandId: 93,
      remark: '更新信息',
      ip: '42.236.185.177',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 19:57:54',
      updateUserId: 6,
      updateTime: '2018-09-26 19:58:27',
      key: 93,
    },
  });

const remove = (req, res) => res.json({});

const api = {
  'POST /api/CustomBrand/List': getList,
  'POST /api/CustomBrand/Get': getData,
  'POST /api/CustomBrand/Add': add,
  'POST /api/CustomBrand/Update': update,
  'POST /api/CustomBrand/Remove': remove,
};

export default api;
