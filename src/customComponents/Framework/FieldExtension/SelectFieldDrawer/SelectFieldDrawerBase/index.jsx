import { message } from 'antd';

import { isFunction } from '@/utils/tools';

import Base from '../Base';

class SelectFieldDrawerBase extends Base {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        drawerVisible: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  afterDrawerClose = () => {
    this.setState({ drawerVisible: false });
  };

  afterDrawerSelectSuccess = (o) => {
    if ((o || null) == null) {
      const { fieldTitle, fieldPlaceholder } = this.getFieldData() || {
        fieldTitle: '',
        fieldPlaceholder: '请选择',
      };

      message.warn(`${fieldPlaceholder}${fieldTitle}`);

      return;
    }

    const { afterSelect } = this.props;

    this.setState({
      selectData: o,
    });

    if (isFunction(afterSelect)) {
      afterSelect(o);
    }
  };
}

export default SelectFieldDrawerBase;
