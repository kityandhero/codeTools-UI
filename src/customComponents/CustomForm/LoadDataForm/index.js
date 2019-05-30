import React, { Fragment } from 'react';
import { routerRedux } from 'dva/router';
import { BackTop, Button, Avatar } from 'antd';

import { defaultFormState, pretreatmentRequestParams } from '@/utils/tools';
import CustomBase from '@/customComponents/CustomBase';
import PageHeaderWrapperCustom from '@/customComponents/PageHeaderWrapperCustom';

import styles from './index.less';

class LoadDataForm extends CustomBase {
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      backPath: '',
      metaData: null,
    };
  }

  // eslint-disable-next-line no-unused-vars
  getStateNeedSetWillReceive = nextProps => ({});

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = nextProps => false;

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { op },
      },
    } = nextProps;

    const stateData = this.getStateNeedSetWillReceive(nextProps);

    this.setState(stateData, () => {
      const { dataLoading } = this.state;
      if (!dataLoading) {
        if (op === 'update' || this.checkNeedUpdate(nextProps)) {
          this.reloadData();

          const {
            dispatch,
            location: { pathname },
          } = this.props;

          dispatch(
            routerRedux.replace({
              pathname: `${pathname.replace('/update/', '/load/')}`,
            })
          );
        }
      }
    });
  }

  preInit = () => {
    this.setState(this.extendState(), () => {
      this.init();
    });
  };

  init = () => {
    this.setState(this.initState(), () => {
      this.initLoad();
    });
  };

  initState = () => ({});

  supplementLoadRequestParams = o => o;

  initLoad = () => {
    const { dispatch } = this.props;
    const { loadApiPath, loadDataAfterMount } = this.state;

    if (loadDataAfterMount) {
      let submitData = pretreatmentRequestParams({});

      submitData = this.supplementLoadRequestParams(submitData);

      this.setState(
        {
          dataLoading: true,
          loadSuccess: false,
          metaData: null,
        },
        () => {
          dispatch({
            type: loadApiPath,
            payload: submitData,
          }).then(() => {
            if (this.mounted) {
              const data = this.getApiData(this.props);

              const { dataSuccess } = data;

              if (dataSuccess) {
                const { data: metaData, extra } = data;

                this.setState({
                  metaData,
                });

                this.afterLoadSuccess(metaData, extra);
              }

              this.setState({ dataLoading: false, loadSuccess: dataSuccess });
            }
          });
        }
      );
    }
  };

  reloadData = () => {
    this.initLoad();
  };

  // eslint-disable-next-line no-unused-vars
  afterLoadSuccess = (metaData, extra) => {};

  backToList = () => {
    const { dispatch } = this.props;
    const { backPath } = this.state;

    const location = {
      pathname: backPath,
    };

    dispatch(routerRedux.push(location));
  };

  pageHeaderLogo = () => <Avatar shape="square" icon="plus" />;

  pageHeaderAction = () => {
    const { backPath } = this.state;

    if ((backPath || '') === '') {
      return null;
    }

    return (
      <Fragment>
        <div className={styles.backButtonBox}>
          <Button
            icon="rollback"
            onClick={e => {
              this.backToList(e);
            }}
          >
            列表页
          </Button>
        </div>
      </Fragment>
    );
  };

  formContent = () => null;

  render() {
    const { pageName } = this.state;

    return (
      <PageHeaderWrapperCustom title={pageName} logo={this.pageHeaderLogo()}>
        <div className={styles.containorBox}>
          {this.formContent()}
          {this.renderOther()}
        </div>
        <BackTop />
      </PageHeaderWrapperCustom>
    );
  }
}

export default LoadDataForm;
