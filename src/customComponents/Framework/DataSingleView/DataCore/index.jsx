import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import AuthorizationWrapper from '@/customComponents/Framework/AuthorizationWrapper';

class DataCore extends AuthorizationWrapper {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default DataCore;
