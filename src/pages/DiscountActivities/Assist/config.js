export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { discountActivitiesId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { discountActivitiesId } = currentState;

  const { discountActivitiesId: discountActivitiesIdPre } = preState;

  return discountActivitiesIdPre !== discountActivitiesId;
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
