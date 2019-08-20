export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { areaRankSaleStatisticId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { areaRankSaleStatisticId } = currentState;

  const { areaRankSaleStatisticId: areaRankSaleStatisticIdPre } = preState;

  return areaRankSaleStatisticIdPre !== areaRankSaleStatisticId;
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
