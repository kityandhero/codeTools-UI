import React from 'react';
import { connect } from 'dva';

import { Row, Col } from 'antd';

import { formatDatetime } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/CustomForm/LoadDataTabContainer';
import DescriptionList from '@/components/DescriptionList';

import { fieldData } from '../Common/data';
import styles from './index.less';

const { Description } = DescriptionList;

@connect(({ role, global, loading }) => ({
  role,
  global,
  loading: loading.models.role,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.role.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.role.get),
      tab: '基本信息',
    },
    {
      key: 'moduleInfo',
      show: this.checkAuthority(accessWayCollection.role.get),
      tab: '所含模块',
    },
  ];

  getApiData = props => {
    const {
      role: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      roleId: id,
      pageName: '角色名：',
      loadApiPath: 'role/get',
      backPath: `/account/role/list/key`,
    };

    return result;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { roleId: roleIdPre } = this.state;

    return roleIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { roleId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { roleId } = this.state;

    d.roleId = roleId;

    return d;
  };

  afterLoadSuccess = metaData => {
    const { name } = metaData;

    this.setState({ pageName: `角色名：${name}` });
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>{fieldData.createTime}</div>
          <div className={styles.heading}>
            {' '}
            {formatDatetime(metaData === null ? '' : metaData.createTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.createTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>{fieldData.state}</div>
          <div className={styles.heading}>{metaData === null ? '' : metaData.stateNote}</div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term={fieldData.roleId}>
          {metaData === null ? '' : metaData.roleId}
        </Description>
        <Description term={fieldData.moduleCount}>
          {metaData === null ? '' : metaData.moduleCount}
        </Description>
        <Description term={fieldData.type}>
          {metaData === null
            ? ''
            : (metaData.roleTemplateId || '') === ''
            ? '自主建立'
            : '系统内置'}
        </Description>
      </DescriptionList>
    );
  };
}

export default Edit;
