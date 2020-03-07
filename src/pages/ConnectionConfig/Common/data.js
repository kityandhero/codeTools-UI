module.exports = {
  fieldData: {
    connectionConfigId: {
      name: 'connectionConfigId',
      label: '数据标识',
      helper: '数据标识，不可更改',
    },
    name: {
      name: 'name',
      label: '连接名称',
      helper: '名称内不能带有特殊标识',
    },
    connectionType: {
      name: 'connectionType',
      label: '连接方式',
      helper: '数据库的连接方式',
    },
    databaseType: {
      name: 'databaseType',
      label: '数据库类型',
      helper: '数据库的类型',
    },
    host: {
      name: 'host',
      label: '主机名或IP地址',
      helper: '数据库的主机名或IP地址',
    },
    port: {
      name: 'port',
      label: '端口号',
      helper: '数据库的主机名或IP地址的端口号',
    },
    userName: {
      name: 'userName',
      label: '用户名',
      helper: '数据库的用户名',
    },
    password: {
      name: 'password',
      label: '登录密码',
      helper: '数据库的登录密码',
    },
    schema: {
      name: 'schema',
      label: 'Schema/数据库',
      helper: 'Schema/数据库名',
    },
    encoding: {
      name: 'encoding',
      label: '编码',
      helper: '数据库的编码',
    },
    sshHost: {
      name: 'sshHost',
      label: 'SSH主机名',
      helper: '数据连接的SSH主机名',
    },
    sshPort: {
      name: 'sshPort',
      label: 'SSH端口',
      helper: '数据连接的SSH端口',
    },
    localPort: {
      name: 'localPort',
      label: 'SSH本地端口',
      helper: '数据连接的SSH本地端口',
    },
    remotePort: {
      name: 'remotePort',
      label: 'SSH远端端口',
      helper: '数据连接的SSH远端端口',
    },
    sshUser: {
      name: 'sshUser',
      label: 'SSH用户名',
      helper: '数据连接的SSH用户名',
    },
    sshPassword: {
      name: 'sshPassword',
      label: 'SSH用户密码',
      helper: '数据连接的SSH用户密码',
    },
    description: {
      name: 'description',
      label: '简介描述',
      helper: '数据连接的简介描述',
    },
  },
  connectionType: {
    TCP_IP: '100',
    SSH: '101',
  },
};
