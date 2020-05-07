import React from 'react';
import { Row, Col, Button, Divider, notification, Popconfirm } from 'antd';
import { ImportOutlined } from '@ant-design/icons';

import {
  replaceTargetText,
  pretreatmentRequestParams,
  copyToClipboard,
  formatDatetime,
  isFunction,
} from '@/utils/tools';
import MultiPageDrawer from '@/customComponents/Framework/DataMultiPageView/MultiPageDrawer';
import Ellipsis from '@/customComponents/Ellipsis';
import EllipsisCustom from '@/customComponents/EllipsisCustom';

class ModuleDrawer extends MultiPageDrawer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        tableScroll: { x: 1320 },
        loadApiPath: 'accessWay/pageList',
        dateRangeFieldName: '创建时间',
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    // 设置界面效果为加载中，减少用户误解
    this.setState({ dataLoading: true });

    const that = this;

    setTimeout(() => {
      that.handleFormReset(false);
    }, 700);
  };

  getApiData = (props) => {
    const {
      accessWay: { data },
    } = props;

    return data;
  };

  refreshParentData = () => {
    const { afterOperateSuccess } = this.props;

    if (isFunction(afterOperateSuccess)) {
      afterOperateSuccess();
    }
  };

  supplementRequestSelectModuleParams = (o) => o;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSelectModuleApiData = (props) => ({});

  selectModule = (e, record) => {
    const { dispatch } = this.props;
    const { selectModuleApiPath } = this.state;

    let submitData = pretreatmentRequestParams({}, (d) => {
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
          this.reloadData();
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

    let submitData = pretreatmentRequestParams({}, (d) => {
      const { selectedDataTableDataRows } = this.state;
      const o = d;

      const guidTagList = [];

      (selectedDataTableDataRows || []).forEach((item) => {
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
          this.reloadData();
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

    let submitData = pretreatmentRequestParams({}, (d) => {
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
          this.reloadData();
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

  renderSimpleFormRow = () => {
    const { dataLoading, processing, selectedDataTableDataRows } = this.state;
    const selectCount = (selectedDataTableDataRows || []).length;

    return (
      <>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} justify="end">
          <Col md={8} sm={24}>
            {this.renderSearchInput('关键词', 'keywords', '', null)}
          </Col>
          {this.renderSimpleFormButton(
            <>
              <Divider type="vertical" />
              {dataLoading || processing || selectCount === 0 ? (
                <Button
                  key="buttonMultiPlusDisabled"
                  disabled
                  type="primary"
                  icon={<ImportOutlined />}
                >
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
                  <Button key="buttonMultiPlus" type="primary" icon={<ImportOutlined />}>
                    添加所选模块
                  </Button>
                </Popconfirm>
              )}
              <Divider type="vertical" />
              {dataLoading || processing ? (
                <Button
                  key="buttonAllPlusDisabled"
                  disabled
                  type="primary"
                  icon={<ImportOutlined />}
                >
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
                    icon={<ImportOutlined />}
                  >
                    添加所有模块
                  </Button>
                </Popconfirm>
              )}
            </>,
            14,
          )}
        </Row>
      </>
    );
  };

  getColumn = () => [
    {
      title: '模块名称',
      dataIndex: 'name',
      align: 'left',
      render: (val) => (
        <>
          <Ellipsis tooltip={{ placement: 'topLeft' }} lines={1}>
            {val}
          </Ellipsis>
        </>
      ),
    },
    {
      title: 'Url路径',
      dataIndex: 'relativePath',
      width: 300,
      align: 'left',
      render: (val) => (
        <>
          <Ellipsis tooltip={{ placement: 'topLeft' }} lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '模块标识',
      dataIndex: 'guidTag',
      width: 120,
      align: 'center',
      render: (val) => (
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
      title: '分支权限',
      dataIndex: 'expand',
      width: 340,
      align: 'center',
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {val || '--'}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '生成时间',
      dataIndex: 'createTime',
      width: 140,
      align: 'center',
      sorter: false,
      render: (val) => (
        <>
          <Ellipsis tooltip lines={1}>
            {formatDatetime(val, 'MM-DD HH:mm', '--')}
          </Ellipsis>
        </>
      ),
    },
    {
      title: '操作',
      width: 106,
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            placement="topRight"
            title="将添加此操作模块，确定吗？"
            onConfirm={(e) => this.selectModule(e, record)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" icon={<ImportOutlined />} text="选取" />
          </Popconfirm>
        </>
      ),
    },
  ];
}

export default ModuleDrawer;
