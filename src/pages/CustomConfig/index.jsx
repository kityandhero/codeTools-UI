import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Menu } from 'antd';
import { GridContent } from '@ant-design/pro-layout';

import { isArray, stringIsNullOrWhiteSpace } from '../../utils/tools';
import CustomAuthorization from '../../customComponents/Framework/CustomAuthorization';

import styles from './index.less';

const { Item } = Menu;

@connect(({ customConfig, global, loading }) => ({
  customConfig,
  global,
  loading: loading.models.customConfig,
}))
class Index extends CustomAuthorization {
  constructor(props) {
    super(props);

    const {
      match,
      location,
      global: { customConfigCategoryList },
    } = props;

    const {
      params: { category },
    } = match;

    const menuMap = {};

    let firstKey = null;
    let firstCategory = null;

    if (isArray(customConfigCategoryList)) {
      (customConfigCategoryList || []).forEach((o, index) => {
        const k = `c${o.flag}`;

        menuMap[k] = o.name;

        if (index === 0) {
          firstKey = k;
          firstCategory = o.flag;
        }
      });
    }

    const key = location.pathname.replace(`${match.path}/`, '');

    const currentCategory = stringIsNullOrWhiteSpace(category)
      ? firstCategory
      : category === 'no'
      ? firstCategory
      : category;

    this.state = {
      ...this.state,
      ...{
        loadDataAfterMount: false,
        mode: 'inline',
        menuMap,
        firstKey,
        firstCategory,
        currentCategory,
        selectKey: menuMap[key] ? key : firstKey,
      },
    };
  }

  doDidMountTask = () => {
    window.addEventListener('resize', this.resize);

    this.resize();
  };

  beforeUnmount = () => {
    window.removeEventListener('resize', this.resize);
  };

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    router.push(`/customConfig/category/${key}`);

    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      let mode = 'inline';

      if (this.main != null) {
        const { offsetWidth } = this.main;

        if (offsetWidth != null) {
          if (this.main.offsetWidth < 641 && offsetWidth > 400) {
            mode = 'horizontal';
          }
          if (window.innerWidth < 768 && offsetWidth > 400) {
            mode = 'horizontal';
          }
          this.setState({
            mode,
          });
        }
      }
    });
  };

  render() {
    const { children } = this.props;

    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className={styles.leftMenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default Index;
