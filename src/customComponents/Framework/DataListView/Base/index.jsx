import React from 'react';
import {
  Form,
  Row,
  Col,
  Card,
  Alert,
  Tooltip,
  Button,
  DatePicker,
  BackTop,
  Divider,
  message,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  LoadingOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  defaultListState,
  buildFieldDescription,
  isArray,
  isUndefined,
  stringToMoment,
  recordText,
  getDerivedStateFromPropsForUrlParams,
} from '@/utils/tools';

import {
  buildButtonGroup,
  pageHeaderTitle,
  pageHeaderTagWrapper,
  pageHeaderContent,
  pageHeaderExtraContent,
} from '../../../FunctionComponent';
import { avatarImageLoadResultCollection, decorateAvatar } from '../../../DecorateAvatar';
import AuthorizationWrapper from '../../AuthorizationWrapper';
import { tableSizeConfig } from '../../../StandardTableCustom';

import DensityAction from '../DensityAction';
import ColumnSetting from '../ColumnSetting';
import BatchAction from '../BatchAction';

import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class ListBase extends AuthorizationWrapper {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    this.columnsOtherConfig = [];

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
      ...{
        listTitle: '检索结果',
        defaultAvatarIcon: <PictureOutlined />,
        avatarImageLoadResult: avatarImageLoadResultCollection.wait,
        showPageHeaderAvatar: false,
        tableSize: tableSizeConfig.middle,
        counterSetColumnsOtherConfig: 0,
        renderSearchForm: true,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.doOtherAfterLoadSuccess(metaData, metaListData, metaExtra, metaOriginalData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {};

  onDateRangeChange = (dates, dateStrings) => {
    this.setState({
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    });
  };

  handleSelectRows = (rows) => {
    this.setState({
      selectedDataTableDataRows: rows,
    });
  };

  clearSelectRow = () => {
    this.setState({
      selectedDataTableDataRows: [],
    });
  };

  setSearchFormFieldsValue = (v) => {
    const form = this.getSearchForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetSearchFormFieldsValue(v);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSetSearchFormFieldsValue = (v) => {};

  getPageName = () => {
    const { pageName } = this.state;

    return pageName;
  };

  getColumnWrapper = () => [];

  buildColumnFromWrapper = () => {
    const list = this.getColumnWrapper() || [];

    return list.map((o) => {
      const d = { ...o };

      const { dataTarget } = o;

      if ((dataTarget || null) == null) {
        const text = `错误的列配置:${JSON.stringify(o)}`;

        message.error(text);

        recordText(text);
      } else {
        const { label, name } = dataTarget;

        if ((label || null) == null || (name || null) == null) {
          const text = `错误的列配置:${JSON.stringify(o)}`;

          message.error(text);

          recordText(text);
        } else {
          d.title = label;
          d.dataIndex = name;
        }
      }

      return d;
    });
  };

  getColumn = () => {
    return this.buildColumnFromWrapper();
  };

  getColumnMerged = () => {
    let columns = [];

    const columnsSource = this.getColumn();

    const columnsOtherConfigArray = this.columnsOtherConfig || [];

    if (isArray(columnsOtherConfigArray)) {
      if (columnsOtherConfigArray.length > 0) {
        if (columnsSource.length !== columnsOtherConfigArray.length) {
          this.restoreColumnsOtherConfigArray();
        } else {
          columnsSource.forEach((item, index) => {
            const c = { ...item, ...columnsOtherConfigArray[index] };

            const { show } = c || { show: true };

            if (show) {
              columns.push(c);
            }
          });
        }
      } else {
        this.restoreColumnsOtherConfigArray();
        columns = columnsSource;
      }
    } else {
      columns = columnsSource;
    }

    return columns;
  };

  handleFormReset = () => {
    // 需要继承重载
  };

  // 其他项重置
  handleFormOtherReset = () => {};

  handleSearch = (e) => {
    e.preventDefault();

    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchForm();

    const { validateFields } = form;

    validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.searchData({ formValues: values });
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

  getSearchForm = () => {
    return this.formRef.current;
  };

  renderSimpleFormButton = (ColMd = 6) => {
    const { dataLoading, reloading, searching } = this.state;

    return (
      <Col md={ColMd} sm={24}>
        <span className={styles.submitButtons}>
          <Button
            disabled={dataLoading || reloading || searching}
            type="primary"
            onClick={(e) => {
              this.handleSearch(e);
            }}
          >
            {searching ? <LoadingOutlined /> : <SearchOutlined />}
            查询
          </Button>
          <Button
            disabled={dataLoading || reloading || searching}
            style={{ marginLeft: 8 }}
            onClick={() => {
              this.handleFormReset();
            }}
          >
            {reloading ? <LoadingOutlined /> : <ReloadOutlined />}
            重置
          </Button>
        </span>
      </Col>
    );
  };

  renderSimpleFormRangePicker = (dateRangeFieldName, colLg = 8, rangePickerProps = null) => {
    const { startTime, endTime } = this.state;

    const valueList = [];

    if ((startTime || null) != null) {
      valueList.push(stringToMoment(startTime));
    }

    if ((endTime || null) != null) {
      valueList.push(stringToMoment(endTime));
    }

    const p = {
      ...{
        style: { width: '100%' },
        showTime: { format: 'HH:mm' },
        value: valueList,
        format: 'YYYY-MM-DD HH:mm',
        placeholder: ['开始时间', '结束时间'],
        onChange: (dates, dateStrings) => {
          this.onDateRangeChange(dates, dateStrings);
        },
        ...(rangePickerProps || {}),
      },
    };

    return (
      <Col lg={colLg} md={12} sm={24} xs={24}>
        <FormItem
          label={dateRangeFieldName}
          rules={[
            {
              required: false,
              message: buildFieldDescription(dateRangeFieldName, '选择'),
            },
          ]}
        >
          <RangePicker {...p} />
        </FormItem>
      </Col>
    );
  };

  renderSimpleFormRow = () => {
    const { dateRangeFieldName } = this.state;

    return (
      <>
        <Row gutter={24}>
          {this.renderSimpleFormRangePicker(dateRangeFieldName, 10)}
          {this.renderSimpleFormButton()}
        </Row>
      </>
    );
  };

  renderSimpleFormInitialValues = () => {
    return {};
  };

  renderSimpleForm = () => (
    <Form
      ref={this.formRef}
      initialValues={this.renderSimpleFormInitialValues()}
      onSubmit={this.handleSearch}
      layout="horizontal"
    >
      {this.renderSimpleFormRow()}
    </Form>
  );

  renderForm = () => this.renderSimpleForm();

  // eslint-disable-next-line arrow-body-style
  buildTableOtherConfig = () => {
    // 可以配置额外的Table属性

    return {};
  };

  restoreColumnsOtherConfigArray = () => {
    const columnsOtherConfigArray = this.getColumn().map((item) => {
      return { dataIndex: item.dataIndex, show: true, fixed: item.fixed || '' };
    });

    this.columnsOtherConfig = columnsOtherConfigArray;
  };

  buildTableConfig = () => {
    const { tableSize } = this.state;

    const columns = this.getColumnMerged();

    return {
      ...this.buildTableOtherConfig(),
      columns,
      size: tableSize,
    };
  };

  setTableSize = (key) => {
    this.setState({ tableSize: key });
  };

  setColumnsMap = (e) => {
    if (Object.keys(e || {}).length === 0) {
      this.restoreColumnsOtherConfigArray();
    } else {
      const columnsOtherConfigArrayChanged = (this.columnsOtherConfig || []).map((item) => {
        const { dataIndex } = item;

        if (!isUndefined(e[dataIndex])) {
          const d = e[dataIndex];

          d.show = isUndefined(d.show) ? true : d.show;

          return { ...item, ...d };
        }

        return item;
      });

      this.columnsOtherConfig = columnsOtherConfigArrayChanged;
    }

    const { counterSetColumnsOtherConfig } = this.state;

    this.setState({ counterSetColumnsOtherConfig: counterSetColumnsOtherConfig + 1 });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSortKeyColumns = (e) => {};

  getColumnsMap = () => {
    const o = {};

    (this.columnsOtherConfig || []).forEach((item) => {
      const { dataIndex } = item;

      const temp = { ...{}, ...item };

      if (temp.delete) {
        temp.delete('dataIndex');
      }

      o[`${dataIndex}`] = temp;
    });

    return o;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBatchActionSelect = (key) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderTable = (config) => null;

  renderAlertContent = () => {
    return '';
  };

  renderAlertOption = () => {};

  renderAboveTable = () => {
    const content = this.renderAlertContent();
    const option = this.renderAlertOption();

    if (!content && !option) {
      return null;
    }

    return (
      <div className={styles.alertContainor}>
        <Alert
          message={
            <div className={styles.alertInfo}>
              <div className={styles.alertContent}>{content}</div>
              {option && <div className={styles.alertOption}>{option}</div>}
            </div>
          }
          type="info"
          showIcon
        />
      </div>
    );
  };

  renderExtraAction = () => null;

  renderBatchActionMenu = () => [];

  renderBatchAction = () => {
    const { showSelect, selectedDataTableDataRows } = this.state;

    const selectRows = isArray(selectedDataTableDataRows) ? selectedDataTableDataRows : [];

    if (showSelect) {
      const batchActionMenu = this.renderBatchActionMenu();

      if ((batchActionMenu || []).length > 0) {
        return (
          <>
            <BatchAction.Button
              onSelect={(key) => {
                this.onBatchActionSelect(key);
              }}
              menus={batchActionMenu}
              disabled={selectRows.length === 0}
            >
              批量操作
            </BatchAction.Button>

            <Divider type="vertical" />
          </>
        );
      }
    }

    return null;
  };

  buildOtherTabProps = () => {
    const tabListAvailable = this.getTabListAvailable();

    if (tabListAvailable.length > 0) {
      return {
        type: 'card',
        size: 'small',
        tabBarStyle: {
          marginBottom: 0,
        },
        tabBarGutter: 3,
      };
    }

    return null;
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getTabListAvailable = () => {
    const tabListAvailable = [];

    (this.tabList || []).forEach((o) => {
      const v = typeof o.show === 'undefined' ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    });

    return this.adjustTabListAvailable(tabListAvailable);
  };

  getTabActiveKey = () => {
    const {
      match,
      location: { pathname },
    } = this.props;

    return pathname
      .replace(/\//g, '-')
      .replace(`${match.url.replace(/\//g, '-')}-`, '')
      .replace(/-/g, '/');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleTabChange = (key) => {};

  onPageHeaderAvatarLoadErrorCallback = () => {
    this.setState({
      avatarImageLoadResult: avatarImageLoadResultCollection.fail,
    });
  };

  pageHeaderActionExtraGroup = () => null;

  pageHeaderAction = () => {
    const buttonGroupData = this.pageHeaderActionExtraGroup();

    return (
      <>
        <div className={styles.buttonBox}>{buildButtonGroup(buttonGroupData)}</div>
      </>
    );
  };

  pageHeaderTag = () => null;

  pageHeaderAvatar = () => {
    return null;
  };

  pageHeaderTitlePrefix = () => {
    return '';
  };

  pageHeaderSubTitle = () => null;

  pageHeaderContentData = () => null;

  renderPageHeaderContent = () => {
    return pageHeaderContent(this.pageHeaderContentData());
  };

  pageHeaderExtraContentData = () => null;

  renderPageHeaderExtraContent = () => {
    return pageHeaderExtraContent(this.pageHeaderExtraContentData());
  };

  renderCardExtraAction = () => {
    const { tableSize, refreshing } = this.state;

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
  };

  render() {
    const {
      listTitle,
      showPageHeaderAvatar,
      renderSearchForm,
      defaultAvatarIcon,
      dataLoading,
      reloading,
      avatarImageLoadResult,
    } = this.state;

    const extraAction = this.renderExtraAction();

    const tabListAvailable = this.getTabListAvailable();

    const avatarProps = showPageHeaderAvatar
      ? decorateAvatar(
          this.pageHeaderAvatar(),
          defaultAvatarIcon,
          showPageHeaderAvatar,
          dataLoading,
          reloading,
          avatarImageLoadResult,
          () => {
            this.onPageHeaderAvatarLoadErrorCallback();
          },
        )
      : null;

    return (
      <PageHeaderWrapper
        avatar={avatarProps}
        title={pageHeaderTitle(this.getPageName(), this.pageHeaderTitlePrefix())}
        subTitle={this.pageHeaderSubTitle()}
        tags={pageHeaderTagWrapper(this.pageHeaderTag())}
        extra={this.pageHeaderAction()}
        tabActiveKey={this.getTabActiveKey()}
        content={this.renderPageHeaderContent()}
        extraContent={this.renderPageHeaderExtraContent()}
        tabList={tabListAvailable}
        onTabChange={this.handleTabChange}
        tabProps={this.buildOtherTabProps()}
      >
        <div className={styles.containorBox}>
          {renderSearchForm ? (
            <Card bordered={false} className={styles.containorSearch}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
            </Card>
          ) : null}

          <Card
            title={listTitle}
            headStyle={{ borderBottom: '0px' }}
            bodyStyle={{ paddingTop: '0', paddingBottom: 10 }}
            bordered={false}
            className={styles.containorTable}
            extra={
              <>
                {extraAction}

                {extraAction == null ? null : <Divider type="vertical" />}

                {this.renderBatchAction()}

                {this.renderCardExtraAction()}

                {/* <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  disabled={processing}
                  onClick={e => {
                    this.validate(e, this.formRef.current);
                  }}
                  loading={processing}
                >
                  保存
                </Button> */}
              </>
            }
          >
            <div className={styles.tableList}>
              {this.renderAboveTable()}
              {this.renderLisView()}
            </div>
          </Card>
        </div>

        {this.renderOther()}
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default ListBase;
