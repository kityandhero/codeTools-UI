import React from 'react';
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
  notification,
  Icon,
  Affix,
} from 'antd';

import {
  formatDatetime,
  buildFieldDescription,
  pretreatmentRemoteSingleData,
  getDerivedStateFromPropsForUrlParams,
  buildFieldHelper,
} from '../../../../utils/tools';
import accessWayCollection from '../../../../customConfig/accessWayCollection';

import TabPageBase from '../../TabPageBase';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

const FormItem = Form.Item;

@connect(({ connectionConfig, global, loading }) => ({
  connectionConfig,
  global,
  loading: loading.models.connectionConfig,
}))
@Form.create()
class Index extends TabPageBase {
  componentAuthority = accessWayCollection.connectionConfig.get;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'connectionConfig/get',
        submitApiPath: 'connectionConfig/updateBasicInfo',
        connectionId: null,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState
    );
  }

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const { imageName, imageUrl } = metaData;

    this.setState({ imageName, imageUrl });
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { connectionId, imageUrl, imageName } = this.state;

    d.connectionId = connectionId;
    d.imageUrl = imageUrl;
    d.imageName = imageName;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = (singleData, listData, extra, responseOriginalData, submitData) => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  handleMainUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ imageUploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { response } = info.file;

      const v = pretreatmentRemoteSingleData(response);

      const { dataSuccess } = v;

      if (dataSuccess) {
        const {
          data: { imageUrl, name },
        } = v;

        this.setState({
          imageUrl,
          imageName: name,
        });
      }

      this.setState({
        imageUploading: false,
      });
    }
  };

  formContent = () => {
    const { dataLoading, processing, metaData } = this.state;

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title="基本信息"
            className={styles.card}
            bordered={false}
            extra={
              <Affix offsetTop={20}>
                <>
                  <Button
                    type="primary"
                    icon="save"
                    disabled={dataLoading || processing}
                    onClick={this.validate}
                    loading={processing}
                  >
                    保存
                  </Button>
                </>
              </Affix>
            }
          >
            <Spin spinning={dataLoading || processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col lg={12} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.name,
                      'title',
                      metaData === null ? '' : metaData.title || '',
                      true,
                      buildFieldHelper(fieldData.nameHelper)
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputFormItem(
                      fieldData.contactInformation,
                      'contactInformation',
                      metaData === null ? '' : metaData.contactInformation || '',
                      true,
                      buildFieldHelper(fieldData.contactInformationHelper)
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    {this.renderFormInputNumberFormItem(
                      fieldData.sort,
                      'sort',
                      metaData === null ? '' : metaData.sort || '',
                      true,
                      buildFieldHelper(fieldData.sortHelper)
                    )}
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>

          <Card title="其他信息" className={styles.card} bordered={false}>
            <Spin spinning={processing}>
              <Form layout="vertical">
                <Row gutter={24}>
                  <Col span={24}>
                    {this.renderFormTextAreaFormItem(
                      fieldData.description,
                      'description',
                      metaData === null ? '' : metaData.description || '',
                      false,
                      buildFieldHelper(fieldData.descriptionHelper),
                      {
                        autoSize: { minRows: 3, maxRows: 5 },
                      }
                    )}
                  </Col>
                  <Col lg={6} md={12} sm={24}>
                    <FormItem label={fieldData.inTime}>
                      <Input
                        addonBefore={<Icon type="form" />}
                        value={formatDatetime(new Date(), 'YYYY-MM-DD HH:mm')}
                        disabled
                        placeholder={buildFieldDescription(fieldData.url)}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Card>
        </div>
        <BackTop />
      </>
    );
  };
}

export default Index;
