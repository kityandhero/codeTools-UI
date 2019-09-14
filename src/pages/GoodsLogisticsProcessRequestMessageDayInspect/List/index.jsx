import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Badge } from 'antd';

import { formatDatetime, copyToClipboard, replaceTargetText } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import PagerList from '@/customComponents/Framework/CustomList/PagerList';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

import { fieldData } from '../Common/data';

@connect(({ goodsLogisticsProcessRequestMessageDayInspect, global, loading }) => ({
  goodsLogisticsProcessRequestMessageDayInspect,
  global,
  loading: loading.models.goodsLogisticsProcessRequestMessageDayInspect,
}))
@Form.create()
class Standard extends PagerList {
  componentAuthority = accessWayCollection.goodsLogisticsProcessRequestMessageDayInspect.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '出库配送操作缺失记录（不含今天）',
        paramsKey: '8626f906-dbfe-4aac-8595-b9db985518e3',
        loadApiPath: 'goodsLogisticsProcessRequestMessageDayInspect/list',
        dateRangeFieldName: '统计时段',
        // tableScroll: { x: 1820 },
        batchDate: '',
      },
    };
  }

  getApiData = props => {
    const {
      goodsLogisticsProcessRequestMessageDayInspect: { data },
    } = props;

    return data;
  };

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  getGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultBadgeStatus = v => {
    let result = 'error';

    switch (v) {
      case 100:
        result = 'success';
        break;
      default:
        result = 'default';
        break;
    }

    return result;
  };

  handleFormOtherReset = () => {
    this.setState({
      batchDate: '',
    });
  };

  onBatchDateChange = (date, dateString) => {
    this.setState({
      batchDate: dateString,
    });
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { batchDate } = this.state;

    d.batchDate = batchDate;

    return d;
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;
    const currentOperator = this.getCurrentOperator();

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchInputFormItem(
              fieldData.city,
              '',
              currentOperator == null ? '' : currentOperator.cityName || '',
              null,
              'form',
              { disabled: true },
              false,
            )}
          </Col>
          <Col md={5} sm={24}>
            {this.renderSearchBatchDateFormItem()}
          </Col>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 14)}
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={5} sm={24}>
            {this.renderSearchGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultFormItem(
              true,
            )}
          </Col>
          {this.renderSimpleFormButton(null, 19)}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.batchDate,
      dataIndex: 'batchDate',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.operationLossCheckResult,
      dataIndex: 'operationLossCheckResult',
      align: 'center',
      width: 160,
      render: (val, record) => (
        <>
          <Badge
            status={this.getGoodsLogisticsProcessRequestMessageDayInspectOperationLossCheckResultBadgeStatus(
              val,
            )}
            text={record.operationLossCheckResultNote}
          />
        </>
      ),
    },
    {
      title: fieldData.transportLossList,
      dataIndex: 'transportLossList',
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val.length > 0 ? record.additional.transportLossNameList.join() : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.completeLossList,
      dataIndex: 'completeLossList',
      align: 'center',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val.length > 0 ? record.additional.completeLossNameList.join() : '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.stateNote,
      dataIndex: 'stateNote',
      align: 'center',
      width: 140,
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: fieldData.goodsLogisticsProcessRequestMessageDayInspectId,
      dataIndex: 'goodsLogisticsProcessRequestMessageDayInspectId',
      width: 120,
      align: 'center',
      render: val => (
        <>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </>
      ),
    },
    {
      title: fieldData.createTime,
      dataIndex: 'createTime',
      width: 200,
      align: 'center',
      sorter: false,
      fixed: 'right',
      render: val => (
        <>
          <Ellipsis tooltip lines={1}>
            {(val || '') === '' ? '--' : formatDatetime(val, 'YYYY-MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
    // {
    //   title: '操作',
    //   width: 106,
    //   fixed: 'right',
    //   align: 'center',
    //   render: (text, record) => (
    //     <>
    //       <Dropdown.Button
    //         size="small"
    //         onClick={() => this.goToEdit(record)}
    //         overlay={
    //           <Menu onClick={e => this.handleMenuClick(e, record)}>
    //             <Menu.Item key="lineRecord">
    //               <Icon type="snippets" />
    //               线路出库单
    //             </Menu.Item>
    //           </Menu>
    //         }
    //       >
    //         <Icon type="read" />
    //         详情
    //       </Dropdown.Button>
    //     </>
    //   ),
    // },
  ];
}

export default Standard;
