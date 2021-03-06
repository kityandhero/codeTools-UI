module.exports = {
  fieldData: {
    connectionConfigId: {
      name: 'connectionConfigId',
      label: '连接标识',
      helper: '数据库表列的连接标识',
    },
    tableName: {
      name: 'tableName',
      label: '表名',
      helper: '数据库表列的表名',
    },
    columnName: {
      name: 'columnName',
      label: '列名',
      helper: '数据库表列的名称',
    },
    columnType: {
      name: 'columnType',
      label: 'JDBC类型',
      helper: '数据库表列的JDBC类型',
    },
    aliasName: {
      name: 'aliasName',
      label: '列别名',
      helper: '数据库表列的别名',
    },
    javaType: {
      name: 'javaType',
      label: 'Java类型',
      helper: '数据库表列的Java类型',
    },
    typeHandler: {
      name: 'typeHandler',
      label: 'Type Handler',
      helper: '数据库表列的Type Handler',
    },
    ignore: {
      name: 'ignore',
      label: '是否忽略',
      helper: '数据库表列是否在代码层进行忽略,设置为忽略，则其他配置在生成代码时不生效',
    },
  },
};
