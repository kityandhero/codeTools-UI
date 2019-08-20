import React from 'react';
import { Divider, Descriptions } from 'antd';

import { formatDatetime } from '@/utils/tools';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import styles from './index.less';

const { Item: Description } = Descriptions;

class TableHeaderCommon extends LoadDataTabContainer {
  getApiData = props => {
    const {
      areaAccount: { data },
    } = props;

    return data;
  };

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      merchantId: id,
      pageName: '账户余额：',
      loadApiPath: 'areaAccount/getCurrent',
    };

    return result;
  };

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  afterLoadSuccess = metaData => {
    this.setState({
      pageName: `账户余额：${metaData === null ? '' : `￥${metaData.balance || '0'}`}`,
    });
  };

  pageHeaderExtraContent = () => {
    const currentOperator = this.getCurrentOperator();

    return (
      <>
        <span>
          开通日期：
          {formatDatetime(
            currentOperator === null ? '' : currentOperator.areaAgentCreateTime,
            'YYYY-MM-DD',
            '--'
          )}
        </span>
        <Divider type="vertical" />
        <span>状态：正常</span>
        {/* <Badge status="processing" text="正常" /> */}
      </>
    );
  };

  pageHeaderContent = () => {
    const currentOperator = this.getCurrentOperator();

    return (
      <Descriptions className={styles.headerList} size="small" col="2">
        <Description label="地区">
          {`${currentOperator === null ? '' : currentOperator.cityName || ''} `}
        </Description>
      </Descriptions>
    );
  };
}

export default TableHeaderCommon;
