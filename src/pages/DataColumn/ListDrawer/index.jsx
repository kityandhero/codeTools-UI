import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm } from 'antd';

import { isFunction } from '../../../utils/tools';
import accessWayCollection from '../../../customConfig/accessWayCollection';
import { constants } from '../../../customConfig/config';
import PagerDrawer from '../../../customComponents/Framework/CustomList/PagerList/PagerDrawer';
import Ellipsis from '../../../customComponents/Ellipsis';

import { fieldData } from '../Common/data';

@connect(({ dataColumn, global, loading }) => ({
  dataColumn,
  global,
  loading: loading.models.dataColumn,
}))
class Index extends PagerDrawer {
  componentAuthority = accessWayCollection.dataColumn.list;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        tableScroll: { x: 1220 },
        loadApiPath: 'dataColumn/list',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    const { firstLoadSuccess } = this.state;

    // 未加载数据过数据的时候，进行加载
    if (!firstLoadSuccess) {
      // 设置界面效果为加载中，减少用户误解
      this.setState({ dataLoading: true });

      setTimeout(() => {
        this.handleFormReset(false);
      }, 700);
    }
  };

  getApiData = props => {
    const {
      dataColumn: { data },
    } = props;

    return data;
  };

  getPageName = () => {
    return '数据表列定制';
  };

  selectRecord = (e, record) => {
    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(record);
    }

    this.hideDrawer();
  };

  renderSimpleFormRow = () => {
    return (
      <>
        <Row gutter={24}>
          <Col lg={6} md={12} sm={24} xs={24}>
            {this.renderSearchInputFormItem(
              fieldData.name.label,
              fieldData.name.name,
              // buildFieldHelper('依据名称进行检索'),
            )}
          </Col>
          {this.renderSimpleFormButton()}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: fieldData.name.label,
      dataIndex: fieldData.name.name,
      align: 'left',
      render: (val, record) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val}
            {(record.spec || '') === '' ? '' : `(${record.spec})`}
          </Ellipsis>
        </>
      ),
    },
    {
      title: constants.customOperate.label,
      dataIndex: constants.customOperate.name,
      width: 126,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            placement="topRight"
            title="选择此产品进行预售，确定吗？"
            onConfirm={e => this.selectRecord(e, record)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" icon="import" text="选取" />
          </Popconfirm>
        </>
      ),
    },
  ];
}

export default Index;
