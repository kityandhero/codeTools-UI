export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { accessWayId: id };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { accessWayId } = currentState;

  const { accessWayId: accessWayIdPre } = preState;

  return accessWayIdPre !== accessWayId;
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
