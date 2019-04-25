import React, { PureComponent } from 'react';
import { Drawer, Empty } from 'antd';
import styles from './index.less';

class ImageContentPreview extends PureComponent {
  mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.mounted = true;

    const { visible } = this.props;
    this.setState({ visible });
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;

    this.setState({ visible });
  }

  componentWillUnmount() {
    this.mounted = false;
    this.setState = () => {};
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
