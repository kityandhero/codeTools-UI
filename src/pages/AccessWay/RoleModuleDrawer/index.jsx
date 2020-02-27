import { connect } from 'dva';
import { Form } from 'antd';

import ModuleDrawer from '../ModuleDrawer';

@connect(({ accessWay, areaAgentRole, global, loading }) => ({
  accessWay,
  areaAgentRole,
  global,
  loading: loading.models.accessWay,
}))
@Form.create()
class RoleModuleDrawer extends ModuleDrawer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showSelect: true,
        selectModuleApiPath: 'areaAgentRole/addModule',
        selectMultiModuleApiPath: 'areaAgentRole/addMultiModule',
        selectAllModuleApiPath: 'areaAgentRole/addAllModule',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  supplementLoadRequestParams = o => {
    const d = o;
    const { externalData } = this.state;

    if ((externalData || null) != null) {
      d.areaAgentRoleId = externalData.areaAgentRoleId;
      d.channel = externalData.channel;
    }

    return d;
  };

  getSelectModuleApiData = props => {
    const {
      areaAgentRole: { data },
    } = props;
    return data;
  };

  supplementRequestSelectModuleParams = o => {
    const { externalData } = this.state;

    const result = o;

    if ((externalData || null) != null) {
      result.areaAgentRoleId = externalData.areaAgentRoleId;
      result.channel = externalData.channel;
    }

    return result;
  };
}

export default RoleModuleDrawer;
