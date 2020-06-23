export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { generalLogId: id };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { generalLogId } = currentState;

  const { generalLogId: generalLogIdPre } = preState;

  return generalLogIdPre !== generalLogId;
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
