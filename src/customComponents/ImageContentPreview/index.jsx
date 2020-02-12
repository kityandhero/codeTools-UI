import React from 'react';
import { Drawer, Empty } from 'antd';

import CustomBase from '@/customComponents/Framework/CustomBase';
import { imageContentPreviewMode } from '@/customConfig/config';

import styles from './index.less';

class ImageContentPreview extends CustomBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        visible: false,
        htmlContent: '',
        imageList: [],
        listItem: [],
        mode: imageContentPreviewMode.html,
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, mode, imageList, listItem, htmlContent } = nextProps;

    return {
      visible,
      mode: mode || imageContentPreviewMode.html,
      imageList: imageList || [],
      listItem: listItem || [],
      htmlContent: htmlContent || '',
    };
  }

  onClose = () => {
    const { afterClose } = this.props;
    afterClose();
  };

  render() {
    const { visible, mode, imageList, listItem, htmlContent } = this.state;

    if (mode === imageContentPreviewMode.imageList) {
      const imageListHtmlContent = (imageList || [])
        .map(item => `<img src="${item}" alt="" />`)
        .join('');

      return (
        <Drawer
          title="图片详情预览"
          width={380}
          placement="left"
          visible={visible}
          closable
          onClose={this.onClose}
        >
          {imageListHtmlContent ? (
            <div
              className={styles.previewContainor}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: imageListHtmlContent }}
            />
          ) : (
            <Empty />
          )}
        </Drawer>
      );
    }

    if (mode === imageContentPreviewMode.listItem) {
      const listItemHtmlContent = (listItem || [])
        .map(item => `<img src="${item.image}" alt="" /><p>${item.description}</p>`)
        .join('');

      return (
        <Drawer
          title="图片详情预览"
          width={380}
          placement="left"
          visible={visible}
          closable
          onClose={this.onClose}
        >
          {listItemHtmlContent ? (
            <div
              className={styles.previewContainor}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: listItemHtmlContent }}
            />
          ) : (
            <Empty />
          )}
        </Drawer>
      );
    }

    if (mode === imageContentPreviewMode.html) {
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

    return (
      <Drawer
        title="图片详情预览"
        width={380}
        placement="left"
        visible={visible}
        closable
        onClose={this.onClose}
      >
        <Empty />
      </Drawer>
    );
  }
}

export default ImageContentPreview;