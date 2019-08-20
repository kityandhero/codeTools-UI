export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userOrderId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { userOrderId } = currentState;

  const { userOrderId: userOrderIdPre } = preState;

  return userOrderIdPre !== userOrderId;
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
