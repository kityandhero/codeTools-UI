const getList = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    list: [
      {
        name: '箱包',
        typeLevel: '1',
        parentTypeId: '0',
        parentTypeName: '',
        companyId: '2',
        defaultSet: '0',
        productTypeId: '54',
        remark: '更新信息',
        ip: '42.236.185.177',
        status: '2',
        statusNote: '已启用',
        adminRemark: '',
        createUserId: '6',
        inTime: '2018-09-26 19:38:59',
        updateUserId: '6',
        updateTime: '2018-09-26 19:39:46',
        key: 54,
      },
      {
        name: '默认分类',
        typeLevel: '1',
        parentTypeId: '0',
        parentTypeName: '',
        companyId: '2',
        defaultSet: '1',
        productTypeId: '53',
        remark: '建立默认数据',
        ip: '127.0.0.1',
        status: '2',
        statusNote: '已启用',
        adminRemark: '',
        createUserId: '6',
        inTime: '2018-09-03 19:19:51',
        updateUserId: '0',
        updateTime: '2018-09-03 19:19:51',
        key: 53,
      },
    ],
    count: 2,
  });

const getData = (req, res) => res.json({});

const add = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '箱包',
      typeLevel: 1,
      parentTypeId: 0,
      parentTypeName: '',
      companyId: 2,
      defaultSet: 0,
      productTypeId: 54,
      remark: '新增数据',
      ip: '42.236.185.177',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 19:38:59',
      updateUserId: 0,
      updateTime: '2018-09-26 19:38:59',
      key: 54,
    },
  });

const update = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '箱包',
      typeLevel: 1,
      parentTypeId: 0,
      parentTypeName: '',
      companyId: 2,
      defaultSet: 0,
      productTypeId: 54,
      remark: '更新信息',
      ip: '42.236.185.177',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 19:38:59',
      updateUserId: 6,
      updateTime: '2018-09-26 19:39:46',
      key: 54,
    },
  });

const remove = (req, res) => res.json({});

const api = {
  'POST /api/ProductType/List': getList,
  'POST /api/ProductType/Get': getData,
  'POST /api/ProductType/Add': add,
  'POST /api/ProductType/Update': update,
  'POST /api/ProductType/Remove': remove,
};

export default api;
