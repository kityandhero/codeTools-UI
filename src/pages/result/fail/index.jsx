import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Button, Card, Result } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import styles from './index.less';

const Content = (
  <>
    <div className={styles.title}>
      <FormattedMessage
        id="result-fail.error.hint-title"
        defaultMessage="The content you submitted has the following error:"
      />
    </div>
    <div
      style={{
        marginBottom: 16,
      }}
    >
      <LegacyIcon
        style={{
          marginRight: 8,
        }}
        className={styles.error_icon}
        type="close-circle-o"
      />
      <FormattedMessage
        id="result-fail.error.hint-text1"
        defaultMessage="Your account has been frozen"
      />
      <a
        style={{
          marginLeft: 16,
        }}
      >
        <FormattedMessage id="result-fail.error.hint-btn1" defaultMessage="Thaw immediately" />
        <LegacyIcon type="right" />
      </a>
    </div>
    <div>
      <LegacyIcon
        style={{
          marginRight: 8,
        }}
        className={styles.error_icon}
        type="close-circle-o"
      />
      <FormattedMessage
        id="result-fail.error.hint-text2"
        defaultMessage="Your account is not yet eligible to apply"
      />
      <a
        style={{
          marginLeft: 16,
        }}
      >
        <FormattedMessage id="result-fail.error.hint-btn2" defaultMessage="Upgrade immediately" />
        <LegacyIcon type="right" />
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
          <Button type="primary">
            <FormattedMessage id="result-fail.error.btn-text" defaultMessage="Return to modify" />
          </Button>
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
