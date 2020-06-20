export const zeroString = '0';

export const zeroInt = 0;

export const authenticationFailCode = 2001;

export const defaultEmptyImage = '/noImageSmall.png';

export const whetherString = {
  no: '0',
  yes: '1',
};

export const whetherNumber = {
  no: 0,
  yes: 1,
};

export const unlimitedWithStringFlag = {
  key: '-10000',
  name: '不限',
  flag: '-10000',
};

export const unlimitedWithNumberFlag = {
  key: -10000,
  name: '不限',
  flag: -10000,
};

export const logLevel = {
  debug: 'debug',
  warn: 'warn',
  error: 'error',
};

export const logShowMode = {
  text: 'text',
  object: 'object',
};

export const dataTypeCollection = {
  unknown: {
    flag: 0,
    name: '未知类型',
  },
  jsonObject: {
    flag: 100,
    name: 'Json单体',
  },
  jsonObjectList: {
    flag: 200,
    name: 'Json列表',
  },
  commonValue: {
    flag: 300,
    name: '一般值',
  },
  html: {
    flag: 400,
    name: 'Html',
  },
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
