import Base from '../Base';

class BaseLoadModal extends Base {
  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.setState({ dataLoading: true });

    if (this.reloadWhenShow) {
      setTimeout(() => {
        this.reloadData();
      }, 700);
    } else {
      this.setState({ dataLoading: false });
    }
  };
}

export default BaseLoadModal;
