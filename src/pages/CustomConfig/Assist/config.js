export function parseUrlParamsForSetState({ urlParams }) {
  const { category } = urlParams;

  return { category };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { category } = currentState;

  const { category: categoryPre } = preState;

  return categoryPre !== category;
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
