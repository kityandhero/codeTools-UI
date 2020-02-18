import React from 'react';
import classNames from 'classnames';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Row, Col, Spin } from 'antd';

import { isFunction, trim, replace } from '../../utils/tools';
import defaultSettings from '../../../config/defaultSettings';
import CustomBase from '../Framework/CustomBase';

import styles from './index.less';

class ImageBox extends CustomBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        src: '',
        aspectRatio: 1,
        borderRadiusDefaultStyle: {},
        imageBoxStyle: {},
        borderRadius: false,
        showMode: 'box',
        circle: false,
        backgroundColor: {},
        showOverlay: false,
        overlayText: '',
        loadingEffect: false,
        hide: false,
        loadSuccess: false,
        errorOverlayVisible: false,
        errorOverlayText: '加载失败',
        showErrorOverlay: false,
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      src,
      aspectRatio,
      imageBoxStyle,
      borderRadius: borderRadiusValue,
      showMode: showModeValue,
      circle: circleValue,
      backgroundColor: backgroundColorValue,
      showOverlay: showOverlayValue,
      overlayText: overlayTextValue,
      loadingEffect: loadingEffectValue,
      errorOverlayVisible: errorOverlayVisibleValue,
      errorOverlayText: errorOverlayTextValue,
    } = nextProps;

    let imageSrc = src || '';

    let aspectRatioVerify = aspectRatio || 1;

    const showOverlay = showOverlayValue || false;

    const errorOverlayVisible = errorOverlayVisibleValue || false;

    const errorOverlayText = errorOverlayTextValue || '加载失败';

    const loadingEffect = loadingEffectValue || false;

    const overlayText = overlayTextValue || '';

    aspectRatioVerify = aspectRatioVerify <= 0 ? 1 : aspectRatioVerify;

    // eslint-disable-next-line no-constant-condition
    const borderRadiusDefaultStyle = borderRadiusValue || true ? { borderRadius: '4px' } : {};

    const circle = circleValue || false;

    if (circle) {
      borderRadiusDefaultStyle.borderRadius = '50%';
    }

    if (trim(replace(imageSrc || '', ' ', '')) === '') {
      imageSrc = defaultSettings.defaultEmptyImage;
    }

    const imageBoxStyleMerge = {
      ...imageBoxStyle,
      ...borderRadiusDefaultStyle,
      // ...(hide ? { display: "none" } : {})
    };

    const backgroundColor =
      (backgroundColorValue || null) == null ? {} : { backgroundColor: backgroundColorValue };

    const showMode = showModeValue || 'box';

    const result = {
      src: imageSrc,
      aspectRatio: aspectRatioVerify,
      showOverlay,
      loadingEffect,
      overlayText,
      borderRadiusDefaultStyle,
      circle,
      backgroundColor,
      showMode,
      imageBoxStyle: imageBoxStyleMerge,
      errorOverlayVisible,
      errorOverlayText,
    };

    const { src: srcPre, showErrorOverlay } = prevState;

    return { ...result, ...{ showErrorOverlay: srcPre === imageSrc ? showErrorOverlay : false } };
  }

  onImageLoadSuccess() {
    const { showOverlay: showOverlayValue, loadingEffect: loadingEffectValue } = this.props;

    const showOverlay = showOverlayValue || false;

    const loadingEffect = loadingEffectValue || false;

    if (loadingEffect && !showOverlay) {
      this.setState({
        loadSuccess: true,
      });
    }
  }

  onImageError() {
    const { hideWhenLoadError } = this.props;
    const { hide, errorOverlayVisible } = this.state;

    this.setState({
      hide: hideWhenLoadError ? true : hide,
      showErrorOverlay: errorOverlayVisible,
      loadSuccess: true,
    });
  }

  onImageClick() {
    const { clickAction } = this.props;

    if (isFunction(clickAction)) {
      clickAction();
    }
  }

  render() {
    const {
      src,
      aspectRatio,
      imageBoxStyle,
      showMode,
      showOverlay,
      overlayText,
      loadingEffect,
      hide,
      loadSuccess,
      showErrorOverlay,
      errorOverlayText,
    } = this.state;

    if (hide) {
      return null;
    }

    if (showMode === 'loading' || showMode === 'box') {
      return (
        <div className={styles.imageBox} style={{ ...imageBoxStyle }}>
          {aspectRatio === 1 ? <div className={styles.placeholderBox} /> : null}

          {aspectRatio !== 1 ? (
            <div className={styles.placeholderBox} style={{ marginTop: `${aspectRatio * 100}%` }} />
          ) : null}

          {showOverlay ? (
            <div className={classNames(styles.overlayBox, styles.overlayTextBackground)}>
              <Row type="flex" align="middle" justify="center" className={styles.overlayTextInner}>
                <Col>
                  <div className={styles.overlayText}>{overlayText}</div>
                </Col>
              </Row>
            </div>
          ) : null}

          {showMode === 'loading' ? (
            <div>
              <Spin indicator={<LegacyIcon type="loading" style={{ fontSize: 18 }} spin />} />
            </div>
          ) : null}

          {loadingEffect && !loadSuccess && !showOverlay ? (
            <div className={classNames(styles.overlayBox, styles.overlayLoading)}>
              <div className={styles.loadingBoxInner}>
                <div>
                  <Spin indicator={<LegacyIcon type="loading" style={{ fontSize: 18 }} spin />} />
                </div>
              </div>
            </div>
          ) : null}

          {showErrorOverlay ? (
            <div className={classNames(styles.overlayBox, styles.overlayErrorBackground)}>
              <Row type="flex" align="middle" justify="center" className={styles.overlayTextInner}>
                <Col>
                  <div className={styles.overlayText}>{errorOverlayText}</div>
                </Col>
              </Row>
            </div>
          ) : null}

          {showMode === 'box' ? (
            <img
              className={classNames(
                styles.imageItem,
                loadingEffect && !showOverlay
                  ? !loadSuccess
                    ? styles.imageLoadAnimationInit
                    : styles.imageLoadAnimation
                  : ''
              )}
              style={imageBoxStyle}
              src={src}
              onLoad={() => {
                this.onImageLoadSuccess();
              }}
              onError={() => {
                this.onImageError();
              }}
              onClick={() => {
                this.onImageClick();
              }}
              alt=""
            />
          ) : null}
        </div>
      );
    }
    if (showMode === 'contentImage') {
      return (
        <div style={imageBoxStyle}>
          <img
            className={styles.contentImage}
            src={src}
            onError={this.onImageError}
            onClick={this.onImageClick}
            alt=""
          />
        </div>
      );
    }

    return null;
  }
}

export default ImageBox;
