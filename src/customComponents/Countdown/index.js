import React, { PureComponent, Fragment } from 'react';

import styles from './index.less';

class Countdown extends PureComponent {
  mounted = false;

  timer = null;

  constructor(props) {
    super(props);
    this.state = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };
  }

  componentDidMount() {
    this.mounted = true;

    const { endTime: et } = this.props;

    if (et) {
      const endTime = et.replace(/-/g, '/');
      this.countFun(endTime);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { endTime: et } = nextProps;

    if (this.timer != null) {
      clearInterval(this.timer);
    }

    if (et) {
      const endTime = et.replace(/-/g, '/');
      this.countFun(endTime);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);

    this.mounted = false;
    this.setState = () => {};
  }

  countFun = time => {
    const et = new Date(time).getTime();
    let sysSecond = et - new Date().getTime();
    this.timer = setInterval(() => {
      // 防止倒计时出现负数
      if (sysSecond > 1000) {
        sysSecond -= 1000;
        const day = Math.floor(sysSecond / 1000 / 3600 / 24);
        const hour = Math.floor((sysSecond / 1000 / 3600) % 24);
        const minute = Math.floor((sysSecond / 1000 / 60) % 60);
        const second = Math.floor((sysSecond / 1000) % 60);
        this.setState({
          day,
          hour: hour < 10 ? `0${hour}` : hour,
          minute: minute < 10 ? `0${minute}` : minute,
          second: second < 10 ? `0${second}` : second,
        });
      } else {
        clearInterval(this.timer);

        // 倒计时结束时触发父组件的方法
        const { afterEnd } = this.props;
        if (typeof afterEnd === 'function') {
          afterEnd();
        }
      }
    }, 1000);
  };

  render() {
    const { title, endDescription } = this.props;
    const { day, hour, minute, second } = this.state;

    const t = title;
    const des = endDescription;

    return (
      <Fragment>
        <span className={styles.countdownContainor}>
          <span>{t}</span>{' '}
          <span>
            {day > 0 ? `${day}天` : null}
            {day === 0 && hour !== '00' ? `${hour}小时` : null}
            {day === 0 && hour === '00' && minute !== '00' ? `${minute}:${second}` : null}
            {day === 0 && hour === '00' && minute === '00' && second > 0 ? `${second}秒` : null}
            {day === 0 && hour === '00' && minute === '00' && second === 0 ? des : null}
          </span>
        </span>
      </Fragment>
    );
  }
}

export default Countdown;
