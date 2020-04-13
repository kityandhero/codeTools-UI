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
      label: 'model包',
      helper: '生成的model包',
    },
    modelTargetFolder: {
      name: 'modelTargetFolder',
      label: 'model文件夹名',
      helper: '生成model的文件夹名称,填写后model包将生成到该文件夹，名称不能含有空白',
    },
    daoPackage: {
      name: 'daoPackage',
      label: 'dao包',
      helper: '生成的dao包',
    },
    daoTargetFolder: {
      name: 'daoTargetFolder',
      label: 'dao文件夹名',
      helper: '生成dao的文件夹名称,填写后dao包将生成到该文件夹，名称不能含有空白',
    },
    mappingXmlPackage: {
      name: 'mappingXmlPackage',
      label: 'mappingXml包',
      helper: '生成的mappingXml包',
    },
    mappingXmlTargetFolder: {
      name: 'mappingXmlTargetFolder',
      label: 'mappingXml文件夹名',
      helper: '生成mappingXml的文件夹名称,填写后mappingXml包将生成到该文件夹，名称不能含有空白',
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
    encoding: {
      name: 'encoding',
      label: 'encoding',
      helper: 'encoding',
    },
    useDAOExtendStyle: {
      name: 'useDAOExtendStyle',
      label: 'useDAOExtendStyle',
      helper: 'useDAOExtendStyle',
    },
    useSchemaPrefix: {
      name: 'useSchemaPrefix',
      label: '使用Schema前缀',
      helper: '使用Schema前缀进行Sql操作',
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
    comment: {
      name: 'comment',
      label: '使用数据库备注',
      helper: '生成时携带数据库备注信息',
    },
  },
};
