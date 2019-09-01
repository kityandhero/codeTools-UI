export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { planSaleId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { planSaleId } = currentState;

  const { planSaleId: planSaleIdPre } = preState;

  return planSaleIdPre !== planSaleId;
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
