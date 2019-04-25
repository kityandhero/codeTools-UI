import React from 'react';
import { message } from 'antd';

import {
  defaultPageListState,
  pretreatmentRequestParams,
  saveJsonToLocalStorage,
  getValue,
  getJsonFromLocalStorage,
  dateToMoment,
} from '@/utils/tools';
import ListBase from '@/customComponents/CustomList/ListBase';
import StandardTableCustom from '@/customComponents/StandardTableCustom';

class PagerList extends ListBase {
  lastLoadParams = null;

  constructor(props) {
    super(props);

    const defaultState = defaultPageListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  handleFormReset = () => {
    const { form } = this.props;
    const { pageSize } = this.state;

    form.resetFields();

    this.setState(
      {
        formValues: {},
        startTime: '',
        endTime: '',
      },
      () => {
        this.loadData({ pageNo: 1, pageSize });
      }
    );
  };

  initLoad = () => {
    const { match, form } = this.props;
    const { params } = match;
    const { pageKey } = params;
    const { paramsKey, loadApiPath } = this.state;

    if ((paramsKey || '') === '') {
      message.error('paramsKey需要配置');
      this.setState({ dataLoading: false });
      return;
    }

    if ((loadApiPath || '') === '') {
      message.error('loadApiPath需要配置');
      return;
    }

    const p = getJsonFromLocalStorage(paramsKey);

    if (pageKey === 'key' && p != null) {
      this.loadData(p);

      if (p.startTime && p.endTime) {
        p.dateRange = [dateToMoment(p.startTime), dateToMoment(p.endTime)];
        // p.dateRange = `${p.startTime}-${p.endTime}`;
      }

      Object.keys(form.getFieldsValue()).forEach(key => {
        const c = p[key] === 0 ? 0 : p[key] || null;

        if (c != null) {
          const obj = {};
          obj[key] = c;
          form.setFieldsValue(obj);
        }
      });

      return;
    }

    const { pageNo, pageSize } = this.state;

    this.loadData({ pageNo, pageSize });
  };

  loadData = (params, callback) => {
    const { dispatch } = this.props;
    const { loadApiPath, paramsKey } = this.state;
    const { pageNo: pageNoParam } = params;
    let submitData = pretreatmentRequestParams(params, d => {
      const o = d;

      const { startTime, endTime } = this.state;

      if ((startTime || '') !== '') {
        o.startTime = startTime;
      }

      if ((endTime || '') !== '') {
        o.endTime = endTime;
      }

      delete o.dateRange;

      return o;
    });

    submitData = this.supplementLoadRequestParams(submitData);

    this.setState({ dataLoading: true });

    dispatch({
      type: loadApiPath,
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const data = this.getApiData(this.props);

        this.lastLoadParams = params;

        saveJsonToLocalStorage(paramsKey, this.lastLoadParams);

        const { dataSuccess } = data;

        if (dataSuccess) {
          this.setState({ customData: data, pageNo: pageNoParam });

          if (typeof this.afterLoadSuccess === 'function') {
            this.afterLoadSuccess(data);
          }
        }

        this.setState({ dataLoading: false });

        if (typeof callback === 'function') {
          callback();
        }
      }
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    const { pageSize } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      this.loadData({
        ...values,
        pageNo: 1,
        pageSize,
      });
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    this.loadData(params);
  };

  renderTable = () => {
    const {
      tableScroll,
      showSelect,
      selectedDataTableDataRows,
      customData,
      dataLoading,
      processing,
    } = this.state;

    const { styleSet, columns, expandedRowRender } = this.buildTableConfig();

    const standardTableCustomOption = {
      loading: dataLoading || processing,
      data: customData,
      showSelect,
      selectedRows: selectedDataTableDataRows,
      columns,
      onSelectRow: this.handleSelectRows,
      onChange: this.handleStandardTableChange,
    };

    if ((styleSet || null) != null) {
      standardTableCustomOption.style = styleSet;
    }

    if ((tableScroll || null) != null) {
      standardTableCustomOption.scroll = tableScroll;
    }

    if ((expandedRowRender || null) != null) {
      standardTableCustomOption.expandedRowRender = expandedRowRender;
    }

    return <StandardTableCustom {...standardTableCustomOption} />;
  };
}

export default PagerList;
