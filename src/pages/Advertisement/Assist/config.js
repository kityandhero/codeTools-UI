export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { advertisementId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { advertisementId } = currentState;

  const { advertisementId: advertisementIdPre } = preState;

  return advertisementIdPre !== advertisementId;
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
