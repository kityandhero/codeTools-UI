import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './Footer.less';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      className={styles.containorBox}
      links={[
        {
          key: 'dataCenter',
          title: (
            <Fragment>
              <Icon type="dashboard" />
              <span className={styles.footerLinkTitle}>数据中心</span>
            </Fragment>
          ),
          href: '/#/dashboard/analysis',
          // blankTarget: true,d
        },
        {
          key: 'product',
          title: (
            <Fragment>
              <Icon type="shop" />
              <span className={styles.footerLinkTitle}>商品管理</span>
            </Fragment>
          ),
          href: '/#/product/list',
          // blankTarget: true,
        },
        {
          key: 'order',
          title: (
            <Fragment>
              <Icon type="shopping-cart" />
              <span className={styles.footerLinkTitle}>订单管理</span>
            </Fragment>
          ),
          href: '/#/order/payment',
          // blankTarget: true,
        },
        {
          key: 'orderProcessing',
          title: (
            <Fragment>
              <Icon type="reconciliation" />
              <span className={styles.footerLinkTitle}>订单处理</span>
            </Fragment>
          ),
          href: '/#/orderProcessing/list/1/waitDeliver',
          // blankTarget: true,
        },
        {
          key: 'user',
          title: (
            <Fragment>
              <Icon type="team" />
              <span className={styles.footerLinkTitle}>用户管理</span>
            </Fragment>
          ),
          href: '/#/person/listRegUser',
          // blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 量子美食科技有限公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
