import React from 'react';
import { connect } from 'dva';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Form,
  Avatar, // Icon,
  Button, //   List,
  //    Tag,
  //     Divider,
  Card,
  BackTop,
} from 'antd';

import { formatDatetime } from '@/utils/tools';
import LoadDataForm from '@/customComponents/Framework/CustomForm/LoadDataForm';
import HtmlBox from '@/customComponents/HtmlBox';

const styles = './index.less';

const logo = '/logo.png';

@connect(({ areaHelp, global, loading }) => ({
  areaHelp,
  global,
  loading: loading.models.areaHelp,
}))
class ArticleContent extends LoadDataForm {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '帮助详情',
        loadApiPath: 'areaHelp/get',
        backPath: '/helpCenter/category/no/list',
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
    const { id } = params;

    d.areaHelpId = id;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const { areaHelpCategoryId } = metaData;

    this.setState({
      pageName: metaData.areaHelpCategoryName,
      backPath: `/helpCenter/category/${areaHelpCategoryId}/list`,
    });
  };

  pageHeaderAction = () => {
    const { backPath } = this.state;

    if ((backPath || '') === '') {
      return null;
    }

    return (
      <Button
        icon={<LegacyIcon type="rollback" />}
        size="small"
        onClick={e => {
          this.backToList(e);
        }}
      >
        列表页
      </Button>
    );
  };

  render() {
    const { pageName, metaData, dataLoading, loadSuccess } = this.state;

    return (
      <Card
        title={pageName}
        bordered={false}
        className={styles.containorBox}
        loading={dataLoading || !loadSuccess}
        extra={this.pageHeaderAction()}
      >
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          {metaData == null ? '' : metaData.title}
        </h2>
        <p
          style={{
            textAlign: 'center',
          }}
        >
          <Avatar src={logo} size="small" /> 发布与{' '}
          {metaData == null ? '' : formatDatetime(metaData.inTime, 'YYYY-MM-DD HH:mm', '')}
        </p>
        <div>
          <HtmlBox>{metaData == null ? '' : metaData.content}</HtmlBox>
        </div>
        <BackTop />
      </Card>
    );
  }
}

export default ArticleContent;
