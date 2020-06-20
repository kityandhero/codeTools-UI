import React from 'react';
import parse from 'html-react-parser';
import { Drawer } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { isObject } from '@/utils/tools';
import { dataTypeCollection } from '@/utils/constants';

import Base from '../Framework/DataDrawer/Base';

import styles from './index.less';

class DataPreviewDrawer extends Base {
  loadDataAfterMount = false;

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
      return <>{data}</>;
    }

    if (
      dataType === dataTypeCollection.jsonObject.flag ||
      dataType === dataTypeCollection.jsonObjectList.flag
    ) {
      return (
        <>
          {isObject(data) ? (
            <SyntaxHighlighter
              language="javascript"
              // style={docco}
            >
              {JSON.stringify(data || {}, null, '    ')}
            </SyntaxHighlighter>
          ) : (
            <SyntaxHighlighter
              language="javascript"
              // style={docco}
            >
              {JSON.stringify(JSON.parse(data || null), null, '    ')}
            </SyntaxHighlighter>
          )}
        </>
      );
    }

    return <>{data}</>;
  };

  renderForm = () => {
    return <>{this.formContent()}</>;
  };

  renderContentContainor = () => {
    const { title, width, placement, dataType, data } = this.props;

    if (dataType === dataTypeCollection.html.flag) {
      <div className={styles.previewContainor}>{parse(data)}</div>;
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
