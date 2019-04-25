import { notification } from 'antd';

import UpdateFormTab from '@/customComponents/CustomForm/UpdateFormTab';

class TabPageBase extends UpdateFormTab {
  goToUpdateWhenProcessed = true;

  getApiData = props => {
    const {
      merchant: { data },
    } = props;

    return data;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { merchantId: merchantIdPre } = this.state;

    return merchantIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { merchantId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { merchantId } = this.state;

    d.merchantId = merchantId;

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
