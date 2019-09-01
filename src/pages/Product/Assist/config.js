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

export function getProductIdFromExternalData(state) {
  const { externalData } = state;

  let productId = '';

  if ((externalData || null) != null) {
    productId = externalData.productId || '';
  }

  return productId;
}

export function getProductTitleFromExternalData(state) {
  const { externalData } = state;

  let productTitle = '';

  if ((externalData || null) != null) {
    productTitle = externalData.title || '';
  }

  return productTitle;
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
