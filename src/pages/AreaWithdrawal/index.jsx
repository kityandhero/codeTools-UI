import { connect } from 'dva';

import accessWayCollection from '@/utils/accessWayCollection';

import TableHeaderCommon from '../Common/AreaAccountTableHeaderCommon';

@connect(({ areaAccount, global, loading }) => ({
  areaAccount,
  global,
  loading: loading.models.areaAccount,
}))
class Change extends TableHeaderCommon {
  componentAuthority = accessWayCollection.areaAccount.getCurrent;
}

export default Change;
