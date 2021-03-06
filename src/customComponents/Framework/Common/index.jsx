import React from 'react';
import { history } from 'umi';
import { Form, Select, Button, Radio, Input, InputNumber, DatePicker, message } from 'antd';
import { FormOutlined, SaveOutlined, LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import SyntaxHighlighter from 'react-syntax-highlighter';

import {
  getDerivedStateFromPropsForUrlParams,
  isEqual,
  isFunction,
  defaultCommonState,
  buildFieldDescription,
  pretreatmentRequestParams,
  buildFieldHelper,
  isUndefined,
  recordText,
  refitCommonData,
  isInvalid,
  searchFromList,
  stringIsNullOrWhiteSpace,
  recordObject,
  isObject,
  getGuid,
  formatDatetime,
} from '@/utils/tools';
import { unlimitedWithStringFlag } from '@/utils/constants';

import Core from '../Core';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea, Password } = Input;
const RadioGroup = Radio.Group;

class Common extends Core {
  loadDataAfterMount = true;

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
  getApiData = (props) => ({
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
    if (this.loadDataAfterMount) {
      this.initLoad();
    }

    this.initOther();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeFirstLoadRequest = (submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeReLoadRequest = (submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRequest = (submitData) => {};

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

  initLoadRequestParams = (o) => o || {};

  supplementLoadRequestParams = (o) => o || {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkLoadRequestParams = (o) => {
    return true;
  };

  initLoad = (callback = null) => {
    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
      dataLoading,
      loadSuccess,
    } = this.state;

    try {
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

      submitData = pretreatmentRequestParams(submitData || {});

      submitData = this.supplementLoadRequestParams(submitData || {});

      const checkResult = this.checkLoadRequestParams(submitData || {});

      if (checkResult) {
        if (!firstLoadSuccess) {
          this.beforeFirstLoadRequest(submitData || {});
        }

        if (reloadingBefore) {
          this.beforeReLoadRequest(submitData || {});
        }

        this.beforeRequest(submitData || {});

        if (dataLoading && !loadSuccess) {
          this.initLoadCore(submitData || {}, callback);
        } else {
          this.setState(
            {
              dataLoading: true,
              loadSuccess: false,
            },
            () => {
              this.initLoadCore(submitData || {}, callback);
            },
          );
        }
      }
    } catch (error) {
      recordText({ loadApiPath });

      throw error;
    }
  };

  initLoadCore = (requestData, callback) => {
    let loadApiPath = '';

    try {
      const { dispatch } = this.props;

      const requestingDataPre = this.getRequestingData();

      const { loadApiPath: loadApiPathValue, firstLoadSuccess } = this.state;

      loadApiPath = loadApiPathValue || '';

      // 处理频繁的相同请求
      if (
        !isEqual(requestingDataPre, {
          type: loadApiPath,
          payload: requestData,
        })
      ) {
        this.setRequestingData({ type: loadApiPath, payload: requestData });

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
          .catch((res) => {
            recordObject(res);
          });
      }
    } catch (error) {
      recordObject({ loadApiPath, requestData });

      throw error;
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
      location: { pathname },
    } = this.props;

    history.replace({
      pathname: `${pathname.replace('/load/', '/update/')}`,
    });
  }

  renderOther = () => {
    return null;
  };

  checkFromConfig = (label, name, helper) => {
    let labelText = 'object';
    let nameText = 'object';
    let helperText = 'object';

    if (isObject(label)) {
      message.error('label必须为文本');
      recordObject(label);
    } else {
      labelText = label;
    }

    if (isObject(name)) {
      message.error('name必须为文本');
      recordObject(name);
    } else {
      nameText = name;
    }

    if (isObject(helper)) {
      message.error('helper必须为文本');
      recordObject(helper);
    } else {
      helperText = helper;
    }

    return {
      label: labelText,
      name: nameText,
      helper: helperText,
    };
  };

  renderFromNowTimeField = (
    helper = '数据的添加时间',
    label = '添加时间',
    formItemLayout = null,
  ) => {
    const title = label || '添加时间';

    const resultCheck = this.checkFromConfig(title, '', helper);

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={resultCheck.label}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input
          value={formatDatetime(new Date(), 'YYYY-MM-DD HH:mm')}
          addonBefore={<FormOutlined />}
          disabled
          placeholder={buildFieldDescription(resultCheck.label)}
        />
      </FormItem>
    );
  };

  renderFromCreateTimeField = (
    name = 'createTime',
    helper = '数据的添加时间',
    label = '添加时间',
    formItemLayout = null,
  ) => {
    const title = label || '添加时间';

    const resultCheck = this.checkFromConfig(title, name, helper);

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input
          addonBefore={<FormOutlined />}
          disabled
          placeholder={buildFieldDescription(resultCheck.label)}
        />
      </FormItem>
    );
  };

  renderFromUpdateTimeField = (
    name = 'updateTime',
    helper = '数据的最后修改时间',
    label = '最后修改时间',
    formItemLayout = null,
  ) => {
    const title = label || '最后修改时间';

    const resultCheck = this.checkFromConfig(title, name, helper);

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input
          addonBefore={<FormOutlined />}
          disabled
          placeholder={buildFieldDescription(resultCheck.label)}
        />
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
      listData.forEach((item) => {
        const { name, flag, disabled } = item;

        list.push(
          <Radio key={`${flag}_${name}`} value={flag} disabled={disabled || false}>
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
      listData.forEach((item) => {
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

  renderSearchInput = (
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

    const resultCheck = this.checkFromConfig(title, name, helper);

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
        >
          <Input {...otherInputProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input {...otherInputProps} />
      </FormItem>
    );
  };

  renderFormDisplay = (label, content, formItemLayout = {}, useDisplayBoxStyle = true) => {
    const title = label;

    let labelText = 'object';

    if (isObject(title)) {
      message.error('label必须为文本');
    } else {
      labelText = title;
    }

    return (
      <FormItem {...formItemLayout} label={labelText}>
        <div className={useDisplayBoxStyle ? styles.displayBox : null}>{content}</div>
      </FormItem>
    );
  };

  renderFormHiddenWrapper = (children, hidden = true) => {
    if (hidden) {
      return <div className={styles.hidden}>{children}</div>;
    }

    return <>{children}</>;
  };

  renderFormInput = (
    label,
    name,
    required = false,
    helper = null,
    icon = <FormOutlined />,
    inputProps = {},
    canOperate = true,
    formItemLayout = {},
    reminderPrefix = '输入',
    hidden = false,
  ) => {
    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: icon,
        placeholder: canOperate ? buildFieldDescription(title, reminderPrefix) : '暂无数据',
        disabled: !canOperate,
      },
      ...(inputProps || {}),
    };

    const resultCheck = this.checkFromConfig(title, name, helper);

    if (!canOperate) {
      return this.renderFormHiddenWrapper(
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          rules={[
            {
              required,
              message: buildFieldDescription(resultCheck.label),
            },
          ]}
        >
          <Input {...otherInputProps} />
        </FormItem>,
        hidden,
      );
    }

    return this.renderFormHiddenWrapper(
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <Input {...otherInputProps} />
      </FormItem>,
      hidden,
    );
  };

  renderFormPassword = (
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

    const resultCheck = this.checkFromConfig(title, name, helper);

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          rules={[
            {
              required,
              message: buildFieldDescription(resultCheck.label),
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
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <Password {...otherInputProps} />
      </FormItem>
    );
  };

  renderFormOnlyShowText = (
    label,
    value,
    helper = null,
    formItemLayout = {},
    requiredForShow = false,
  ) => {
    const title = label;

    const resultCheck = this.checkFromConfig(title, getGuid(), helper);

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        className={requiredForShow ? styles.formItemOnlyShowText : null}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        {value}
      </FormItem>
    );
  };

  renderSyntaxHighlighter = (language, value) => {
    return (
      <>
        {isObject(value) ? (
          <SyntaxHighlighter
            language={language}
            // style={docco}
          >
            {language === 'javascript' ? JSON.stringify(value || {}, null, '    ') : value}
          </SyntaxHighlighter>
        ) : (
          <SyntaxHighlighter
            language={language}
            // style={docco}
          >
            {language === 'javascript'
              ? JSON.stringify(JSON.parse(value || null), null, '    ')
              : value}
          </SyntaxHighlighter>
        )}
      </>
    );
  };

  renderFormInnerComponent = (
    label,
    innerComponent,
    helper = null,
    formItemLayout = {},
    requiredForShow = false,
  ) => {
    const title = label;

    const resultCheck = this.checkFromConfig(title, getGuid(), helper);

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        className={requiredForShow ? styles.formItemOnlyShowText : null}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        {innerComponent}
      </FormItem>
    );
  };

  renderFormOnlyShowSyntaxHighlighter = (
    language,
    label,
    value,
    helper = null,
    formItemLayout = {},
    requiredForShow = false,
  ) => {
    return this.renderFormInnerComponent(
      label,
      this.renderSyntaxHighlighter(language, value),
      helper,
      formItemLayout,
      requiredForShow,
    );
  };

  renderFormOnlyShowInput = (
    label,
    value,
    helper = null,
    icon = <FormOutlined />,
    inputProps = { disabled: true },
    formItemLayout = {},
  ) => {
    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: icon,
        placeholder: '暂无数据',
        value: stringIsNullOrWhiteSpace(value || '') ? '' : value,
      },
      ...(inputProps || {}),
    };

    const resultCheck = this.checkFromConfig(title, getGuid(), helper);

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <Input {...otherInputProps} />
      </FormItem>
    );
  };

  renderFormInputNumber = (
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

    const resultCheck = this.checkFromConfig(title, name, helper);

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          rules={[
            {
              required,
              message: buildFieldDescription(resultCheck.label),
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
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <InputNumber {...otherInputNumberProps} />
      </FormItem>
    );
  };

  renderFormTextArea = (
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

    const resultCheck = this.checkFromConfig(title, name, helper);

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          rules={[
            {
              required,
              message: buildFieldDescription(resultCheck.label),
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
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <TextArea {...otherTextAreaProps} />
      </FormItem>
    );
  };

  renderFormDatePicker = (
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

    const resultCheck = this.checkFromConfig(title, name, helper);

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
        >
          <DatePicker {...otherDatePickerProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <DatePicker {...otherDatePickerProps} />
      </FormItem>
    );
  };

  renderFormSelect = (
    label,
    name,
    renderOptionFunction,
    helper = null,
    onChangeCallback = null,
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

    const resultCheck = this.checkFromConfig(label, name, helper);

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label, '选择'),
          },
        ]}
      >
        <Select {...otherSelectProps}>
          {isFunction(renderOptionFunction) ? renderOptionFunction() : null}
        </Select>
      </FormItem>
    );
  };

  renderFormRadio = (
    label,
    name,
    renderOptionFunction,
    helper = null,
    onChangeCallback = null,
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

    const resultCheck = this.checkFromConfig(label, name, helper);

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label, '选择'),
          },
        ]}
      >
        <RadioGroup {...otherRadioProps}>
          {isFunction(renderOptionFunction) ? renderOptionFunction() : null}
        </RadioGroup>
      </FormItem>
    );
  };

  renderSearchFormSelect = (label, name, options, helper = null) => {
    const resultCheck = this.checkFromConfig(label, name, helper);

    return (
      <FormItem
        label={resultCheck.label}
        name={resultCheck.name}
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label, '选择'),
          },
        ]}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Select
          placeholder={buildFieldDescription(resultCheck.label, '选择')}
          style={{ width: '100%' }}
        >
          {options}
        </Select>
      </FormItem>
    );
  };

  whetherList = (withUnlimited = true) => {
    const { global } = this.props;

    const whetherList = global.whetherList || [];

    if (withUnlimited) {
      return refitCommonData(whetherList, unlimitedWithStringFlag);
    }

    return refitCommonData(whetherList);
  };

  getWhetherName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.whetherList(false));
    return item == null ? '未知' : item.name;
  };

  renderWhetherOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.whetherList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderWhetherRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.whetherList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchWhetherFormItem = (label, name, withUnlimited = true) => {
    const title = label || '未知';

    if (stringIsNullOrWhiteSpace(label)) {
      message.error('renderSearchWhetherFormItem need param label。');
    }

    if (stringIsNullOrWhiteSpace(name)) {
      message.error('renderSearchWhetherFormItem need param name。');
    }

    return this.renderSearchFormSelect(title, name, this.renderWhetherOption(withUnlimited));
  };

  renderFormWhetherSelect = (
    label,
    name,
    helper = null,
    onChangeCallback,
    formItemLayout = null,
    required = true,
    otherProps = null,
  ) => {
    const title = label || '未知';

    if (stringIsNullOrWhiteSpace(label)) {
      message.error('renderSearchWhetherFormItem need param label。');
    }

    if (stringIsNullOrWhiteSpace(name)) {
      message.error('renderSearchWhetherFormItem need param name。');
    }

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderWhetherOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormWhetherFormItemRadio = (
    label,
    name,
    helper = null,
    onChangeCallback,
    formItemLayout = null,
    required = true,
    otherProps = null,
  ) => {
    const title = label || '未知';

    if (stringIsNullOrWhiteSpace(label)) {
      message.error('renderSearchWhetherFormItem need param label。');
    }

    if (stringIsNullOrWhiteSpace(name)) {
      message.error('renderSearchWhetherFormItem need param name。');
    }

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderWhetherRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  getOtherButtonDisabled = () => {
    return false;
  };

  getSaveButtonDisabled = () => {
    const { dataLoading, processing, loadSuccess } = this.state;

    if (this.loadDataAfterMount) {
      return dataLoading || processing || !loadSuccess;
    }

    return processing;
  };

  getSaveButtonLoading = () => {
    if (this.loadDataAfterMount) {
      const { dataLoading, loadSuccess } = this.state;

      return dataLoading || !loadSuccess;
    }

    return this.loadDataAfterMount;
  };

  getSaveButtonProcessing = () => {
    const { processing } = this.state;

    return processing;
  };

  getSaveButtonIcon = () => {
    return <SaveOutlined />;
  };

  getDisabledButtonIcon = () => {
    return <SaveOutlined />;
  };

  renderDisabledButton = (buttonText = '') => {
    return (
      <Button type="primary" disabled>
        {this.getDisabledButtonIcon()}
        {buttonText || '保存'}
      </Button>
    );
  };

  renderSaveButton = (buttonText = '', onClick = null) => {
    const buttonDisabled = this.getSaveButtonDisabled();
    const buttonProcessing = this.getSaveButtonProcessing();

    return (
      <Button
        type="primary"
        disabled={buttonDisabled}
        onClick={
          onClick == null
            ? (e) => {
                this.validate(e);
              }
            : onClick
        }
      >
        {buttonProcessing ? <LoadingOutlined /> : this.getSaveButtonIcon()}
        {buttonText || '保存'}
      </Button>
    );
  };

  buildOtherFormProps = () => {
    return {};
  };

  renderRefreshButton = () => {
    const { dataLoading, reloading, processing, loadSuccess } = this.state;

    return (
      <Button
        disabled={dataLoading || reloading || processing || !loadSuccess}
        onClick={this.reloadData}
      >
        {reloading ? <LoadingOutlined /> : <ReloadOutlined />}
        刷新
      </Button>
    );
  };
}

export default Common;
