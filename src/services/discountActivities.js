import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

/**
 * 抢购活动列表
 * @param {pageNo} 页码 必填
 * @param {pageSize} 页码 必填
 * @param {goodsType} 商品类型 非必填
 * @param {title} 标题 非必填
 * @param {startTime} 数据创建起始时间 非必填
 * @param {endTime} 数据创建结束时间 非必填
 * @param {state} 状态 非必填
 */
export async function listData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/discountActivities/list', {
    method: 'POST',
    body: params,
  });
}

export async function listProductData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request('/discountActivities/listProduct', {
    method: 'POST',
    body: params,
  });
}

/**
 * 抢购活动详情
 * @param {goodsType} 商品类型 非必填
 * @param {discountActivitiesId} 查询关键字 非必填
 */
export async function getData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/discountActivities/get', {
    method: 'POST',
    body: params,
  });
}

/**
 * 新增
 * @param {activitiesTitle} 抢购活动名称 必填
 * @param {stockPrice} 站长价格 必填
 * @param {inviterRewardPrice} 站长推荐奖励金 必填
 * @param {activitiesSalePrice} 活动售价 必填
 * @param {goodsType} 商品类型 必填
 * @param {businessId} 业务数据标识 必填
 * @param {saleStartTime} 开售时间 必填
 * @param {saleEndTime} 停售时间 必填
 * @param {activitiesStoreCount} 初始库存 非必填 大于等于0 默认值0
 * @param {shareTitle} 分享标题 必填
 * @param {shareDescription} 分享描述 非必填
 * @param {note} 备注 必填
 * @param {posterImageUrl} 海报图片地址 非必填
 * @param {limitCustomerByCount} 用户限购数量 非必填 大于等于0 默认值0 0表示不限
 * @param {limitMerchantByCount} 站长限购数量 非必填 大于等于0 默认值0 0表示不限
 * @param {isCanRefund} 是否可退款 必填 0/1 默认值0 0表示不允许退款
 * @param {orderExpireMinute} 订单过期时间（分钟数） 必填
 */
export async function addBasicInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/discountActivities/addBasicInfo', {
    method: 'POST',
    body: params,
  });
}

/**
 * 更新信息
 * @param {discountActivitiesId} 抢购活动标识 必填
 * @param {activitiesTitle} 抢购活动名称 必填
 * @param {saleStartTime} 开售时间 必填
 * @param {saleEndTime} 停售时间 必填
 * @param {shareTitle} 分享标题 必填
 * @param {shareDescription} 分享描述 非必填
 * @param {note} 备注 必填
 */
export async function updateBasicInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/discountActivities/updateBasicInfo', {
    method: 'POST',
    body: params,
  });
}

/**
 * 调整库存
 * @param {discountActivitiesId} 抢购活动标识 必填
 * @param {changeType} 调整方式 可选数据来自metaData
 * @param {storeChangeCount} 调整数量 必填 大于0
 */
export async function updateStoreCountData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/discountActivities/updateStoreCount', {
    method: 'POST',
    body: params,
  });
}

/**
 * 上架
 * @param {discountActivitiesId} 抢购活动标识 必填
 */
export async function setOnlineData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/discountActivities/setOnline', {
    method: 'POST',
    body: params,
  });
}

/**
 * 下架
 * @param {discountActivitiesId} 抢购活动标识 必填
 */
export async function setOfflineData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/discountActivities/setOffline', {
    method: 'POST',
    body: params,
  });
}

/**
 * 完结
 * @param {discountActivitiesId} 抢购活动标识 必填
 */
export async function setOverData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/discountActivities/setOver', {
    method: 'POST',
    body: params,
  });
}

/**
 * 移除
 * @param {discountActivitiesId} 抢购活动标识 必填
 */
export async function removeData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/discountActivities/remove', {
    method: 'POST',
    body: params,
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
