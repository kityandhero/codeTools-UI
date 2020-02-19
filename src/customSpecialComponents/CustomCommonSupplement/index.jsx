import {
  getDerivedStateFromPropsForUrlParams,
  refitCommonData,
  isInvalid,
  searchFromList,
} from '../../utils/tools';
import { unlimitedWithStringFlag } from '../../utils/constants';
import CustomCommonCore from '../../customComponents/Framework/CustomCommonCore';

import { customFieldCollection } from './customConstants';

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

  databaseTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const databaseTypeList = global.databaseTypeList || [];

    if (withUnlimited) {
      return refitCommonData(databaseTypeList, unlimitedWithStringFlag);
    }

    return refitCommonData(databaseTypeList);
  };

  getDatabaseTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.databaseTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderDatabaseTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDatabaseTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDatabaseTypeFormItem = (
    withUnlimited = true,
    label = customFieldCollection.databaseType.label,
  ) => {
    const title = label || customFieldCollection.databaseType.label;

    return this.renderSearchSelectFormItem(
      title,
      customFieldCollection.databaseType.name,
      withUnlimited,
    );
  };

  renderFormDatabaseTypeSelectFormItem = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.databaseType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseType.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.databaseType.label;

    return this.renderFormSelectFormItem(
      title,
      name,
      () => {
        return this.renderDatabaseTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormDatabaseTypeFormItemRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.databaseType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseType.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.databaseType.label;

    return this.renderFormRadioFormItem(
      title,
      name,
      () => {
        return this.renderDatabaseTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  databaseEncodingList = (withUnlimited = true) => {
    const { global } = this.props;

    const databaseEncodingList = global.databaseEncodingList || [];

    if (withUnlimited) {
      return refitCommonData(databaseEncodingList, unlimitedWithStringFlag);
    }

    return refitCommonData(databaseEncodingList);
  };

  getDatabaseEncodingName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.databaseEncodingList(false));
    return item == null ? '未知' : item.name;
  };

  renderDatabaseEncodingOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseEncodingList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDatabaseEncodingRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseEncodingList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDatabaseEncodingFormItem = (
    withUnlimited = true,
    label = customFieldCollection.databaseEncoding.label,
  ) => {
    const title = label || customFieldCollection.databaseEncoding.label;

    return this.renderSearchSelectFormItem(
      title,
      customFieldCollection.databaseEncoding.name,
      withUnlimited,
    );
  };

  renderFormDatabaseEncodingSelectFormItem = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.databaseEncoding.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseEncoding.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.databaseEncoding.label;

    return this.renderFormSelectFormItem(
      title,
      name,
      () => {
        return this.renderDatabaseEncodingOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormDatabaseEncodingFormItemRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.databaseEncoding.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseEncoding.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.databaseEncoding.label;

    return this.renderFormRadioFormItem(
      title,
      name,
      () => {
        return this.renderDatabaseEncodingOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };
}

export default Index;
