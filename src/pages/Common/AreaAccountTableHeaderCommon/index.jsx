import React from 'react';
import { Divider, Descriptions } from 'antd';

import { formatDatetime } from '@/utils/tools';
import LoadDataTabContainer from '@/customComponents/Framework/CustomForm/LoadDataTabContainer';

import styles from './index.less';

const { Item: Description } = Descriptions;

class TableHeaderCommon extends LoadDataTabContainer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '账户余额：',
        loadApiPath: 'areaAccount/getCurrent',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  getApiData = props => {
    const {
      areaAccount: { data },
    } = props;

    return data;
  };

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
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
            '--',
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
