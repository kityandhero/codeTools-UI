import {
  getDerivedStateFromPropsForUrlParams,
  refitCommonData,
  isInvalid,
  searchFromList,
  buildFieldDescription,
  isUndefined,
} from '@/utils/tools';
import { unlimitedWithStringFlag } from '@/utils/constants';
import { constants } from '@/customConfig/config';

import { customFieldCollection } from './customConstants';
import SupplementCore from '../SupplementCore';

const unknownLabel = '未知';

/**
 * 该类作为特有项目的补充，视具体项目进行增部方法
 *
 * @class Index
 * @extends {Common}
 */
class Supplement extends Common {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  getCustomConfigCategoryList = () => {
    const { global } = this.props;

    const customConfigCategoryList = global.customConfigCategoryList || [];

    return refitCommonData(customConfigCategoryList);
  };

  daoTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const daoTypeList = global.daoTypeList || [];

    if (withUnlimited) {
      return refitCommonData(daoTypeList, unlimitedWithStringFlag);
    }

    return refitCommonData(daoTypeList);
  };

  getDaoTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', `${(isUndefined(v) ? null : v) == null ? '' : v}`, this.daoTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderDaoTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.daoTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDaoTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.daoTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDaoTypeSelect = (
    withUnlimited = true,
    label = customFieldCollection.daoType.label,
    name = customFieldCollection.daoType.name,
    helper = customFieldCollection.daoType.helper,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderDaoTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormDaoTypeSelect = (
    helper = customFieldCollection.daoType.helper,
    onChangeCallback,
    label = customFieldCollection.daoType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.daoType.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderDaoTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormDaoTypeRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.daoType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.daoType.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderDaoTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  generatorTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const generatorTypeList = global.generatorTypeList || [];

    if (withUnlimited) {
      return refitCommonData(generatorTypeList, unlimitedWithStringFlag);
    }

    return refitCommonData(generatorTypeList);
  };

  getGeneratorTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList('flag', `${(isUndefined(v) ? null : v) == null ? '' : v}`, this.generatorTypeList(false));
    return item == null ? '未知' : item.name;
  };

  renderGeneratorTypeOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.generatorTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderGeneratorTypeRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.generatorTypeList(withUnlimited);

    return this.renderFromRadioCore(listData, adjustListDataCallback);
  };

  renderSearchGeneratorTypeSelect = (
    withUnlimited = true,
    label = customFieldCollection.generatorType.label,
    name = customFieldCollection.generatorType.name,
    helper = customFieldCollection.generatorType.helper,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderGeneratorTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormGeneratorTypeSelect = (
    helper = customFieldCollection.generatorType.helper,
    onChangeCallback,
    label = customFieldCollection.generatorType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.generatorType.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderGeneratorTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormGeneratorTypeRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.generatorType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.generatorType.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderGeneratorTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
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

    const item = searchFromList('flag', `${(isUndefined(v) ? null : v) == null ? '' : v}`, this.channelList(false));
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

  renderSearchChannelSelect = (
    withUnlimited = true,
    label = constants.channel.label,
    name = constants.channel.name,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(title, name, this.renderChannelOption(withUnlimited));
  };

  renderFormChannelSelect = (
    helper = null,
    onChangeCallback,
    label = constants.channel.label,
    formItemLayout = null,
    required = true,
    name = constants.channel.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
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

  renderFormChannelRadio = (
    helper = null,
    onChangeCallback,
    label = constants.channel.label,
    formItemLayout = null,
    required = true,
    name = constants.channel.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
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

    const item = searchFromList('flag', `${(isUndefined(v) ? null : v) == null ? '' : v}`, this.databaseConnectionTypeList(false));
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

  renderSearchDatabaseConnectionTypeSelect = (
    withUnlimited = true,
    label = customFieldCollection.databaseConnectionType.label,
    name = customFieldCollection.databaseConnectionType.name,
    helper = customFieldCollection.databaseConnectionType.helper,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderDatabaseConnectionTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormDatabaseConnectionTypeSelect = (
    helper = customFieldCollection.databaseConnectionType.helper,
    onChangeCallback,
    label = customFieldCollection.databaseConnectionType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseConnectionType.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
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

  renderFormDatabaseConnectionTypeRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.databaseConnectionType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseConnectionType.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
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

    const item = searchFromList('flag', `${(isUndefined(v) ? null : v) == null ? '' : v}`, this.databaseDatabaseTypeList(false));
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

  renderSearchDatabaseDatabaseTypeSelect = (
    withUnlimited = true,
    label = customFieldCollection.databaseDatabaseType.label,
    name = customFieldCollection.databaseDatabaseType.name,
    helper = customFieldCollection.databaseDatabaseType.helper,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderDatabaseDatabaseTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormDatabaseDatabaseTypeSelectSelect = (
    helper = customFieldCollection.databaseDatabaseType.helper,
    onChangeCallback,
    label = customFieldCollection.databaseDatabaseType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseDatabaseType.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
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

  renderFormDatabaseDatabaseTypeRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.databaseDatabaseType.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseDatabaseType.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
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

    const item = searchFromList('flag', `${(isUndefined(v) ? null : v) == null ? '' : v}`, this.databaseEncodingList(false));
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

  renderSearchDatabaseEncodingSelect = (
    withUnlimited = true,
    label = customFieldCollection.databaseEncoding.label,
    name = customFieldCollection.databaseEncoding.name,
    helper = customFieldCollection.databaseEncoding.helper,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderDatabaseEncodingOption(withUnlimited),
      helper,
    );
  };

  renderFormDatabaseEncodingSelect = (
    helper = customFieldCollection.databaseEncoding.helper,
    onChangeCallback,
    label = customFieldCollection.databaseEncoding.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseEncoding.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
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

  renderFormDatabaseEncodingRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.databaseEncoding.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.databaseEncoding.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
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

    const item = searchFromList('flag', `${(isUndefined(v) ? null : v) == null ? '' : v}`, this.fileEncodingList(false));
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

  renderSearchFileEncodingSelect = (
    withUnlimited = true,
    label = customFieldCollection.fileEncoding.label,
    name = customFieldCollection.fileEncoding.name,
    helper = customFieldCollection.fileEncoding.helper,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderFileEncodingOption(withUnlimited),
      helper,
    );
  };

  renderFormFileEncodingSelect = (
    helper = customFieldCollection.fileEncoding.helper,
    onChangeCallback,
    label = customFieldCollection.fileEncoding.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.fileEncoding.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
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

  renderFormFileEncodingRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.fileEncoding.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.fileEncoding.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
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

    const item = searchFromList('flag', `${(isUndefined(v) ? null : v) == null ? '' : v}`, this.accountStatusList(false));
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

  renderSearchAccountStatusSelect = (
    withUnlimited = true,
    label = customFieldCollection.accountStatus.label,
    name = customFieldCollection.accountStatus.name,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(title, name, this.renderAccountStatusOption(withUnlimited));
  };

  renderFormAccountStatusSelect = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.accountStatus.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.accountStatus.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
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

  renderFormAccountStatusRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.accountStatus.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.accountStatus.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
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

    const item = searchFromList('flag', `${(isUndefined(v) ? null : v) == null ? '' : v}`, this.dataColumnStatusList(false));
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

  renderSearchDataColumnStatusSelect = (
    withUnlimited = true,
    label = customFieldCollection.dataColumnStatus.label,
    name = customFieldCollection.dataColumnStatus.name,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderDataColumnStatusOption(withUnlimited),
    );
  };

  renderFormDataColumnStatusSelect = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.dataColumnStatus.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.dataColumnStatus.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
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

  renderFormDataColumnStatusRadio = (
    helper = null,
    onChangeCallback,
    label = customFieldCollection.dataColumnStatus.label,
    formItemLayout = null,
    required = true,
    name = customFieldCollection.dataColumnStatus.name,
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
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

export default Supplement;
