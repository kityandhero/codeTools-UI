import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { List, Switch, BackTop, notification } from 'antd';

import {
  isArray,
  stringIsNullOrWhiteSpace,
  getDerivedStateFromPropsForUrlParams,
} from '../../../utils/tools';
import CustomAuthorization from '../../../customComponents/Framework/CustomAuthorization';

import { parseUrlParamsForSetState } from '../Assist/config';

const styles = './index.less';

@connect(({ customConfig, global, loading }) => ({
  customConfig,
  global,
  loading: loading.models.customConfig,
}))
class ArticleList extends CustomAuthorization {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        category: '',
        categoryName: '',
        pageName: '设置项：',
        paramsKey: '446d0048-94e9-40ee-9b8b-7f394bc94b09',
        loadApiPath: 'customConfig/list',
        loadDataAfterMount: false,
        dataLoading: false,
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
    const { category } = this.state;

    const { category: categoryPrev } = preState;

    if ((category || null) == null || (categoryPrev || null) == null) {
      return;
    }

    const { loadSuccess, dataLoading } = this.state;

    if (category !== categoryPrev) {
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

  doDidMountTask = () => {
    const { category: categoryPre, categoryName: categoryNamePre } = this.state;

    const customConfigCategoryList = this.getCustomConfigCategoryList();

    let category = categoryPre;
    let categoryName = categoryNamePre;

    if (stringIsNullOrWhiteSpace(categoryPre) || categoryPre === 'no') {
      if (isArray(customConfigCategoryList)) {
        (customConfigCategoryList || []).forEach((o, index) => {
          if (index === 0) {
            category = o.flag;
          }
        });
      }
    }

    if (isArray(customConfigCategoryList)) {
      (customConfigCategoryList || []).forEach(o => {
        if (o.flag === category) {
          categoryName = o.name;
        }
      });
    }

    if (stringIsNullOrWhiteSpace(category) || category === 'no') {
      router.replace(`/`);
    } else {
      this.setState({ category, categoryName });
    }
  };

  getApiData = props => {
    const {
      customConfig: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = o => {
    const d = o;

    const { category } = this.state;

    d.category = category;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    this.setState({
      total: (metaListData || []).length,
    });
  };

  onSwitchChange = (record, e) => {
    const { uuid } = record;

    this.setBooleanValue(uuid, e ? '1' : '0');
  };

  setBooleanValue = (uuid, value) => {
    const { dispatch } = this.props;

    this.setState({ processing: true });

    dispatch({
      type: 'customConfig/set',
      payload: {
        uuid,
        value,
      },
    }).then(() => {
      const data = this.getApiData(this.props);

      const { dataSuccess } = data;
      if (dataSuccess) {
        requestAnimationFrame(() => {
          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '数据已经成功提交，请稍后查看设置是否成功。',
          });
        });

        this.setState({ processing: false });

        this.reloadData();
      }
    });
  };

  renderTable = () => {
    const { metaListData, dataLoading } = this.state;

    return (
      <List
        size="large"
        className={styles.articleList}
        rowKey="uuid"
        dataSource={metaListData}
        loading={dataLoading}
        pagination={false}
        renderItem={item => (
          <List.Item
            key={item.uuid}
            actions={[
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                defaultChecked={item.value === '1'}
                onChange={e => {
                  this.onSwitchChange(item, e);
                }}
              />,
            ]}
          >
            <List.Item.Meta title={item.name} description={item.description} />
          </List.Item>
        )}
      />
    );
  };

  render() {
    return (
      <div className={styles.containorBox}>
        {this.renderTable()}
        <BackTop />
      </div>
    );
  }
}

export default ArticleList;
