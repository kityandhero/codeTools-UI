import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import BaseUpdateFormTab from '@/customComponents/Framework/DataForm/BaseUpdateFormTab';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';

class TabPageBase extends BaseUpdateFormTab {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  getApiData = (props) => {
    const {
      roleTemplate: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParamsPrev } = preState;

    if ((urlParams || null) == null || (urlParamsPrev || null) == null) {
      return;
    }

    const { dataLoading } = this.state;

    if (!dataLoading) {
      if (this.checkNeedUpdate(preProps, preState, snapshot)) {
        this.reloadData();
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { roleTemplateId } = this.state;

    d.roleTemplateId = roleTemplateId;

    return d;
  };
}

export default TabPageBase;
