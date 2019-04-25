import { evil } from '@/utils/request';

function createCode(params) {
  return new Promise(resolve => {
    // setTimeout() 模拟异步请求，成功后执行 resolve() 方法
    setTimeout(() => {
      const param = JSON.stringify(params);
      const dataJson = window.codecreator.create(param);
      const data = evil(`(${dataJson})`);
      resolve(data);
    }, 800);
  });
}

export default async function queryCreateCode(params) {
  let result = {};
  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          message: '',
          error: 0,
          data: null,
        });
      }, 800);
    }).then(data => {
      result = data;
    });
  } else {
    await createCode(params).then(data => {
      result = data;
    });
  }
  return result;
}
