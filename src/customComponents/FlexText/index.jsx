import React, { PureComponent } from 'react';
import { Row, Col, Space } from 'antd';

import styles from './index.less';

class FlexText extends PureComponent {
  render() {
    const { icon, text, subText, subTextStyle, extra } = this.props;

    return (
      <Row>
        <Col flex="auto">
          <Space>
            {(icon || null) == null ? null : <span>{icon}</span>}
            <span>{text}</span>
            {(subText || null) == null ? null : (
              <span className={styles.subText} style={subTextStyle || {}}>
                {subText}
              </span>
            )}
          </Space>
        </Col>

        {(extra || null) == null ? null : <Col flex>{extra}</Col>}
      </Row>
    );
  }
}

FlexText.defaultProps = {
  icon: null,
  text: '',
  subText: '',
  subTextStyle: null,
  extra: null,
};

export default FlexText;
