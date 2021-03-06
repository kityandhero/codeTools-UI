import React from 'react';
import { connect } from 'umi';
import { Spin, Empty, Card, Button, Divider } from 'antd';
import { CodeSandboxOutlined, CopyOutlined } from '@ant-design/icons';

import { copyToClipboard, isFunction, stringIsNullOrWhiteSpace } from '@/utils/tools';
import accessWayCollection from '@/customConfig/accessWayCollection';
import BaseLoadDrawer from '@/customComponents/Framework/DataDrawer/BaseLoadDrawer';

import { fieldData } from '../Common/data';

import styles from './index.less';

@connect(({ dataTableGeneratorConfig, global, loading }) => ({
  dataTableGeneratorConfig,
  global,
  loading: loading.models.dataTableGeneratorConfig,
}))
class GenerateResultDrawer extends BaseLoadDrawer {
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
      const serviceContent = metaData.serviceContent || '';
      const serviceImplContent = metaData.serviceImplContent || '';
      const mappingXmlContent = metaData.mappingXmlContent || '';
      const controllerContent = metaData.controllerContent || '';

      if (!stringIsNullOrWhiteSpace(modelContent)) {
        list.push({
          dataTarget: fieldData.modelContent.label,
          language: 'java',
          content: modelContent,
        });
      }

      if (!stringIsNullOrWhiteSpace(exampleContent)) {
        list.push({
          dataTarget: fieldData.exampleContent.label,
          language: 'java',
          content: exampleContent,
        });
      }

      if (!stringIsNullOrWhiteSpace(mapperContent)) {
        list.push({
          dataTarget: fieldData.mapperContent.label,
          language: 'java',
          content: mapperContent,
        });
      }

      if (!stringIsNullOrWhiteSpace(serviceContent)) {
        list.push({
          dataTarget: fieldData.serviceContent.label,
          language: 'java',
          content: serviceContent,
        });
      }

      if (!stringIsNullOrWhiteSpace(serviceImplContent)) {
        list.push({
          dataTarget: fieldData.serviceImplContent.label,
          language: 'java',
          content: serviceImplContent,
        });
      }

      if (!stringIsNullOrWhiteSpace(mappingXmlContent)) {
        list.push({
          dataTarget: fieldData.mappingXmlContent.label,
          language: 'java',
          content: mappingXmlContent,
        });
      }

      if (!stringIsNullOrWhiteSpace(controllerContent)) {
        list.push({
          dataTarget: fieldData.controllerContent.label,
          language: 'java',
          content: controllerContent,
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
                          copyToClipboard(o.content, false, o.title);
                        }}
                      >
                        <CopyOutlined />
                        复制到剪贴板
                      </Button>
                    </>
                  }
                >
                  {this.renderSyntaxHighlighter(o.language, o.content)}
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
