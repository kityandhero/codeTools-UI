import { connect } from 'umi';

import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';

import { parseUrlParamsForSetState } from '../../Assist/config';
import ModuleInfoBase from '../../../Common/ModuleInfoBase';

@connect(({ roleTemplate, global, loading }) => ({
  roleTemplate,
  global,
  loading: loading.models.roleTemplate,
}))
class Index extends ModuleInfoBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'roleTemplate/get',
        canOperate: false,
        roleTemplateId: null,
      },
    };
  }

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

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { roleTemplateId } = this.state;

    d.roleTemplateId = roleTemplateId;

    return d;
  };
}

export default Index;
