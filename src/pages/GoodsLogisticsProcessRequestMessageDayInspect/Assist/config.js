export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { goodsLogisticsProcessRequestMessageDayInspectId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { goodsLogisticsProcessRequestMessageDayInspectId } = currentState;

  const {
    goodsLogisticsProcessRequestMessageDayInspectId: goodsLogisticsProcessRequestMessageDayInspectIdPre,
  } = preState;

  return (
    goodsLogisticsProcessRequestMessageDayInspectIdPre !==
    goodsLogisticsProcessRequestMessageDayInspectId
  );
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
