import ModalBase from '@/customComponents/CustomForm/ModalBase';

class AddFormModalBase extends ModalBase {
  constructor(props) {
    super(props);

    const defaultState = this.state;

    defaultState.dataLoading = false;

    this.state = {
      ...defaultState,
      visible: false,
    };
  }

  preInit = () => {
    const { visible } = this.props;

    this.setState(this.extendState(), () => {
      this.init();
    });

    this.setState({ visible });
  };

  componentWillReceiveProps(nextProps) {
    const { visible: visiblePre } = this.state;
    const { form, visible } = nextProps;

    if (visiblePre === false && visible === true) {
      form.resetFields();
    }
    this.setState({ visible });
  }
}

export default AddFormModalBase;
