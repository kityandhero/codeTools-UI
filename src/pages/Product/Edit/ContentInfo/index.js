import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Spin, Button, BackTop, Affix } from 'antd';

// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import accessWayCollection from '@/utils/accessWayCollection';

import TabPageBase from '../../TabPageBase';

import styles from './index.less';

@connect(({ product, loading }) => ({
  product,
  loading: loading.models.product,
}))
@Form.create()
class ContentInfo extends TabPageBase {
  componentAuthority = accessWayCollection.product.get;

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      productId: null,
      editorState: null,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      productId: id,
      loadApiPath: 'product/get',
      submitApiPath: 'product/updateContentInfo',
    };

    return result;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { editorState, productId } = this.state;
    const content = editorState.toHTML();

    d.productId = productId;
    d.content = content;
    d.ajax = 1;

    return d;
  };

  afterLoadSuccess = d => {
    const { content } = d;

    this.setState({
      editorState: BraftEditor.createEditorState(content),
    });
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  formContent = () => {
    const { loading } = this.props;
    const { loadSuccess, editorState, processing, dataLoading } = this.state;

    return (
      <Fragment>
        <Card
          title={
            <span>
              详情信息
              <span className={styles.help}>（离开页面前请先保存，以免丢失编辑好的数据！）</span>
            </span>
          }
          className={styles.containorBox}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              {this.checkAuthority(accessWayCollection.product.updateContentInfo) ? (
                <Button
                  type="primary"
                  icon="save"
                  disabled={dataLoading || processing || !loadSuccess}
                  onClick={this.validate}
                  loading={processing}
                >
                  保存
                </Button>
              ) : null}
            </Affix>
          }
        >
          <Spin spinning={loading || dataLoading || processing}>
            <div
              style={{
                border: '1px solid #ccc',
              }}
            >
              <BraftEditor
                placeholder="请在此编辑您所需要的内容！"
                value={editorState}
                onChange={this.handleEditorChange}
              />
            </div>
          </Spin>
        </Card>
        <BackTop />
      </Fragment>
    );
  };
}

export default ContentInfo;
