import React from 'react';
import { message } from 'antd';

import {
  defaultListState,
  pretreatmentRequestParams,
  stringIsNullOrWhiteSpace,
} from '@/utils/tools';
import ListBase from '@/customComponents/Framework/CustomList/ListBase';
import StandardTableCustom from '@/customComponents/StandardTableCustom';

class SingleList extends ListBase {
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  handleFormReset = () => {
    const { form } = this.props;

    form.resetFields();

    this.handleFormOtherReset();

    this.setState(
      {
        formValues: {},
        startTime: '',
        endTime: '',
      },
      () => {
        this.loadData({});
      },
    );
  };

  initLoad = () => {
    const { loadApiPath } = this.state;

    if ((loadApiPath || '') === '') {
      message.error('loadApiPath需要配置');
      return;
    }

    this.loadData({});
  };

  loadData = (params, callback) => {
    const { dispatch } = this.props;
    const { loadApiPath } = this.state;

    let submitData = pretreatmentRequestParams(params, d => {
      const o = d;

      const { startTimeAlias, endTimeAlias, startTime, endTime } = this.state;

      if (!stringIsNullOrWhiteSpace(startTime)) {
        if (!stringIsNullOrWhiteSpace(startTimeAlias)) {
          o[startTimeAlias] = startTime;
        } else {
          o.startTime = startTime;
        }
      }

      if (!stringIsNullOrWhiteSpace(endTime)) {
        if (!stringIsNullOrWhiteSpace(endTimeAlias)) {
          o[endTimeAlias] = endTime;
        } else {
          o.endTime = endTime;
        }
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

        const { dataSuccess } = data;

        if (dataSuccess) {
          const customData = { list: data.list };

          this.setState({ customData });

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
      });
    });
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
      pagination: false,
      selectedRows: selectedDataTableDataRows,
      columns,
      onSelectRow: this.handleSelectRows,
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

export default SingleList;
