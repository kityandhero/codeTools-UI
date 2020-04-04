module.exports = {
  fieldData: {
    errorLogId: {
      name: 'errorLogId',
      label: '数据标识',
      helper: '错误日志的数据标识',
    },
    message: {
      name: 'message',
      label: '错误描述',
      helper: '错误日志的描述',
    },
    uri: {
      name: 'uri',
      label: '请求Uri',
      helper: '错误日志的请求Uri',
    },
    content: {
      name: 'content',
      label: '详细信息',
      helper: '错误日志的详细信息',
    },
    scene: {
      name: 'scene',
      label: '发生场景',
      helper: '错误日志的发生场景',
    },
    degree: {
      name: 'degree',
      label: '错误等级',
      helper: '错误日志的等级',
    },
    degreeNote: {
      name: 'degreeNote',
      label: '错误等级',
      helper: '错误日志的等级',
    },
    resolve: {
      name: 'resolve',
      label: '处理标记',
      helper: '错误日志的解决标记',
    },
    resolveNote: {
      name: 'resolveNote',
      label: '处理标记',
      helper: '错误日志的解决标记',
    },
    type: {
      name: 'type',
      label: '错误类型',
      helper: '错误日志的错误类型',
    },
    typeNote: {
      name: 'typeNote',
      label: '错误类型',
      helper: '错误日志的错误类型',
    },
    sendNotification: {
      name: 'sendNotification',
      label: '发送通知',
      helper: '错误时是否需要发送通知',
    },
    sendResult: {
      name: 'sendResult',
      label: '发送结果',
      helper: '发生错误的消息是否已经被发送',
    },
    sendUnixTime: {
      name: 'sendUnixTime',
      label: '发送时间',
      helper: '发生错误的消息发送时间',
    },
    host: {
      name: 'host',
      label: '发生host',
      helper: '引起错误的请求host',
    },
    port: {
      name: 'port',
      label: '请求端口',
      helper: '引起错误的请求端口',
    },
    requestQueryString: {
      name: 'requestQueryString',
      label: 'Get参数',
      helper: '引起错误的请求的Get参数',
    },
    requestBody: {
      name: 'requestBody',
      label: '请求Body',
      helper: '引起错误的请求的请求Body',
    },
    otherLog: {
      name: 'otherLog',
      label: '附加日志',
      helper: '错误的附加日志',
    },
    exceptionTypeName: {
      name: 'exceptionTypeName',
      label: '异常类型',
      helper: '错误的异常类型',
    },
    data: {
      name: 'data',
      label: '附加数据',
      helper: '错误记录的附加数据',
    },
    dataType: {
      name: 'dataType',
      label: '数据类型',
      helper: '错误记录的附加数据的类型',
    },
  },
};
