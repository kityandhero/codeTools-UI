import React, { Fragment } from 'react';
import { Row, Button, Divider, notification, Popconfirm } from 'antd';

import {
  replaceTargetText,
  pretreatmentRequestParams,
  copyToClipboard,
  formatDatetime,
} from '@/utils/tools';
import PagerDrawer from '@/customComponents/CustomList/PagerList/PagerDrawer';
import Ellipsis from '@/components/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

class ModuleDrawer extends PagerDrawer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      selectModuleApiPath: '',
    };
  }

  doWorkWhenWillReceive = nextProps => {
    const { dataLoading } = this.state;
    const { visible, sourceData } = nextProps;

    if (sourceData != null && visible && !dataLoading) {
      // 设置界面效果为加载中，减少用户误解
      this.setState({ sourceData, dataLoading: true, customData: [] });

      setTimeout(() => {
        this.handleFormReset();
      }, 700);
    }
  };

  getApiData = props => {
    const {
      accessWay: { data },
    } = props;

    return data;
  };

  initState = () => ({
    tableScroll: { x: 1320 },
    loadApiPath: 'accessWay/list',
    dateRangeFieldName: '创建时间',
  });

  refreshParentData = () => {
    const { afterOperateSuccess } = this.props;

    if (typeof afterOperateSuccess === 'function') {
      afterOperateSuccess();
    }
  };

  supplementRequestSelectModuleParams = o => o;

  // eslint-disable-next-line no-unused-vars
  getSelectModuleApiData = props => ({});

  selectModule = (e, record) => {
    const { dispatch } = this.props;
    const { selectModuleApiPath } = this.state;

    let submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      o.guidTag = record.guidTag;

      return o;
    });

    submitData = this.supplementRequestSelectModuleParams(submitData);

    this.setState({ processing: true });

    dispatch({
      type: selectModuleApiPath,
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const data = this.getSelectModuleApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          // this.refreshGrid();
          this.refreshParentData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomLeft',
              message: '操作执行结果',
              description: `模块’${record.name}‘ 已经成功添加。`,
            });
          });
        }

        this.setState({ processing: false });
      }
    });
  };

  selectMultiModule = () => {
    const { dispatch } = this.props;
    const { selectMultiModuleApiPath } = this.state;

    let submitData = pretreatmentRequestParams({}, d => {
      const { selectedDataTableDataRows } = this.state;
      const o = d;

      const guidTagList = [];

      (selectedDataTableDataRows || []).forEach(item => {
        guidTagList.push(item.guidTag);
      });

      o.guidTagCollection = guidTagList.join();

      return o;
    });

    submitData = this.supplementRequestSelectModuleParams(submitData);

    this.setState({ processing: true });

    dispatch({
      type: selectMultiModuleApiPath,
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const data = this.getSelectModuleApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          this.setState({ selectedDataTableDataRows: [] });

          // this.refreshGrid();
          this.refreshParentData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomLeft',
              message: '操作执行结果',
              description: `所选模块已经成功添加。`,
            });
          });
        }

        this.setState({ processing: false });
      }
    });
  };

  selectAllModule = () => {
    const { dispatch } = this.props;
    const { selectAllModuleApiPath } = this.state;

    let submitData = pretreatmentRequestParams({}, d => {
      const o = d;

      return o;
    });

    submitData = this.supplementRequestSelectModuleParams(submitData);

    this.setState({ processing: true });

    dispatch({
      type: selectAllModuleApiPath,
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const data = this.getSelectModuleApiData(this.props);

        const { dataSuccess } = data;
        if (dataSuccess) {
          // this.refreshGrid();
          this.refreshParentData();

          requestAnimationFrame(() => {
            notification.success({
              placement: 'bottomLeft',
              message: '操作执行结果',
              description: `全部模块已经成功添加。`,
            });
          });
        }

        this.setState({ processing: false });
      }
    });
  };

  // eslint-disable-next-line no-unused-vars
  // afterLoadSuccess = data => {
  //   this.setState({ processing: false });
  // };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName, dataLoading, processing, selectedDataTableDataRows } = this.state;
    const selectCount = (selectedDataTableDataRows || []).length;

    return (
      <Fragment>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 10)}
          {this.renderSimpleFormButton(
            <Fragment>
              <Divider type="vertical" />
              {dataLoading || processing || selectCount === 0 ? (
                <Button key="buttonMultiPlusDisabled" disabled type="primary" icon="import">
                  添加所选模块
                </Button>
              ) : (
                <Popconfirm
                  placement="topRight"
                  title="将添加所选模块，确定吗？"
                  onConfirm={this.selectMultiModule}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button key="buttonMultiPlus" type="primary" icon="import">
                    添加所选模块
                  </Button>
                </Popconfirm>
              )}
              <Divider type="vertical" />
              {dataLoading || processing ? (
                <Button key="buttonAllPlusDisabled" disabled type="primary" icon="import">
                  添加所有模块
                </Button>
              ) : (
                <Popconfirm
                  placement="topRight"
                  title="将添加所有模块，确定吗？"
                  onConfirm={this.selectAllModule}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    key="buttonAllPlus"
                    disabled={dataLoading || processing}
                    type="primary"
                    icon="import"
                  >
                    添加所有模块
                  </Button>
                </Popconfirm>
              )}
            </Fragment>,
            14
          )}
        </Row>
      </Fragment>
    );
  };

  getColumn = () => [
    {
      title: '模块名称',
      dataIndex: 'name',
      align: 'left',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: 'Url路径',
      dataIndex: 'relativePath',
      width: 300,
      align: 'left',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '模块标识',
      dataIndex: 'guidTag',
      width: 120,
      align: 'center',
      render: val => (
        <Fragment>
          <EllipsisCustom
            tooltip
            lines={1}
            removeChildren
            extraContent={
              <Fragment>
                <a
                  onClick={() => {
                    copyToClipboard(val);
                  }}
                >
                  {replaceTargetText(val, '***', 2, 6)}
                </a>
              </Fragment>
            }
          >
            {val} [点击复制]
          </EllipsisCustom>
        </Fragment>
      ),
    },
    {
      title: '分支权限',
      dataIndex: 'expand',
      width: 340,
      align: 'center',
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '生成时间',
      dataIndex: 'createTime',
      width: 140,
      align: 'center',
      sorter: false,
      render: val => (
        <Fragment>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </Fragment>
      ),
    },
    {
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <Popconfirm
            placement="topRight"
            title="将添加此操作模块，确定吗？"
            onConfirm={e => this.selectModule(e, record)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" icon="import" text="选取" />
          </Popconfirm>
        </Fragment>
      ),
    },
  ];
}

export default ModuleDrawer;
