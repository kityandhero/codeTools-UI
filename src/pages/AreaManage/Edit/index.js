import React from 'react';
import { connect } from 'dva';

import { Row, Col } from 'antd';

import { refitCommonData, isInvalid, searchFromList, formatDatetime } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import LoadDataTabContainer from '@/customComponents/CustomForm/LoadDataTabContainer';
import DescriptionList from '@/components/DescriptionList';

import { fieldData } from '../Common/data';
import styles from './index.less';

const { Description } = DescriptionList;

@connect(({ areaManage, global, loading }) => ({
  areaManage,
  global,
  loading: loading.models.areaManage,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.areaManage.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.areaManage.get),
      tab: '基本信息',
    },
    {
      key: 'roleInfo',
      show: this.checkAuthority(accessWayCollection.userRole.changeRole),
      tab: '设置角色',
    },
    {
      key: 'resetPassword',
      show: this.checkAuthority(accessWayCollection.areaManage.resetPassword),
      tab: '重置密码',
    },
  ];

  getApiData = props => {
    const {
      areaManage: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      areaManageId: id,
      pageName: '账户名：',
      loadApiPath: 'areaManage/get',
      backPath: `/permission/areaManage/list/key`,
    };

    return result;
  };

  checkNeedUpdate = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    const { areaManageId: areaManageIdPre } = this.state;

    return areaManageIdPre !== id;
  };

  getStateNeedSetWillReceive = nextProps => {
    const {
      match: {
        params: { id },
      },
    } = nextProps;

    return { areaManageId: id };
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { areaManageId } = this.state;

    d.areaManageId = areaManageId;

    return d;
  };

  afterLoadSuccess = metaData => {
    const { name } = metaData;

    this.setState({ pageName: `账户名：${name}` });
  };

  areaManageStateList = () => {
    const { global } = this.props;

    return refitCommonData(global.areaManageStateList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getAreaManageStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.areaManageStateList());
    return item == null ? '未知' : item.name;
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>{fieldData.inTime}</div>
          <div className={styles.heading}>
            {' '}
            {formatDatetime(metaData === null ? '' : metaData.inTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.inTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>{fieldData.state}</div>
          <div className={styles.heading}>
            {metaData === null ? '' : this.getAreaManageStateName(metaData.state)}
          </div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    return (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term={fieldData.areaManageId}>
          {metaData === null ? '' : metaData.areaManageId}
        </Description>
        <Description term={fieldData.name}>{metaData === null ? '' : metaData.name}</Description>
        <Description term={fieldData.phone}>{metaData === null ? '' : metaData.phone}</Description>
      </DescriptionList>
    );
  };
}

export default Edit;
