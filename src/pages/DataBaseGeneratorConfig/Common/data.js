module.exports = {
  fieldData: {
    databaseGeneratorConfigId: {
      name: 'databaseGeneratorConfigId',
      label: '数据标识',
      helper: '数据标识，不可更改',
    },
    connectionConfigId: {
      name: 'connectionConfigId',
      label: '连接标识',
      helper: '数据连接标识，不可更改',
    },
    connectorJarFile: {
      name: 'connectorJarFile',
      label: '数据连接器',
      helper: '数据连接的连接器',
    },
    projectFolder: {
      name: 'projectFolder',
      label: '项目文件夹',
      helper: '生成的项目文件夹',
    },
    modelPackage: {
      name: 'modelPackage',
      label: 'modelPackage',
      helper: '生成的modelPackage',
    },
    modelTargetFolder: {
      name: 'modelTargetFolder',
      label: 'model文件夹',
      helper: '生成的model的文件夹',
    },
    daoPackage: {
      name: 'daoPackage',
      label: 'daoPackage',
      helper: '生成的daoPackage',
    },
    daoTargetFolder: {
      name: 'daoTargetFolder',
      label: 'dao文件夹',
      helper: '生成的dao的文件夹',
    },
    mappingXmlPackage: {
      name: 'mappingXmlPackage',
      label: 'mappingXmlPackage',
      helper: '生成的mappingXmlPackage',
    },
    mappingXmlTargetFolder: {
      name: 'mappingXmlTargetFolder',
      label: 'mappingXml文件夹',
      helper: '生成的mappingXml的文件夹',
    },
    offsetLimit: {
      name: 'offsetLimit',
      label: 'offsetLimit',
      helper: 'offsetLimit',
    },
    needToStringHashCodeEquals: {
      name: 'needToStringHashCodeEquals',
      label: 'needToStringHashCodeEquals',
      helper: 'needToStringHashCodeEquals',
    },
    needForUpdate: {
      name: 'needForUpdate',
      label: 'needForUpdate',
      helper: 'needForUpdate',
    },
    annotationDAO: {
      name: 'annotationDAO',
      label: 'annotationDAO',
      helper: 'annotationDAO',
    },
    annotation: {
      name: 'annotation',
      label: 'annotation',
      helper: 'annotation',
    },
    useActualColumnNames: {
      name: 'useActualColumnNames',
      label: 'useActualColumnNames',
      helper: 'useActualColumnNames',
    },
    useExample: {
      name: 'useExample',
      label: 'useExample',
      helper: 'useExample',
    },
    encoding: {
      name: 'encoding',
      label: 'encoding',
      helper: 'encoding',
    },
    useTableNameAlias: {
      name: 'useTableNameAlias',
      label: 'useTableNameAlias',
      helper: 'useTableNameAlias',
    },
    useDAOExtendStyle: {
      name: 'useDAOExtendStyle',
      label: 'useDAOExtendStyle',
      helper: 'useDAOExtendStyle',
    },
    useSchemaPrefix: {
      name: 'useSchemaPrefix',
      label: 'useSchemaPrefix',
      helper: 'useSchemaPrefix',
    },
    jsr310Support: {
      name: 'jsr310Support',
      label: 'jsr310Support',
      helper: 'jsr310Support',
    },
    overrideXML: {
      name: 'overrideXML',
      label: 'overrideXML',
      helper: 'overrideXML',
    },
    autoDelimitKeywords: {
      name: 'autoDelimitKeywords',
      label: '自动识别数据库关键字',
      helper:
        '自动识别数据库关键字，默认false，如果设置为true，根据SqlReservedWords中定义的关键字列表。',
    },
  },
};
