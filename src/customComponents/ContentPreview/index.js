import React, { PureComponent } from 'react';
import { Drawer } from 'antd';

import styles from './index.less';

class ContentPreview extends PureComponent {
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

  render() {
    const { htmlContent } = this.props;
    const { visible } = this.state;

    return (
      <Drawer
        title="详情预览"
        width={380}
        placement="left"
        visible={visible}
        closable
        onClose={this.handleClose}
      >
        <div
          className={styles.previewContainor}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </Drawer>
    );
  }
}

export default ContentPreview;
