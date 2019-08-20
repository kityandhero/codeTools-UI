export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { replenishmentId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { replenishmentId } = currentState;

  const { replenishmentId: replenishmentIdPre } = preState;

  return replenishmentIdPre !== replenishmentId;
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
