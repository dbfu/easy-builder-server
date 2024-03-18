import { z } from 'zod';

export const showMessageAction = z
  .object({
    name: z.literal('showMessage'),
    type: z.enum(['success', 'error']),
    content: z.string().describe('消息内容'),
  })
  .describe('显示消息');

export const openPageAction = z
  .object({
    name: z.literal('openPage'),
    url: z.string().describe('打开页面的url'),
  })
  .describe('打开页面');

export const modalMethod = z.object({
  componentName: z.literal('Modal').describe('弹窗组件'),
  method: z.union([
    z.literal('open').describe('打开弹框'),
    z.literal('close').describe('关闭弹框'),
  ]),
});

export const componentAction = z
  .object({
    name: z.literal('ComponentMethod'),
    config: modalMethod,
  })
  .describe('调用组件方法');

export const buttonEvent = z.literal('onClick').describe('按钮点击事件');

export const modalEvent = z
  .union([
    z.literal('onOK').describe('弹框确认按钮点击事件'),
    z.literal('onCancel').describe('弹框取消按钮点击事件'),
  ])
  .describe('按钮支持的事件');

export const schema = z.object({
  componentName: z
    .union([
      z.literal('Button').describe('按钮'),
      z.literal('Modal').describe('弹框'),
    ])
    .nullish()
    .describe('触发事件的组件，可以为空'),
  event: z.union([
    buttonEvent,
    modalEvent,
    z.literal('success').describe('成功事件'),
    z.literal('error').describe('失败事件'),
  ]),
  action: z
    .union([componentAction, showMessageAction, openPageAction])
    .describe('执行的动作'),
  children: z
    .lazy(() => schema.nullish())
    .describe('后续事件，格式和前面保持一致。没有后续可以为空'),
});
