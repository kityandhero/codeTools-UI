import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { List, Tag, Card, BackTop } from 'antd';
import { EyeOutlined, StockOutlined, MessageOutlined } from '@ant-design/icons';

import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import IconInfo from '@/customComponents/IconInfo';
import ArticleListContent from '@/customComponents/ArticleListContent';

import { parseUrlParamsForSetState } from '../Assist/config';

import styles from './index.less';

const logo = '/logo.png';

@connect(({ helpCategory, help, global, loading }) => ({
  helpCategory,
  help,
  global,
  loading: loading.models.helpCategory,
}))
class ArticleList extends PagerList {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '帮助条目',
        paramsKey: '1ea077b5-e4a7-4985-9baf-14800efc9db4',
        loadApiPath: 'help/pageList',
        loadDataAfterMount: false,
        dataLoading: false,
        pageSize: 4,
        total: 0,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const {
      urlParams: { helpCategoryId },
    } = this.state;

    const {
      urlParams: { helpCategoryId: helpCategoryIdPrev },
    } = preState;

    if (
      (helpCategoryId || null) == null ||
      (helpCategoryIdPrev || null) == null ||
      (helpCategoryId || null) === 'no'
    ) {
      return;
    }

    const { loadSuccess, dataLoading } = this.state;

    if (helpCategoryId !== helpCategoryIdPrev) {
      if (!dataLoading) {
        this.reloadData();
      }
    }

    if (!loadSuccess) {
      if (!dataLoading) {
        this.reloadData();
      }
    }
  };

  // doDidMountTask = () => {
  //   const { category: categoryPre, categoryName: categoryNamePre } = this.state;

  //   const customConfigCategoryList = this.getCustomConfigCategoryList();

  //   let category = categoryPre;
  //   let categoryName = categoryNamePre;

  //   if (stringIsNullOrWhiteSpace(categoryPre) || categoryPre === 'no') {
  //     if (isArray(customConfigCategoryList)) {
  //       (customConfigCategoryList || []).forEach((o, index) => {
  //         if (index === 0) {
  //           category = o.flag;
  //         }
  //       });
  //     }
  //   }

  //   if (isArray(customConfigCategoryList)) {
  //     (customConfigCategoryList || []).forEach(o => {
  //       if (o.flag === category) {
  //         categoryName = o.name;
  //       }
  //     });
  //   }

  //   if (stringIsNullOrWhiteSpace(category) || category === 'no') {
  //     router.replace(`/`);
  //   } else {
  //     this.setState({ category, categoryName });
  //   }
  // };

  getApiData = (props) => {
    const {
      help: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;

    const {
      urlParams: { helpCategoryId },
    } = this.state;

    d.helpCategoryId = helpCategoryId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const {
      total,
      other: { helpCategoryName },
    } = metaExtra;

    this.setState({
      total,
      pageName: helpCategoryName,
    });
  };

  goToDetail = (record) => {
    const {
      urlParams: { helpCategoryId },
    } = this.state;

    const { pageNo } = this.state;
    const { helpId } = record;

    const location = {
      pathname: `/helpCenter/category/${helpCategoryId}/detail/${helpId}/${pageNo}`,
    };

    history.push(location);
  };

  renderTable = () => {
    const { metaOriginalData, dataLoading, pageSize, total } = this.state;

    const { list, pagination } = metaOriginalData || { list: [], pagination: {} };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
      total,
      pageSize,
      onChange: (page) => {
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
        rowKey="helpId"
        itemLayout="vertical"
        dataSource={list}
        loading={dataLoading}
        pagination={paginationProps}
        renderItem={(item) => (
          <List.Item
            key={item.helpId}
            actions={[
              <IconInfo icon={<EyeOutlined />} text={item.accessCount} />,
              <IconInfo icon={<StockOutlined />} text={item.star} />,
              <IconInfo icon={<MessageOutlined />} text={item.message} />,
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
                  {(item.tagList || []).map((o) => (
                    <Tag key={`${item.helpId}-${o}`}>{o}</Tag>
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
