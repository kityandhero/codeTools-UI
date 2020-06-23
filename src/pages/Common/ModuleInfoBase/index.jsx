import React from 'react';
import { Card, Spin, Tag, notification, List, Affix, Button, Divider, Popconfirm } from 'antd';
import {
  ContactsOutlined,
  FormOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { pretreatmentRequestParams } from '@/utils/tools';
import BaseUpdateFormTab from '@/customComponents/Framework/DataForm/BaseUpdateFormTab';

import styles from './index.less';

class ModuleInfoBase extends BaseUpdateFormTab {
  needSetFormValueAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        changeUpdateModuleModalVisible: false,
        canOperate: true,
        moduleDrawerVisible: false,
        removeModuleApiPath: '',
        currentRecord: null,
      },
    };
  }

  supplementRequestRemoveModuleParams = (o) => o;

  removeModule = (e, record) => {
    const { dispatch } = this.props;
    const { removeModuleApiPath } = this.state;

    let submitData = pretreatmentRequestParams({}, (d) => {
      const o = d;

      o.guidTag = record.guidTag;

      return o;
    });

    submitData = this.supplementRequestRemoveModuleParams(submitData);

    this.setState({ processing: true });

    dispatch({
      type: removeModuleApiPath,
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const data = this.getApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.reloadData();

          const {
            location: { pathname },
          } = this.props;

          this.redirectToPath(`${pathname.replace('/load/', '/update/')}`);

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomLeft',
              message: '操作执行结果',
              description: `模块’${record.name}‘ 已经成功移除。`,
            });
          });
        }

        this.setState({ processing: false });
      }
    });
  };

  getErrorInfo = () => {};

  showModuleDrawer = () => {
    this.setState({
      moduleDrawerVisible: true,
    });
  };

  hideModuleDrawer = () => {
    this.setState({ moduleDrawerVisible: false });
  };

  onModuleDrawerClose = () => {
    this.setState({ moduleDrawerVisible: false });
  };

  afterOperateSuccess = () => {
    const {
      location: { pathname },
    } = this.props;

    this.reloadData();

    this.redirectToPath(`${pathname.replace('/load/', '/update/')}`);
  };

  showUpdateModuleModal = (record) => {
    const { changeUpdateModuleModalVisible } = this.state;

    if (!changeUpdateModuleModalVisible) {
      this.setState({
        currentRecord: record,
        changeUpdateModuleModalVisible: true,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterUpdateModuleModalOk = (data) => {
    this.setState({
      changeUpdateModuleModalVisible: false,
    });

    this.reloadData();
  };

  afterUpdateModuleModalCancel = () => {
    this.setState({
      changeUpdateModuleModalVisible: false,
    });
  };

  renderModuleDrawer = () => {};

  renderOther = () => {};

  renderExpansionSetCollection = (expansionSetCollection) => (
    <>
      {expansionSetCollection.map((item) => (
        <Tag key={`${item.name}_${item.indexNo}`} color={item.value === '1' ? '#87d068' : ''}>
          {item.name}
        </Tag>
      ))}
    </>
  );

  renderListAction = (item) => {
    const { canOperate } = this.state;

    const listAction = [];

    if (canOperate) {
      listAction.push(
        <Button
          size="small"
          text="更改权限"
          disabled={item.expansionSet === ''}
          onClick={() => {
            this.showUpdateModuleModal(item);
          }}
        >
          <FormOutlined />
          更改权限
        </Button>,
      );

      listAction.push(
        <Popconfirm
          placement="topRight"
          title="删除此操作模块，确定吗？"
          onConfirm={(e) => this.removeModule(e, item)}
          okText="确定"
          cancelText="取消"
        >
          <Button size="small">
            <DeleteOutlined />
            删除
          </Button>
        </Popconfirm>,
      );
    }

    return listAction;
  };

  formContent = () => {
    const { canOperate, metaData, processing, dataLoading, loadSuccess } = this.state;

    const listModule = [];

    (metaData == null ? [] : metaData.additional.listModule || []).forEach((item) => {
      const o = item;
      o.key = item.guidTag;

      listModule.push(o);
    });

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title={
              <>
                <ContactsOutlined />
                <span className={styles.cardTitle}>所含模块</span>
              </>
            }
            className={styles.card}
            bordered={false}
            extra={
              <Affix offsetTop={20}>
                <div>
                  {canOperate ? (
                    <>
                      <Divider type="vertical" />
                      <Button
                        type="primary"
                        disabled={dataLoading || processing || !loadSuccess}
                        onClick={() => {
                          this.showModuleDrawer();
                        }}
                        loading={processing}
                      >
                        <PlusCircleOutlined />
                        增加模块
                      </Button>
                    </>
                  ) : null}
                </div>
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <List
                itemLayout="horizontal"
                dataSource={listModule}
                renderItem={(item) => (
                  <List.Item key={item.guidTag} actions={this.renderListAction(item)}>
                    <List.Item.Meta
                      title={
                        <>
                          <a>{item.name}</a>
                          <span className={styles.url}>[{item.relativePath}]</span>
                        </>
                      }
                      description={
                        <>
                          {item.additional.expansionSetCollection.length === 0
                            ? '无扩展权限'
                            : null}

                          {item.additional.expansionSetCollection.length > 0 ? (
                            <>
                              {this.renderExpansionSetCollection(
                                item.additional.expansionSetCollection,
                              )}
                            </>
                          ) : null}
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Spin>
          </Card>
          {this.renderOther()}
          {this.renderModuleDrawer()}
        </div>
      </>
    );
  };
}

export default ModuleInfoBase;
