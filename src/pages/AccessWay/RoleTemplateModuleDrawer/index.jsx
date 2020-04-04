import { connect } from 'umi';
import { Form } from 'antd';

import ModuleDrawer from '../ModuleDrawer';

@connect(({ accessWay, roleTemplate, global, loading }) => ({
  accessWay,
  roleTemplate,
  global,
  loading: loading.models.accessWay,
}))
@Form.create()
class RoleTemplateModuleDrawer extends ModuleDrawer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showSelect: true,
        selectModuleApiPath: 'roleTemplate/addModule',
        selectMultiModuleApiPath: 'roleTemplate/addMultiModule',
        selectAllModuleApiPath: 'roleTemplate/addAllModule',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    if ((externalData || null) != null) {
      d.roleTemplateId = externalData.roleTemplateId;
      d.channel = externalData.channel;
    }

    return d;
  };

  getSelectModuleApiData = (props) => {
    const {
      roleTemplate: { data },
    } = props;
    return data;
  };

  supplementRequestSelectModuleParams = (o) => {
    const { externalData } = this.state;

    const result = o;

    if (externalData != null) {
      result.roleTemplateId = externalData.roleTemplateId;
      result.channel = externalData.channel;
    }

    return result;
  };
}

export default RoleTemplateModuleDrawer;
