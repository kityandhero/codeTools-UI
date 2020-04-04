import DrawerBase from '@/customComponents/Framework/CustomForm/DrawerBase';

class Index extends DrawerBase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.setState({ dataLoading: true });

    setTimeout(() => {
      this.reloadData();
    }, 700);
  };
}

export default Index;
