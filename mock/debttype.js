const getList = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    list: [
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
    count: 1,
  });

const getData = (req, res) => res.json({});

const add = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '1',
      companyId: 2,
      defaultSet: 0,
      debtTypeId: 4,
      remark: '新增数据',
      ip: '42.236.185.177',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 18:04:31',
      updateUserId: 0,
      updateTime: '2018-09-26 18:04:31',
      key: 4,
    },
  });

const update = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      name: '11',
      companyId: 2,
      defaultSet: 0,
      debtTypeId: 4,
      remark: '更新信息',
      ip: '42.236.185.177',
      status: 2,
      statusNote: '已启用',
      adminRemark: '',
      createUserId: 6,
      inTime: '2018-09-26 18:04:31',
      updateUserId: 6,
      updateTime: '2018-09-26 18:05:15',
      key: 4,
    },
  });

const remove = (req, res) =>
  res.json({
    status: 200,
    success: true,
    message: '成功！',
    data: {
      Value: 7,
      Message: '删除成功！',
    },
  });

const api = {
  'POST /api/DebtType/List': getList,
  'POST /api/DebtType/Get': getData,
  'POST /api/DebtType/Add': add,
  'POST /api/DebtType/Update': update,
  'POST /api/DebtType/Remove': remove,
};

export default api;
