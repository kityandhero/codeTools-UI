import { Button, Card, Steps, Result, Descriptions } from 'antd';
import { formatMessage } from 'umi';
import React from 'react';
import { DingdingOutlined, DingdingOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-layout';

import styles from './index.less';

const { Step } = Steps;
const desc1 = (
  <div className={styles.title}>
    <div
      style={{
        margin: '8px 0 4px',
      }}
    >
      {formatMessage({ id: 'result-success.success.step1-operator' })}
      <DingdingOutlined
        style={{
          marginLeft: 8,
          color: '#00A0E9',
        }}
      />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);
const desc2 = (
  <div
    style={{
      fontSize: 12,
    }}
    className={styles.title}
  >
    <div
      style={{
        margin: '8px 0 4px',
      }}
    >
      {formatMessage({ id: 'result-success.success.step2-operator' })}
      <a href="">
        <DingdingOutlined
          style={{
            color: '#00A0E9',
            marginLeft: 8,
          }}
        />
        {formatMessage({ id: 'result-success.success.step2-extra' })}
      </a>
    </div>
  </div>
);
const content = (
  <>
    <Descriptions
      title={formatMessage({
        id: 'result-success.success.operate-title',
        defaultMessage: 'Project Name',
      })}
    >
      <Descriptions.Item label={formatMessage({ id: 'result-success.success.operate-id' })}>
        23421
      </Descriptions.Item>
      <Descriptions.Item label={formatMessage({ id: 'result-success.success.principal' })}>
        {formatMessage({ id: 'result-success.success.step1-operator' })}
      </Descriptions.Item>
      <Descriptions.Item label={formatMessage({ id: 'result-success.success.operate-time' })}>
        2016-12-12 ~ 2017-12-12
      </Descriptions.Item>
    </Descriptions>
    <br />
    <Steps progressDot current={1}>
      <Step
        title={
          <span
            style={{
              fontSize: 14,
            }}
          >
            {formatMessage({ id: 'result-success.success.step1-title' })}
          </span>
        }
        description={desc1}
      />
      <Step
        title={
          <span
            style={{
              fontSize: 14,
            }}
          >
            {formatMessage({ id: 'result-success.success.step2-title' })}
          </span>
        }
        description={desc2}
      />
      <Step
        title={
          <span
            style={{
              fontSize: 14,
            }}
          >
            {formatMessage({ id: 'result-success.success.step3-title' })}
          </span>
        }
      />
      <Step
        title={
          <span
            style={{
              fontSize: 14,
            }}
          >
            {formatMessage({ id: 'result-success.success.step4-title' })}
          </span>
        }
      />
    </Steps>
  </>
);
const extra = (
  <>
    <Button type="primary">{formatMessage({ id: 'result-success.success.btn-return' })}</Button>
    <Button>{formatMessage({ id: 'result-success.success.btn-project' })}</Button>
    <Button>{formatMessage({ id: 'result-success.success.btn-print' })}</Button>
  </>
);
export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title={formatMessage({
          id: 'result-success.success.title',
        })}
        subTitle={formatMessage({
          id: 'result-success.success.description',
        })}
        extra={extra}
        style={{
          marginBottom: 16,
        }}
      >
        {content}
      </Result>
    </Card>
  </GridContent>
);
