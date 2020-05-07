import React from 'react';
import { connect } from 'umi';
import { Avatar, Button, Card, BackTop } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import { formatDatetime } from '@/utils/tools';
import DataLoad from '@/customComponents/Framework/DataSingleView/DataLoad';
import HtmlBox from '@/customComponents/HtmlBox';

const styles = './index.less';

const logo = '/logo.png';

@connect(({ help, global, loading }) => ({
  help,
  global,
  loading: loading.models.help,
}))
class Detail extends DataLoad {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '帮助详情',
        loadApiPath: 'help/get',
        backPath: '/helpCenter/category/no/pageList',
      },
    };
  }

  getApiData = (props) => {
    const {
      help: { data },
    } = props;

    return data;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    d.helpId = id;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const { helpCategoryId } = metaData;

    this.setState({
      pageName: metaData.helpCategoryName,
      backPath: `/helpCenter/category/${helpCategoryId}/pageList`,
    });
  };

  pageHeaderAction = () => {
    const { backPath } = this.state;

    if ((backPath || '') === '') {
      return null;
    }

    return (
      <Button
        icon={<RollbackOutlined />}
        size="small"
        onClick={(e) => {
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

export default Detail;
