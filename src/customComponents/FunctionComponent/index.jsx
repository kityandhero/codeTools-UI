import React from 'react';
import { Button, Dropdown, Popconfirm, Menu, message } from 'antd';
import { EllipsisOutlined, LoadingOutlined } from '@ant-design/icons';

const ButtonGroup = Button.Group;

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
