import React from 'react';
import { connect } from 'dva';

import { Card, Form, Spin, notification, Icon, Input, Button } from 'antd';

import { buildFieldDescription, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import accessWayCollection from '@/utils/accessWayCollection';
import UpdateFormTab from '@/customComponents/Framework/CustomForm/UpdateFormTab';

import MerchantDrawer from '../../MerchantDrawer';
import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../../Assist/config';
import { fieldData } from '../../Common/data';

import styles from './index.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ merchant, global, loading }) => ({
  merchant,
  global,
  loading: loading.models.merchant,
}))
@Form.create()
class Index extends UpdateFormTab {
  componentAuthority = accessWayCollection.merchant.changeParentId;

  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        parentMerchantId: '',
        parentNickname: '',
        parentRealName: '',
        loadApiPath: 'merchant/get',
        submitApiPath: 'merchant/updateParentId',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  getApiData = props => {
    const {
      merchant: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = o => {
    const d = o;
    const { merchantId } = this.state;

    d.merchantId = merchantId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, metaListData, metaExtra, data) => {
    const { parentMerchantId, parentRealName } = metaData;

    this.setState({ parentMerchantId, parentRealName });
  };

  supplementSubmitRequestParams = o => {
    const d = o;
    const { merchantId, parentMerchantId } = this.state;

    d.merchantId = merchantId;
    d.parentMerchantId = parentMerchantId;

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess = data => {
    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '数据已经保存成功，请进行后续操作。',
      });
    });
  };

  showMerchantDrawer = () => {
    this.setState({
      merchantDrawerVisible: true,
    });
  };

  hideMerchantDrawer = () => {
    this.setState({ merchantDrawerVisible: false });
  };

  onMerchantDrawerClose = () => {
    this.setState({ merchantDrawerVisible: false });
  };

  afterMerchantDrawerSelect = record => {
    if (record != null) {
      const { merchantId: parentMerchantId, realName: parentRealName } = record;

      this.setState({ parentMerchantId, parentRealName }, () => {
        this.hideMerchantDrawer();
      });
    }
  };

  renderMerchantDrawer = () => {
    const { merchantDrawerVisible, metaData } = this.state;

    return (
      <MerchantDrawer
        visible={merchantDrawerVisible}
        sourceData={metaData}
        width={1200}
        afterSelect={this.afterMerchantDrawerSelect}
        onClose={this.hideMerchantDrawer}
        afterOperateSuccess={this.afterOperateSuccess}
        afterClose={this.onMerchantDrawerClose}
      />
    );
  };

  formContent = () => {
    const { loadSuccess, parentMerchantId, parentRealName } = this.state;
    const { processing, dataLoading } = this.state;

    return (
      <>
        <Card
          title={
            <>
              <Icon type="contacts" />
              <span className={styles.cardTitle}>变更上级</span>
            </>
          }
          className={styles.card}
          bordered={false}
        >
          <Spin spinning={dataLoading || processing}>
            <Form layout="horizontal" className={styles.customForm}>
              <FormItem {...formItemLayout} label={fieldData.parentMerchantId}>
                <Input
                  value={parentMerchantId || ''}
                  readOnly
                  disabled={!this.checkAuthority(accessWayCollection.merchant.updateParentId)}
                  placeholder={buildFieldDescription(fieldData.parentMerchantId)}
                  addonAfter={
                    this.checkAuthority(accessWayCollection.merchant.updateParentId) ? (
                      <Button
                        icon="form"
                        style={{
                          border: '0px solid #d9d9d9',
                          backgroundColor: '#fafafa',
                          height: '30px',
                        }}
                        disabled={dataLoading || processing || !loadSuccess}
                        title="调整上级"
                        onClick={this.showMerchantDrawer}
                      >
                        选择
                      </Button>
                    ) : null
                  }
                />
              </FormItem>
              <FormItem {...formItemLayout} label={fieldData.parentRealName}>
                {parentMerchantId === '' ? '无上级' : parentRealName || '未设置姓名'}
              </FormItem>
              <FormItem
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: {
                    span: formItemLayout.wrapperCol.span,
                    offset: formItemLayout.labelCol.span,
                  },
                }}
                label=""
              >
                <Button
                  type="primary"
                  icon="save"
                  disabled={
                    processing || !this.checkAuthority(accessWayCollection.merchant.updateParentId)
                  }
                  loading={processing}
                  onClick={this.validate}
                >
                  保存
                </Button>
              </FormItem>
            </Form>
          </Spin>
        </Card>
        {this.renderMerchantDrawer()}
      </>
    );
  };
}

export default Index;
