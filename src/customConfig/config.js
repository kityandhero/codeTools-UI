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
  createTimeName: 'createTime',
  createTimeLabel: '创建时间',
  createTimeHelper: '数据创建的时间',
  updateTimeName: 'updateTime',
  updateTimeLabel: '最后更新时间',
  updateTimeHelper: '数据最后更新的时间',
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
