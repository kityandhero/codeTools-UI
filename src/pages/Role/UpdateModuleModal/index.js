import { connect } from 'dva';
import { Form } from 'antd';

import UpdateModuleModalBase from '../../Common/UpdateModuleModalBase';

@connect(({ role, global, loading }) => ({
  role,
  global,
  loading: loading.models.role,
}))
@Form.create()
class UpdateModuleModal extends UpdateModuleModalBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '更新权限设置',
        submitApiPath: 'role/updateModule',
      },
    };
  }

  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };
}

export default UpdateModuleModal;
