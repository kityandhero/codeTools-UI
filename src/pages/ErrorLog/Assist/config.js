export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { errorLogId: id };
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { errorLogId } = currentState;

  const { errorLogId: errorLogIdPre } = preState;

  return errorLogIdPre !== errorLogId;
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
