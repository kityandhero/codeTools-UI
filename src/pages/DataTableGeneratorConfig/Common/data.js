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
  },
};
