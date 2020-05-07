import React from 'react';
import { BackTop } from 'antd';

import BaseUpdateForm from '../BaseUpdateForm';

class BaseUpdateFormTab extends BaseUpdateForm {
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

export default BaseUpdateFormTab;
