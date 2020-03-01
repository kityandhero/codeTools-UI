import {
  getDerivedStateFromPropsForUrlParams,
  refitCommonData,
  isInvalid,
  searchFromList,
} from '../../utils/tools';
import { unlimitedWithStringFlag } from '../../utils/constants';
import CustomCommonCore from '../../customComponents/Framework/CustomCommonCore';
import { constants } from '../../customConfig/config';

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

  channelList = (withUnlimited = true) => {
    const { global } = this.props;

    const channelList = global.channelList || [];

    if (withUnlimited) {
      return refitCommonData(channelList, unlimitedWithStringFlag);
    }

    return refitCommonData(channelList);
  };

  getChannelName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.channelList(false));
    return item == null ? '未知' : item.name;
  };

  renderChannelOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.channelList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderChannelRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.channelList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchChannelFormItem = (withUnlimited = true, label = constants.channel.label) => {
    const title = label || constants.channel.label;

    return this.renderSearchSelectFormItem(
      title,
      constants.channel.name,
      this.renderChannelOption(withUnlimited),
    );
  };

  renderFormChannelSelectFormItem = (
    helper = null,
    onChangeCallback,
    label = constants.channel.label,
    formItemLayout = null,
    required = true,
    name = constants.channel.name,
    otherProps = null,
  ) => {
    const title = label || constants.channel.label;

    return this.renderFormSelectFormItem(
      title,
      name,
      () => {
        return this.renderChannelOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormChannelFormItemRadio = (
    helper = null,
    onChangeCallback,
    label = constants.channel.label,
    formItemLayout = null,
    required = true,
    name = constants.channel.name,
    otherProps = null,
  ) => {
    const title = label || constants.channel.label;

    return this.renderFormRadioFormItem(
      title,
      name,
      () => {
        return this.renderChannelOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

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
      this.renderDatabaseTypeOption(withUnlimited),
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
      this.renderDatabaseEncodingOption(withUnlimited),
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
        return this.renderDatabaseEncodingRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  accountStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const accountStatusList = global.accountStatusList || [];

    if (withUnlimited) {
      return refitCommonData(accountStatusList, unlimitedWithStringFlag);
    }

    return refitCommonData(accountStatusList);
  };

  getAccountStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.accountStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderAccountStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.accountStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAccountStatusRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.accountStatusList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAccountStatusFormItem = (
    withUnlimited = true,
    label = customFieldCollection.accountStatus.label,
  ) => {
    const title = label || customFieldCollection.accountStatus.label;

    return this.renderSearchSelectFormItem(
      title,
      customFieldCollection.accountStatus.name,
      this.renderAccountStatusOption(withUnlimited),
    );
  };

  renderFormAccountStatusSelectFormItem = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.accountStatus.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.accountStatus.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.accountStatus.label;

    return this.renderFormSelectFormItem(
      title,
      name,
      () => {
        return this.renderAccountStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormAccountStatusFormItemRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.accountStatus.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.accountStatus.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.accountStatus.label;

    return this.renderFormRadioFormItem(
      title,
      name,
      () => {
        return this.renderAccountStatusRadio(false);
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
