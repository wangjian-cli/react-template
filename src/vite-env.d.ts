/// <reference types="vite/client" />
interface ErrInfo {
  //错误名称或地址，没有可传'-'
  name?: string;
  //错误信息
  message?: string;
  //错误堆栈信息
  stack?: string;
}
interface Options extends ErrInfo {
  // 类型
  category: 'js';
  // 级别
  grade: 'Error';
}
declare interface Window {
  ClientMonitor: {
    reportFrameErrors: (arg0: Options, arg1?: ErrInfo) => void;
  };
}
