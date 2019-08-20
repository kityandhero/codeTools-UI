import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Avatar, Button, Descriptions } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  isInvalid,
  formatDatetime,
  searchFromList,
  refitCommonData,
  pretreatmentRequestParams,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import { parseUrlParamsForSetState } from '../Assist/config';

import styles from './index.less';

const { Item: Description } = Descriptions;

const tabList = [
  {
    key: 'basicInfo',
    tab: '基本信息',
  },
  {
    key: 'paramInfo',
    tab: '参数信息',
  },
];

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class Edit extends LoadDataTabContainer {
  mounted = false;

  state = {
    metaData: null,
    dataLoading: true,
    // loadSuccess: false,
    accessWayId: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  resolveList = () => {
    const { global } = this.props;
    return refitCommonData(global.accessWayResolveList, {
      key: -10000,
      name: '不限',
      flag: -10000,
    });
  };

  getResolveName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.resolveList());
    return item == null ? '未知' : item.name;
  };

  loadData = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { accessWayId } = this.state;

      o.accessWayId = accessWayId;

      return o;
    });

    this.setState(
      {
        dataLoading: true,
        //  loadSuccess: false,
        metaData: null,
      },
      () => {
        dispatch({
          type: 'accessWay/get',
          payload: submitData,
        }).then(() => {
          if (this.mounted) {
            const {
              accessWay: { data },
            } = this.props;

            const { dataSuccess } = data;

            if (dataSuccess) {
              const { data: metaData } = data;

              this.setState({
                metaData,
                //  loadSuccess: dataSuccess
              });
            }

            this.setState({ dataLoading: false });
          }
        });
      },
    );
  };

  reloadData = () => {
    this.loadData();
  };

  handleTabChange = key => {
    const { dispatch, match } = this.props;
    let location = {};
    switch (key) {
      case 'basicInfo':
        location = {
          pathname: `${match.url.replace('/update', '/load')}/basicInfo`,
        };
        break;
      case 'paramInfo':
        location = {
          pathname: `${match.url.replace('/update', '/load')}/paramInfo`,
        };
        break;
      default:
        break;
    }

    dispatch(routerRedux.push(location));
  };

  backToList = () => {
    const { dispatch } = this.props;

    const location = {
      pathname: `/accessWay/list/key`,
    };

    dispatch(routerRedux.push(location));
  };

  render() {
    const { match, children } = this.props;
    const {
      metaData,
      dataLoading,
      // loadSuccess
    } = this.state;

    return (
      <PageHeaderWrapper
        title={`模块描述：${metaData === null ? '' : metaData.message || ''}`}
        logo={
          <Avatar
            size="large"
            src={metaData === null ? '' : metaData.image || '/noImageSmall.png'}
          />
        }
        action={
          <>
            <div className={styles.backButtonBox}>
              <Button
                icon="rollback"
                size="small"
                onClick={e => {
                  this.backToList(e);
                }}
              >
                列表页
              </Button>
            </div>
          </>
        }
        customLoading={dataLoading}
        // eslint-disable-next-line no-restricted-globals
        tabActiveKey={location.hash.replace(`#${match.url}/`, '')}
        content={
          <Descriptions className={styles.headerList} size="small" col="2">
            <Description label="数据标识">
              {metaData === null ? '' : metaData.accessWayId}
            </Description>
            <Description label="类型">{metaData === null ? '' : metaData.typeNote}</Description>
            <Description label="出现位置">
              {metaData === null ? '' : metaData.channelNote}
            </Description>
            <Description label="严重等级">
              {metaData === null ? '' : metaData.degreeNote}
            </Description>
            <Description label="是否发送通知">
              {metaData === null ? '' : metaData.sendNotification ? '不发送' : '发送'}
            </Description>
            <Description label="发送时间">
              {metaData === null
                ? ''
                : metaData.sendNotification
                ? metaData.sendTime || '--'
                : '--'}
            </Description>
          </Descriptions>
        }
        extraContent={
          <Row>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>发生日期</div>
              <div className={styles.heading}>
                {' '}
                {formatDatetime(metaData === null ? '' : metaData.createTime, 'HH:mm:ss', '--')}
                <br />
                {formatDatetime(metaData === null ? '' : metaData.createTime, 'YYYY-MM-DD')}
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>处理状态</div>
              <div className={styles.heading}>{metaData === null ? '' : metaData.resolveNote}</div>
            </Col>
          </Row>
        }
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default Edit;
