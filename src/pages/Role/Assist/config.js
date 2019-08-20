export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { roleId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { roleId } = currentState;

  const { roleId: roleIdPre } = preState;

  return roleIdPre !== roleId;
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
