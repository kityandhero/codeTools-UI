import React from 'react';
import { connect } from 'umi';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Spin, Empty, Card, Button, Divider } from 'antd';
import { CodeSandboxOutlined, CopyOutlined } from '@ant-design/icons';

import { copyToClipboard, isFunction, stringIsNullOrWhiteSpace } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import LoadDrawer from '@/customComponents/Framework/CustomForm/LoadDrawer';

import { fieldData } from '../Common/data';

import styles from './index.less';

@connect(({ dataTableGeneratorConfig, global, loading }) => ({
  dataTableGeneratorConfig,
  global,
  loading: loading.models.dataTableGeneratorConfig,
}))
class GenerateResultDrawer extends LoadDrawer {
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

    let list = [];

    if (metaData != null) {
      const modelContent = metaData.modelContent || '';
      const exampleContent = metaData.exampleContent || '';
      const mapperContent = metaData.mapperContent || '';
      const mappingXmlContent = metaData.mappingXmlContent || '';

      if (!stringIsNullOrWhiteSpace(modelContent)) {
        list.push({
          title: fieldData.modelContent.label,
          language: 'java',
          content: modelContent,
        });
      }

      if (!stringIsNullOrWhiteSpace(exampleContent)) {
        list.push({
          title: fieldData.exampleContent.label,
          language: 'java',
          content: exampleContent,
        });
      }

      if (!stringIsNullOrWhiteSpace(mapperContent)) {
        list.push({
          title: fieldData.mapperContent.label,
          language: 'java',
          content: mapperContent,
        });
      }

      if (!stringIsNullOrWhiteSpace(mappingXmlContent)) {
        list.push({
          title: fieldData.mappingXmlContent.label,
          language: 'java',
          content: mappingXmlContent,
        });
      }
    }

    list = list.map((o, index) => {
      const d = { ...{}, ...o };

      d.key = `list_${index}`;

      return d;
    });

    const lastIndex = list.length - 1;

    return (
      <div className={styles.containorBox}>
        <Spin spinning={dataLoading}>
          {list.map((o, index) => {
            return (
              <div key={o.key}>
                <Card
                  title={
                    <>
                      <CodeSandboxOutlined />
                      <span className={styles.codeContentTitle}> {o.title}</span>
                    </>
                  }
                  className={styles.card}
                  bodyStyle={{ padding: 0 }}
                  headStyle={{ padding: 0, minHeight: 34 }}
                  bordered={false}
                  extra={
                    <>
                      <Button
                        type="link"
                        style={{ paddingRight: 0 }}
                        onClick={() => {
                          copyToClipboard(o.content, false);
                        }}
                      >
                        <CopyOutlined />
                        复制到剪贴板
                      </Button>
                    </>
                  }
                >
                  <SyntaxHighlighter
                    language={o.language}
                    // style={docco}
                  >
                    {o.content}
                  </SyntaxHighlighter>
                </Card>
                {lastIndex !== index ? <Divider style={{ margin: '12px 0 7px 0' }} /> : null}
              </div>
            );
          })}
          {lastIndex === -1 ? <Empty /> : null}
        </Spin>
      </div>
    );
  };
}

export default GenerateResultDrawer;
