import accessWayCollection from '@/utils/accessWayCollection';
import UpdateFormTab from '@/customComponents/CustomForm/UpdateFormTab';

class Base extends UpdateFormTab {
  componentAuthority = accessWayCollection.areaDistribution.add;

  goToUpdateWhenProcessed = true;

  getApiData = props => {
    const {
      areaAccount: { data },
    } = props;

    return data;
  };

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;
    return currentOperator;
  };

  getTempData = () => {
    const {
      global: { areaDistributionTempData },
    } = this.props;
    return areaDistributionTempData;
  };
}

export default Base;
