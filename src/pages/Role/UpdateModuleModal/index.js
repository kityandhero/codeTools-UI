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
  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '更新权限设置',
    submitApiPath: 'role/updateModule',
  });
}

export default UpdateModuleModal;
