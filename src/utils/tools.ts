function isObject(value: any): boolean {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
interface DebouncedFunc<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
  flush(): ReturnType<T> | undefined;
}
interface DebounceOptions {
  /** 立即执行 */
  leading?: boolean;
  /** 最大等待时间 */
  maxWait?: number;
  /** 最后一次也要执行，多用于节流 */
  trailing?: boolean;
}
/**
 * 防抖
 * @example
 * ```
 * debounce<(progress: number) => void>(progress => {}, 40)
 * ```
 */
function debounce<T extends (...args: any) => any>(func: T, wait = 0, options?: DebounceOptions): DebouncedFunc<T> {
  let lastArgs: IArguments | undefined;
  let lastThis: any;
  let maxWait: number | undefined;
  let result: any;
  let timerId: NodeJS.Timeout | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new Error('回调必须是函数');
  }
  wait = +wait || 0;
  if (options && isObject(options)) {
    leading = !!options?.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+(options?.maxWait ?? 0) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time: number) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args as unknown as any[]);
    return result;
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing ? Math.min(timeWaiting, (maxWait as number) - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number);
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait as number))
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time: number) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced(this: any) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
interface ThrottleOptions {
  /** 默认值 true 立即执行 */
  leading?: boolean;
  /** 默认值 true 最后一次也要执行，多用于节流 */
  trailing?: boolean;
}
/**
 * 节流
 * @example
 * ```
 * throttle<(progress: number) => void>(progress => {}, 40)
 * ```
 */
function throttle<T extends (...args: any) => any>(
  func: T,
  wait?: number,
  options?: ThrottleOptions,
): DebouncedFunc<T> {
  let leading = true;
  let trailing = true;
  if (wait === undefined) wait = 300;
  if (typeof func !== 'function') {
    throw new Error('回调必须是函数');
  }
  if (options && isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing,
  });
}

/**
 * @desc 对象Key排序并生成key=value&
 * @param {Object} jsonObj 排序对象
 * @param {Boolean} isSort 是否排序
 */
function jsonSort(jsonObj: { [key: string]: any }, isSort = false) {
  const arr: string[] = [];
  for (const key in jsonObj) {
    if (Object.prototype.hasOwnProperty.call(jsonObj, key)) arr.push(key);
  }
  isSort && arr.sort();
  let str = '';
  for (const i in arr) {
    // 过滤掉 Array.prototype.xxx进去的字段

    if (Object.prototype.hasOwnProperty.call(arr, i)) {
      let value = '';
      if (Object.prototype.toString.call(jsonObj[arr[i]]) === '[object Object]') {
        value = JSON.stringify(jsonObj[arr[i]]);
      } else {
        value = jsonObj[arr[i]];
      }
      str += `${arr[i]}=${value}&`;
    }
  }
  return str.substr(0, str.length - 1);
}
interface IStorageConfig {
  /** 设置失效时间ms */
  expires?: number;
}
function setStorage(key: string, value: any, config: IStorageConfig = {}) {
  try {
    const { expires = 0 } = config;
    if (expires > 0) {
      return localStorage.setItem(
        key,
        JSON.stringify({
          __expires__: expires + Date.now(),
          __data__: value,
        }),
      );
    }
    return localStorage.setItem(key, value);
  } catch (error) {
    console.error('setStorage key error', key, error);
  }
}
function removeStorage(key) {
  return localStorage.removeItem(key);
}
function getStorage<T>(key: string): T | null | any {
  if (key === undefined) return null;
  let msg = localStorage.getItem(key) as any;
  if (msg === null || msg === undefined) {
    console.warn('getStorage msg is undefined and key is:', key);
    return null;
  }
  msg = JSON.parse(msg);

  if (msg?.__expires__) {
    console.log('msg.__expires__', key, msg.__expires__, Date.now());

    if (msg.__expires__ > Date.now()) {
      return msg?.__data__;
    } else {
      removeStorage(key); // 过期了，清除掉
      return ''; // getStorageSync拿不到默认返回''
    }
  } else {
    return msg;
  }
}

function getApiUrl(url?: string) {
  if (!url) return '';
  try {
    const start = url!.lastIndexOf('/');
    let end = url.lastIndexOf('?');
    if (end === -1) end = url.length;
    const api = url!.substring(start + 1, end);
    return api;
  } catch (error) {
    console.error('getApiUrl error', error);
    return '';
  }
}

/**
 * 秒转时间
 * @param {*} val 秒数
 * @param {*} type 'hms'返回时分秒 | 'ms'分秒 | 's'秒
 */
function secondToDate(val: number, type?: 'hms' | 'ms' | 's') {
  let h = Math.floor(val / 3600).toString();
  let m = Math.floor((val / 60) % 60).toString();
  let s = Math.floor(val % 60).toString();
  h = h.length < 2 ? `0${h}` : h;
  m = m.length < 2 ? `0${m}` : m;
  s = s.length < 2 ? `0${s}` : s;
  switch (type) {
    case 'hms':
      return `${h}:${m}:${s}`;
    case 'ms':
      return `${h}:${s}`;
    case 's':
      return s;
    default:
      return `${m}${s}`;
  }
}

/**
 * 获取url 最后一个/到?开头的数据
 * @param url
 */
function getUrlApiName(url: string | undefined) {
  try {
    return url?.match(/[^/]+?(?=\?|$)/)?.[0] ?? url;
  } catch (error) {
    console.warn(error);
    return url;
  }
}

/**
 * @description: 图片质量压缩
 * @param {string} url 图片链接
 * @param {number} width 限定缩略图的宽最多为width
 * @param {string} format 新图的输出格式
 * @param {number} quality 新图的图片质量<取值范围是[1, 100]，默认75。>
 * @decs https://developer.qiniu.com/dora/api/basic-processing-images-imageview2
 */
function getPicture(url: string, width = 300, format = 'normal', quality = 85) {
  if (format === 'webp') {
    return `${url}?imageView2/format/webp/2/w/${width}/q/${quality}!`;
  } else {
    return `${url}?imageView2/2/w/${width}/q/${quality}!`;
  }
}

/**
 * 版本比较
 * @param v1 当前版本
 * @param v2 目标版本
 * @returns number 1: > ; 0: == ; -1: <
 */
function compareVersion(v1, v2) {
  try {
    v1 = v1.split('.');
    v2 = v2.split('.');
    const len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
      v1.push('0');
    }
    while (v2.length < len) {
      v2.push('0');
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }

    return 0;
  } catch (error) {
    console.error('compareVersion', v1, v2);
    return 0;
  }
}
/**
 * @description: url拼接上需要的参数
 * @param {string} url 跳转链接
 * @param {object} params 需要拼接上的参数
 * @return {*}
 */
function urlConcatParams(url: string, params: { [key: string]: any }) {
  for (const key in params) {
    if (params[key] !== '') {
      url += `${url.indexOf('?') === -1 ? '?' : '&'}${key}=${params[key]}`;
    }
  }

  return url;
}
export {
  urlConcatParams,
  getPicture,
  getUrlApiName,
  secondToDate,
  getApiUrl,
  getStorage,
  removeStorage,
  setStorage,
  jsonSort,
  throttle,
  debounce,
  compareVersion,
};
