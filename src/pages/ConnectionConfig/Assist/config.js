export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { connectionId: id };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { connectionId } = currentState;

  const { connectionId: connectionIdPre } = preState;

  return connectionIdPre !== connectionId;
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
