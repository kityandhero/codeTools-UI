export function getConfigData() {
  let corsTargetProduction = 'http://localhost:9090';

  if (window.appInitCustom != null) {
    if (window.appInitCustom.apiPrefix != null) {
      if (window.appInitCustom.apiPrefix.corsTargetProduction != null) {
        const {
          apiPrefix: { corsTargetProduction: corsTargetProductionRemote },
        } = window.appInitCustom;

        corsTargetProduction = corsTargetProductionRemote;
      }
    }
  }

  return {
    // corsTargetDevelopment: 'http://localhost:9090',
    corsTargetDevelopment: 'http://localhost:9090',
    // corsTargetDevelopment: 'http://localhost:9090',
    corsTargetProduction,
  };
}

export const constants = {
  channel: {
    name: 'channel',
    label: '适用渠道',
    helper: '数据的适用渠道标识',
  },
  channelNote: {
    name: 'channelNote',
    label: '适用渠道',
    helper: '数据的适用渠道名称',
  },
  status: {
    name: 'status',
    label: '状态值',
    helper: '数据的状态值',
  },
  statusNote: {
    name: 'statusNote',
    label: '状态',
    helper: '数据的状态',
  },
  createTime: {
    name: 'createTime',
    label: '创建时间',
    helper: '数据创建的时间',
  },
  updateTime: {
    name: 'updateTime',
    label: '最后更新时间',
    helper: '数据最后更新的时间',
  },
};

export const imageContentPreviewMode = {
  html: 1,
  listItem: 2,
  imageList: 3,
};

export const colorCollection = {
  checkCircleColor: '#52c41a',
  closeCircleColor: '#ec8402',
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
