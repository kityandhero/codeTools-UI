import React from 'react';
import { List, Spin, Tooltip, Button, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import {
  defaultPageListState,
  getValue,
  dateToMoment,
  stringIsNullOrWhiteSpace,
  isNumber,
  isArray,
} from '@/utils/tools';
import { listViewModeCollection } from '@/utils/constants';
import { getUseParamsDataCache, setUseParamsDataCache } from '@/customConfig/storageAssist';

import Base from '../../DataListView/Base';
import DensityAction from '../../DataListView/DensityAction';
import ColumnSetting from '../../DataListView/ColumnSetting';
import StandardTableCustom from '../../../StandardTableCustom';

import styles from './index.less';

class MultiPage extends Base {
  lastLoadParams = null;

  useParamsKey = true;

  constructor(props) {
    super(props);

    const defaultState = defaultPageListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  handleFormReset = (checkWorkDoing = true) => {
    if (checkWorkDoing) {
      if (this.checkWorkDoing()) {
        return;
      }
    }

    const form = this.getSearchForm();

    const { pageSize } = this.state;

    form.resetFields();

    this.handleFormOtherReset();

    this.setState(
      {
        formValues: {},
        startTime: '',
        endTime: '',
        pageNo: 1,
        pageSize,
      },
      () => {
        this.reloadData();
      },
    );
  };

  /**
   * 轻微调整初始化请求数据体
   *
   * @memberof PagerList
   */
  adjustLoadRequestParams = (o) => o || {};

  /**
   * 创建初始化请求数据体
   *
   * @memberof PagerList
   */
  initLoadRequestParams = (o) => {
    let d = o || {};

    const { paramsKey, loadApiPath, formValues, filters, sorter } = this.state;

    if ((loadApiPath || '') === '') {
      message.error('loadApiPath需要配置');
      return d;
    }

    if (this.useParamsKey) {
      if ((paramsKey || '') === '') {
        message.error('paramsKey需要配置');
        return d;
      }

      d = getUseParamsDataCache(paramsKey);

      this.useParamsKey = false;
    } else {
      const { startTimeAlias, endTimeAlias, pageNo, pageSize, startTime, endTime } = this.state;

      if (!stringIsNullOrWhiteSpace(startTime)) {
        if (!stringIsNullOrWhiteSpace(startTimeAlias)) {
          d[startTimeAlias] = startTime;
        } else {
          d.startTime = startTime;
        }
      }

      if (!stringIsNullOrWhiteSpace(endTime)) {
        if (!stringIsNullOrWhiteSpace(endTimeAlias)) {
          d[endTimeAlias] = endTime;
        } else {
          d.endTime = endTime;
        }
      }

      d = {
        ...d,
        ...{
          ...(formValues || {}),
          ...(filters || {}),
          ...{ pageNo, pageSize },
          ...(sorter || {}),
        },
      };

      delete d.dateRange;
    }

    return this.adjustLoadRequestParams(d);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {
    const form = this.getSearchForm();
    const { urlParams } = this.state;

    let pageKey = 'no';

    if (urlParams != null) {
      pageKey = urlParams.pageKey || 'no';
    }

    const p = submitData;

    if (pageKey === 'key' && p != null) {
      if (p.startTime && p.endTime) {
        p.dateRange = [dateToMoment(p.startTime), dateToMoment(p.endTime)];
        // p.dateRange = `${p.startTime}-${p.endTime}`;
      }

      const d = form.getFieldsValue();

      Object.keys(d).forEach((key) => {
        const c = p[key] === 0 ? 0 : p[key] || null;

        if (c != null) {
          const obj = {};
          obj[key] = isNumber(c) ? `${c}` : c;
          form.setFieldsValue(obj);
        }
      });

      this.adjustRenderLoadRequestParamsWithKey(d);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  adjustRenderLoadRequestParamsWithKey = (d) => {};

  afterGetRequestResult = () => {
    const { paramsKey } = this.state;

    if (!stringIsNullOrWhiteSpace(paramsKey)) {
      setUseParamsDataCache(paramsKey, this.lastLoadParams);
    }
  };

  handleSearch = (e) => {
    e.preventDefault();

    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchForm();

    const { validateFields } = form;
    const { pageSize } = this.state;

    validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.searchData({ formValues: values, pageNo: 1, pageSize });
      })
      .catch((error) => {
        const { errorFields } = error;

        const m = [];

        Object.values(errorFields).forEach((o) => {
          m.push(o.errors[0]);
        });

        const maxLength = 5;
        let beyondMax = false;

        if (m.length > maxLength) {
          m.length = maxLength;

          beyondMax = true;
        }

        let errorMessage = m.join(', ');

        if (beyondMax) {
          errorMessage += ' ...';
        }

        message.warn(errorMessage);
      });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    if (this.checkWorkDoing()) {
      return;
    }

    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      formValues,
      filters,
    };

    if (sorter.field) {
      params.sorter = { sorter: `${sorter.field}_${sorter.order}` };
    }

    this.pageListData(params);
  };

  renderTableView = () => {
    const {
      tableScroll,
      showSelect,
      selectedDataTableDataRows,
      metaOriginalData,
      dataLoading,
      processing,
    } = this.state;

    const { styleSet, columns, rowExpandable, expandedRowRender, size } = this.buildTableConfig();

    const standardTableCustomOption = {
      loading: dataLoading || processing,
      data: metaOriginalData || { list: [], pagination: {} },
      showSelect,
      selectedRows: selectedDataTableDataRows,
      columns,
      size,
      onSelectRow: this.handleSelectRows,
      onChange: this.handleStandardTableChange,
    };

    if ((styleSet || null) != null) {
      standardTableCustomOption.style = styleSet;
    }

    if ((tableScroll || null) != null) {
      standardTableCustomOption.scroll = tableScroll;
    }

    standardTableCustomOption.rowExpandable = rowExpandable || false;

    if ((expandedRowRender || null) != null) {
      standardTableCustomOption.expandedRowRender = expandedRowRender;
    }

    return (
      <div className={styles.tableContainor}>
        <StandardTableCustom {...standardTableCustomOption} />
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderMultiListViewItem = (record) => {
    return (
      <List.Item
        actions={this.renderMultiListViewItemActions(record)}
        extra={this.renderMultiListViewItemExtra(record)}
      >
        {this.renderMultiListViewItemInner(record)}
      </List.Item>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderMultiListViewItemInner = (record) => {
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderMultiListViewItemExtra = (record) => {
    return null;
  };

  renderMultiListViewItemActions = (record) => {
    const actionOthers = this.renderMultiListViewItemActionOthers(record);

    const actionSelect = this.renderMultiListViewItemActionSelect(record);

    if (actionSelect == null) {
      return [...(isArray(actionOthers) ? actionOthers : [])];
    }

    return [...(isArray(actionOthers) ? actionOthers : []), actionSelect];
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderMultiListViewItemActionOthers = (record) => {
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderMultiListViewItemActionSelect = (record) => {
    return null;
  };

  renderMultiListViewItemLayout = () => {
    return 'horizontal';
  };

  renderMultiListViewSize = () => {
    return 'default';
  };

  renderMultiListView = () => {
    const { metaOriginalData, dataLoading, reloading, processing } = this.state;

    const { list, pagination } = metaOriginalData || { list: [], pagination: {} };

    return (
      <Spin spinning={dataLoading || reloading || processing}>
        <List
          className={styles.multiListView}
          itemLayout={this.renderMultiListViewItemLayout()}
          size={this.renderMultiListViewSize()}
          dataSource={list}
          pagination={pagination}
          renderItem={(item) => {
            return this.renderMultiListViewItem(item);
          }}
        />
      </Spin>
    );
  };

  renderLisView = () => {
    const { showSelect, listViewMode } = this.state;

    if (listViewMode === listViewModeCollection.table) {
      return this.renderTableView();
    }

    if (listViewMode === listViewModeCollection.list) {
      if (showSelect) {
        message.error('MultiListView显示模式下不支持选择');
      }

      return this.renderMultiListView();
    }

    message.error('未知的显示模式');

    return null;
  };

  renderCardExtraAction = () => {
    const { listViewMode, tableSize, refreshing } = this.state;

    if (listViewMode === listViewModeCollection.table) {
      return (
        <>
          <DensityAction
            tableSize={tableSize}
            setTableSize={(key) => {
              this.setTableSize(key);
            }}
          />

          <Tooltip title="刷新本页">
            <Button
              shape="circle"
              style={{
                color: '#000',
                border: 0,
              }}
              loading={refreshing}
              icon={<ReloadOutlined />}
              onClick={() => {
                this.refreshData();
              }}
            />
          </Tooltip>

          <ColumnSetting
            columns={this.getColumn()}
            columnsMap={this.getColumnsMap()}
            setColumnsMap={(e) => {
              this.setColumnsMap(e);
            }}
            setSortKeyColumns={(key) => {
              this.setSortKeyColumns(key);
            }}
          />
        </>
      );
    }

    return (
      <>
        <Tooltip title="刷新本页">
          <Button
            shape="circle"
            style={{
              color: '#000',
              border: 0,
            }}
            loading={refreshing}
            icon={<ReloadOutlined />}
            onClick={() => {
              this.refreshData();
            }}
          />
        </Tooltip>
      </>
    );
  };
}

export default MultiPage;
