import React from 'react';
import { Button, Divider } from 'antd';
import { SaveOutlined, LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons';

import DrawerBase from '@/customComponents/Framework/CustomForm/DrawerBase';

class UpdateDrawer extends DrawerBase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.setState({ dataLoading: true });

    setTimeout(() => {
      this.reloadData();
    }, 700);
  };

  renderButton = () => {
    const { loadSuccess, dataLoading, processing } = this.state;

    return (
      <>
        <Button
          type="primary"
          disabled={dataLoading || processing || !loadSuccess}
          onClick={(e) => {
            this.handleOk(e);
          }}
        >
          {processing ? <LoadingOutlined /> : <SaveOutlined />}
          保存
        </Button>
        <Divider type="vertical" />
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

export default UpdateDrawer;
