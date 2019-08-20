export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { regUserId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { regUserId } = currentState;

  const { regUserId: regUserIdPre } = preState;

  return regUserIdPre !== regUserId;
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
