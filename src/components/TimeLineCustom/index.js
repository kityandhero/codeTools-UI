import React, { PureComponent } from 'react';
import moment from 'moment';
import { List, Icon } from 'antd';
import { getRandomColor } from '../../utils/utils';

import styles from './index.less';

class TimeLineCustom extends PureComponent {
  constructor(props) {
    super(props);

    this.currentTime = null;
    this.currentPageStart = true;

    this.state = {
      list: [],
      pagination: {},
    };
  }

  componentDidMount() {
    const {
      data: { list, pagination },
    } = this.props;

    this.setState({ list });
    this.setState({ pagination });
  }

  componentWillReceiveProps(nextProps) {
    const {
      data: { list, pagination },
    } = nextProps;
    this.currentTime = null;
    this.currentPageStart = true;
    this.setState({ list });
    this.setState({ pagination });
  }

  getCreateTimeDatePart = v => moment(v).format('YYYY-MM-DD');

  getCreateTimeTimePart = v => moment(v).format('HH:mm');

  handleTableChange = (pageNo, pageSize) => {
    const { onChange } = this.props;
    onChange(pageNo, pageSize);
  };

  renderDateLabel = v => {
    this.currentTime = this.currentTime || v;
    const preTime = this.currentTime || v;
    if (!this.currentPageStart && new Date(preTime).getDay() === new Date(v).getDay()) {
      return false;
    }

    this.currentPageStart = false;
    this.currentTime = v;
    return (
      <div className={`${styles.timelabel} ${styles.liitem}`}>
        <span className={styles.bgred}>{this.getCreateTimeDatePart(v)}</span>
      </div>
    );
  };

  renderInfo = item => {
    const {
      getBackgroundColorKey,
      getTime,
      getTitle,
      getDescription,
      getBottomLeft,
      getBottomRight,
    } = this.props;
    return (
      <div className={styles.liitem}>
        <Icon
          type="message"
          className={styles.fa}
          style={{
            backgroundColor: getRandomColor(getBackgroundColorKey(item)),
          }}
        />
        <div className={styles.timelineexitem}>
          <span className={styles.time}>
            <Icon
              type="clock-circle-o"
              className={styles.fa}
              style={{
                marginLeft: '20px',
                position: 'inherit',
                width: '12px',
                height: '12px',
                lineHeight: '12px',
                fontSize: '12px',
                marginRight: '2px',
              }}
            />
            {this.getCreateTimeTimePart(getTime(item))}
          </span>
          <h3 className={styles.timelineexheader}>{getTitle(item)}</h3>
          <div
            className={styles.timelineexbody}
            style={{
              fontSize: '13px',
            }}
          >
            {getDescription(item)}
          </div>
          <div className={styles.timelineexfooter}>
            <span
              style={{
                fontSize: '13px',
              }}
            >
              {getBottomLeft(item)}
            </span>
            <span
              style={{
                marginLeft: '20px',
                fontSize: '13px',
              }}
            >
              {getBottomRight(item)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading, getDateLabel } = this.props;
    const { list, pagination } = this.state;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
      onChange: this.handleTableChange,
    };

    return (
      <div className={styles.timelineexbox}>
        <div className={`${styles.timelineex} ${styles.timelineexinverse}`}>
          <List
            loading={loading}
            itemLayout="vertical"
            size="large"
            pagination={paginationProps}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.title}
                style={{
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  borderBottom: '0px',
                }}
              >
                <div>
                  {this.renderDateLabel(getDateLabel(item))}
                  {this.renderInfo(item)}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default TimeLineCustom;
