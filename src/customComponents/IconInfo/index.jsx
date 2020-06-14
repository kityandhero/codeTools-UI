import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import Ellipsis from '@/customComponents/Ellipsis';

import styles from './index.less';

/**
 * 减少使用 dangerouslySetInnerHTML
 */
class IconInfo extends PureComponent {
  render() {
    const {
      direction: directionValue,
      responsive: responsiveValue,
      tooltip: tooltipValue,
      ellipsis: ellipsisValue,
      text,
      icon,
      onClick,
    } = this.props;

    const responsive = responsiveValue || false;
    const tooltip = tooltipValue || false;
    const ellipsis = ellipsisValue || false;

    const iconItem = (icon || null) == null ? null : <span className={styles.iconBox}>{icon}</span>;

    let direction = directionValue || 'horizontal';

    if (direction !== 'horizontal' && direction !== 'vertical') {
      direction = 'horizontal';
    }

    if (direction === 'horizontal') {
      return (
        <>
          <div className={styles.containor} onClick={onClick}>
            {responsive ? (
              <Row gutter={8}>
                <Col xl={4} lg={6} md={8} sm={24} xs={24}>
                  {iconItem}
                </Col>
                <Col xl={20} lg={18} md={16} sm={24} xs={24}>
                  {ellipsis ? (
                    <Ellipsis tooltip={tooltip} lines={1}>
                      {text}
                    </Ellipsis>
                  ) : (
                    text
                  )}
                </Col>
              </Row>
            ) : (
              <Row gutter={8}>
                <Col flex="auto">{iconItem}</Col>
                <Col>
                  {ellipsis ? (
                    <Ellipsis tooltip={tooltip} lines={1}>
                      {text}
                    </Ellipsis>
                  ) : (
                    text
                  )}
                </Col>
              </Row>
            )}
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
                    {ellipsis ? (
                      <Ellipsis tooltip={tooltip} lines={1}>
                        {text}
                      </Ellipsis>
                    ) : (
                      text
                    )}
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
  responsive: false,
  tooltip: true,
  ellipsis: true,
};

export default IconInfo;
