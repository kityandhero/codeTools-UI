export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { merchantId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { merchantId } = currentState;

  const { merchantId: merchantIdPre } = preState;

  return merchantIdPre !== merchantId;
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
