import React, { PureComponent } from 'react';
import parse from 'html-react-parser';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = nextProps;

    return { visible: visible || false };
  }

  componentDidMount() {
    this.mounted = true;
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
          // dangerouslySetInnerHTML={{ __html: htmlContent }}
        >
          {parse(htmlContent)}
        </div>
      </Drawer>
    );
  }
}

export default ContentPreview;
