import React from 'react';
import { connect, history } from 'umi';
import { Row, Col, Card, Spin, message } from 'antd';
import { GridContent } from '@ant-design/pro-layout';

import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import DataLoad from '@/customComponents/Framework/DataSingleView/DataLoad';

import { parseUrlParamsForSetState } from './Assist/config';

import CategoryMenu from './CategoryMenu';

@connect(({ helpCategory, global, loading }) => ({
  helpCategory,
  global,
  loading: loading.models.helpCategory,
}))
class HelpCenter extends DataLoad {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '',
        loadApiPath: 'helpCategory/list',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { category: '' },
      parseUrlParamsForSetState,
    );
  }

  getApiData = (props) => {
    const {
      helpCategory: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const {
      urlParams: { helpCategoryId },
    } = this.state;

    if (helpCategoryId === 'no') {
      if ((metaListData || []).length === 0) {
        message.error('暂无帮助信息！');
      } else {
        const cid = metaListData[0].helpCategoryId;

        const location = {
          pathname: `/helpCenter/category/${cid}/pageList`,
        };

        history.replace(location);
      }
    }
  };

  goToList = (record) => {
    const { pageNo } = this.state;
    const { helpCategoryId } = record;

    const location = {
      pathname: `/helpCenter/detail/load/${helpCategoryId}/${pageNo}/basicInfo`,
    };

    history.push(location);
  };

  render() {
    const { children } = this.props;
    const {
      urlParams: { helpCategoryId },
      dataLoading,
      metaListData,
    } = this.state;

    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={5} md={24}>
            <Card title="帮助导航" bordered={false} style={{ marginBottom: 24 }}>
              <Spin delay={500} spinning={dataLoading}>
                <CategoryMenu currentCategoryId={helpCategoryId} menuData={metaListData || []} />
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
