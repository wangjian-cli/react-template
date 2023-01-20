import { Os, ErrorReportParam } from '@/types/toolsType';
class DatePlus extends Date {
  constructor(args: any) {
    args ? super(args) : super();
  }
  format(fmt = 'yyyy-MM-dd hh:mm:ss') {
    const quarterlyMonths = 3;
    const o = {
      //月份
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + quarterlyMonths) / quarterlyMonths),
      S: this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        `${this.getFullYear()}`.substr(quarterlyMonths + 1 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          // @ts-ignore
          RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
        );
      }
    }
    return fmt;
  }
}

// 节流
function throttle(cb: any, time: number) {
  let timer: NodeJS.Timeout | null;
  return function (...args: any) {
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      timer = null;
      cb(...args);
    }, time);
  };
}
//防抖
function debounce(fn: any, delay: number) {
  let timer: any = null;
  return function (...argu: any) {
    const args = argu;
    // @ts-ignore
    const context = this;
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  };
}

// 错误上报
const errorReport = ({ name, message, stack }: ErrorReportParam) => {
  window.ClientMonitor.reportFrameErrors(
    {
      // 类型
      category: 'js',
      // 级别
      grade: 'Error'
    },
    {
      name,
      message,
      stack
    }
  );
};
export { DatePlus, throttle, debounce, errorReport };
