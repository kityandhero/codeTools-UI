export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { areaManageId: id };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { areaManageId } = currentState;

  const { areaManageId: areaManageIdPre } = preState;

  return areaManageIdPre !== areaManageId;
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
