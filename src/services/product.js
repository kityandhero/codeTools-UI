import { request } from '@/utils/request';
import { apiVirtualSuccessAccess, useVirtualAccess } from '@/utils/tools';

export async function queryListData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pagesize: 10,
      total: 645,
      pageNo: 1,
      data: [
        {
          rowId: 2,
          productId: '57',
          cityId: 152,
          rankId: '1',
          brandId: '0',
          md5: '77942b1680b796dc',
          no: 'AY-0002',
          title: '爱媛果冻橙',
          subtitle: '',
          habitat: '四川',
          description:
            '剥开爱媛皮，会看到爱媛如一朵盛开的花朵，小小的桔瓣如小船、似月牙.....金黄色的果肉晶莹剔透，赏心悦目，让人垂涎欲滴！  ',
          keywords: '爱媛果冻橙·皮薄如纸·口感细嫩清香，特惠39.8元 ',
          mainImageUrl: '/Upload/952354151.jpg',
          costPrice: 31.0,
          stockPrice: 35.0,
          salePrice: 39.8,
          marketPrice: 70.0,
          expressPrice: 0.0,
          visitCount: 53113,
          sort: 999,
          saleCount: 5189,
          score: 0,
          isRecommend: 0,
          guaranteePeriod: '',
          storeCount: 5,
          isChildType: '',
          disCount: '',
          state: 1,
          isHot: 0,
          production: '',
          feature: '',
          inTime: '2018-12-25 14:50:11',
          belongCity: '',
          saleType: 1,
          storePrice: 39.8,
          unit: '箱',
          spec: '5斤',
          productType: 1,
          endTime: '',
          returnPrice: 0.5,
          updateTime: '2018-11-30 16:35:19',
          isSku: 0,
          buyType: 1,
          isGift: 0,
          userMoreNum: 0,
          merchantMoreNum: 0,
        },
      ],
    });

    return result;
  }

  return request('/Product/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryListSourceData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pagesize: 10,
      total: 645,
      pageNo: 1,
      data: [
        {
          rowId: 2,
          productId: '57',
          cityId: 152,
          rankId: '1',
          brandId: '0',
          md5: '77942b1680b796dc',
          no: 'AY-0002',
          title: '爱媛果冻橙',
          subtitle: '',
          habitat: '四川',
          description:
            '剥开爱媛皮，会看到爱媛如一朵盛开的花朵，小小的桔瓣如小船、似月牙.....金黄色的果肉晶莹剔透，赏心悦目，让人垂涎欲滴！  ',
          keywords: '爱媛果冻橙·皮薄如纸·口感细嫩清香，特惠39.8元 ',
          mainImageUrl: '/Upload/952354151.jpg',
          costPrice: 31.0,
          stockPrice: 35.0,
          salePrice: 39.8,
          marketPrice: 70.0,
          expressPrice: 0.0,
          visitCount: 53113,
          sort: 999,
          saleCount: 5189,
          score: 0,
          isRecommend: 0,
          guaranteePeriod: '',
          storeCount: 5,
          isChildType: '',
          disCount: '',
          state: 1,
          isHot: 0,
          production: '',
          feature: '',
          inTime: '2018-12-25 14:50:11',
          belongCity: '',
          saleType: 1,
          storePrice: 39.8,
          unit: '箱',
          spec: '5斤',
          productType: 1,
          endTime: '',
          returnPrice: 0.5,
          updateTime: '2018-11-30 16:35:19',
          isSku: 0,
          buyType: 1,
          isGift: 0,
          userMoreNum: 0,
          merchantMoreNum: 0,
        },
      ],
    });

    return result;
  }

  return request('/Product/ListSource', {
    method: 'POST',
    body: params,
  });
}

export async function queryListLogData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      list: [
        {
          rowId: 1,
          sysLogsId: 'D1639312901332358030',
          userId: '1',
          title: '修改库存',
          content: '管理员修改[测试产品1]产品,原始库存为：0，修改后库存为库存为：2500',
          tableName: 'Product',
          pk: 'D1114264471555839396',
          inTime: '2019-02-13 16:39:31',
        },
        {
          rowId: 2,
          sysLogsId: 'D1114386010190852837',
          userId: '1',
          title: '上架产品',
          content: '管理员上架[测试产品1]产品',
          tableName: 'Product',
          pk: 'D1114264471555839396',
          inTime: '2019-02-13 11:14:38',
        },
        {
          rowId: 3,
          sysLogsId: 'D1114270100333228326',
          userId: '1',
          title: '添加产品',
          content: '管理员添加[测试产品1]产品,库存为：1400',
          tableName: 'Product',
          pk: 'D1114264471555839396',
          inTime: '2019-02-13 11:14:27',
        },
      ],
      extra: { pageNo: 1, pageSize: 10, total: 3 },
    });

    return result;
  }

  return request('/Product/ListLog', {
    method: 'POST',
    body: params,
  });
}

export async function queryListStoreChangeData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      list: [
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c75198fc7200012b0eb18d2',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 18:48:47',
          createUnixTime: 1551178127,
          createUserId: '',
          updateTime: '2019-02-26 18:48:47',
          updateUnixTime: 1551178127,
          updateUserId: '',
          key: '5c75198fc7200012b0eb18d2',
        },
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c75150ec7200012b0eb18d1',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 18:29:34',
          createUnixTime: 1551176975,
          createUserId: '',
          updateTime: '2019-02-26 18:29:34',
          updateUnixTime: 1551176975,
          updateUserId: '',
          key: '5c75150ec7200012b0eb18d1',
        },
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c75150ec7200012b0eb18d0',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 18:29:34',
          createUnixTime: 1551176975,
          createUserId: '',
          updateTime: '2019-02-26 18:29:34',
          updateUnixTime: 1551176975,
          updateUserId: '',
          key: '5c75150ec7200012b0eb18d0',
        },
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c75150ec7200012b0eb18cf',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 18:29:34',
          createUnixTime: 1551176975,
          createUserId: '',
          updateTime: '2019-02-26 18:29:34',
          updateUnixTime: 1551176975,
          updateUserId: '',
          key: '5c75150ec7200012b0eb18cf',
        },
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c75150ec7200012b0eb18ce',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 18:29:34',
          createUnixTime: 1551176975,
          createUserId: '',
          updateTime: '2019-02-26 18:29:34',
          updateUnixTime: 1551176975,
          updateUserId: '',
          key: '5c75150ec7200012b0eb18ce',
        },
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c7505cfc7200012b0eb18cd',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 17:24:31',
          createUnixTime: 1551173072,
          createUserId: '',
          updateTime: '2019-02-26 17:24:31',
          updateUnixTime: 1551173072,
          updateUserId: '',
          key: '5c7505cfc7200012b0eb18cd',
        },
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c7505cfc7200012b0eb18cc',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 17:24:31',
          createUnixTime: 1551173072,
          createUserId: '',
          updateTime: '2019-02-26 17:24:31',
          updateUnixTime: 1551173072,
          updateUserId: '',
          key: '5c7505cfc7200012b0eb18cc',
        },
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c7505cfc7200012b0eb18cb',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 17:24:31',
          createUnixTime: 1551173071,
          createUserId: '',
          updateTime: '2019-02-26 17:24:31',
          updateUnixTime: 1551173071,
          updateUserId: '',
          key: '5c7505cfc7200012b0eb18cb',
        },
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c7505cfc7200012b0eb18ca',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 17:24:31',
          createUnixTime: 1551173071,
          createUserId: '',
          updateTime: '2019-02-26 17:24:31',
          updateUnixTime: 1551173071,
          updateUserId: '',
          key: '5c7505cfc7200012b0eb18ca',
        },
        {
          dataId: 'D1114264471555839396',
          changeCount: 1,
          changeType: 1,
          changeTypeNote: '减少',
          cacheChangeType: 1,
          cacheChangeTypeNote: '提交处',
          triggerPosition: 'NewECshopUI.Community.Ashx.jihezhifu.ProcessRequest',
          storeChangeRecordId: '5c7505cfc7200012b0eb18c9',
          channel: 10100,
          channelNote: '微信端',
          autoRemark: '已处理库存变更',
          state: 1,
          stateNote: '已处理',
          ip: '',
          createTime: '2019-02-26 17:24:31',
          createUnixTime: 1551173071,
          createUserId: '',
          updateTime: '2019-02-26 17:24:31',
          updateUnixTime: 1551173071,
          updateUserId: '',
          key: '5c7505cfc7200012b0eb18c9',
        },
      ],
      extra: {
        pageNo: 1,
        pageSize: 10,
        total: 65,
      },
    });

    return result;
  }

  return request('/Product/ListStoreChange', {
    method: 'POST',
    body: params,
  });
}

export async function queryGetData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {
        productId: '693',
        cityId: 152,
        rankId: '1',
        brandId: '',
        md5: 'd42d74f059e65399',
        no: 'BTC-002',
        title: '麻阳冰糖橙114545',
        subtitle: '麻阳冰糖橙副标题1',
        habitat: '麻阳',
        description:
          '头茬冰糖橙新鲜上市，高度雾霾天气，我们缺少的是就是维C的发动机，高维C又好吃又健康的冰糖橙，个头虽小，但是我们不靠颜值，靠实力啊！',
        keywords: '麻阳冰糖橙·甘甜多汁·甜如冰糖·口感爆棚9.8元.',
        mainImageUrl: 'http://picqn.yurukeji.com.cn/739691095.png',
        costPrice: 8.0,
        stockPrice: 9.0,
        salePrice: 9.8,
        marketPrice: 25.0,
        expressPrice: 2.0,
        content: '<p>test</p>',
        visitCount: 55701,
        sort: 999,
        saleCount: 9686,
        score: 1,
        isRecommend: 0,
        guaranteePeriod: '',
        storeCount: 111,
        isChildType: '',
        disCount: '',
        state: 1,
        isHot: 1,
        production: '',
        feature: '',
        inTime: '2018-12-25 18:43:59',
        belongCity: '',
        saleType: 1,
        storePrice: 9.8,
        unit: '盒',
        spec: '7斤',
        productType: 1,
        endTime: '',
        returnPrice: 0.5,
        updateTime: '2018-12-25 14:45:28',
        isSku: '',
        buyType: 1,
        isGift: 0,
        userMoreNum: 0,
        merchantMoreNum: 0,
        imageList: [
          {
            id: 'D1831022451334755757',
            url: 'http://picqn.yurukeji.com.cn/1348992044.png',
          },
          {
            id: 'D1831186371958398602',
            url: 'http://picqn.yurukeji.com.cn/1317522025.png',
          },
          {
            id: 'D1834479610059357359',
            url: 'http://picqn.yurukeji.com.cn/1864422879.png',
          },
          {
            id: 'D1835154780916864245',
            url: 'http://picqn.yurukeji.com.cn/1483987744.png',
          },
          {
            id: 'D1835180391011636101',
            url: 'http://picqn.yurukeji.com.cn/2118494083.png',
          },
          {
            id: 'D1835223131675734018',
            url: 'http://picqn.yurukeji.com.cn/897702648.png',
          },
          {
            id: 'D1843252740625253331',
            url: 'http://picqn.yurukeji.com.cn/881055861.png',
          },
        ],
      },
    });

    return result;
  }

  return request('/Product/Get', {
    method: 'POST',
    body: params,
  });
}

export async function addBasicInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/AddBasicInfo', {
    method: 'POST',
    body: params,
  });
}

export async function updateBasicInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }
  return request('/Product/UpdateBasicInfo', {
    method: 'POST',
    body: params,
  });
}

/**
 * 更新库存
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function updateStoreCountData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }
  return request('/Product/UpdateStoreCount', {
    method: 'POST',
    body: params,
  });
}

export async function updateContentInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/updateContentInfo', {
    method: 'POST',
    body: params,
  });
}

export async function updateImageContentInfoData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/UpdateImageContentInfo', {
    method: 'POST',
    body: params,
  });
}

export async function setRecommendData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/SetRecommend', {
    method: 'POST',
    body: params,
  });
}

export async function setHotData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/SetHot', {
    method: 'POST',
    body: params,
  });
}

export async function setGiftData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/SetGift', {
    method: 'POST',
    body: params,
  });
}

export async function setStateData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/Product/SetState', {
    method: 'POST',
    body: params,
  });
}

export async function removeData(params) {
  return request('/Product/Remove', {
    method: 'POST',
    body: params,
  });
}

export async function addImageData(params) {
  return request('/Product/AddImage', {
    method: 'POST',
    body: params,
  });
}

export async function removeImageData(params) {
  return request('/Product/RemoveImage', {
    method: 'POST',
    body: params,
  });
}

export async function selectFromSourceData(params) {
  return request('/Product/SelectFromSource', {
    method: 'POST',
    body: params,
  });
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
