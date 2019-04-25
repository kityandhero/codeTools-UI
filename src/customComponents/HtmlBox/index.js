import React, { PureComponent } from 'react';

/**
 * 减少使用 dangerouslySetInnerHTML
 */
export default class HtmlBox extends PureComponent {
  componentDidMount() {
    this.renderToHtml();
  }

  componentDidUpdate() {
    this.renderToHtml();
  }

  renderToHtml = () => {
    const { children } = this.props;
    if (this.main) {
      this.main.innerHTML = children;
    }
  };

  render() {
    return (
      <span
        ref={ref => {
          this.main = ref;
        }}
      />
    );
  }
}
