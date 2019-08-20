export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { merchantStatisticsId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { merchantStatisticsId } = currentState;

  const { merchantStatisticsId: merchantStatisticsIdPre } = preState;

  return merchantStatisticsIdPre !== merchantStatisticsId;
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
