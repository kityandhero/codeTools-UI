import React from 'react';
import { connect } from 'dva';
import {
  Form,
  Modal,
  Row,
  Col,
  Badge,
  Divider,
  Button,
  Dropdown,
  Menu,
  Icon,
  notification,
} from 'antd';
import moment from 'moment';

import {
  copyToClipboard,
  replaceTargetText,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import InnerPagerList from '@/customComponents/Framework/CustomList/PagerList/InnerPagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import AddModal from '../AddModal';
import UpdateModal from '../UpdateModal';
import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../../Assist/config';
import { fieldData } from '../../../../PlanSale/Common/data';

const { confirm } = Modal;

@connect(({ product, planSale, global, loading }) => ({
  product,
  planSale,
  global,
  loading: loading.models.product,
}))
@Form.create()
class Index extends InnerPagerList {
  componentAuthority = accessWayCollection.product.listPlanSale;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        currentPlanSaleId: '',
        startTimeAlias: 'beginPlanSaleTime',
        endTimeAlias: 'endPlanSaleTime',
        addModalVisible: false,
        updateModalVisible: false,
        paramsKey: 'c031a8b9-b6e5-49f9-aa89-9a79aa5d85f3',
        loadApiPath: 'product/listPlanSale',
        dateRangeFieldName: '预售时段',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  getApiData = props => {
    const {
      product: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { productId } = this.state;

    d.productId = productId;

    return d;
  };

  getPlanSaleStateBadgeStatus = v => {
    let result = 'default';

    switch (v) {
      case 0:
        result = 'default';
        break;
      case 10:
        result = 'processing';
        break;
      case 20:
        result = 'success';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  showAddModal = () => {
    this.setState({ addModalVisible: true });
  };

  showUpdateModal = record => {
    const { planSaleId } = record;

    this.setState({ updateModalVisible: true, currentPlanSaleId: planSaleId });
  };

  afterAddModalCancel = () => {
    this.setState({ addModalVisible: false });
  };

  afterUpdateModalCancel = () => {
    this.setState({ updateModalVisible: false });
  };

  afterAddModalOk = () => {
    this.setState({ addModalVisible: false });

    this.refreshData();
  };

  afterUpdateModalOk = () => {
    this.setState({ updateModalVisible: false });

    this.refreshData();
  };

  afterStateChange = () => {
    this.refreshData();
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'setWait':
        this.setWait(record);
        break;
      case 'setOpening':
        this.setOpening(record);
        break;
      case 'setOver':
        this.setOver(record);
        break;
      case 'remove':
        this.removeConfirm(record);
        break;
      default:
        break;
    }
  };

  setWait = record => {
    const { dispatch } = this.props;
    const { planSaleId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'planSale/setWait',
      payload: { planSaleId },
    }).then(() => {
      const {
        planSale: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已暂停',
          });
        });

        this.reloadData();

        this.reloadByUrl();
      }

      this.setState({ processing: false });
    });
  };

  setOpening = record => {
    const { dispatch } = this.props;
    const { planSaleId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'planSale/setOpening',
      payload: { planSaleId },
    }).then(() => {
      const {
        planSale: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已开始',
          });
        });

        this.reloadData();

        this.reloadByUrl();
      }

      this.setState({ processing: false });
    });
  };

  setOver = record => {
    const { dispatch } = this.props;
    const { planSaleId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'planSale/setOver',
      payload: { planSaleId },
    }).then(() => {
      const {
        planSale: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已完结',
          });
        });

        this.reloadData();

        this.reloadByUrl();
      }

      this.setState({ processing: false });
    });
  };

  removeConfirm = record => {
    const that = this;
    const { processing } = that.state;

    confirm({
      title: '移除预售设置',
      content: `确定要移除吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      confirmLoading: { processing },
      onOk() {
        that.remove(record);
      },
      onCancel() {},
    });
  };

  remove = record => {
    const { dispatch } = this.props;
    const { planSaleId } = record;

    this.setState({ processing: true });

    dispatch({
      type: 'planSale/remove',
      payload: { planSaleId },
    }).then(() => {
      const {
        planSale: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '预售已移除',
          });
        });

        this.reloadData();
      }

      this.setState({ processing: false });
    });
  };

  renderSimpleFormRow = () => {
    const { dataLoading, processing, dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            {this.renderSearchPlanSaleStateFormItem()}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(
            <>
              {this.checkAuthority(accessWayCollection.planSale.add) ? (
                <>
                  <Divider type="vertical" />
                  <Button
                    key="buttonPlus"
                    disabled={dataLoading || processing}
                    type="primary"
                    icon="plus"
                    onClick={() => {
                      this.showAddModal();
                    }}
                  >
                    新增预售
                  </Button>
                </>
              ) : null}
            </>,
            12,
          )}
        </Row>
      </>
    );
  };

  renderOther = () => {
    const { productId, currentPlanSaleId, addModalVisible, updateModalVisible } = this.state;

    return (
      <>
        <AddModal
          visible={addModalVisible}
          externalData={{ productId }}
          afterOK={() => {
            this.afterAddModalOk();
          }}
          afterCancel={() => {
            this.afterAddModalCancel();
          }}
        />
        <UpdateModal
          visible={updateModalVisible}
          externalData={{ planSaleId: currentPlanSaleId }}
          afterOK={() => {
            this.afterUpdateModalOk();
          }}
          afterCancel={() => {
            this.afterUpdateModalCancel();
          }}
        />
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.productName,
      dataIndex: 'productName',
      align: 'left',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.beginPlanSaleTime,
      dataIndex: 'beginPlanSaleTime',
      width: 180,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD HH:mm:ss')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.endPlanSaleTime,
      dataIndex: 'endPlanSaleTime',
      width: 180,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD HH:mm:ss')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.outTime,
      dataIndex: 'outTime',
      width: 140,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.planSaleId,
      dataIndex: 'planSaleId',
      width: 140,
      align: 'center',
      render: val => (
        <>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </>
      ),
    },
    {
      title: fieldData.state,
      dataIndex: 'state',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <Badge
            status={this.getPlanSaleStateBadgeStatus(val)}
            text={this.getPlanSaleStateName(val)}
          />
        </>
      ),
    },
    {
      title: fieldData.inTime,
      dataIndex: 'inTime',
      width: 180,
      fixed: 'right',
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD HH:mm:ss')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.showUpdateModal(record)}
            disabled={!this.checkAuthority(accessWayCollection.product.get)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {this.checkAuthority(accessWayCollection.planSale.setWait) &&
                record.state === 10 ? (
                  <Menu.Item key="setWait">
                    <Icon type="pause-circle" />
                    暂停
                  </Menu.Item>
                ) : null}

                {this.checkAuthority(accessWayCollection.planSale.setOpening) &&
                record.state === 0 ? (
                  <Menu.Item key="setOpening">
                    <Icon type="play-circle" />
                    开始
                  </Menu.Item>
                ) : null}

                {this.checkAuthority(accessWayCollection.planSale.setOver) &&
                record.state === 10 ? (
                  <Menu.Item key="setOver">
                    <Icon type="minus-circle" />
                    完结
                  </Menu.Item>
                ) : null}

                {this.checkAuthority(accessWayCollection.planSale.remove) && record.state === 0 ? (
                  <Menu.Item key="remove">
                    <Icon type="delete" />
                    移除
                  </Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Icon type="edit" />
            修改
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Index;
