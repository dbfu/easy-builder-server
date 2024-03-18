export type SuccessEvent = 'success';
export type ErrorEvent = 'error';
export type ButtonEvent = 'onClick';
export type ModalEvent = 'onOk' | 'onCancel' | 'onShow';

export type EventFlow = {
  // 当前触发的事件的组件，可以为空
  componentName?: 'Button' | 'Modal' | null;
  // 事件
  event: SuccessEvent | ErrorEvent | ButtonEvent | ModalEvent;
  // 动作
  action: {
    onSuccess?: EventFlow['action'];
    onError?: EventFlow['action'];
  } & (
    | {
        name: 'ComponentMethod';
        component: 'Modal';
        method: 'open' | 'close';
      }
    | {
        name: 'showMessage';
        type: 'success' | 'error';
        content: string;
      }
    | {
        name: 'openPage';
        url: string;
      }
    | {
        // 执行定时器
        name: 'setTimeout';
        // 毫秒
        timer: number;
        // 多少毫秒后执行的动作
        onSuccess?: EventFlow['action'];
      }
  );
};
