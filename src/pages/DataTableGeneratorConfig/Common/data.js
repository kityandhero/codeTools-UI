module.exports = {
  fieldData: {
    dataTableGeneratorConfigId: {
      name: 'databaseGeneratorConfigId',
      label: '数据标识',
      helper: '数据标识，不可更改',
    },
    tableName: {
      name: 'tableName',
      label: '数据表名',
      helper: '数据表生成配置的数据表名',
    },
    useGenerateKey: {
      name: 'useGenerateKey',
      label: '使用自增键',
      helper: '适用于表主键为自增的设计',
    },
    generateKeys: {
      name: 'generateKeys',
      label: '自增列名称',
      helper: '表自增列的名称',
    },
    domainObjectName: {
      name: 'domainObjectName',
      label: 'domainObjectName',
      helper: '数据表生成配置的domainObjectName',
    },
    mapperName: {
      name: 'mapperName',
      label: 'mapperName',
      helper: '数据表生成配置的mapperName',
    },
    comment: {
      name: 'comment',
      label: 'comment',
      helper: '数据表生成配置的comment',
    },
    useExample: {
      name: 'useExample',
      label: '使用Example',
      helper: '数据表生成配置的comment',
    },
    useActualColumnNames: {
      name: 'useActualColumnNames',
      label: '直接使用列本名',
      helper:
        '如果设置为true，生成的model类会直接使用column本身的名字，而不会再使用驼峰命名方法，比如BORN_DATE，生成的属性名字就是BORN_DATE,而不会是bornDate。',
    },
    useTableNameAlias: {
      name: 'useTableNameAlias',
      label: '使用表别名',
      helper: '是否使用数据表别名。',
    },
    aliasName: {
      name: 'aliasName',
      label: '数据表别名',
      helper:
        '为数据表设置的别名，如果设置了alias，那么生成的所有的SELECT SQL语句中，列名会变成：alias_actualColumnName。',
    },
  },
};
