import React from 'react';
import { connect } from 'dva';

import { Row, Col, Descriptions } from 'antd';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData } from '../Common/data';

import styles from './index.less';

const { Item: Description } = Descriptions;

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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '角色名：',
        loadApiPath: 'role/get',
        backPath: '/account/role/list/key',
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
      role: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { roleId } = this.state;

    d.roleId = roleId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
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
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label={fieldData.roleId}>
          {metaData === null ? '' : metaData.roleId}
        </Description>
        <Description label={fieldData.moduleCount}>
          {metaData === null ? '' : metaData.moduleCount}
        </Description>
        <Description label={fieldData.type}>
          {metaData === null
            ? ''
            : (metaData.roleTemplateId || '') === ''
            ? '自主建立'
            : '系统内置'}
        </Description>
      </Descriptions>
    );
  };
}

export default Edit;
