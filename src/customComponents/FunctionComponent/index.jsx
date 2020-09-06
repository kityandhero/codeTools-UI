import React from 'react';
import Texty from 'rc-texty';
import { Button, Row, Col, Dropdown, Descriptions, Popconfirm, Menu, message } from 'antd';
import { EllipsisOutlined, LoadingOutlined } from '@ant-design/icons';

import { formatDatetime, isArray, copyToClipboard, stringIsNullOrWhiteSpace } from '@/utils/tools';

const ButtonGroup = Button.Group;
const { Item: Description } = Descriptions;

export function pageHeaderTitle(pageName, headerTitlePrefix) {
  const headerTitlePrefixValue = headerTitlePrefix || '';

  return (
    <span
      style={{
        display: 'block',
        maxWidth: '700px',
        height: '32px',
        overflow: 'hidden',
        fontSize: '18px',
        lineHeight: '32px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      <Row>
        <Col>
          {stringIsNullOrWhiteSpace(headerTitlePrefixValue) ? '' : `${headerTitlePrefixValue}：`}
        </Col>
        <Col flex="auto">
          <Texty type="alpha" mode="smooth">
            {pageName || ''}
          </Texty>
        </Col>
      </Row>
    </span>
  );
}

export function buildDescriptionGrid(list, props) {
  if (isArray(list)) {
    const dataList = list.map((o, index) => {
      const d = { ...{}, ...o };

      d.key = `item_${index}`;

      return { ...{ canCopy: false }, ...d };
    });

    return (
      <Descriptions {...(props || {})}>
        {dataList.map((item) => {
          return (
            <Description key={item.key} label={item.label}>
              {item.value}
              {item.canCopy && (item.canCopy || null) != null ? (
                <a
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    copyToClipboard(item.copyData || item.value);
                  }}
                >
                  [复制]
                </a>
              ) : null}
            </Description>
          );
        })}
      </Descriptions>
    );
  }

  return null;
}

export function pageHeaderContent(list) {
  return buildDescriptionGrid(list, {
    style: { marginBottom: '4px' },
    size: 'small',
  });
}

export function pageHeaderTagWrapper(Tags) {
  return (
    <>
      <div
        style={{
          position: 'relative',
          height: '24px',
          padding: '0 14px 0 0',
          lineHeight: '24px',
        }}
      >
        {Tags}
      </div>
    </>
  );
}

export function pageHeaderExtraContent(data) {
  if ((data || null) == null) {
    return null;
  }

  const v = { ...{ textLabel: '描述', text: '', tileLabel: '时间', time: new Date() }, ...data };

  const textStyle = {
    fontSize: '20px',
  };

  return (
    <Row>
      <Col xs={24} sm={12}>
        <div>创建日期</div>
        <div style={textStyle}>
          {formatDatetime(v.time, 'HH:mm:ss', '--')}
          <br />
          {formatDatetime(v.time, 'YYYY-MM-DD')}
        </div>
      </Col>
      <Col xs={24} sm={12}>
        <div>{v.textLabel}</div>
        <div style={textStyle}>{v.text}</div>
      </Col>
    </Row>
  );
}

export function buildButtonGroup(buttonGroupData) {
  if ((buttonGroupData || null) == null) {
    return null;
  }

  return (
    <ButtonGroup>
      {(buttonGroupData.buttons || []).map((item) => {
        const { confirmMode, confirmProps } = item;

        const { disabled, onClick } = item.buttonProps || {
          onClick: () => {
            message.error('缺少配置');
          },
        };

        if (!(confirmMode || false) || disabled) {
          return (
            <Button key={item.key} {...(item.buttonProps || {})}>
              {item.loading ? <LoadingOutlined /> : item.icon}
              {item.text || ''}
            </Button>
          );
        }

        const defaultConfirmProps = {
          title: '确定进行操作吗？',
          onConfirm: () => {
            message.error('缺少配置');
          },
          okText: '确定',
          cancelText: '取消',
        };

        const cp = {
          ...defaultConfirmProps,
          ...{
            onConfirm: onClick,
          },
          ...(confirmProps || {}),
        };

        const { buttonProps } = item;

        delete cp.onClick;
        delete buttonProps.onClick;

        return (
          <Popconfirm {...(cp || {})} key={item.key}>
            <Button {...(buttonProps || {})}>
              {item.loading ? <LoadingOutlined /> : item.icon}
              {item.text || ''}
            </Button>
          </Popconfirm>
        );
      })}

      {(buttonGroupData.menu || null) != null ? (
        (buttonGroupData.menu.items || []).length > 0 ? (
          <Dropdown
            overlay={
              <Menu {...(buttonGroupData.menu.props || {})}>
                {buttonGroupData.menu.items.map((item) => (
                  <Menu.Item {...(item.props || {})} key={item.key}>
                    {item.children}
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomRight"
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        ) : null
      ) : null}
    </ButtonGroup>
  );
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
