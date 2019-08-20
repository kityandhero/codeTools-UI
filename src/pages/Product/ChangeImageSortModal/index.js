import React from 'react';
import { connect } from 'dva';
import { Form, Menu, Dropdown, List, Icon, message } from 'antd';

import { pretreatmentRequestParams } from '@/utils/tools';
import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';
import accessWayCollection from '@/utils/accessWayCollection';

import styles from './index.less';

@connect(({ product, global, loading }) => ({
  product,
  global,
  loading: loading.models.product,
}))
@Form.create()
class ChangeImageSortModal extends ModalBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      productId: '',
      sorts: '',
      bodyStyle: {
        height: '300px',
        overflow: 'auto',
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { productData } = nextProps;

    if (productData != null) {
      const { productId } = productData;

      return { productId };
    }

    return null;
  }

  getApiData = props => {
    const {
      product: { data },
    } = props;
    return data;
  };

  initState = () => ({
    pageName: '变更图片顺序',
    loadApiPath: 'product/listImage',
    submitApiPath: 'product/updateImageSort',
    width: 700,
  });

  doOtherWhenChangeVisible = () => {
    this.loadData();
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { productId } = this.state;

    d.productId = productId;

    return d;
  };

  loadData = () => {
    const { dispatch } = this.props;
    const { loadApiPath } = this.state;

    let submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      return o;
    });

    submitData = this.supplementLoadRequestParams(submitData);

    if (loadApiPath !== '') {
      this.setState({ dataLoading: true });

      dispatch({
        type: loadApiPath,
        payload: submitData,
      }).then(() => {
        if (this.mounted) {
          const data = this.getApiData(this.props);

          const { dataSuccess } = data;

          if (dataSuccess) {
            const { list } = data;

            const customData = list;

            this.setState({ customData });
          }

          this.setState({ dataLoading: false });
        }
      });
    }
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { productId, customData } = this.state;

    d.productId = productId;

    const list = [];
    (customData || []).forEach(item => {
      list.push(`${item.id}|${item.sort}`);
    });

    d.sorts = list.join();

    return d;
  };

  afterSubmitSuccess = o => {
    const { afterOK, productData } = this.props;

    this.setState({ visible: false });

    const data = o;
    const { title } = productData;
    data.clientMessage = `操作通知：商品 ${title} 图片顺序已经更改成功。`;

    afterOK(data);
  };

  checkSubmitRequestParams = o => {
    if ((o.productId || '') === '') {
      message.error('请提交产品标识!');
      return false;
    }

    if ((o.sorts || '') === '') {
      message.error('请提交产品图片排序序列!');
      return false;
    }

    return true;
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

        this.setState({ customData: result });

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

        this.setState({ customData: result });

        break;
      default:
        break;
    }
  };

  formContent = () => {
    const { customData } = this.state;

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
      <>
        <div className={styles.containorBox}>
          <List
            size="large"
            rowKey="id"
            // loading={dataLoading || processing}
            pagination={false}
            dataSource={customData}
            renderItem={item => (
              <List.Item actions={[<MoreBtn current={item} />]}>
                <List.Item.Meta
                  avatar={<img src={item.url} className={styles.imageItem} alt={item.url} />}
                  title={<a href={item.href}>图片路径:</a>}
                  description={item.url}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </div>
      </>
    );
  };
}

export default ChangeImageSortModal;
