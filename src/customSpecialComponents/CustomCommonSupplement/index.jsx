import { getDerivedStateFromPropsForUrlParams } from '../../utils/tools';
import CustomCommonCore from '../../customComponents/Framework/CustomCommonCore';

/**
 * 该类作为特有项目的补充，视具体项目进行增部方法
 *
 * @class Index
 * @extends {CustomCommonCore}
 */
class Index extends CustomCommonCore {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default Index;
