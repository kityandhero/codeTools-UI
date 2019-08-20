export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { lineId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { lineId } = currentState;

  const { lineId: lineIdPre } = preState;

  return lineIdPre !== lineId;
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
