export function getConfigData() {
  let corsTargetProduction = 'https://api2.yurukeji.com.cn';

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
    // corsTargetDevelopment: 'https://api2.yurukeji.com.cn',
    corsTargetDevelopment: 'http://api2.b.com',
    // corsTargetDevelopment: 'http://areaapi.lz.a.com',
    corsTargetProduction,
  };
}

export const goodsTypeCollection = {
  product: 1,
  simpleTicket: 2,
  lineTicket: 3,
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

export const couponScopeCollection = {
  unknown: -1,
  unlimited: 0,
  rank: 1,
  goods: 2,
  multipleGoods: 3,
};

export const couponSceneCollection = {
  customerTake: 0,
  giveAfterBuy: 2,
  distributedToSharer: 3,
  distributedToShareVisitor: 4,
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
