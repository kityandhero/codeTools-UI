import { Link, formatMessage } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';

export default () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({
      id: 'exception-500.description.500',
      defaultMessage: 'Sorry, the server is reporting an error.',
    })}
    extra={
      <Link to="/">
        <Button type="primary">
          {formatMessage({
            id: 'exception-500.exception.back',
            defaultMessage: 'Back Home',
          })}
        </Button>
      </Link>
    }
  />
);
