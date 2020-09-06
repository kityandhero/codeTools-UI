import { pretreatmentRemoteSingleData, getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import Common from '@/customComponents/Framework/Common';

class SupplementCore extends Common {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  pretreatmentImageUploadRemoteResponse = (response) => {
    let result = { image: '' };

    const v = pretreatmentRemoteSingleData(response);

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { imageUrl },
      } = v;

      result = { image: imageUrl || '' };
    }

    return result;
  };
}

export default SupplementCore;
