import React from 'react';
import { connect } from 'umi';
import { Card, Affix, Row, Col, Spin } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { getDerivedStateFromPropsForUrlParams, formatDatetime } from '@/utils/tools';
import { constants } from '@/customConfig/config';
import accessWayCollection from '@/customConfig/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';

import styles from './index.less';

@connect(({ errorLog, global, loading }) => ({
  errorLog,
  global,
  loading: loading.models.errorLog,
}))
class StackTraceInfo extends TabPageBase {
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

  renderBasicInfoTitleText = () => {
    return '堆栈信息';
  };

  formContent = () => {
    const { dataLoading, processing, metaData } = this.state;

    let stackTraceJsonList = metaData == null ? [] : metaData.stackTraceJson || [];

    stackTraceJsonList = stackTraceJsonList.map((o, index) => {
      const d = {};

      d.key = `stackTraceJsonItem_${index}`;
      d.data = o;

      return d;
    });

    return (
      <>
        <Card
          title={this.renderBasicInfoTitle()}
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              <div>{this.renderRefreshButton()}</div>
            </Affix>
          }
        >
          <Spin spinning={dataLoading || processing}>
            <Row gutter={24}>
              {metaData == null ? null : (
                <>
                  {stackTraceJsonList.map((o) => (
                    <Col key={o.key} span={24}>
                      <SyntaxHighlighter
                        language="javascript"
                        // style={docco}
                      >
                        {JSON.stringify(o.data || '', null, '    ')}
                      </SyntaxHighlighter>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          </Spin>
        </Card>
      </>
    );
  };
}

export default StackTraceInfo;
