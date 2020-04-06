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

  getCustomConfigCategoryList = () => {
    const { global } = this.props;

    const customConfigCategoryList = global.customConfigCategoryList || [];

    return refitCommonData(customConfigCategoryList);
  };

  getChannelName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.channelList(false));
    return item == null ? '未知' : item.name;
  };

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

  databaseConnectionTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const databaseConnectionTypeList = global.databaseConnectionTypeList || [];

    if (withUnlimited) {
      return refitCommonData(databaseConnectionTypeList, unlimitedWithStringFlag);
    }

    return refitCommonData(databaseConnectionTypeList);
  };

  getDatabaseConnectionTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.databaseConnectionTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderDatabaseConnectionTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseConnectionTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDatabaseConnectionTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseConnectionTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDatabaseConnectionTypeFormItem = (
    withUnlimited = true,
    label = customFieldCollection.databaseConnectionType.label,
    helper = customFieldCollection.databaseConnectionType.helper,
  ) => {
    const title = label || customFieldCollection.databaseConnectionType.label;

    return this.renderSearchSelectFormItem(
      title,
      customFieldCollection.databaseConnectionType.name,
      this.renderDatabaseConnectionTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormDatabaseConnectionTypeSelectFormItem = (
    helper = customFieldCollection.databaseConnectionType.helper,
    onChangeCallback,
    label = customFieldCollection.databaseConnectionType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseConnectionType.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.databaseConnectionType.label;

    return this.renderFormSelectFormItem(
      title,
      name,
      () => {
        return this.renderDatabaseConnectionTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormDatabaseConnectionTypeFormItemRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.databaseConnectionType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseConnectionType.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.databaseConnectionType.label;

    return this.renderFormRadioFormItem(
      title,
      name,
      () => {
        return this.renderDatabaseConnectionTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  databaseDatabaseTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const databaseDatabaseTypeList = global.databaseDatabaseTypeList || [];

    if (withUnlimited) {
      return refitCommonData(databaseDatabaseTypeList, unlimitedWithStringFlag);
    }

    return refitCommonData(databaseDatabaseTypeList);
  };

  getDatabaseDatabaseTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.databaseDatabaseTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderDatabaseDatabaseTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseDatabaseTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDatabaseDatabaseTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.databaseDatabaseTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDatabaseDatabaseTypeFormItem = (
    withUnlimited = true,
    label = customFieldCollection.databaseDatabaseType.label,
    helper = customFieldCollection.databaseDatabaseType.helper,
  ) => {
    const title = label || customFieldCollection.databaseDatabaseType.label;

    return this.renderSearchSelectFormItem(
      title,
      customFieldCollection.databaseDatabaseType.name,
      this.renderDatabaseDatabaseTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormDatabaseDatabaseTypeSelectFormItem = (
    helper = customFieldCollection.databaseDatabaseType.helper,
    onChangeCallback,
    label = customFieldCollection.databaseDatabaseType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseDatabaseType.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.databaseDatabaseType.label;

    return this.renderFormSelectFormItem(
      title,
      name,
      () => {
        return this.renderDatabaseDatabaseTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormDatabaseDatabaseTypeFormItemRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.databaseDatabaseType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseDatabaseType.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.databaseDatabaseType.label;

    return this.renderFormRadioFormItem(
      title,
      name,
      () => {
        return this.renderDatabaseDatabaseTypeOption(false);
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
    helper = customFieldCollection.databaseEncoding.helper,
  ) => {
    const title = label || customFieldCollection.databaseEncoding.label;

    return this.renderSearchSelectFormItem(
      title,
      customFieldCollection.databaseEncoding.name,
      this.renderDatabaseEncodingOption(withUnlimited),
      helper,
    );
  };

  renderFormDatabaseEncodingSelectFormItem = (
    helper = customFieldCollection.databaseEncoding.helper,
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

  fileEncodingList = (withUnlimited = true) => {
    const { global } = this.props;

    const fileEncodingList = global.fileEncodingList || [];

    if (withUnlimited) {
      return refitCommonData(fileEncodingList, unlimitedWithStringFlag);
    }

    return refitCommonData(fileEncodingList);
  };

  getFileEncodingName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.fileEncodingList(false));
    return item == null ? '未知' : item.name;
  };

  renderFileEncodingOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.fileEncodingList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderFileEncodingRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.fileEncodingList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchFileEncodingFormItem = (
    withUnlimited = true,
    label = customFieldCollection.fileEncoding.label,
    helper = customFieldCollection.fileEncoding.helper,
  ) => {
    const title = label || customFieldCollection.fileEncoding.label;

    return this.renderSearchSelectFormItem(
      title,
      customFieldCollection.fileEncoding.name,
      this.renderFileEncodingOption(withUnlimited),
      helper,
    );
  };

  renderFormFileEncodingSelectFormItem = (
    helper = customFieldCollection.fileEncoding.helper,
    onChangeCallback,
    label = customFieldCollection.fileEncoding.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.fileEncoding.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.fileEncoding.label;

    return this.renderFormSelectFormItem(
      title,
      name,
      () => {
        return this.renderFileEncodingOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormFileEncodingFormItemRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.fileEncoding.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.fileEncoding.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.fileEncoding.label;

    return this.renderFormRadioFormItem(
      title,
      name,
      () => {
        return this.renderFileEncodingRadio(false);
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

  dataColumnStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const dataColumnStatusList = global.dataColumnStatusList || [];

    if (withUnlimited) {
      return refitCommonData(dataColumnStatusList, unlimitedWithStringFlag);
    }

    return refitCommonData(dataColumnStatusList);
  };

  getDataColumnStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', v, this.dataColumnStatusList(false));
    return item == null ? '未知' : item.name;
  };

  renderDataColumnStatusOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.dataColumnStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDataColumnStatusRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.dataColumnStatusList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDataColumnStatusFormItem = (
    withUnlimited = true,
    label = customFieldCollection.dataColumnStatus.label,
  ) => {
    const title = label || customFieldCollection.dataColumnStatus.label;

    return this.renderSearchSelectFormItem(
      title,
      customFieldCollection.dataColumnStatus.name,
      this.renderDataColumnStatusOption(withUnlimited),
    );
  };

  renderFormDataColumnStatusSelectFormItem = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.dataColumnStatus.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.dataColumnStatus.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.dataColumnStatus.label;

    return this.renderFormSelectFormItem(
      title,
      name,
      () => {
        return this.renderDataColumnStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormDataColumnStatusFormItemRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.dataColumnStatus.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.dataColumnStatus.name,
    otherProps = null,
  ) => {
    const title = label || customFieldCollection.dataColumnStatus.label;

    return this.renderFormRadioFormItem(
      title,
      name,
      () => {
        return this.renderDataColumnStatusRadio(false);
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
