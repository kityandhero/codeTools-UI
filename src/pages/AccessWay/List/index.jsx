import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Icon, Dropdown, Menu } from 'antd';

import { formatDatetime, copyToClipboard, replaceTargetText } from '@/utils/tools';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
@Form.create()
class Standard extends PagerList {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '模块列表',
        paramsKey: '3c7c3102-ad12-47b4-86ef-7d38c855bddc',
        loadApiPath: 'accessWay/list',
        dateRangeFieldName: '生成时段',
      },
    };
  }

  getApiData = props => {
    const {
      accessWay: { data },
    } = props;

    return data;
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
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={4} sm={24}>
            {this.renderSearchWebChannelFormItem(true)}
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
