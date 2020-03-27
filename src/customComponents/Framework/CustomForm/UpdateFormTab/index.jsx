import React from 'react';
import { BackTop } from 'antd';

import UpdateForm from '@/customComponents/Framework/CustomForm/UpdateForm';

class UpdateFormTab extends UpdateForm {
  render() {
    return (
      <>
        {this.renderForm()}
        {this.renderOther()}
        <BackTop />
      </>
    );
  }
}

export default UpdateFormTab;
