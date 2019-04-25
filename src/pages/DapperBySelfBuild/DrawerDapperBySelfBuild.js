import React, { PureComponent } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
import {
  Row,
  Col,
  // Card,
  Form,
  // List,
  // Avatar,
  Input,
  Button,
  // Select,
  // DatePicker,
  Checkbox,
  // Tooltip,
  // Radio,
  Drawer,
  // BackTop,
  Spin,
  Divider,
  message,
  Icon,
  // notification,
} from 'antd';

// const { TextArea } = Input;
const FormItem = Form.Item;
// const RadioGroup = Radio.Group;
// const { MonthPicker } = DatePicker;

@connect(({ dapperbyselfbuildcreator, folder, loading }) => ({
  dapperbyselfbuildcreator,
  folder,
  loading: loading.models.dapperbyselfbuildcreator,
}))
@Form.create()
class DrawerDapperBySelfBuild extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      creating: false,
      folderOpening: false,
      visible: false,
      log: '',
    };
  }

  componentDidMount() {
    const { visible } = this.props;
    this.setState({ visible });
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  onClose = () => {
    const { afterCancel } = this.props;
    afterCancel();
  };

  handleOk = e => {
    e.preventDefault();
    const { dispatch, form, tablelist, conntag } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ creating: true });
        const submitValue = values;
        submitValue.tablelist = tablelist;
        submitValue.conntag = conntag;
        submitValue.type = 'dapperbyselfbuiltcreator';
        // console.dir(submitValue);
        dispatch({
          type: 'dapperbyselfbuildcreator/createcode',
          payload: submitValue,
        }).then(() => {
          this.setState({ creating: false });
          const {
            dapperbyselfbuildcreator: { data },
          } = this.props;

          const { message: messageText, error } = data;
          if (messageText !== '') {
            message.error(messageText);
          }

          this.setState({ log: messageText });

          if (error === 0) {
            message.success('代码生成成功。');
          }
        });
      }
    });
  };

  openFolder = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.setState({ folderOpening: true });

    dispatch({
      type: 'folder/openfolder',
      payload: {
        timespan: new Date().getTime(),
      },
    }).then(() => {
      this.setState({ folderOpening: false });
      message.success('已打开代码文件夹。');
    });
  };

  render() {
    const { form, selectDatabaseName } = this.props;
    const { visible, creating, log, folderOpening } = this.state;
    const { getFieldDecorator } = form;

    return (
      <Drawer
        title={
          <span>
            <Icon type="code" style={{ marginRight: '10px' }} />
            {'生成以内置模板为数据操作底层的程序文件'}
          </span>
        }
        width={720}
        placement="right"
        visible={visible}
        selectDatabaseName={selectDatabaseName}
        maskClosable={false}
        onClose={this.onClose}
        style={{
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: 53,
        }}
      >
        <Spin spinning={creating}>
          <Form onSubmit={this.handleOk}>
            <Row gutter={16}>
              <Col span={12}>
                <Divider>
                  名字空间
                  <Icon type="edit" style={{ marginLeft: '4px' }} />
                </Divider>
                <FormItem>
                  {getFieldDecorator('namespace', {
                    rules: [{ required: true, message: '请输入名字空间' }],
                    initialValue: selectDatabaseName,
                  })(<Input placeholder="请输入名字空间" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <Divider>
                  输出选项
                  <Icon type="paper-clip" style={{ marginLeft: '4px' }} />
                </Divider>
                <Row>
                  <Col span={12}>
                    <FormItem>
                      {getFieldDecorator('project', {
                        rules: [{ required: false, message: 'please enter url' }],
                        initialValue: false,
                      })(<Checkbox>项目文件</Checkbox>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem>
                      {getFieldDecorator('conaindll', {
                        rules: [{ required: false, message: 'please enter url' }],
                        initialValue: false,
                      })(<Checkbox>输出DLL资源</Checkbox>)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Divider>
                  日志输出
                  <Icon type="exception" style={{ marginLeft: '4px' }} />
                </Divider>
                <div style={{ marginBottom: '24px' }}>{log}</div>
              </Col>
            </Row>
          </Form>
        </Spin>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button
            style={{
              marginRight: 8,
            }}
            type="dashed"
            icon="folder-open"
            loading={folderOpening}
            disabled={folderOpening}
            onClick={this.openFolder}
          >
            打开文件夹
          </Button>
          <Button
            style={{
              marginRight: 8,
            }}
            icon="close"
            onClick={this.onClose}
          >
            关闭面版
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleOk}
            icon="play-circle"
            loading={creating}
            disabled={creating}
          >
            生成代码
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default DrawerDapperBySelfBuild;
