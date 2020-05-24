import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import Ellipsis from '@/customComponents/Ellipsis';

import styles from './index.less';

/**
 * 减少使用 dangerouslySetInnerHTML
 */
class IconInfo extends PureComponent {
  render() {
    const { direction: directionValue, text, icon, onClick } = this.props;

    const iconItem = (icon || null) == null ? null : <span className={styles.iconBox}>{icon}</span>;

    let direction = directionValue || 'horizontal';

    if (direction !== 'horizontal' && direction !== 'vertical') {
      direction = 'horizontal';
    }

    if (direction === 'horizontal') {
      return (
        <>
          <div className={styles.containor} onClick={onClick}>
            <Row gutter={8}>
              <Col xl={4} lg={6} md={8} sm={24} xs={24}>
                {iconItem}
              </Col>
              <Col xl={20} lg={18} md={16} sm={24} xs={24}>
                <Ellipsis tooltip lines={1}>
                  {text}
                </Ellipsis>
              </Col>
            </Row>
          </div>
        </>
      );
    }

    if (direction === 'vertical') {
      return (
        <>
          <div className={styles.containor} onClick={onClick}>
            <Row justify="center">
              <Col span={24}>
                <Row>
                  <Col flex="auto" />
                  <Col>{iconItem}</Col>
                  <Col flex="auto" />
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col flex="auto" />
                  <Col>
                    <Ellipsis tooltip lines={1}>
                      {text}
                    </Ellipsis>
                  </Col>
                  <Col flex="auto" />
                </Row>
              </Col>
            </Row>
          </div>
        </>
      );
    }

    return null;
  }
}

IconInfo.defaultProps = {
  direction: 'horizontal',
};

export default IconInfo;
