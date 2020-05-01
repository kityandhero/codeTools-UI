import React, { PureComponent } from 'react';

/**
 * 减少使用 dangerouslySetInnerHTML
 */
class EverySpace extends PureComponent {
  render() {
    const { size, direction } = this.props;

    if (size <= 0) {
      return null;
    }

    if (direction !== 'vertical' && direction !== 'horizontal') {
      return null;
    }

    return (
      <>
        {direction === 'horizontal' ? (
          <div
            style={{
              height: `${size}px`,
            }}
          />
        ) : null}

        {direction === 'vertical' ? (
          <div
            style={{
              height: `100%`,
              width: `${size}px`,
            }}
          />
        ) : null}
      </>
    );
  }
}

EverySpace.defaultProps = {
  size: 10,
  direction: 'vertical',
};

export default EverySpace;
