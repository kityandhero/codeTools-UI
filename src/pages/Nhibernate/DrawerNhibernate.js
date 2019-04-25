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
  Radio,
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
const RadioGroup = Radio.Group;
// const { MonthPicker } = DatePicker;

@connect(({ nhibernatecreator, folder, loading }) => ({
  nhibernatecreator,
  folder,
  loading: loading.models.nhibernatecreator,
}))
@Form.create()
class DrawerNhibernate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      creating: false,
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
    const { dispatch, form, tableList, conntag } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ creating: true });
        const submitValue = values;
        submitValue.tableList = tableList;
        submitValue.conntag = conntag;
        submitValue.type = 'nhibernate';
        // console.dir(submitValue);
        dispatch({
          type: 'nhibernatecreator/createcode',
          payload: submitValue,
        }).then(() => {
          this.setState({ creating: false });
          const {
            nhibernatecreator: { data },
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
    this.setState({ creating: true });
    dispatch({
      type: 'folder/opencodefolder',
    }).then(() => {
      this.setState({ creating: false });
      message.success('已打开代码文件夹。');
    });
  };

  render() {
    const { form, selectDatabaseName } = this.props;
    const { visible, creating, log } = this.state;
    const { getFieldDecorator } = form;

    return (
      <Drawer
        title={
          <span>
            <Icon type="code" style={{ marginRight: '10px' }} />
            {'生成以Nhibernate为数据操作底层的程序文件'}
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
                  配置文件模式
                  <Icon type="profile" style={{ marginLeft: '4px' }} />
                </Divider>
                <FormItem>
                  {getFieldDecorator('configmode', {
                    rules: [{ required: false, message: 'please enter url' }],
                    initialValue: 'OutXml',
                  })(
                    <RadioGroup style={{ width: '100%' }}>
                      <Radio value="OutXml">外置配置模式</Radio>
                      <Radio value="EmberResource">内嵌资源模式</Radio>
                      <Radio value="ConfigContent">传入内容模式</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Divider>
                  生成文件选项
                  <Icon type="form" style={{ marginLeft: '4px' }} />
                </Divider>
                <Row>
                  <Col span={4}>
                    <FormItem>
                      {getFieldDecorator('dal', {
                        rules: [{ required: false }],
                        initialValue: false,
                      })(<Checkbox>Dal</Checkbox>)}
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <FormItem>
                      {getFieldDecorator('dalex', {
                        rules: [{ required: false }],
                        initialValue: false,
                      })(<Checkbox>DalEx</Checkbox>)}
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <FormItem>
                      {getFieldDecorator('entity', {
                        rules: [{ required: false }],
                        initialValue: false,
                      })(<Checkbox>Entity</Checkbox>)}
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <FormItem>
                      {getFieldDecorator('entityex', {
                        rules: [{ required: false }],
                        initialValue: false,
                      })(<Checkbox>EntityEx</Checkbox>)}
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <FormItem>
                      {getFieldDecorator('dataxml', {
                        rules: [{ required: false }],
                        initialValue: false,
                      })(<Checkbox>Xml</Checkbox>)}
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
          >
            生成代码
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default DrawerNhibernate;
