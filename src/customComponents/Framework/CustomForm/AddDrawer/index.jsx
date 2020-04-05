import React from 'react';
import { Button, Divider } from 'antd';
import { SaveOutlined, LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons';

import DrawerBase from '@/customComponents/Framework/CustomForm/DrawerBase';

class Index extends DrawerBase {
  renderButton = () => {
    const { processing } = this.state;

    return (
      <>
        <Button
          type="primary"
          disabled={processing}
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
          disabled={processing}
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

export default Index;
