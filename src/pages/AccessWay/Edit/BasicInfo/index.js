import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Form, Row, Col, Spin, BackTop, Select, notification, Icon, Popover } from 'antd';

import HtmlBox from '@/customComponents/HtmlBox';
import { pretreatmentRequestParams, refitCommonData } from '@/utils/tools';

import { fieldData } from '../../Common/data';
import styles from './index.less';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class BasicInfo extends PureComponent {
  mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      metaData: null,
      dataLoading: true,
      // loadSuccess: false,
      saving: false,
      accessWayId: null,
    };
  }

  componentDidMount() {
    this.mounted = true;

    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.setState({ accessWayId: id }, () => {
      this.loadData();
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { op, id },
      },
    } = nextProps;

    const { accessWayId: accessWayIdPre } = this.state;

    this.setState({ accessWayId: id }, () => {
      const { dataLoading } = this.state;
      if (!dataLoading) {
        if (op === 'update' || accessWayIdPre !== id) {
          this.loadData();
        }
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    this.setState = () => {};
  }

  accessWayTypeList = () => {
    const { global } = this.props;
    return refitCommonData(global.accessWayTypeList);
  };

  sexList = () => {
    const { global } = this.props;
    return refitCommonData(global.sexList);
  };

  orderMessageList = () => [{ flag: 0, name: '不接受' }, { flag: 1, name: '接受' }];

  administrationAuthorityList = () => [{ flag: 0, name: '关闭' }, { flag: 1, name: '开启' }];

  loadData = () => {
    const { dispatch } = this.props;

    this.setState({
      dataLoading: true,
      //  loadSuccess: false,
      metaData: null,
    });

    const submitData = pretreatmentRequestParams({}, d => {
      const o = d;
      const { accessWayId } = this.state;

      o.accessWayId = accessWayId;

      return o;
    });

    dispatch({
      type: 'accessWay/get',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          accessWay: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;

          this.setState({
            metaData,
            //  loadSuccess: dataSuccess
          });
        }

        this.setState({ dataLoading: false });
      }
    });
  };

  reloadData = () => {
    this.loadData();
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      dispatch,
      form,
      location: { pathname },
    } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ saving: true });

        const submitData = pretreatmentRequestParams(values, d => {
          const o = d;
          const { accessWayId } = this.state;

          o.accessWayId = accessWayId;

          return o;
        });

        dispatch({
          type: 'accessWay/updateBasicInfo',
          payload: submitData,
        }).then(() => {
          if (this.mounted) {
            this.setState({ saving: false });

            const {
              accessWay: { data },
            } = this.props;

            const { dataSuccess } = data;

            if (dataSuccess) {
              requestAnimationFrame(() => {
                notification.success({
                  placement: 'bottomRight',
                  message: '操作结果',
                  description: '数据已经保存成功，请进行后续操作。',
                });
              });
            }

            dispatch(
              routerRedux.replace({
                pathname: `${pathname.replace('/load/', '/update/')}`,
              })
            );
          }
        });
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();

    this.reloadData();
  };

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldData[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
      location: { pathname },
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        this.setState({ saving: true });

        const submitData = pretreatmentRequestParams(values, d => {
          const o = d;
          const { accessWayId } = this.state;

          o.accessWayId = accessWayId;

          return o;
        });

        dispatch({
          type: 'accessWay/updateBasicInfo',
          payload: submitData,
        }).then(() => {
          if (this.mounted) {
            const {
              accessWay: { data },
            } = this.props;

            const { dataSuccess } = data;

            if (dataSuccess) {
              requestAnimationFrame(() => {
                notification.success({
                  placement: 'bottomRight',
                  message: '操作结果',
                  description: '数据已经保存成功，请进行后续操作。',
                });
              });
            }

            this.setState({ saving: false }, () => {
              dispatch(
                routerRedux.replace({
                  pathname: `${pathname.replace('/load/', '/update/')}`,
                })
              );
            });
          }
        });
      }
    });
  };

  render() {
    const { metaData, saving, dataLoading } = this.state;

    const accessWayTypeData = this.accessWayTypeList();
    const accessWayTypeOption = [];

    accessWayTypeData.forEach(item => {
      const { name, flag } = item;
      accessWayTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const sexData = this.sexList();
    const sexOption = [];

    sexData.forEach(item => {
      const { name, flag } = item;
      sexOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const orderMessageData = this.orderMessageList();
    const orderMessageOption = [];

    orderMessageData.forEach(item => {
      const { name, flag } = item;
      orderMessageOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    const administrationAuthorityData = this.administrationAuthorityList();
    const administrationAuthorityOption = [];

    administrationAuthorityData.forEach(item => {
      const { name, flag } = item;
      administrationAuthorityOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>
      );
    });

    return (
      <Fragment>
        <div className={styles.containorBox}>
          <Card
            title={
              <Fragment>
                <Icon type="contacts" />
                <span className={styles.cardTitle}>基本信息</span>
              </Fragment>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || saving}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={24} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.message}：${metaData === null ? '' : metaData.message || '无'}`}
                    </div>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={24} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.url}：${metaData === null ? '' : metaData.url || '无'}`}
                    </div>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.source}：${metaData === null ? '' : metaData.source || '无'}`}
                    </div>
                  </Col>

                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.userId}：${metaData === null ? '' : metaData.userId || '无'}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.scene}：${metaData === null ? '' : metaData.scene || '无'}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.host}：${metaData === null ? '' : metaData.host || '无'}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.port}：${metaData === null ? '' : metaData.port || '无'}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.log}：${metaData === null ? '' : metaData.log || '无'}`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.autoRemark}：${
                        metaData === null ? '' : metaData.autoRemark || '无'
                      }`}
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.ip}：${metaData === null ? '' : metaData.ip || '无'}`}
                    </div>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card
            title={
              <Fragment>
                <Icon type="contacts" />
                <span className={styles.cardTitle}>异常信息</span>
              </Fragment>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || saving}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={12} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.exceptionTypeName}：${
                        metaData === null ? '' : metaData.exceptionTypeName || '无'
                      }`}
                    </div>
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <div className={styles.fieldBox}>
                      {`${fieldData.exceptionTypeFullName}：${
                        metaData === null ? '' : metaData.exceptionTypeFullName || '无'
                      }`}
                    </div>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
          <Card
            title={
              <Fragment>
                <Icon type="project" />
                <span className={styles.cardTitle}>{fieldData.stackTrace}</span>
              </Fragment>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || saving}>
              <HtmlBox>
                {metaData === null
                  ? ''
                  : (metaData.stackTrace || '无').replace(new RegExp('\\r\\n', 'g'), '<br/>')}
              </HtmlBox>
            </Spin>
          </Card>
        </div>
        <BackTop />
      </Fragment>
    );
  }
}

export default BasicInfo;
