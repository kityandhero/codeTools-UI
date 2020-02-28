export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { connectionConfigId: id };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { connectionConfigId } = currentState;

  const { connectionConfigId: connectionIdPre } = preState;

  return connectionIdPre !== connectionConfigId;
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
