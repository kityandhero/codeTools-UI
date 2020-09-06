import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

import { stringIsNullOrWhiteSpace, copyToClipboard } from '@/utils/tools';
import Ellipsis from '@/customComponents/Ellipsis';

import styles from './index.less';

class IconInfo extends PureComponent {
  copyText = () => {
    const { canCopy, text } = this.props;

    if (canCopy && !stringIsNullOrWhiteSpace(text)) {
      copyToClipboard(text);
    }
  };

  render() {
    const {
      direction: directionValue,
      responsive: responsiveValue,
      tooltip: tooltipValue,
      ellipsis: ellipsisValue,
      text,
      textPrefix,
      icon,
      onClick,
      canCopy,
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
              (iconItem || null) == null ? (
                <Row gutter={8}>
                  <Col
                    style={canCopy ? { cursor: 'pointer' } : {}}
                    onClick={() => {
                      this.copyText();
                    }}
                  >
                    {ellipsis ? (
                      <Ellipsis tooltip={tooltip} lines={1}>
                        {stringIsNullOrWhiteSpace(textPrefix) ? null : `${textPrefix}：`} {text}
                      </Ellipsis>
                    ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                      text
                    ) : (
                      `${textPrefix}：${text}`
                    )}
                  </Col>
                </Row>
              ) : (
                <Row gutter={8}>
                  <Col xl={4} lg={6} md={8} sm={24} xs={24}>
                    {iconItem}
                  </Col>
                  <Col
                    xl={20}
                    lg={18}
                    md={16}
                    sm={24}
                    xs={24}
                    style={canCopy ? { cursor: 'pointer' } : {}}
                    onClick={() => {
                      this.copyText();
                    }}
                  >
                    {ellipsis ? (
                      <Ellipsis tooltip={tooltip} lines={1}>
                        {stringIsNullOrWhiteSpace(textPrefix) ? null : `${textPrefix}：`} {text}
                      </Ellipsis>
                    ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                      text
                    ) : (
                      `${textPrefix}：${text}`
                    )}
                  </Col>
                </Row>
              )
            ) : (iconItem || null) == null ? (
              <Row gutter={8}>
                <Col
                  style={canCopy ? { cursor: 'pointer' } : {}}
                  onClick={() => {
                    this.copyText();
                  }}
                >
                  {ellipsis ? (
                    <Ellipsis tooltip={tooltip} lines={1}>
                      {stringIsNullOrWhiteSpace(textPrefix) ? null : `${textPrefix}：`} {text}
                    </Ellipsis>
                  ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                    text
                  ) : (
                    `${textPrefix}：${text}`
                  )}
                </Col>
              </Row>
            ) : (
              <Row gutter={8}>
                <Col flex="auto">{iconItem}</Col>
                <Col
                  style={canCopy ? { cursor: 'pointer' } : {}}
                  onClick={() => {
                    this.copyText();
                  }}
                >
                  {ellipsis ? (
                    <Ellipsis tooltip={tooltip} lines={1}>
                      {stringIsNullOrWhiteSpace(textPrefix) ? null : `${textPrefix}：`} {text}
                    </Ellipsis>
                  ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                    text
                  ) : (
                    `${textPrefix}：${text}`
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
              {(iconItem || null) == null ? null : (
                <Col span={24}>
                  <Row>
                    <Col flex="auto" />
                    <Col
                      style={canCopy ? { cursor: 'pointer' } : {}}
                      onClick={() => {
                        this.copyText();
                      }}
                    >
                      {iconItem}
                    </Col>
                    <Col flex="auto" />
                  </Row>
                </Col>
              )}
              <Col span={24}>
                <Row>
                  <Col flex="auto" />
                  <Col
                    style={canCopy ? { cursor: 'pointer' } : {}}
                    onClick={() => {
                      this.copyText();
                    }}
                  >
                    {ellipsis ? (
                      <Ellipsis tooltip={tooltip} lines={1}>
                        {stringIsNullOrWhiteSpace(textPrefix) ? null : `${textPrefix}：`} {text}
                      </Ellipsis>
                    ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                      text
                    ) : (
                      `${textPrefix}：${text}`
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
  tooltip: false,
  ellipsis: true,
  icon: null,
  textPrefix: null,
  canCopy: false,
};

export default IconInfo;
