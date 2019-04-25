import React, { Fragment } from 'react';
import { Divider } from 'antd';

import { formatDatetime } from '@/utils/tools';
import LoadDataTabContainer from '@/customComponents/CustomForm/LoadDataTabContainer';
import DescriptionList from '@/components/DescriptionList';

import styles from './index.less';

const { Description } = DescriptionList;

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
      <Fragment>
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
      </Fragment>
    );
  };

  pageHeaderContent = () => {
    const currentOperator = this.getCurrentOperator();

    return (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="地区">
          {`${currentOperator === null ? '' : currentOperator.cityName || ''} `}
        </Description>
      </DescriptionList>
    );
  };
}

export default TableHeaderCommon;
