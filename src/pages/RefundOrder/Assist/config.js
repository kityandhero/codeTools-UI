export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { refundOrderId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { refundOrderId } = currentState;

  const { refundOrderId: refundOrderIdPre } = preState;

  return refundOrderIdPre !== refundOrderId;
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
