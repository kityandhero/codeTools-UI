export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { qRCodeId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { qRCodeId } = currentState;

  const { qRCodeId: qRCodeIdPre } = preState;

  return qRCodeIdPre !== qRCodeId;
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
