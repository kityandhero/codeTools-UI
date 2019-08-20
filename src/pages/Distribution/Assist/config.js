export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { distributionId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { distributionId } = currentState;

  const { distributionId: distributionIdPre } = preState;

  return distributionIdPre !== distributionId;
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
