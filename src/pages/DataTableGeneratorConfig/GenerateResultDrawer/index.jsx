import React from 'react';
import { connect } from 'umi';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Spin, Divider } from 'antd';

import { isFunction } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import LoadDrawer from '@/customComponents/Framework/CustomForm/LoadDrawer';

import styles from './index.less';

@connect(({ dataTableGeneratorConfig, global, loading }) => ({
  dataTableGeneratorConfig,
  global,
  loading: loading.models.dataTableGeneratorConfig,
}))
class Index extends LoadDrawer {
  componentAuthority = accessWayCollection.dataTable.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        loadDataAfterMount: false,
        pageName: '生成结果',
        loadApiPath: 'dataTableGeneratorConfig/get',
        placement: 'left',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  getApiData = (props) => {
    const {
      dataTableGeneratorConfig: { data },
    } = props;

    return data;
  };

  getDataTableGeneratorConfigIdFromExternalData = () => {
    const { externalData } = this.state;

    let dataTableGeneratorConfigId = '';

    if ((externalData || null) != null) {
      dataTableGeneratorConfigId = externalData.dataTableGeneratorConfigId || '';
    }

    return dataTableGeneratorConfigId;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;

    d.dataTableGeneratorConfigId = this.getDataTableGeneratorConfigIdFromExternalData();

    return d;
  };

  onClose = () => {
    const { afterClose } = this.props;

    if (isFunction(afterClose)) {
      afterClose();
    }
  };

  renderTitle = () => {
    return '生成结果展示';
  };

  formContent = () => {
    const { dataLoading, metaData } = this.state;

    return (
      <div className={styles.containorBox}>
        <Spin spinning={dataLoading}>
          <SyntaxHighlighter
            language="java"
            // style={docco}
          >
            {metaData == null ? '' : metaData.modelContent || ''}
          </SyntaxHighlighter>
          <Divider />
          <SyntaxHighlighter
            language="java"
            // style={docco}
          >
            {metaData == null ? '' : metaData.mapperContent || ''}
          </SyntaxHighlighter>
          <Divider />
          <SyntaxHighlighter
            language="xml"
            // style={docco}
          >
            {metaData == null ? '' : metaData.xmlContent || ''}
          </SyntaxHighlighter>
        </Spin>
      </div>
    );
  };
}

export default Index;
