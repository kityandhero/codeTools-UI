import React, { Fragment } from 'react';
import { BackTop } from 'antd';

import UpdateForm from '@/customComponents/CustomForm/UpdateForm';

class UpdateFormTab extends UpdateForm {
  render() {
    return (
      <Fragment>
        {this.formContent()}
        {this.renderOther()}
        <BackTop />
      </Fragment>
    );
  }
}

export default UpdateFormTab;
