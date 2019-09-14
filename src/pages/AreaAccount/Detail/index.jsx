import { connect } from 'dva';

import accessWayCollection from '@/utils/accessWayCollection';

import TableHeaderCommon from '../../Common/AreaAccountTableHeaderCommon';

@connect(({ areaAccount, global, loading }) => ({
  areaAccount,
  global,
  loading: loading.models.areaAccount,
}))
class Detail extends TableHeaderCommon {
  componentAuthority = accessWayCollection.areaAccount.getCurrent;

  tabList = [
    {
      key: 'areaAccountRecord/list',
      show: this.checkAuthority(accessWayCollection.areaAccountRecord.list),
      tab: '账户流水',
    },
    {
      key: 'areaDistribution/list',
      show: this.checkAuthority(accessWayCollection.areaDistribution.list),
      tab: '提现记录',
    },
  ];
}

export default Detail;
