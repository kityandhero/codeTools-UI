import { notification } from 'antd';

import UpdateFormTab from '@/customComponents/CustomForm/UpdateFormTab';

class BaseEditTab extends UpdateFormTab {
  goToUpdateWhenProcessed = true;

  getApiData = props => {
    const {
      line: { data },
    } = props;

    return data;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { lineId: lineIdPre } = this.state;

    return lineIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { lineId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { lineId } = this.state;

    d.lineId = lineId;

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

export default BaseEditTab;
