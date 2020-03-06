export function parseUrlParamsForSetState({ urlParams }) {
  const { helpCategoryId } = urlParams;

  return { helpCategoryId };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { helpCategoryId } = currentState;

  const { helpCategoryId: helpCategoryIdPre } = preState;

  return helpCategoryIdPre !== helpCategoryId;
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
