import React from 'react';
import { connect } from 'dva';
import { Row, Col, Avatar, Descriptions } from 'antd';

import { formatDatetime, getDerivedStateFromPropsForUrlParams } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import LoadDataTabContainer from '../../../customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData } from '../Common/data';

import styles from './index.less';

const { Item: Description } = Descriptions;

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class Edit extends LoadDataTabContainer {
  componentAuthority = accessWayCollection.accessWay.get;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.accessWay.get),
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '名称：',
        loadApiPath: 'accessWay/get',
        backPath: `/accessWay/list/key`,
        accessWayId: null,
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
      accessWay: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { accessWayId } = this.state;

    d.accessWayId = accessWayId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.setState({
      pageName: `名称：${metaData === null ? '' : metaData.name || ''}`,
    });
  };

  pageHeaderLogo = () => {
    const { metaData } = this.state;

    return (
      <Avatar
        size="large"
        src={metaData === null ? '' : metaData.imageUrl || '/noImageSmall.png'}
      />
    );
  };

  pageHeaderExtraContent = () => {
    const { metaData } = this.state;

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>创建日期</div>
          <div className={styles.heading}>
            {formatDatetime(metaData === null ? '' : metaData.createTime, 'HH:mm:ss', '--')}
            <br />
            {formatDatetime(metaData === null ? '' : metaData.createTime, 'YYYY-MM-DD')}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>当前状态</div>
          <div className={styles.heading}>正常</div>
        </Col>
      </Row>
    );
  };

  pageHeaderContent = () => {
    const { metaData } = this.state;

    const list = [];

    list.push({
      label: fieldData.accessWayId,
      value: metaData === null ? '' : metaData.accessWayId,
    });

    list.push({
      label: fieldData.tag,
      value: metaData === null ? '' : metaData.tag,
    });

    list.push({
      label: fieldData.createTime,
      value: metaData === null ? '' : metaData.createTime,
    });

    const dataList = list.map((o, index) => {
      const d = { ...{}, ...o };

      d.key = `item_${index}`;

      return d;
    });

    return (
      <Descriptions className={styles.headerList} size="small" column="2">
        {dataList.map(item => {
          return (
            <Description key={item.key} label={item.label}>
              {item.value}
            </Description>
          );
        })}
      </Descriptions>
    );
  };
}

export default Edit;
