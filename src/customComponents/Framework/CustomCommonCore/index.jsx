import React from 'react';
import { routerRedux } from 'dva/router';
import { Form, Select, Radio, Input, InputNumber, DatePicker, message } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  isEqual,
  isFunction,
  defaultCommonState,
  buildFieldDescription,
  pretreatmentRequestParams,
  buildFieldHelper,
  isUndefined,
  recordLog,
} from '../../../utils/tools';
import CustomCore from '../CustomCore';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea, Password } = Input;
const RadioGroup = Radio.Group;

class Index extends CustomCore {
  lastRequestingData = { type: '', payload: {} };

  constructor(props) {
    super(props);

    const defaultState = defaultCommonState();

    this.state = {
      ...defaultState,
      ...{ backPath: '' },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  doDidMountTask = () => {
    this.adjustWhenDidMount();

    this.init();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => false;

  // 该方法必须重载覆盖
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getApiData = props => ({
    metaOriginalData: {
      dataSuccess: false,
    },
  });

  /**
   * 处理其他需要在组件挂在之后执行的流程
   *
   * @memberof Index
   */
  initOther = () => {};

  init = () => {
    this.initLoad();
    this.initOther();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeFirstLoadRequest = submitData => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeReLoadRequest = submitData => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRequest = submitData => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetReLoadRequestResult = (submitData, responseData) => {};

  getRequestingData() {
    return this.lastRequestingData;
  }

  setRequestingData(params, callback) {
    const d =
      params == null ? { type: '', payload: {} } : { ...{ type: '', payload: {} }, ...params };

    this.lastRequestingData = d;

    if (isFunction(callback)) {
      callback();
    }
  }

  clearRequestingData() {
    this.setRequestingData({ type: '', payload: {} });
  }

  initLoadRequestParams = o => o || {};

  supplementLoadRequestParams = o => o;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkLoadRequestParams = o => {
    return true;
  };

  initLoad = (callback = null) => {
    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
      dataLoading,
      loadSuccess,
      loadDataAfterMount,
    } = this.state;

    if (loadDataAfterMount) {
      if ((loadApiPath || '') === '') {
        message.error('loadApiPath需要配置');

        this.setState({
          dataLoading: false,
          loadSuccess: false,
          reloading: false,
          searching: false,
          refreshing: false,
          paging: false,
        });

        return;
      }

      let submitData = this.initLoadRequestParams() || {};

      submitData = pretreatmentRequestParams(submitData);

      submitData = this.supplementLoadRequestParams(submitData);

      const checkResult = this.checkLoadRequestParams(submitData);

      if (checkResult) {
        if (!firstLoadSuccess) {
          this.beforeFirstLoadRequest(submitData);
        }

        if (reloadingBefore) {
          this.beforeReLoadRequest(submitData);
        }

        this.beforeRequest(submitData);

        if (dataLoading && !loadSuccess) {
          this.initLoadCore(submitData, callback);
        } else {
          this.setState(
            {
              dataLoading: true,
              loadSuccess: false,
            },
            () => {
              this.initLoadCore(submitData, callback);
            },
          );
        }
      }
    } else {
      // 加载时执行完第一次方法之后设置为true
      this.setState({ loadDataAfterMount: true });
    }
  };

  initLoadCore = (requestData, callback) => {
    const { dispatch } = this.props;

    const requestingDataPre = this.getRequestingData();

    const { loadApiPath, firstLoadSuccess } = this.state;

    recordLog(`initLoadCore loadApiPath ${loadApiPath}`);

    // 处理频繁的相同请求
    if (
      !isEqual(requestingDataPre, {
        type: loadApiPath,
        payload: requestData,
      })
    ) {
      this.setRequestingData({ type: loadApiPath, payload: requestData });

      // recordLog(dispatch);
      // recordLog({
      //   type: loadApiPath,
      //   payload: requestData,
      // });

      dispatch({
        type: loadApiPath,
        payload: requestData,
      })
        .then(() => {
          const metaOriginalData = this.getApiData(this.props);

          if (isUndefined(metaOriginalData)) {
            return;
          }

          this.lastLoadParams = requestData;

          const { dataSuccess } = metaOriginalData;

          if (dataSuccess) {
            const { list: metaListData, data: metaData, extra: metaExtra } = metaOriginalData;

            this.setState({
              metaData: metaData || null,
              metaExtra: metaExtra || null,
              metaListData: metaListData || [],
              metaOriginalData,
            });

            this.afterLoadSuccess(
              metaData || null,
              metaListData || [],
              metaExtra || null,
              metaOriginalData,
            );
          }

          const { reloading: reloadingComplete } = this.state;

          if (reloadingComplete) {
            this.afterReloadSuccess();
            this.afterGetReLoadRequestResult(requestData, metaOriginalData);
          }

          this.setState({
            dataLoading: false,
            loadSuccess: dataSuccess,
            reloading: false,
            searching: false,
            refreshing: false,
            paging: false,
          });

          if (!firstLoadSuccess) {
            this.setState(
              {
                firstLoadSuccess: true,
              },
              () => {
                this.afterFirstLoadSuccess();

                this.afterGetFirstRequestResult(requestData, metaOriginalData);
              },
            );
          }

          this.afterGetRequestResult(requestData, metaOriginalData);

          if (typeof callback === 'function') {
            callback();
          }

          this.clearRequestingData();
        })
        .catch(res => {
          recordLog(res);
        });
    }
  };

  pageListData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ paging: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  reloadData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ reloading: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  searchData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ searching: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  refreshData = (callback = null) => {
    this.setState({ refreshing: true }, () => {
      this.initLoad(callback);
    });
  };

  reloadGlobalData = (callback = null) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/getMetaData',
      payload: { force: true },
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  afterFirstLoadSuccess = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {};

  afterReloadSuccess = () => {};

  backToList = () => {
    const { backPath } = this.state;

    this.goToPath(backPath);
  };

  checkWorkDoing() {
    const { dataLoading, reloading, searching, refreshing, paging, processing } = this.state;

    if (dataLoading || reloading || searching || refreshing || paging || processing) {
      message.info('数据正在处理中，请稍等一下再点哦');

      return true;
    }

    return false;
  }

  reloadByUrl() {
    const {
      dispatch,
      location: { pathname },
    } = this.props;

    dispatch(
      routerRedux.replace({
        pathname: `${pathname.replace('/load/', '/update/')}`,
      }),
    );
  }

  renderOther = () => {
    return null;
  };

  renderFromCreateTimeField = (
    name = 'createTime',
    helper = buildFieldHelper('数据的添加时间'),
    label = '添加时间',
    formItemLayout = null,
  ) => {
    const title = label || '添加时间';

    return (
      <FormItem {...(formItemLayout || {})} label={title} name={name} extra={helper}>
        <Input addonBefore={<FormOutlined />} disabled placeholder={buildFieldDescription(title)} />
      </FormItem>
    );
  };

  renderFromUpdateTimeField = (
    name = 'updateTime',
    helper = buildFieldHelper('数据的最后修改时间'),
    label = '最后修改时间',
    formItemLayout = null,
  ) => {
    const title = label || '最后修改时间';

    return (
      <FormItem {...(formItemLayout || {})} label={title} name={name} extra={helper}>
        <Input addonBefore={<FormOutlined />} disabled placeholder={buildFieldDescription(title)} />
      </FormItem>
    );
  };

  renderFromRadioCore = (listDataSource, adjustListDataCallback = null) => {
    let listData = listDataSource || [];

    if (isFunction(adjustListDataCallback)) {
      listData = adjustListDataCallback(listData);
    }

    const list = [];

    if (listData.length > 0) {
      listData.forEach(item => {
        const { name, flag } = item;
        list.push(
          <Radio key={flag} value={flag}>
            {name}
          </Radio>,
        );
      });

      return list;
    }

    return null;
  };

  renderFormOptionCore = (listDataSource, adjustListDataCallback = null) => {
    let listData = listDataSource || [];

    if (isFunction(adjustListDataCallback)) {
      listData = adjustListDataCallback(listData);
    }

    const list = [];

    if (listData.length > 0) {
      listData.forEach(item => {
        const { name, flag, disabled } = item;
        list.push(
          <Option key={`${flag}_${name}`} value={flag} disabled={disabled || false}>
            {name}
          </Option>,
        );
      });

      return list;
    }

    return null;
  };

  renderSearchInputFormItem = (
    label,
    name,
    helper = null,
    icon = <FormOutlined />,
    inputProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: icon,
        placeholder: buildFieldDescription(title, '输入'),
      },
      ...(inputProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem {...formItemLayout} label={title} name={name} extra={helper}>
          <Input {...otherInputProps} />
        </FormItem>
      );
    }

    return (
      <FormItem {...formItemLayout} label={title} name={name} extra={helper}>
        <Input {...otherInputProps} />
      </FormItem>
    );
  };

  renderFormInputFormItem = (
    label,
    name,
    required = false,
    helper = null,
    icon = <FormOutlined />,
    inputProps = {},
    canOperate = true,
    formItemLayout = {},
    reminderPrefix = '输入',
  ) => {
    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: icon,
        placeholder: buildFieldDescription(title, reminderPrefix),
        disabled: !canOperate,
      },
      ...(inputProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={title}
          name={name}
          extra={helper}
          rules={[
            {
              required,
              message: buildFieldDescription(title),
            },
          ]}
        >
          <Input {...otherInputProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={title}
        name={name}
        extra={helper}
        rules={[
          {
            required,
            message: buildFieldDescription(title),
          },
        ]}
      >
        <Input {...otherInputProps} />
      </FormItem>
    );
  };

  renderFormPasswordFormItem = (
    label,
    name,
    required = false,
    helper = null,
    icon = <FormOutlined />,
    inputProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: icon,
        placeholder: buildFieldDescription(title, '输入'),
      },
      ...(inputProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={title}
          name={name}
          extra={helper}
          rules={[
            {
              required,
              message: buildFieldDescription(title),
            },
          ]}
        >
          <Password {...otherInputProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={title}
        name={name}
        extra={helper}
        rules={[
          {
            required,
            message: buildFieldDescription(title),
          },
        ]}
      >
        <Password {...otherInputProps} />
      </FormItem>
    );
  };

  renderFormOnlyShowInputFormItem = (
    label,
    helper = null,
    icon = <FormOutlined />,
    inputProps = {},
    formItemLayout = {},
  ) => {
    return this.renderFormInputFormItem(
      label,
      '',
      false,
      helper,
      icon,
      inputProps,
      false,
      formItemLayout,
    );
  };

  renderFormInputNumberFormItem = (
    label,
    name,
    required = false,
    helper = null,
    inputNumberProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    const title = label;

    const otherInputNumberProps = {
      ...{
        style: { width: '100%' },
        min: 0,
        placeholder: buildFieldDescription(title, '输入'),
        disabled: !canOperate,
      },
      ...(inputNumberProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={title}
          name={name}
          extra={helper}
          rules={[
            {
              required,
              message: buildFieldDescription(title),
            },
          ]}
        >
          <InputNumber {...otherInputNumberProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={title}
        name={name}
        extra={helper}
        rules={[
          {
            required,
            message: buildFieldDescription(title),
          },
        ]}
      >
        <InputNumber {...otherInputNumberProps} />
      </FormItem>
    );
  };

  renderFormTextAreaFormItem = (
    label,
    name,
    required = false,
    helper = null,
    textAreaProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    const title = label;

    const otherTextAreaProps = {
      ...{
        placeholder: buildFieldDescription(title, '输入'),
        disabled: !canOperate,
      },
      ...(textAreaProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={title}
          name={name}
          extra={helper}
          rules={[
            {
              required,
              message: buildFieldDescription(title),
            },
          ]}
        >
          <TextArea {...otherTextAreaProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={title}
        name={name}
        extra={helper}
        rules={[
          {
            required,
            message: buildFieldDescription(title),
          },
        ]}
      >
        <TextArea {...otherTextAreaProps} />
      </FormItem>
    );
  };

  renderFormDatePickerFormItem = (
    label,
    name,
    required = false,
    helper = null,
    datePickerProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    const title = label;

    const otherDatePickerProps = {
      ...{
        style: { width: '100%' },
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        inputReadOnly: true,
        placeholder: buildFieldDescription(title, '选择'),
      },
      ...(datePickerProps || {}),
    };

    if (!canOperate) {
      return (
        <FormItem {...formItemLayout} label={title} name={name} extra={helper}>
          <DatePicker {...otherDatePickerProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={title}
        name={name}
        extra={helper}
        rules={[
          {
            required,
            message: buildFieldDescription(title),
          },
        ]}
      >
        <DatePicker {...otherDatePickerProps} />
      </FormItem>
    );
  };

  renderFormSelectFormItem = (
    label,
    name,
    renderOptionFunction,
    helper = null,
    onChangeCallback,
    formItemLayout = null,
    required = false,
    otherProps = null,
  ) => {
    const otherSelectProps = {
      ...{
        placeholder: buildFieldDescription(label, '选择'),
        style: { width: '100%' },
        onChange: (v, option) => {
          if (isFunction(onChangeCallback)) {
            onChangeCallback(v, option);
          }
        },
      },
      ...(otherProps || {}),
    };

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={label}
        name={name}
        extra={helper}
        rules={[
          {
            required,
            message: buildFieldDescription(label, '选择'),
          },
        ]}
      >
        <Select {...otherSelectProps}>
          {isFunction(renderOptionFunction) ? renderOptionFunction() : null}
        </Select>
      </FormItem>
    );
  };

  renderFormRadioFormItem = (
    label,
    name,
    renderOptionFunction,
    helper = null,
    onChangeCallback,
    formItemLayout = null,
    required = false,
    otherProps = null,
  ) => {
    const otherRadioProps = {
      ...{
        placeholder: buildFieldDescription(label, '选择'),
        style: { width: '100%' },
        onChange: (v, option) => {
          if (isFunction(onChangeCallback)) {
            onChangeCallback(v, option);
          }
        },
      },
      ...(otherProps || {}),
    };

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={label}
        name={name}
        extra={helper}
        rules={[
          {
            required,
            message: buildFieldDescription(label, '选择'),
          },
        ]}
      >
        <RadioGroup {...otherRadioProps}>
          {isFunction(renderOptionFunction) ? renderOptionFunction() : null}
        </RadioGroup>
      </FormItem>
    );
  };

  renderSearchSelectFormItem = (label, name, options, helper = null) => {
    return (
      <FormItem
        label={label}
        name={name}
        rules={[
          {
            required: false,
            message: buildFieldDescription(label, '选择'),
          },
        ]}
        help={helper}
      >
        <Select placeholder={buildFieldDescription(label, '选择')} style={{ width: '100%' }}>
          {options}
        </Select>
      </FormItem>
    );
  };
}

export default Index;
