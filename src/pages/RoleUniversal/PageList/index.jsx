import React from 'react';
import { connect } from 'umi';
import { Row, Col, Form, Icon, Dropdown, Menu } from 'antd';

import {
  toDatetime,
  formatDatetime,
  copyToClipboard,
  replaceTargetText,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import { unlimitedWithStringFlag } from '@/utils/constants';
import { constants } from '@/customConfig/config';
import MultiPage from '@/customComponents/Framework/DataMultiPageView/MultiPage';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ roleTemplate, global, loading }) => ({
  roleTemplate,
  global,
  loading: loading.models.roleTemplate,
}))
@Form.create()
class PageList extends MultiPage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '公用角色列表',
        paramsKey: '089b510e-345a-42fb-abc9-6cd2ced7b728',
        loadApiPath: 'roleTemplate/pageList',
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

  getApiData = (props) => {
    const {
      roleTemplate: { data },
    } = props;

    return data;
  };

  getRoleTemplateStateBadgeStatus = (v) => {
    let result = 'default';

    switch (v) {
      case 1:
        result = 'processing';
        break;
      case 0:
        result = 'default';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  goToEdit = (record) => {
    const { roleTemplateId } = record;

    this.goToPath(`/account/roleTemplate/edit/load/${roleTemplateId}/key/basicInfo`);
  };

  renderSimpleFormInitialValues = () => {
    const v = {};

    v[constants.channel.name] = unlimitedWithStringFlag.flag;

    return v;
  };

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={6} sm={24}>
            {this.renderSearchInput(fieldData.name.label, fieldData.name.name)}
          </Col>
          {this.renderSimpleFormButton(null, 12)}
        </Row>
      </>
    );
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 200,
      align: 'left',
      render: (val) => (
        <>
          <Ellipsis tooltip={{ placement: 'topLeft' }} lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      dataTarget: fieldData.description,
      align: 'center',
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      dataTarget: fieldData.moduleCount,
      width: 120,
      align: 'center',
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '0'}
          </Ellipsis>
        </>
      ),
    },
    {
      dataTarget: fieldData.roleUniversal,
      width: 120,
      align: 'center',
      render: (val) => (
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
      dataTarget: constants.channel,
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
      dataTarget: constants.createTime,
      width: 140,
      align: 'center',
      sorter: false,
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(toDatetime(val), 'YYYY-MM-DD HH:mm')}
          </Ellipsis>
        </>
      ),
    },
    {
      dataTarget: constants.customOperate,
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Dropdown.Button
            size="small"
            onClick={() => this.goToEdit(record)}
            overlay={
              <Menu onClick={(e) => this.handleMenuClick(e, record)}>
                {/* <Menu.Item key="remove">
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

export default PageList;
