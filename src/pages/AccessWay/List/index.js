import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Select, Icon, Dropdown, Menu } from 'antd';

import {
  isInvalid,
  formatDatetime,
  searchFromList,
  refitCommonData,
  buildFieldDescription,
  copyToClipboard,
  replaceTargetText,
} from '@/utils/tools';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

const FormItem = Form.Item;

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
@Form.create()
class Standard extends PagerList {
  getApiData = props => {
    const {
      accessWay: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '模块列表',
    paramsKey: '3c7c3102-ad12-47b4-86ef-7d38c855bddc',
    loadApiPath: 'accessWay/list',
    dateRangeFieldName: '生成时段',
  });

  webChannelList = () => {
    const { global } = this.props;
    return refitCommonData(global.webChannelList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getWebChannelName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.webChannelList());
    return item == null ? '未知' : item.name;
  };

  goToEdit = record => {
    const { dispatch } = this.props;
    const { accessWayId } = record;
    const location = {
      pathname: `/permission/accessWay/edit/load/${accessWayId}/key/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  renderSimpleFormRow = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { dateRangeFieldName } = this.state;

    const webChannelData = this.webChannelList();
    const webChannelOption = [];

    webChannelData.forEach(item => {
      const { name, flag } = item;
      webChannelOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            <FormItem label={fieldData.channel}>
              {getFieldDecorator('channel', {
                rules: [
                  { required: false, message: buildFieldDescription(fieldData.channel, '选择') },
                ],
                initialValue: webChannelData[0].flag,
              })(
                <Select
                  placeholder={buildFieldDescription(fieldData.channel, '选择')}
                  style={{ width: '100%' }}
                >
                  {webChannelOption}
                </Select>
              )}
            </FormItem>
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 8)}
          {this.renderSimpleFormButton(null, 4)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '模块名称',
      dataIndex: 'name',
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
      title: 'Url路径',
      dataIndex: 'relativePath',
      width: 300,
      align: 'left',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '模块标识',
      dataIndex: 'guidTag',
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
      title: '分支权限',
      dataIndex: 'expand',
      width: 340,
      align: 'center',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    // {
    //   title: '标识',
    //   dataIndex: 'accessWayId',
    //   width: 120,
    //   align: 'center',
    //   render: val => (
    //     <>
    //       <EllipsisCustom
    //         tooltip
    //         lines={1}
    //         removeChildren
    //         extraContent={
    //           <>
    //             <a
    //               onClick={() => {
    //                 copyToClipboard(val);
    //               }}
    //             >
    //               {replaceTargetText(val, '***', 2, 6)}
    //             </a>
    //           </>
    //         }
    //       >
    //         {val} [点击复制]
    //       </EllipsisCustom>
    //     </>
    //   ),
    // },
    {
      title: '生成时间',
      dataIndex: 'createTime',
      width: 140,
      align: 'center',
      sorter: false,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '发生地点',
      dataIndex: 'channel',
      width: 160,
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {record.channelNote}
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
            onClick={() => this.goToEdit(record)}
            overlay={
              <Menu onClick={e => this.handleMenuClick(e, record)}>
                {/* <Menu.Item key="1">
                    <Icon type="delete" />
                    删除
                  </Menu.Item> */}
              </Menu>
            }
          >
            <Icon type="read" />
            详情
          </Dropdown.Button>
        </>
      ),
    },
  ];
}

export default Standard;
