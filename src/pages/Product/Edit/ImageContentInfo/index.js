import React, { Fragment } from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import {
  Card,
  Button,
  Form,
  Spin,
  BackTop,
  notification,
  Icon,
  Affix,
  Upload,
  Dropdown,
  Menu,
  List,
  Modal,
  message,
  Divider,
} from 'antd';
import Zmage from 'react-zmage';

import { pretreatmentRequestParams, getTokenKeyName, corsTarget } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import ImageContentPreview from '@/customComponents/ImageContentPreview';

import TabPageBase from '../../TabPageBase';

import styles from './index.less';

const { confirm } = Modal;

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class ImageContentInfo extends TabPageBase {
  componentAuthority = accessWayCollection.product.get;

  constructor(props) {
    super(props);

    const tokenSetObject = {};
    tokenSetObject[`${getTokenKeyName()}`] = localStorage.getItem(getTokenKeyName()) || '';

    this.state = {
      ...this.state,
      tokenSet: tokenSetObject,
      customData: [],
      imageCount: 0,
      productId: null,
      previewVisible: false,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      productId: id,
      loadApiPath: 'product/get',
      submitApiPath: 'product/updateImageContentInfo',
    };

    return result;
  };

  afterLoadSuccess = d => {
    const { imageContentList } = d;

    const customData = [];

    (imageContentList || []).forEach((item, index) => {
      const o = {
        key: item,
        url: item,
        sort: index + 1,
      };

      customData.push(o);
    });

    this.setState({
      customData,
      imageCount: customData.length,
    });
  };

  beforeMainUpload = file => {
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

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleGalleryUploadChange = ({ file }) => {
    if (file.status === 'done') {
      const {
        response: {
          data: { imageUrl },
        },
      } = file;

      const { customData } = this.state;

      customData.push({ key: imageUrl, url: imageUrl, sort: (customData || []).length + 1 });

      this.setState({ customData }, () => {
        this.save();
      });
    }
  };

  remove = (e, record) => {
    e.preventDefault();

    const that = this;

    const { processing } = that.state;

    confirm({
      title: '删除图片',
      content: `确定要删除图片吗`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        const { customData } = that.state;

        const customDataNew = customData
          .filter(item => record.url !== item.url)
          .map((item, index) => {
            const o = item;
            o.sort = index + 1;
            return o;
          });

        that.setState({ customData: customDataNew }, () => {
          that.save();
        });
      },
      onCancel() {
        message.info('取消了删除操作！');
      },
    });

    return false;
  };

  save = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { customData, productId } = this.state;
      // console.dir(customData);
      const imageContent = (customData || []).map(item => item.url).join('|');
      o.productId = productId;
      o.imageContent = imageContent;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'product/updateImageContentInfo',
      payload: submitData,
    }).then(() => {
      this.setState({ processing: false });
      const {
        product: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        const { customData } = this.state;

        this.setState({ imageCount: customData.length });

        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '数据已经保存成功，请进行后续操作。',
          });
        });
      }
    });
  };

  changeSort = (e, record) => {
    const { key } = e;

    const { customData } = this.state;

    const beforeList = [];
    const afterList = [];
    let result = [];

    if ((customData || []).length <= 1) {
      message.warn('无需排序!');
      return;
    }

    (customData || []).forEach(item => {
      if (item.sort < record.sort) {
        beforeList.push(item);
      }

      if (item.sort > record.sort) {
        afterList.push(item);
      }
    });

    switch (key) {
      case 'up':
        if (record.sort === 1) {
          message.warn('已经排在第一了!');
          return;
        }

        (beforeList || []).forEach((item, index) => {
          if (index < beforeList.length - 1) {
            result.push(item);
          } else {
            const o1 = record;
            o1.sort -= 1;

            result.push(o1);

            const o2 = item;
            o2.sort += 1;

            result.push(o2);
          }
        });

        result = result.concat(afterList);

        this.setState({ customData: result }, () => {
          this.save();
        });

        break;
      case 'down':
        if (record.sort === (customData || []).length) {
          message.warn('已经排在最后了!');
        }

        result = result.concat(beforeList);

        (afterList || []).forEach((item, index) => {
          if (index === 0) {
            const o2 = item;
            o2.sort -= 1;

            result.push(o2);

            const o1 = record;
            o1.sort += 1;

            result.push(o1);
          } else {
            result.push(item);
          }
        });

        this.setState({ customData: result }, () => {
          this.save();
        });

        break;
      default:
        break;
    }
  };

  showPreview = () => {
    this.setState({ previewVisible: true });
  };

  afterPreviewClose = () => {
    this.setState({ previewVisible: false });
  };

  formContent = () => {
    const {
      processing,
      dataLoading,
      tokenSet,
      customData,
      imageCount,
      previewVisible,
      loadSuccess,
    } = this.state;

    const corsUrl = corsTarget();

    const uploadGalleryProps = {
      action: `${corsUrl}/Product/UploadImage`,
      onChange: this.handleGalleryUploadChange,
      showUploadList: false,
      multiple: true,
      headers: { ...tokenSet },
    };

    const ListContent = ({ data: { sort } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>序列</span>
          <p>
            排序值:
            {sort}
          </p>
        </div>
      </div>
    );

    const MoreBtn = props => {
      const { current } = props;
      const { customData: customDataList } = this.state;

      return (
        <Dropdown
          disabled={!this.checkAuthority(accessWayCollection.product.updateImageContentInfo)}
          overlay={
            <Menu onClick={e => this.changeSort(e, current)}>
              <Menu.Item key="up" disabled={current.sort === 1}>
                <Icon type="arrow-up" />
                上移
              </Menu.Item>
              <Menu.Item key="down" disabled={current.sort === (customDataList || []).length}>
                <Icon type="arrow-down" />
                下移
              </Menu.Item>
            </Menu>
          }
        >
          <a>
            <Icon type="retweet" />
            排序
          </a>
        </Dropdown>
      );
    };

    return (
      <Fragment>
        <div className={styles.containorBox}>
          <Card
            className={styles.listCard}
            bordered={false}
            title={
              <span>
                图片详情列表
                <span className={styles.help}>
                  {' '}
                  [上传，排序，删除后将自动保存, 点击图片可以查看大图！]
                </span>
              </span>
            }
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={
              <Affix offsetTop={20}>
                <span>
                  当前图片数量：
                  {imageCount} 张
                </span>
                <Divider type="vertical" />
                <Button
                  disabled={dataLoading || processing || !loadSuccess}
                  onClick={this.showPreview}
                >
                  <Icon type="eye" />
                  预览
                </Button>
                <Fragment>
                  <Divider type="vertical" />
                  <Upload
                    {...uploadGalleryProps}
                    disabled={
                      !this.checkAuthority(accessWayCollection.product.updateImageContentInfo)
                    }
                  >
                    <Button
                      disabled={
                        dataLoading ||
                        processing ||
                        !loadSuccess ||
                        !(
                          this.checkAuthority(accessWayCollection.product.updateImageContentInfo) &&
                          this.checkAuthority(accessWayCollection.product.uploadImage)
                        )
                      }
                      loading={processing}
                    >
                      <Icon type="upload" />
                      上传新图
                    </Button>
                  </Upload>
                </Fragment>
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <List
                size="large"
                rowKey="id"
                loading={dataLoading || processing}
                pagination={false}
                dataSource={customData}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <MoreBtn current={item} />,
                      <a
                        onClick={e => {
                          this.remove(e, item);
                        }}
                        disabled={
                          !this.checkAuthority(accessWayCollection.product.updateImageContentInfo)
                        }
                      >
                        <Icon type="delete" />
                        删除
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Zmage src={item.url} className={styles.imageItem} />}
                      title={<a href={item.href}>图片路径:</a>}
                      description={item.url}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Spin>
          </Card>
        </div>
        <ImageContentPreview
          visible={previewVisible}
          imageList={customData.map(item => item.url)}
          afterClose={this.afterPreviewClose}
        />
        <BackTop />
      </Fragment>
    );
  };
}

export default ImageContentInfo;
