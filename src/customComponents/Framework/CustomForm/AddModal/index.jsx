import ModalBase from '../ModalBase';

class AddDrawer extends ModalBase {
  adjustWhenDidMount = () => {
    this.fillForm();
  };
}

export default AddDrawer;
