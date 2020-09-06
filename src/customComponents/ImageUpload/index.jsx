import React, { PureComponent } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { isFunction, stringIsNullOrWhiteSpace } from '@/utils/tools';

import styles from './index.less';

class ImageUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        uploading: false,
      },
    };
  }

  handlePreview = () => {};

  beforeUpload = (file) => {
    const isPic =
      file.type === 'image/jpeg' ||
      file.type === 'image/gif' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png';
    if (!isPic) {
      message.error('请上传图片文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片文件不能超过2MB!');
    }

    return isPic && isLt2M;
  };

  handleUploadChange = (info) => {
    const { pretreatmentRemoteResponse, afterUploadSuccess } = this.props;

    if (info.file.status === 'uploading') {
      this.setState({ uploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { response } = info.file;

      if (isFunction(pretreatmentRemoteResponse)) {
        const data = pretreatmentRemoteResponse(response) || { image: '' };

        const { image } = data;

        this.setState({
          uploading: false,
        });

        if (isFunction(afterUploadSuccess)) {
          afterUploadSuccess(image || '');
        } else {
          message.error('afterUploadSuccess 配置无效');
        }
      } else {
        message.error('pretreatmentRemoteResponse 配置无效');
      }
    }
  };

  render() {
    const { action, listType, showUploadList, image, tokenSet } = this.props;

    const { uploading } = this.state;

    const uploadProps = {
      action,
      listType,
      showUploadList,
      onPreview: this.handlePreview,
      beforeUpload: this.beforeUpload,
      onChange: this.handleUploadChange,
      headers: { ...tokenSet },
    };

    return (
      <div className="clearfix">
        <Upload {...uploadProps}>
          <div className={styles.imageBox}>
            <div className={styles.imageAction}>
              {uploading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">上传</div>
            </div>
            {!stringIsNullOrWhiteSpace(image || '') ? (
              <img src={image} className={styles.image} alt="avatar" />
            ) : null}
          </div>
        </Upload>
      </div>
    );
  }
}

ImageUpload.defaultProps = {
  action: '',
  listType: 'picture-card',
  showUploadList: false,
  tokenSet: {},
  image: '',
  pretreatmentRemoteResponse: () => {},
  afterUploadSuccess: () => {},
};

export default ImageUpload;
