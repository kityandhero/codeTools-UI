import React from 'react';
import parse from 'html-react-parser';
import { FormOutlined } from '@ant-design/icons';

import { dataTypeCollection } from '@/utils/constants';

import Base from '../Framework/DataDrawer/Base';

import styles from './index.less';

class DataPreviewDrawer extends Base {
  loadDataAfterMount = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showBottomBar: true,
      },
    };
  }

  renderTitleIcon = () => {
    const { icon } = this.props;

    return icon;
  };

  renderTitle = () => {
    const { title } = this.props;

    return title || '';
  };

  formContent = () => {
    const { dataType, data } = this.props;

    if (dataType === dataTypeCollection.commonValue.flag) {
      return this.renderFormOnlyShowText('内容:', data);
    }

    if (
      dataType === dataTypeCollection.jsonObject.flag ||
      dataType === dataTypeCollection.jsonObjectList.flag
    ) {
      return <>{this.renderFormOnlyShowSyntaxHighlighter('javascript', '内容', data)}</>;
    }

    return this.renderFormOnlyShowText('内容', data);
  };

  // renderForm = () => {
  //   return <>{this.formContent()}</>;
  // };

  renderContentContainor = () => {
    const { dataType, data } = this.props;

    if (dataType === dataTypeCollection.html.flag) {
      return <div className={styles.previewContainor}>{parse(data)}</div>;
    }

    return <div className={styles.contentContainor}>{this.renderForm()}</div>;
  };
}

DataPreviewDrawer.defaultProps = {
  title: '',
  icon: <FormOutlined />,
  placement: 'left',
  width: 380,
  dataType: dataTypeCollection.commonValue.flag,
};

export default DataPreviewDrawer;
