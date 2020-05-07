import React from 'react';
import { connect } from 'umi';
import { Row, Col, Descriptions } from 'antd';
import { SnippetsOutlined } from '@ant-design/icons';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import DataTabContainer from '@/customComponents/Framework/DataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData } from '../Common/data';
import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ roleTemplate, global, loading }) => ({
  roleTemplate,
  global,
  loading: loading.models.roleTemplate,
}))
class Edit extends DataTabContainer {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'moduleInfo',
      tab: '所含模块',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '公用角色名：',
        loadApiPath: 'roleTemplate/get',
        backPath: `/permission/roleTemplate/pageList/key`,
        roleTemplateId: null,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { roleTemplateId } = this.state;

    d.roleTemplateId = roleTemplateId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.setState({
      pageName: `公用角色名：${metaData === null ? '' : metaData.name || ''}`,
    });
  };

  pageHeaderAvatar = () => {
    return { icon: <SnippetsOutlined /> };
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
      <Descriptions className={styles.headerList} size="small" column="2">
        <Description label={fieldData.roleTemplateId}>
          {metaData === null ? '' : metaData.roleTemplateId}
        </Description>
        <Description label={fieldData.moduleCount}>
          {metaData === null ? '' : metaData.moduleCount}
        </Description>
        <Description label={fieldData.channel}>
          {metaData === null ? '' : metaData.channelNote}
        </Description>
      </Descriptions>
    );
  };
}

export default Edit;
