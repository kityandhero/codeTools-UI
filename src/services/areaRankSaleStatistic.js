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
          incomeAmount: 0.0,
          areaAgentId: 'D1829070162034854650',
          area: 0,
          mode: 0,
          modeNote: '小时',
          startTime: '2019-03-07 23:00:00',
          startUnixTime: 1551970800,
          endTime: '2019-03-08 00:00:00',
          endUnixTime: 1551974400,
          areaAccountInComeStatisticId: '5c809b8dc720003cf8c0aed6',
          channel: 0,
          channelNote: '未知',
          autoRemark: '来自统计服务',
          state: 1,
          stateNote: '已统计',
          ip: '192.168.1.157',
          createTime: '2019-03-07 12:18:21',
          createUnixTime: 1551932301,
          createUserId: '',
          updateTime: '2019-03-07 15:43:07',
          updateUnixTime: 0,
          updateUserId: '',
          additional: {
            areaAgentName: '新乡代理商',
            areaName: '',
          },
          key: '5c809b8dc720003cf8c0aed6',
        },
      ],
    });

    return result;
  }

  return request('/AreaRankSaleStatistic/List', {
    method: 'POST',
    body: params,
  });
}

export async function queryGetData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {
        incomeAmount: 0.0,
        areaAgentId: 'D1829070162034854650',
        area: 0,
        mode: 0,
        modeNote: '小时',
        startTime: '2019-03-07 23:00:00',
        startUnixTime: 1551970800,
        endTime: '2019-03-08 00:00:00',
        endUnixTime: 1551974400,
        areaAccountInComeStatisticId: '5c809b8dc720003cf8c0aed6',
        channel: 0,
        channelNote: '未知',
        autoRemark: '来自统计服务',
        state: 1,
        stateNote: '已统计',
        ip: '192.168.1.157',
        createTime: '2019-03-07 12:18:21',
        createUnixTime: 1551932301,
        createUserId: '',
        updateTime: '2019-03-07 15:43:07',
        updateUnixTime: 0,
        updateUserId: '',
        additional: {
          areaAgentName: '新乡代理商',
          areaName: '',
        },
        key: '5c809b8dc720003cf8c0aed6',
      },
    });

    return result;
  }

  return request('/AreaRankSaleStatistic/Get', {
    method: 'POST',
    body: params,
  });
}

export async function removeData(params) {
  if (useVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request('/AreaRankSaleStatistic/Remove', {
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
