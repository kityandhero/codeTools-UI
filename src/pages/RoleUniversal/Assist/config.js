export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { roleTemplateId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { roleTemplateId } = currentState;

  const { roleTemplateId: roleTemplateIdPre } = preState;

  return roleTemplateIdPre !== roleTemplateId;
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
