export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { callCenterId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { callCenterId } = currentState;

  const { callCenterId: callCenterIdPre } = preState;

  return callCenterIdPre !== callCenterId;
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
