import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Card, Spin, message } from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import LoadDataForm from '@/customComponents/CustomForm/LoadDataForm';

import CategoryMenu from './CategoryMenu';

@connect(({ areaHelpCategory, global, loading }) => ({
  areaHelpCategory,
  global,
  loading: loading.models.areaHelpCategory,
}))
class HelpCenter extends LoadDataForm {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      menuData: [],
    };
  }

  getApiData = props => {
    const {
      areaHelpCategory: { data },
    } = props;

    return data;
  };

  initState = () => ({
    pageName: '',
    loadApiPath: 'areaHelpCategory/getMenu',
  });

  afterLoadSuccess = metaData => {
    const { menu } = metaData;

    this.setState({ menuData: menu });

    const { match } = this.props;
    const { params } = match;
    const { categoryId } = params;

    if (categoryId === 'no') {
      if ((menu || []).length === 0) {
        message.error('暂无帮助信息！');
      } else {
        const cid = menu[0].areaHelpCategoryId;

        const { dispatch } = this.props;

        const location = {
          pathname: `/helpCenter/category/${cid}/list`,
        };

        dispatch(routerRedux.replace(location));
      }
    }
  };

  goToList = record => {
    const { dispatch } = this.props;
    const { pageNo } = this.state;
    const { areaHelpCategoryId } = record;
    const location = {
      pathname: `/helpCenter/detail/load/${areaHelpCategoryId}/${pageNo}/basicInfo`,
    };
    dispatch(routerRedux.push(location));
  };

  render() {
    const { match, children } = this.props;
    const { params } = match;
    const { categoryId } = params;
    const { dataLoading, menuData } = this.state;

    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={5} md={24}>
            <Card title="帮助导航" bordered={false} style={{ marginBottom: 24 }}>
              <Spin spinning={dataLoading}>
                <CategoryMenu currentCategoryId={categoryId} menuData={menuData || []} />
              </Spin>
            </Card>
          </Col>
          <Col lg={19} md={24}>
            {children}
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default HelpCenter;
