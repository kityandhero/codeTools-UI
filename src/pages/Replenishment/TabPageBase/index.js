import { notification } from 'antd';

import UpdateFormTab from '@/customComponents/CustomForm/UpdateFormTab';

class TabPageBase extends UpdateFormTab {
  goToUpdateWhenProcessed = true;

  getApiData = props => {
    const {
      replenishment: { data },
    } = props;

    return data;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { replenishmentId: replenishmentIdPre } = this.state;

    return replenishmentIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { replenishmentId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { replenishmentId } = this.state;

    d.replenishmentId = replenishmentId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = data => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };
}

export default TabPageBase;
