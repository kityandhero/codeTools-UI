import React from 'react';
import { connect } from 'dva';
import { Card, Affix, Row, Col, Spin } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { getDerivedStateFromPropsForUrlParams, formatDatetime } from '@/utils/tools';
import { errorLogDataType } from '@/utils/constants';
import { constants } from '@/customConfig/config';
import accessWayCollection from '@/customConfig/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

@connect(({ errorLog, global, loading }) => ({
  errorLog,
  global,
  loading: loading.models.errorLog,
}))
class Index extends TabPageBase {
  componentAuthority = accessWayCollection.errorLog.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'errorLog/get',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  buildInitialValues = (metaData) => {
    const values = {};

    if (metaData != null) {
      values[constants.channelNote.name] = metaData.channelNote || '';
      values[constants.createTime.name] =
        formatDatetime(metaData.createTime, 'YYYY-MM-DD HH:mm') || '';
      values[constants.updateTime.name] =
        formatDatetime(metaData.updateTime, 'YYYY-MM-DD HH:mm') || '';
    }

    return values;
  };

  getFormLayout = () => {
    return 'horizontal';
  };

  renderBasicInfoTitleText = () => {
    return 'Get参数';
  };

  formContent = () => {
    const { dataLoading, processing, metaData } = this.state;

    return (
      <>
        <Card
          title={this.renderBasicInfoTitle()}
          className={styles.card}
          bordered={false}
          bodyStyle={{ paddingBottom: 0 }}
          extra={
            <Affix offsetTop={20}>
              <div>{this.renderRefreshButton()}</div>
            </Affix>
          }
        >
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col span={24}>
                {this.renderFormDisplayFormItem(
                  fieldData.requestQueryString.label,
                  metaData == null ? '无' : metaData.requestQueryString || '无',
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card title="请求头信息" className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col span={24}>
                {metaData === null ? null : (
                  <SyntaxHighlighter
                    language="javascript"
                    // style={docco}
                  >
                    {JSON.stringify(metaData.headerJson || '', null, '    ')}
                  </SyntaxHighlighter>
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card title="请求参数" className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col span={24}>
                {metaData === null ? null : (
                  <SyntaxHighlighter
                    language="javascript"
                    // style={docco}
                  >
                    {JSON.stringify(metaData.requestParamsJson || '', null, '    ')}
                  </SyntaxHighlighter>
                )}
              </Col>
            </Row>
          </Spin>
        </Card>

        {metaData === null ? null : (
          <>
            {metaData.dataType === errorLogDataType.jsonObject.flag ? (
              <Card
                title="附加数据"
                className={styles.card}
                extra={`数据类型：${errorLogDataType.jsonObject.name}`}
                bordered={false}
              >
                <Spin spinning={dataLoading || processing}>
                  <Row gutter={24}>
                    <Col span={24}>
                      {metaData === null ? null : (
                        <SyntaxHighlighter
                          language="javascript"
                          // style={docco}
                        >
                          {JSON.stringify(metaData.headerJson || '', null, '    ')}
                        </SyntaxHighlighter>
                      )}
                    </Col>
                  </Row>
                </Spin>
              </Card>
            ) : null}

            {metaData.dataType === errorLogDataType.JsonObjectList.flag ? (
              <Card
                title="附加数据"
                className={styles.card}
                extra={`数据类型：${errorLogDataType.JsonObjectList.name}`}
                bordered={false}
              >
                <Spin spinning={dataLoading || processing}>
                  <Row gutter={24}>
                    <Col span={24}>
                      {metaData === null ? null : (
                        <SyntaxHighlighter
                          language="javascript"
                          // style={docco}
                        >
                          {JSON.stringify(metaData.headerJson || '', null, '    ')}
                        </SyntaxHighlighter>
                      )}
                    </Col>
                  </Row>
                </Spin>
              </Card>
            ) : null}

            {metaData.dataType === errorLogDataType.CommonValue.flag ? (
              <Card
                title="附加数据"
                className={styles.card}
                extra={`数据类型：${errorLogDataType.CommonValue.name}`}
                bordered={false}
              >
                <Spin spinning={dataLoading || processing}>
                  <Row gutter={24}>
                    <Col span={24}>
                      {this.renderFormDisplayFormItem(
                        fieldData.data.label,
                        metaData == null ? '无' : metaData.data || '无',
                      )}
                    </Col>
                  </Row>
                </Spin>
              </Card>
            ) : null}
          </>
        )}
      </>
    );
  };
}

export default Index;
