import router from 'umi/router';
import { message } from 'antd';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import copy from 'copy-to-clipboard';
import stringAssist from 'string';
import queue from 'queue';
import { getConfigData, checkDevelopment } from './customConfig';

function defaultCommonState() {
  return {
    loadApiPath: '',
    dataLoading: true,
    processing: false,
    loadSuccess: false,
    pageName: '',
  };
}

export function defaultListState() {
  return {
    ...defaultCommonState(),
    loadApiPath: '',
    dateRangeFieldName: '发生时间',
    tableScroll: { x: 1520 },
    formValues: {},
    customData: {
      list: [],
    },
    startTime: '',
    endTime: '',
    showSelect: false,
    selectedDataTableDataRows: [],
  };
}

export function defaultPageListState() {
  return {
    ...defaultCommonState(),
    paramsKey: '',
    loadApiPath: '',
    dateRangeFieldName: '发生时间',
    tableScroll: { x: 1520 },
    formValues: {},
    customData: {
      count: 0,
      list: [],
      pagination: {},
    },
    pageNo: 1,
    pageSize: 10,
    startTime: '',
    endTime: '',
    showSelect: false,
    useParamsKey: true,
    selectedDataTableDataRows: [],
  };
}

export function defaultFormState() {
  return {
    ...defaultCommonState(),
    errorFieldName: '',
    submitApiPath: '',
    loadDataAfterMount: true,
  };
}

export function getValue(obj) {
  return Object.keys(obj)
    .map(key => obj[key])
    .join(',');
}

/**
 * 复制到剪贴板
 * @param {*} text
 */
export function copyToClipboard(text) {
  copy(text);
  message.success(`已将 ${text} 复制到剪贴板！`);
}

/**
 * 复制到剪贴板
 * @param {*} text
 */
export function stringIsEmpty(text) {
  return stringAssist(text).isEmpty();
}

/**
 *替换指定字符串
 *
 * @export
 * @param {*} text
 * @param {*} replaceText
 * @param {*} beforeKeepNumber
 * @param {*} afterKeepNumber
 * @returns
 */
export function replaceTargetText(text, replaceText, beforeKeepNumber, afterKeepNumber) {
  let result = text;

  const textLength = (text || '').length;
  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (
      beforeKeepNumber >= textLength ||
      afterKeepNumber >= textLength ||
      (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength
    ) {
      result = text;
    } else {
      const beforeKeep = text.substr(0, beforeKeepNumber);

      const afterKeep = text.substr(textLength - afterKeepNumber, afterKeepNumber);

      // const replaceTargetLength = textLength - (beforeKeepNumber || 0) - (afterKeepNumber || 0);

      // const replaceTarget = text.substring(
      //   (beforeKeepNumber || 0) <= 0 ? 0 : beforeKeepNumber - 1,
      //   textLength - (beforeKeepNumber || 0) - (afterKeepNumber || 0)
      // );

      // const replaced = [];

      // let i = 1;
      // while (i <= replaceTargetLength) {
      //   replaced.push(replaceText);
      //   i += 1;
      // }

      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || '';
}

/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */
export function corsTarget() {
  const c = getConfigData();

  return checkDevelopment() ? c.corsTargetDevelopment : c.corsTargetProduction;
}

/**
 * 获取Guid
 *
 * @export
 * @param {*} v
 * @returns
 */
export function GetGuid() {
  return uuidv4();
}

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isInvalid(v) {
  return typeof v === 'undefined';
}

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function formatDatetime(v, formatString = 'YYYY-MM-DD', defaultValue = '') {
  return (v || '') === ''
    ? defaultValue
    : moment(typeof v === 'object' ? v : new Date(v.replace('/', '-'))).format(formatString);
}

/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function stringToMoment(v) {
  return moment(new Date((v || '').replace('/', '-')));
}

/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function dateToMoment(v) {
  return moment(v);
}

/**
 * 判断是否是时间字符串
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isDatetime(v) {
  const date = `${typeof v === 'undefined' ? null : v}`;
  const result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null) {
    return false;
  }

  const d = new Date(result[1], result[3] - 1, result[4]);
  return (
    d.getFullYear() === parseInt(result[1], 10) &&
    d.getMonth() + 1 === parseInt(result[3], 10) &&
    d.getDate() === parseInt(result[4], 10)
  );
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isNumber(v) {
  const str = `${typeof v === 'undefined' ? null : v}`;

  if (str === '') {
    return false;
  }

  const regular = /^[0-9]*$/;
  const re = new RegExp(regular);
  return re.test(str);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toNumber(v) {
  if (isNumber(v)) {
    return parseInt(v, 10);
  }

  return 0;
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isMoney(v) {
  const str = `${typeof v === 'undefined' ? null : v}`;

  if (str === '') {
    return false;
  }

  const regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  const re = new RegExp(regular);
  return re.test(str);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toMoney(v) {
  if (isMoney(v)) {
    return parseFloat(v, 10);
  }

  return 0;
}

/**
 * 转换金额为人民币大写
 *
 * @export
 * @param {*} v
 * @returns
 */
export function formatMoneyToChinese(v) {
  let money = v;

  const cnNumber = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; // 汉字的数字
  const cnIntBasic = ['', '拾', '佰', '仟']; // 基本单位
  const cnIntUnits = ['', '万', '亿', '兆']; // 对应整数部分扩展单位
  const cnDecUnits = ['角', '分', '毫', '厘']; // 对应小数部分单位
  // var cnInteger = "整"; // 整数金额时后面跟的字符
  const cnIntLast = '元'; // 整型完以后的单位
  const maxNum = 999999999999999.9999; // 最大处理的数字

  let IntegerNum; // 金额整数部分
  let DecimalNum; // 金额小数部分
  let ChineseString = ''; // 输出的中文金额字符串
  let parts; // 分离金额后用的数组，预定义
  if (money === '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    return '超出最大处理数字';
  }
  if (money === 0) {
    ChineseString = cnNumber[0] + cnIntLast;

    return ChineseString;
  }
  money = money.toString(); // 转换为字符串
  if (money.indexOf('.') === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');

    [IntegerNum, DecimalNum] = parts;
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    let zeroCount = 0;
    const IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i += 1) {
      const n = IntegerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === '0') {
        zeroCount += 1;
      } else {
        if (zeroCount > 0) {
          ChineseString += cnNumber[0];
        }
        zeroCount = 0; // 归零
        ChineseString += cnNumber[parseInt(n, 10)] + cnIntBasic[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseString += cnIntUnits[q];
      }
    }
    ChineseString += cnIntLast;
    // 整型部分处理完毕
  }
  if (DecimalNum !== '') {
    // 小数部分
    const decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i += 1) {
      const n = DecimalNum.substr(i, 1);
      if (n !== '0') {
        ChineseString += cnNumber[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseString === '') {
    ChineseString += cnNumber[0] + cnIntLast;
  }

  return ChineseString;
}

function seededRandom(seed, min, max) {
  const maxValue = max || 1;
  const minValue = min || 0;
  const seedValue = (seed * 9301 + 49297) % 233280;
  const rnd = seedValue / 233280.0;
  return minValue + rnd * (maxValue - minValue);
}

/**
 * 通过种子返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function getRandomColor(seed) {
  // eslint-disable-next-line
  return `#${`00000${((seededRandom(seed) * 0x1000000) << 0).toString(16)}`.substr(-6)}`;
}

function getBrowserInfoCore() {
  const getBrowserVersion = () => {
    const u = navigator.userAgent;
    return {
      // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android 终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为 iPhone 或者 QQHD 浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    };
  };

  return {
    versions: getBrowserVersion(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
}

/**
 * 获取浏览器信息
 *
 * @export
 * @returns
 */
export function getBrowserInfo() {
  return getBrowserInfoCore();
}

/**
 * 封装表单项配置
 *
 * @export
 * @param {*} v
 * @param {*} justice
 * @param {*} defaultValue
 * @param {*} originalOption
 * @param {*} convertValue
 */
export function refitFieldDecoratorOption(v, justice, defaultValue, originalOption, convertValue) {
  const result = originalOption;
  const justiceV = typeof justice !== 'undefined' && justice !== null;
  const defaultV = typeof defaultValue === 'undefined' || defaultValue === null ? '' : defaultValue;

  if (justiceV) {
    if (typeof convertValue === 'function') {
      result.initialValue = convertValue(v) || defaultV;
    } else {
      result.initialValue = v || defaultV;
    }
  }

  return result;
}

/**
 * 封装公共数据
 *
 * @export 数据集合
 * @param {*} listData 源数据集合
 * @param {*} empty 要添加的首个数据
 * @param {*} otherListData 要添加的其他数据集合
 * @returns 封装后的数据集合
 */
export function refitCommonData(listData, empty, otherListData) {
  let result = [];

  if (typeof listData !== 'undefined') {
    if (listData !== null) {
      result = [...listData];
    }
  }

  if (typeof otherListData !== 'undefined') {
    if (otherListData !== null) {
      result = [...result, ...otherListData];
    }
  }

  if (typeof empty !== 'undefined') {
    if (empty !== null) {
      result = [empty, ...result];
    }
  }

  return result;
}

/**
 * 计算表达式的值
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function evil(fn) {
  // 一个变量指向Function，防止有些前端编译工具报错
  const Fn = Function;
  return new Fn(`return ${fn}`)();
}

/**
 * 获取Token键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getTokenKeyName() {
  return 'token';
}

/**
 * 搜索集合中的匹配项
 *
 * @export
 * @param {*} itemKey
 * @param {*} itemValue
 * @param {*} sourceData
 * @returns
 */
export function searchFromList(itemKey, itemValue, sourceData) {
  const d = sourceData || [];
  let result = null;

  d.forEach(o => {
    if (o[itemKey] === itemValue) {
      result = o;
    }
  });

  return result;
}

function errorCustomData() {
  return {
    code: -1,
    message: '',
    data: null,
    list: [],
    extra: null,
  };
}

function dataExceptionNotice(d) {
  const { code, message: messageText } = d;
  const c = errorCustomData();

  const lastCustomMessage = window.lastCustomMessage || {
    code: -1,
    message: '',
    time: new Date().getTime(),
  };

  if (code !== c.code) {
    if ((messageText || '') !== '') {
      const currentTime = new Date().getTime();
      if (code === lastCustomMessage.code) {
        if (currentTime - lastCustomMessage.time > 800) {
          requestAnimationFrame(() => {
            message.error(messageText);
          });

          window.lastCustomMessage = {
            code,
            message: messageText,
            time: currentTime,
          };
        }
      } else {
        requestAnimationFrame(() => {
          message.error(messageText);
        });

        window.lastCustomMessage = {
          code,
          message: messageText,
          time: currentTime,
        };
      }
    }

    if (code === 2001) {
      requestAnimationFrame(() => {
        router.replace('/user/login');
      });
    }
  }
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldDescription(v, op, other) {
  const o = (other || '') === '' ? '' : `,${other}`;
  return `请${op || '输入'}${v}${o}!`;
}

/**
 * 预处理单项数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteSingleData(d) {
  const { code, message: messageText } = d || errorCustomData();
  let v = {};

  if (code === 200) {
    const { data, extra } = d;
    v = {
      code,
      message: messageText,
      data: data || {},
      extra: extra || {},
      dataSuccess: true,
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      data: null,
      extra: null,
      dataSuccess: false,
    };

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理集合数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteListData(d, listItemHandler) {
  const { code, message: messageText } = d || errorCustomData();
  let v = {};

  if (code === 200) {
    const { list: listData, extra: extraData } = d;
    const list = (listData || []).map((item, index) => {
      let o = item;
      o.key = `list-${index}`;

      if (typeof listItemHandler === 'function') {
        o = listItemHandler(o);
      }
      return o;
    });

    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      extra: extraData,
      dataSuccess: true,
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      dataSuccess: false,
    };

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理分页数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemotePageListData(d, listItemHandler) {
  const { code, message: messageText } = d || errorCustomData();
  let v = {};

  if (code === 200) {
    const { list: listData, extra: extraData } = d;
    const { pageNo } = extraData;
    const list = (listData || []).map((item, index) => {
      let o = item;
      o.key = `${pageNo}-${index}`;

      if (typeof listItemHandler === 'function') {
        o = listItemHandler(o);
      }
      return o;
    });

    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      pagination: {
        total: extraData.total,
        pageSize: extraData.pagesize,
        current: parseInt(pageNo || 1, 10) || 1,
      },
      extra: extraData,
      dataSuccess: true,
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
      dataSuccess: false,
    };

    dataExceptionNotice(v);
  }
  return v;
}

/**
 * 预处理数据请求
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRequestParams(params, customHandle) {
  let submitData = params || {};

  if (typeof customHandle === 'function') {
    submitData = customHandle(submitData);
  }

  return submitData;
}

/**
 * 是否使用模拟访问
 *
 * @export
 * @returns
 */
export function useVirtualAccess() {
  // return process.env.NODE_ENV === 'development';
  // return true;
  return false;
}

/**
 * 封装模拟的登录验证
 *
 * @returns
 */
function apiVirtualAuthorize() {
  const tokenValue = localStorage.getItem(getTokenKeyName());
  return (tokenValue || '') !== '';
}

/**
 * 封装模拟的错误返回
 *
 * @export
 * @param {*} statusCode
 * @param {*} messageText
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export function apiVirtualFailData(statusCode, messageText, needAuthorize = true) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      message.error(messageText);
      return {
        code: statusCode,
        message: messageText,
      };
    }

    return {
      code: 2001,
      msg: '未授权的访问',
    };
  }

  message.error(messageText);
  return {
    code: statusCode,
    message: messageText,
  };
}

/**
 * 封装模拟的正确返回
 *
 * @export
 * @param {*} successData
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export function apiVirtualSuccessData(successData, needAuthorize = true) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      return {
        code: 200,
        msg: '',
        ...successData,
      };
    }

    return {
      code: 2001,
      msg: '未授权的访问',
    };
  }

  return {
    code: 200,
    msg: '',
    ...successData,
  };
}

/**
 * 封装正确的虚拟访问
 *
 * @export
 * @param {*} dataVirtual
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export async function apiVirtualSuccessAccess(dataVirtual, needAuthorize = true) {
  let result = {};
  // eslint-disable-next-line compat/compat
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(apiVirtualSuccessData(dataVirtual, needAuthorize));
    }, 300);
  }).then(data => {
    result = data;
  });

  message.info('由虚拟访问返回');

  const { code } = result;

  if (code === 2001) {
    router.push('/user/login');
  }

  return result;
}

/**
 * 封装失败的虚拟访问
 *
 * @export
 * @param {*} dataVirtual
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export async function apiVirtualFailAccess(dataVirtual, needAuthorize = true) {
  let result = {};
  // eslint-disable-next-line compat/compat
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(apiVirtualFailData(dataVirtual, needAuthorize));
    }, 300);
  }).then(data => {
    result = data;
  });

  message.info('由虚拟访问返回');

  const { code, message: messageText } = result;

  if (code === 2001) {
    router.push('/user/login');
  } else if (code !== 200) {
    message.warn(messageText);
  }

  return result;
}

/**
 * 封装模拟访问
 *
 * @export
 * @param {*} dataBuildFunction
 * dataBuildFunction示例
 * apiVirtualAccess(resolve => {
 *   setTimeout(() => {
 *     const { password, userName, type } = params;
 *     if (password === '888888' && userName === 'admin') {
 *       resolve(
 *         apiVirtualSuccessData(
 *           {
 *             id: 1,
 *             token: '059b1900-7d7b-40aa-872f-197d04b03385',
 *             userName: 'admin',
 *             type,
 *             role: [],
 *             currentAuthority: 'admin',
 *           },
 *           false
 *         )
 *       );
 *     } else if (password === '123456' && userName === 'user') {
 *       resolve(
 *         apiVirtualSuccessData(
 *           {
 *             id: 2,
 *             token: 'a9f98dab-00c1-4929-b79f-bacd1a7846d0',
 *             userName: 'user',
 *             type,
 *             role: [],
 *             currentAuthority: 'user',
 *           },
 *           false
 *         )
 *       );
 *     } else {
 *       resolve(apiVirtualFailData(1001, '用户名不存在或密码错误', false));
 *     }
 *   }, 300);
 * });
 * @returns
 */
export async function apiVirtualAccess(dataBuildFunction) {
  let result = {};
  // eslint-disable-next-line compat/compat
  await new Promise(resolve => {
    if (typeof dataBuildFunction === 'function') {
      setTimeout(dataBuildFunction(resolve));
    }
  }).then(data => {
    result = data;
  });

  message.info('由虚拟访问返回');

  const { code, message: messageText } = result;

  if (code !== 200) {
    message.warn(messageText);
  }

  return result;
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToLocalStorage(key, value) {
  const storage = window.localStorage;
  storage.setItem(key, value);
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToLocalStorage(key, json) {
  const storage = window.localStorage;
  storage.setItem(key, JSON.stringify(json || {}));
}

/**
 * 获取本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromLocalStorage(key) {
  const storage = window.localStorage;
  const jsonString = storage.getItem(key);

  return jsonString;
}

/**
 * 获取本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromLocalStorage(key) {
  const storage = window.localStorage;
  const jsonString = storage.getItem(key);

  if (jsonString) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}

/**
 * 获取工作队列
 * @export
 */
export function getQueue() {
  if (typeof window.queue === 'undefined') {
    window.queueCustom = queue({ concurrency: 3 });
    window.queueCustom.start();
  }

  return window.queueCustom;
}
