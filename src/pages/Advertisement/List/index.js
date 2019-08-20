import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Form,
  Input,
  Icon,
  Dropdown,
  Menu,
  Button,
  Divider,
  notification,
  Modal,
  Select,
} from 'antd';
import moment from 'moment';

import {
  buildFieldDescription,
  pretreatmentRequestParams,
  copyToClipboard,
  replaceTargetText,
  refitCommonData,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';
import ImageBox from '@/customComponents/ImageBox';
import defaultSettings from '../../../../config/defaultSettings';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;
const { confirm } = Modal;

@connect(({ advertisement, global, loading }) => ({
  advertisement,
  global,
  loading: loading.models.advertisement,
}))
@Form.create()
class List extends PagerList {
  componentAuthority = accessWayCollection.advertisement.list;

  getApiData = props => {
    const {
      advertisement: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageSize: 8,
    pageName: '广告列表',
    paramsKey: '986e280b-a385-47c5-b70c-d7c9e789758f',
    loadApiPath: 'advertisement/list',
  });

  advertisementClassList = () => {
    const { global } = this.props;
    return refitCommonData(global.advertisementClassList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  removeConfirm = record => {
    const that = this;
    const { processing } = that.state;

    confirm({
      title: '删除广告',
      content: `确定要删除广告 ${record == null ? '' : record.title} 吗？`,
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

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      o.advertisementId = record.advertisementId;

      return o;
    });

    this.setState({ processing: true });

    dispatch({
      type: 'advertisement/remove',
      payload: submitData,
    }).then(() => {
      const {
        advertisement: { data },
      } = this.props;

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '数据已经删除成功，请进行后续操作。',
          });
        });

        this.setState({ processing: false });
        this.refreshGrid();
      }
    });
  };

  goToAdd = () => {
    const { dispatch } = this.props;
    const location = {
      pathname: `/advertisement/add`,
    };
    dispatch(routerRedux.push(location));
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { pageNo } = this.state;
    const { advertisementId } = record;
    const location = {
      pathname: `/advertisement/edit/load/${advertisementId}/${pageNo}/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  handleMenuClick = (e, record) => {
    const { key } = e;

    switch (key) {
      case 'delete':
        this.removeConfirm(record);
        break;
      default:
        break;
    }
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { dataLoading, processing } = this.state;
    const { getFieldDecorator } = form;

    const advertisementClassData = this.advertisementClassList();
    const advertisementClassOption = [];

    advertisementClassData.forEach(item => {
      const { name, flag } = item;
      advertisementClassOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            <FormItem label={fieldData.keywords}>
              {getFieldDecorator('keywords')(
                <Input
                  addonBefore={<Icon type="form" />}
                  placeholder={buildFieldDescription(fieldData.keywords)}
                />,
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label={fieldData.classId}>
              {getFieldDecorator('classId', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.classId, '选择') },
                ],
                initialValue: advertisementClassData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.classId, '选择')}
                  style={{ width: '100%' }}
                >
                  {advertisementClassOption}
                </Select>,
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormButton(
            this.checkAuthority(accessWayCollection.advertisement.add) ? (
              <>
                <Divider type="vertical" />
                <Button
                  key="buttonPlus"
                  disabled={dataLoading || processing}
                  type="primary"
                  icon="plus"
                  onClick={this.goToAdd}
                >
                  新增广告
                </Button>
              </>
            ) : null,
            6,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.title,
      dataIndex: 'title',
      width: 220,
      align: 'left',
    },
    {
      title: fieldData.imageUrl,
      dataIndex: 'imageUrl',
      width: 80,
      align: 'center',
      render: val => (
        <>
          <div className={styles.imgBox}>
            <ImageBox
              src={val || defaultSettings.defaultEmptyImage}
              aspectRatio={0.46}
              loadingEffect
              errorOverlayVisible
              alt=""
            />
          </div>
        </>
      ),
    },
    {
      title: fieldData.className,
      dataIndex: 'className',
      width: 220,
      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: fieldData.url,
      dataIndex: 'url',

      align: 'center',
      render: val => <>{val || '--'}</>,
    },
    {
      title: fieldData.sort,
      dataIndex: 'sort',
      width: 100,
      align: 'center',
    },
    {
      title: fieldData.advertisementId,
      dataIndex: 'advertisementId',
      width: 120,
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
      title: fieldData.inTime,
      dataIndex: 'inTime',
      width: 120,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip advertisements={1}>
            {(val || '') === ''
              ? '--'
              : moment(new Date(val.replace('/', '-'))).format('YYYY-MM-DD')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.operate,
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToEdit(record)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                <Menu.Item key="delete">
                  <Icon type="delete" />
                  删除
                </Menu.Item>
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

export default List;
