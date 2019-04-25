function openFolder(params) {
  const re = params;
  return new Promise(resolve => {
    // setTimeout() 模拟异步请求，成功后执行 resolve() 方法
    setTimeout(() => {
      try {
        window.folderopener.open();
      } catch (e) {
        re.exception = e;
      }
      resolve({
        message: '',
        error: 0,
        data: { re },
      });
    }, 800);
  });
}

export default async function queryOpenFolder(params) {
  let result = {};
  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          message: '',
          error: 0,
          data: params,
        });
      }, 800);
    }).then(data => {
      result = data;
    });
  } else {
    await openFolder(params).then(data => {
      result = data;
    });
  }
  return result;
}
