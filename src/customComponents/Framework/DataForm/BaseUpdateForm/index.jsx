import { message } from 'antd';

import { pretreatmentRequestParams, isFunction } from '@/utils/tools';
import DataSingleView from '../../DataSingleView/DataLoad';

class BaseUpdateForm extends DataSingleView {
  goToUpdateWhenProcessed = false;

  handleFormReset = () => {
    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    form.resetFields();

    this.reloadData();
  };

  supplementSubmitRequestParams = (o) => o;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSubmitSuccess = (singleData, listData, extraData, responseOriginalData, submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkSubmitRequestParams = (o) => true;

  afterCheckSubmitRequestParams = (o) => o;

  execSubmitApi = (values = {}, afterSubmitCallback) => {
    const { dispatch } = this.props;

    const { submitApiPath } = this.state;

    if ((submitApiPath || '') === '') {
      message.error(`缺少 submitApiPath 配置！`);
      return;
    }

    let submitData = pretreatmentRequestParams(values || {});

    submitData = this.supplementSubmitRequestParams(submitData);

    const checkResult = this.checkSubmitRequestParams(submitData);

    submitData = this.afterCheckSubmitRequestParams(submitData);

    if (checkResult) {
      this.setState({ processing: true });

      dispatch({
        type: submitApiPath,
        payload: submitData,
      }).then(() => {
        if (this.mounted) {
          const remoteData = this.getApiData(this.props);

          const { dataSuccess } = remoteData;

          if (dataSuccess) {
            const { list: metaListData, data: metaData, extra: metaExtra } = remoteData;

            this.afterSubmitSuccess(
              metaData || null,
              metaListData || [],
              metaExtra || null,
              remoteData,
              submitData,
            );
          }

          // eslint-disable-next-line react/no-unused-state
          this.setState({ processing: false }, () => {
            if (isFunction(afterSubmitCallback)) {
              afterSubmitCallback();
            }
          });
        }
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate = (e) => {
    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    const { validateFields } = form;

    validateFields()
      .then((values) => {
        this.execSubmitApi(values, () => {
          if (this.goToUpdateWhenProcessed) {
            this.reloadByUrl();
          }
        });
      })
      .catch((error) => {
        const { errorFields } = error;

        const m = [];

        Object.values(errorFields).forEach((o) => {
          m.push(o.errors[0]);
        });

        const maxLength = 5;
        let beyondMax = false;

        if (m.length > maxLength) {
          m.length = maxLength;

          beyondMax = true;
        }

        let errorMessage = m.join(', ');

        if (beyondMax) {
          errorMessage += ' ...';
        }

        message.warn(errorMessage);
      });
  };
}

export default BaseUpdateForm;
