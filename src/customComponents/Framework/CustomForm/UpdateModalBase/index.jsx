import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';

class UpdateModalBase extends ModalBase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.setState({ dataLoading: true });

    setTimeout(() => {
      this.reloadData();
    }, 700);
  };
}

export default UpdateModalBase;
