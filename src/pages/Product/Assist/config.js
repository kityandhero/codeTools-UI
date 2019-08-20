export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { productId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { productId } = currentState;

  const { productId: productIdPre } = preState;

  return productIdPre !== productId;
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
