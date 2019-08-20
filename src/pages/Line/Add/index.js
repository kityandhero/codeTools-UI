import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Button, Form, Row, Col, Input, Spin, notification, Icon, Affix } from 'antd';

import { refitFieldDecoratorOption, buildFieldDescription } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import AddFormBase from '@/customComponents/Framework/CustomForm/AddFormBase';

import { fieldData } from '../Common/data';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ line, global, loading }) => ({
  line,
  global,
  loading: loading.models.line,
}))
@Form.create()
class Edit extends AddFormBase {
  componentAuthority = accessWayCollection.line.add;

  getApiData = props => {
    const {
      line: { data },
    } = props;

    return data;
  };

  initState = () => {
    const result = {
      pageName: '增加线路',
      submitApiPath: 'line/addBasicInfo',
    };

    return result;
  };

  afterSubmitSuccess = data => {
    const { dispatch } = this.props;

    this.refreshLineSelectCache();

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行下一步操作。',
      });
    });

    const {
      data: { lineId },
    } = data;

    const location = {
      pathname: `/logistics/line/edit/load/${lineId}/1/basicInfo`,
    };

    dispatch(routerRedux.replace(location));
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
    const { processing } = this.state;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.containorBox}>
        <Card
          title="基本信息"
          className={styles.card}
          bordered={false}
          extra={
            <Affix offsetTop={20}>
              {this.getErrorInfo()}
              <Button
                type="primary"
                icon="save"
                disabled={processing}
                onClick={this.validate}
                loading={processing}
              >
                保存
              </Button>
            </Affix>
          }
        >
          <Spin spinning={processing}>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24}>
                  <FormItem label={fieldData.name}>
                    {getFieldDecorator(
                      'name',
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.name),
                          },
                        ],
                      })
                    )(
                      <Input
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
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.driverName),
                          },
                        ],
                      })
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
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.phone),
                          },
                        ],
                      })
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
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.phoneSpare),
                          },
                        ],
                      })
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
                      refitFieldDecoratorOption('', null, '', {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.carNo),
                          },
                        ],
                      })
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
                      refitFieldDecoratorOption(0, null, 0, {
                        rules: [
                          {
                            required: false,
                            message: buildFieldDescription(fieldData.sort),
                          },
                        ],
                      })
                    )(
                      <Input
                        addonBefore={<Icon type="form" />}
                        placeholder={buildFieldDescription(fieldData.sort)}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col lg={6} md={12} sm={24} />
                <Col lg={6} md={12} sm={24} />
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  };
}

export default Edit;
