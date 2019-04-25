import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Avatar, Button } from 'antd';

import {
  isInvalid,
  formatDatetime,
  searchFromList,
  refitCommonData,
  pretreatmentRequestParams,
} from '@/utils/tools';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapperCustom from '@/customComponents/PageHeaderWrapperCustom';

import styles from './index.less';

const { Description } = DescriptionList;

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
class Edit extends PureComponent {
  mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      metaData: null,
      dataLoading: true,
      // loadSuccess: false,
      accessWayId: null,
    };
  }

  componentDidMount() {
    this.mounted = true;

    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.setState({ accessWayId: id }, () => {
      this.loadData();
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { op, id },
      },
    } = nextProps;

    const { accessWayId: accessWayIdPre } = this.state;

    this.setState({ accessWayId: id }, () => {
      const { dataLoading } = this.state;
      if (!dataLoading) {
        if (op === 'update' || accessWayIdPre !== id) {
          this.loadData();

          const {
            dispatch,
            location: { pathname },
          } = this.props;

          dispatch(
            routerRedux.replace({
              pathname: `${pathname.replace('/update/', '/load/')}`,
            })
          );
        }
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    this.setState = () => {};
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
      }
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
      <PageHeaderWrapperCustom
        title={`模块描述：${metaData === null ? '' : metaData.message || ''}`}
        logo={
          <Avatar
            size="large"
            src={metaData === null ? '' : metaData.image || '/noImageSmall.png'}
          />
        }
        action={
          <Fragment>
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
          </Fragment>
        }
        customLoading={dataLoading}
        // eslint-disable-next-line no-restricted-globals
        tabActiveKey={location.hash.replace(`#${match.url}/`, '')}
        content={
          <DescriptionList className={styles.headerList} size="small" col="2">
            <Description term="数据标识">
              {metaData === null ? '' : metaData.accessWayId}
            </Description>
            <Description term="类型">{metaData === null ? '' : metaData.typeNote}</Description>
            <Description term="出现位置">
              {metaData === null ? '' : metaData.channelNote}
            </Description>
            <Description term="严重等级">
              {metaData === null ? '' : metaData.degreeNote}
            </Description>
            <Description term="是否发送通知">
              {metaData === null ? '' : metaData.sendNotification ? '不发送' : '发送'}
            </Description>
            <Description term="发送时间">
              {metaData === null
                ? ''
                : metaData.sendNotification
                ? metaData.sendTime || '--'
                : '--'}
            </Description>
          </DescriptionList>
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
      </PageHeaderWrapperCustom>
    );
  }
}

export default Edit;
