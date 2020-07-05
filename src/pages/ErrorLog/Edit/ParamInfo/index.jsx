import React from 'react';
import { connect } from 'umi';
import { Card, Affix, Row, Col, Spin } from 'antd';

import { getDerivedStateFromPropsForUrlParams, formatDatetime } from '@/utils/tools';
import { dataTypeCollection } from '@/utils/constants';
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
class ParamInfo extends TabPageBase {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) => {
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

  renderMainTitleText = () => {
    return 'Get参数';
  };

  formContent = () => {
    const { dataLoading, processing, metaData } = this.state;

    const requestBody = metaData == null ? '' : metaData.requestBody || '';
    let requestBodyJson = null;
    let requestBodyIsJson = false;

    try {
      requestBodyJson = JSON.parse(requestBody);
      requestBodyIsJson = true;
    } catch (error) {
      requestBodyJson = {};
    }

    return (
      <>
        <Card
          title={this.renderMainTitle()}
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
                {this.renderFormDisplay(
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
                {metaData === null
                  ? null
                  : this.renderSyntaxHighlighter('javascript', metaData.headerJson)}
              </Col>
            </Row>
          </Spin>
        </Card>

        <Card title="请求参数" className={styles.card} bordered={false}>
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              <Col span={24}>
                {metaData === null
                  ? null
                  : this.renderSyntaxHighlighter('javascript', metaData.requestParamsJson)}
              </Col>
            </Row>
          </Spin>
        </Card>

        {requestBodyIsJson ? (
          <Card
            title="请求Body"
            className={styles.card}
            extra={`数据类型：${dataTypeCollection.jsonObject.name}`}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Row gutter={24}>
                <Col span={24}>
                  {metaData === null
                    ? null
                    : this.renderSyntaxHighlighter('javascript', requestBodyJson)}
                </Col>
              </Row>
            </Spin>
          </Card>
        ) : (
          <Card
            title="请求Body"
            className={styles.card}
            extra={`数据类型：${dataTypeCollection.commonValue.name}`}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Row gutter={24}>
                <Col span={24}>
                  {this.renderFormDisplay(
                    fieldData.data.label,
                    metaData == null ? '无' : requestBody || '无',
                  )}
                </Col>
              </Row>
            </Spin>
          </Card>
        )}

        {metaData === null ? null : (
          <>
            {metaData.dataType === dataTypeCollection.jsonObject.flag ? (
              <Card
                title="附加数据"
                className={styles.card}
                extra={`数据类型：${dataTypeCollection.jsonObject.name}`}
                bordered={false}
              >
                <Spin spinning={dataLoading || processing}>
                  <Row gutter={24}>
                    <Col span={24}>
                      {metaData === null
                        ? null
                        : this.renderSyntaxHighlighter('javascript', metaData.dataJson)}
                    </Col>
                  </Row>
                </Spin>
              </Card>
            ) : null}

            {metaData.dataType === dataTypeCollection.jsonObjectList.flag ? (
              <Card
                title="附加数据"
                className={styles.card}
                extra={`数据类型：${dataTypeCollection.jsonObjectList.name}`}
                bordered={false}
              >
                <Spin spinning={dataLoading || processing}>
                  <Row gutter={24}>
                    <Col span={24}>
                      {metaData === null
                        ? null
                        : this.renderSyntaxHighlighter('javascript', metaData.data)}
                    </Col>
                  </Row>
                </Spin>
              </Card>
            ) : null}

            {metaData.dataType === dataTypeCollection.commonValue.flag ? (
              <Card
                title="附加数据"
                className={styles.card}
                extra={`数据类型：${dataTypeCollection.commonValue.name}`}
                bordered={false}
              >
                <Spin spinning={dataLoading || processing}>
                  <Row gutter={24}>
                    <Col span={24}>
                      {this.renderFormDisplay(
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

export default ParamInfo;
