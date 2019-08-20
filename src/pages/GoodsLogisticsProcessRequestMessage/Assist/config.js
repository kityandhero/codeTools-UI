export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { goodsLogisticsProcessRequestMessageId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { goodsLogisticsProcessRequestMessageId } = currentState;

  const {
    goodsLogisticsProcessRequestMessageId: goodsLogisticsProcessRequestMessageIdPre,
  } = preState;

  return goodsLogisticsProcessRequestMessageIdPre !== goodsLogisticsProcessRequestMessageId;
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
