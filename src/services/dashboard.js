import { request } from '@/utils/request';

export async function showAnalysisData(params) {
  return request('/Dashboard/ShowAnalysis', {
    method: 'POST',
    body: params,
  });
}

export async function getSaleCountData(params) {
  return request('/Dashboard/GetSaleCount', {
    method: 'POST',
    body: params,
  });
}

export async function getSaleAmountData(params) {
  return request('/Dashboard/GetSaleAmount', {
    method: 'POST',
    body: params,
  });
}

export async function getAreaAccountBalanceData(params) {
  return request('/Dashboard/GetAreaAccountBalance', {
    method: 'POST',
    body: params,
  });
}

export async function getReplenishmentStatisticData(params) {
  return request('/Dashboard/GetReplenishmentStatistic', {
    method: 'POST',
    body: params,
  });
}

export async function getSaleAmountRangeData(params) {
  return request('/Dashboard/GetSaleAmountRange', {
    method: 'POST',
    body: params,
  });
}

export async function getSaleCountRangeData(params) {
  return request('/Dashboard/GetSaleCountRange', {
    method: 'POST',
    body: params,
  });
}

export async function getSearchData(params) {
  return request('/Dashboard/GetSearch', {
    method: 'POST',
    body: params,
  });
}

export async function getRankStatisticData(params) {
  return request('/Dashboard/GetRankStatistic', {
    method: 'POST',
    body: params,
  });
}

export async function getStoreStatisticData(params) {
  return request('/Dashboard/GetStoreStatistic', {
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
