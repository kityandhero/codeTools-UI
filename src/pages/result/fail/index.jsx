import { Button, Card, Result } from 'antd';
import { formatMessage } from 'umi';
import React from 'react';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-layout';

import styles from './index.less';

const Content = (
  <>
    <div className={styles.title}>{formatMessage({ id: 'result-fail.error.hint-title' })}</div>
    <div
      style={{
        marginBottom: 16,
      }}
    >
      <CloseCircleOutlined
        style={{
          marginRight: 8,
        }}
        className={styles.error_icon}
      />
      {formatMessage({ id: 'result-fail.error.hint-text1' })}
      <a
        style={{
          marginLeft: 16,
        }}
      >
        {formatMessage({ id: 'result-fail.error.hint-btn1' })}
        <RightOutlined />
      </a>
    </div>
    <div>
      <CloseCircleOutlined
        style={{
          marginRight: 8,
        }}
        className={styles.error_icon}
      />
      {formatMessage({ id: 'result-fail.error.hint-text2' })}
      <a
        style={{
          marginLeft: 16,
        }}
      >
        {formatMessage({ id: 'result-fail.error.hint-btn2' })}
        <RightOutlined />
      </a>
    </div>
  </>
);
export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="error"
        title={formatMessage({
          id: 'result-fail.error.title',
        })}
        subTitle={formatMessage({
          id: 'result-fail.error.description',
        })}
        extra={
          <Button type="primary">{formatMessage({ id: 'result-fail.error.btn-text' })}</Button>
        }
        style={{
          marginTop: 48,
          marginBottom: 16,
        }}
      >
        {Content}
      </Result>
    </Card>
  </GridContent>
);
