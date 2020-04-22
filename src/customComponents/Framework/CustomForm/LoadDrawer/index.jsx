import React from 'react';
import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import DrawerBase from '@/customComponents/Framework/CustomForm/DrawerBase';

class LoadDrawer extends DrawerBase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.setState({ dataLoading: true });

    setTimeout(() => {
      this.reloadData();
    }, 700);
  };

  renderButton = () => {
    const { dataLoading, processing } = this.state;

    return (
      <>
        <Button
          type="default"
          disabled={dataLoading || processing}
          onClick={() => {
            this.onClose();
          }}
        >
          <CloseCircleOutlined />
          关闭
        </Button>
      </>
    );
  };
}

export default LoadDrawer;
