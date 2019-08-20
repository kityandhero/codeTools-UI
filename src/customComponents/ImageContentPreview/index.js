import React from 'react';
import { Drawer, Empty } from 'antd';

import CustomBase from '@/customComponents/Framework/CustomBase';

import styles from './index.less';

class ImageContentPreview extends CustomBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{ visible: false },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = nextProps;

    return { visible };
  }

  onClose = () => {
    const { afterClose } = this.props;
    afterClose();
  };

  render() {
    const { imageList } = this.props;
    const { visible } = this.state;

    const htmlContent = (imageList || []).map(item => `<img src="${item}" alt="" />`).join('');

    return (
      <Drawer
        title="图片详情预览"
        width={380}
        placement="left"
        visible={visible}
        closable
        onClose={this.onClose}
      >
        {htmlContent ? (
          <div
            className={styles.previewContainor}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <Empty />
        )}
      </Drawer>
    );
  }
}

export default ImageContentPreview;
