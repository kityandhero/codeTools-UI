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
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showSelect: true,
        selectModuleApiPath: 'role/addModule',
        selectMultiModuleApiPath: 'role/addMultiModule',
        selectAllModuleApiPath: 'role/addAllModule',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  supplementLoadRequestParams = o => {
    const d = o;
    const { externalData } = this.props;

    if ((externalData || null) != null) {
      d.roleId = externalData.roleId;
      d.channel = externalData.channel;
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
    const { externalData } = this.state;

    const result = o;

    if ((externalData || null) != null) {
      result.roleId = externalData.roleId;
      result.channel = externalData.channel;
    }

    return result;
  };
}

export default RoleModuleDrawer;
