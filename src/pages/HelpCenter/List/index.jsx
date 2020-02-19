import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { List, Tag, Card, BackTop } from 'antd';

import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import ArticleListContent from '@/customComponents/ArticleListContent';

const styles = './index.less';

const logo = '/logo.png';

@connect(({ areaHelpCategory, areaHelp, global, loading }) => ({
  areaHelpCategory,
  areaHelp,
  global,
  loading: loading.models.areaHelpCategory,
}))
class ArticleList extends PagerList {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '帮助条目',
        paramsKey: '00750d5f-e00d-498e-a55a-12a8d3b8b19d',
        loadApiPath: 'areaHelp/list',
        pageSize: 4,
        total: 0,
      },
    };
  }

  getApiData = props => {
    const {
      areaHelp: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { match } = this.props;
    const { params } = match;
    const { categoryId } = params;

    d.areaHelpCategoryId = categoryId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const {
      total,
      other: { areaHelpCategoryName },
    } = metaExtra;

    this.setState({
      total,
      pageName: areaHelpCategoryName,
    });
  };

  goToDetail = record => {
    const { match, dispatch } = this.props;
    const { params } = match;
    const { categoryId } = params;

    const { pageNo } = this.state;
    const { areaHelpId } = record;

    const location = {
      pathname: `/helpCenter/category/${categoryId}/detail/${areaHelpId}/${pageNo}`,
    };

    dispatch(routerRedux.push(location));
  };

  renderTable = () => {
    const { customData, dataLoading, pageSize, total } = this.state;

    const { list, pagination } = customData;

    const IconText = ({ type, text }) => (
      <span>
        <LegacyIcon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
      total,
      pageSize,
      onChange: page => {
        const params = {
          pageNo: page,
          pageSize,
        };

        this.loadData(params);
      },
    };

    return (
      <List
        size="large"
        className={styles.articleList}
        rowKey="areaHelpId"
        itemLayout="vertical"
        dataSource={list}
        loading={dataLoading}
        pagination={paginationProps}
        renderItem={item => (
          <List.Item
            key={item.areaHelpId}
            actions={[
              <IconText type="eye" text={item.accessCount} />,
              <IconText type="star-o" text={item.star} />,
              <IconText type="message" text={item.message} />,
            ]}
          >
            <List.Item.Meta
              title={
                <a
                  className={styles.listItemMetaTitle}
                  href={item.href}
                  onClick={() => this.goToDetail(item)}
                >
                  {item.title}
                </a>
              }
              description={
                <span>
                  {(item.tagList || []).map(o => (
                    <Tag key={`${item.areaHelpId}-${o}`}>{o}</Tag>
                  ))}
                </span>
              }
            />
            <ArticleListContent
              data={{
                content: item.description,
                updatedAt: item.inTime,
                avatar: logo,
                owner: item.author,
                href: 'http://www.yurukeji.cn',
              }}
            />
          </List.Item>
        )}
      />
    );
  };

  render() {
    const { pageName } = this.state;

    return (
      <Card title={pageName} bordered={false} className={styles.containorBox}>
        {this.renderTable()}
        <BackTop />
      </Card>
    );
  }
}

export default ArticleList;
