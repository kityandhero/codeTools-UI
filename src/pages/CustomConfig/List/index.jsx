import React from 'react';
import { connect } from 'dva';
import { List, Card, BackTop } from 'antd';
import { EyeOutlined, StockOutlined, MessageOutlined } from '@ant-design/icons';

import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import IconInfo from '@/customComponents/IconInfo';

const styles = './index.less';

@connect(({ customConfig, global, loading }) => ({
  customConfig,
  global,
  loading: loading.models.customConfig,
}))
class ArticleList extends PagerList {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '设置项：',
        paramsKey: '446d0048-94e9-40ee-9b8b-7f394bc94b09',
        loadApiPath: 'customConfig/list',
      },
    };
  }

  getApiData = props => {
    const {
      customConfig: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = o => {
    const d = o;

    const { match } = this.props;
    const { params } = match;
    const { category } = params;

    d.category = category;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const {
      total,
      other: { categoryName },
    } = metaExtra;

    this.setState({
      total,
      pageName: categoryName,
    });
  };

  renderTable = () => {
    const { metaListData, dataLoading } = this.state;

    return (
      <List
        size="large"
        className={styles.articleList}
        rowKey="customConfigId"
        itemLayout="vertical"
        dataSource={metaListData}
        loading={dataLoading}
        pagination={false}
        renderItem={item => (
          <List.Item
            key={item.customConfigId}
            actions={[
              <IconInfo text={item.accessCount}>
                <EyeOutlined />
              </IconInfo>,
              <IconInfo text={item.star}>
                <StockOutlined />
              </IconInfo>,
              <IconInfo text={item.message}>
                <MessageOutlined />
              </IconInfo>,
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
              description={<span>{item.description}</span>}
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
