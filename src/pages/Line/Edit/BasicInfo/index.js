import React, { Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Input,
  Spin,
  BackTop,
  DatePicker,
  notification,
  Icon,
  Affix,
} from 'antd';

import {
  refitFieldDecoratorOption,
  stringToMoment,
  dateToMoment,
  buildFieldDescription,
} from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';

import TabPageBase from '../../TabPageBase';

import { fieldData } from '../../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ line, global, loading }) => ({
  line,
  global,
  loading: loading.models.line,
}))
@Form.create()
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.line.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      lineId: null,
    };
  }

  initState = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = {
      lineId: id,
      loadApiPath: 'line/get',
      submitApiPath: 'line/updateBasicInfo',
    };

    return result;
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { lineId } = this.state;

    d.lineId = lineId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = data => {
    requestAnimationFrame(() => {
      this.refreshLineSelectCache();

      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  refreshLineSelectCache = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'line/listForEdit',
      payload: {},
    }).then(() => {
      if (this.mounted) {
        const {
          line: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { list: listData } = data;

          dispatch({
            type: 'global/setLine',
            payload: listData || [],
          });
        }
      }
    });
  };

  formContent = () => {
    const { form } = this.props;
    const { metaData, processing, dataLoading, loadSuccess } = this.state;
    const { getFieldDecorator } = form;

    return (
      <Fragment>
        <div className={styles.containorBox}>
          <Card
            title="线路信息"
            className={styles.card}
            bordered={false}
            extra={
              <Affix offsetTop={20}>
                {this.getErrorInfo()}
                <Button
                  type="primary"
                  icon="save"
                  disabled={dataLoading || processing || !loadSuccess}
                  onClick={this.validate}
                  loading={processing}
                >
                  保存
                </Button>
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.name}>
                      {getFieldDecorator(
                        'name',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.name || '',
                          metaData === null ? '' : metaData.name || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.name),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          disabled
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.name)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.driverName}>
                      {getFieldDecorator(
                        'driverName',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.driverName || '',
                          metaData === null ? '' : metaData.driverName || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.driverName),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.driverName)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.phone}>
                      {getFieldDecorator(
                        'phone',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.phone || '',
                          metaData === null ? '' : metaData.phone || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.phone),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.phone)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.phoneSpare}>
                      {getFieldDecorator(
                        'phoneSpare',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.phoneSpare || '',
                          metaData === null ? '' : metaData.phoneSpare || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.phoneSpare),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.phoneSpare)}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.carNo}>
                      {getFieldDecorator(
                        'carNo',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.carNo || '',
                          metaData === null ? '' : metaData.carNo || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.carNo),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.carNo)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.sort}>
                      {getFieldDecorator(
                        'sort',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.sort || '',
                          metaData === null ? '' : metaData.sort || '',
                          '',
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.sort),
                              },
                            ],
                          }
                        )
                      )(
                        <Input
                          addonBefore={<Icon type="form" />}
                          placeholder={buildFieldDescription(fieldData.sort)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.inTime}>
                      {getFieldDecorator(
                        'inTime',
                        refitFieldDecoratorOption(
                          metaData === null ? '' : metaData.inTime || '',
                          true,
                          dateToMoment(new Date()),
                          {
                            rules: [
                              {
                                required: false,
                                message: buildFieldDescription(fieldData.inTime),
                              },
                            ],
                          },
                          v => stringToMoment(v)
                        )
                      )(
                        <DatePicker
                          style={{ width: '100%' }}
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          inputReadOnly
                          disabled
                          placeholder={buildFieldDescription(fieldData.inTime)}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={6} md={12} sm={24} />
                </Row>
              </Form>
            </Spin>
          </Card>
        </div>
        <BackTop />
      </Fragment>
    );
  };
}

export default BasicInfo;
