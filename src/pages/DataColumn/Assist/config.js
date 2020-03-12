export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { connectionConfigId: id };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { connectionConfigId, tableName } = currentState;

  const { connectionConfigId: connectionConfigIdPre, tableName: tableNamePre } = preState;

  return connectionConfigIdPre !== connectionConfigId || tableName !== tableNamePre;
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
