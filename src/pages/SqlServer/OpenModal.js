import React, { PureComponent } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
import {
  // Row,
  // Col,
  // Card,
  Form,
  Input,
  Select,
  // Icon,
  // Button,
  // Dropdown,
  // Menu,
  // InputNumber,
  // DatePicker,
  // Tooltip,
  Modal,
  Spin,
  // Modal,
  message,
  // Badge,
  // Divider,
  notification,
} from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
// const { MonthPicker } = DatePicker;

@connect(({ sqlserver, loading }) => ({
  sqlserver,
  loading: loading.models.sqlserver,
}))
@Form.create()
class OpenModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      opening: false,
      visible: false,
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

  handleOk = e => {
    e.preventDefault();
    const { dispatch, form, afterOK } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const submitValue = values;
        submitValue.dbtype = 'SqlServer';

        if ((submitValue.name || '') === '') {
          message.error('请输入数据库连接名称');
          return;
        }

        if ((submitValue.conn || '') === '') {
          message.error('请输入数据库连接字符串');
          return;
        }

        this.setState({ opening: true });

        dispatch({
          type: 'sqlserver/open',
          payload: submitValue,
        }).then(() => {
          this.setState({ opening: false });
          const {
            sqlserver: { data },
          } = this.props;

          const { message: messageText, data: databaseList } = data;
          if (messageText !== '') {
            message.error(messageText);
          }

          afterOK(databaseList || [], submitValue.conn);

          notification.success({
            placement: 'bottomRight',
            message: '操作结果',
            description: '已通过数据库连接字符串成功连接数据库。',
          });
        });
      }
    });
  };

  handleCancel = e => {
    e.preventDefault();
    const { afterCancel } = this.props;
    this.setState({ visible: false });
    afterCancel();
  };

  render() {
    const { form } = this.props;
    const { visible, opening } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    return (
      <Modal
        title="打开/更换Sql Server数据库"
        width={600}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Spin spinning={opening}>
          <Form>
            <FormItem {...formItemLayout} label="连接名称" hasFeedback>
              {getFieldDecorator('name', {
                rules: [{ required: false, message: '请输入连接名称!' }],
                initialValue: '',
              })(<Input placeholder="请输入连接名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="数据库类型">
              {getFieldDecorator('version', {
                rules: [{ required: false, message: '请选择数据库类型!' }],
                initialValue: '1',
              })(
                <Select
                  placeholder="请选择数据库类型"
                  // onChange={handleChange}
                >
                  <Select.Option key="0" value="1">
                    Server2005OrLater
                  </Select.Option>
                  <Select.Option key="1" value="2">
                    Server2005EverywhereEdition
                  </Select.Option>
                  <Select.Option key="2" value="0">
                    Server2000
                  </Select.Option>
                  <Select.Option key="3" value="3">
                    Server7
                  </Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="连接字符串" hasFeedback>
              {getFieldDecorator('conn', {
                rules: [{ required: false, message: '请输入连接字符串!' }],
                initialValue: '',
              })(<TextArea placeholder="请输入连接字符串" autosize={{ minRows: 3, maxRows: 8 }} />)}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

export default OpenModal;
