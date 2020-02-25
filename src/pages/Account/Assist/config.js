export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { accountId: id };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { accountId } = currentState;

  const { accountId: accountIdPre } = preState;

  return accountIdPre !== accountId;
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
