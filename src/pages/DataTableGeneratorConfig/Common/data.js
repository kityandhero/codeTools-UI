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
      label: '域对象名称',
      helper: '数据表生成配置的域对象名称(domainObjectName)',
    },
    useActualColumnNames: {
      name: 'useActualColumnNames',
      label: '直接使用列本名',
      helper:
        '设置为false,形如下划线分隔的列明会转换为驼峰式，其他转换为全小写；如果设置为true，生成的model类会直接使用column本身的名字，而不会再使用驼峰命名方法，比如BORN_DATE，生成的属性名字就是BORN_DATE,而不会是bornDate',
    },
    useTableNameAlias: {
      name: 'useTableNameAlias',
      label: '使用表别名',
      helper: '是否为数据表设置别名',
    },
    aliasName: {
      name: 'aliasName',
      label: '数据表别名',
      helper:
        '如果设置了alias，那么生成的所有的SELECT SQL语句中，列名会变成：alias_actualColumnName',
    },
    modelContent: {
      name: 'modelContent',
      label: 'model代码',
      helper: '生成的model代码',
    },
    exampleContent: {
      name: 'exampleContent',
      label: 'example代码',
      helper: '生成的example代码',
    },
    mapperContent: {
      name: 'mapperContent',
      label: 'mapper代码',
      helper: '生成的mapper代码',
    },
    mappingXmlContent: {
      name: 'mappingXmlContent',
      label: 'mappingXml代码',
      helper: '生成的mappingXml代码',
    },
    generated: {
      name: 'generated',
      label: '是否生成',
      helper: '数据表对应代码是否生成',
    },
    lastGenerateTime: {
      name: 'lastGenerateTime',
      label: '最后生成时间',
      helper: '最后一次的生成时间',
    },
  },
};
