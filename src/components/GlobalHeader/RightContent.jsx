import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Icon, Tooltip } from 'antd';

import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
// import SelectLang from '../SelectLang';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const { theme, layout, global } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder={formatMessage({
          id: 'component.globalHeader.search',
        })}
        dataSource={[
          formatMessage({
            id: 'component.globalHeader.search.example1',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example2',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example3',
          }),
        ]}
        onSearch={value => {
          // eslint-disable-next-line no-console
          console.log('input', value);
        }}
        onPressEnter={value => {
          // eslint-disable-next-line no-console
          console.log('enter', value);
        }}
      />
      <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <Link to="/helpCenter/category/no/list" replace className={styles.action}>
          <Icon type="question-circle-o" />
        </Link>
      </Tooltip>
      <Avatar global={global} menu />
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default connect(({ global, settings }) => ({
  global,
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
