import { connect } from 'dva';
import { Form } from 'antd';

import ModuleDrawer from '../ModuleDrawer';

@connect(({ accessWay, role, global, loading }) => ({
  accessWay,
  role,
  global,
  loading: loading.models.accessWay,
}))
@Form.create()
class RoleModuleDrawer extends ModuleDrawer {
  extendState = () => ({
    showSelect: true,
    selectModuleApiPath: 'role/addModule',
    selectMultiModuleApiPath: 'role/addMultiModule',
    selectAllModuleApiPath: 'role/addAllModule',
  });

  supplementLoadRequestParams = o => {
    const d = o;
    const { sourceData: source } = this.props;

    if (source != null) {
      d.roleId = source.roleId;
      d.channel = source.channel;
    }

    return d;
  };

  getSelectModuleApiData = props => {
    const {
      role: { data },
    } = props;
    return data;
  };

  supplementRequestSelectModuleParams = o => {
    const { sourceData } = this.state;

    const result = o;

    if (sourceData != null) {
      result.roleId = sourceData.roleId;
      result.channel = sourceData.channel;
    }

    return result;
  };
}

export default RoleModuleDrawer;
