/*
 * @Description: 储存器
 * @Date: 2021-09-10 19:03:50
 * @LastEditTime: 2021-10-26 19:25:04
 */

import { setStorage, getStorage, removeStorage } from '@/utils/tools';

interface IStorageData {
  token: string;
}

interface IStorageConfig {
  /** 设置失效时间ms */
  expires?: number;
}

function noop(a?: any, b?: any, c?: any) {}

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};
function proxy(target: Object, sourceKey: 'data', key: keyof IStorageData) {
  sharedPropertyDefinition.get = function proxyGetter(this: DataStorage) {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(this: DataStorage, val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

export function hasOwn(obj: Object | Array<any>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
class DataStorage {
  // 白名单，每次重启小程序都会清除storage里面的数据，白名单除外
  private whiteList: string[] = [];
  // data对象不要赋值除了getStorage以外的任意默认字段，以外data.xxx的时候会走getStorage(key)，取不到不会有默认值，默认值都是''
  data: IStorageData = {
    token: getStorage('token'),
  };

  constructor() {
    this.initData();
  }

  initData() {
    const keys = Object.keys(this.data);
    let i = keys.length;
    while (i--) {
      const key = keys[i] as keyof IStorageData;
      proxy(this, 'data', key);
    }
  }

  init() {
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        Object.defineProperty(this.data, key, {
          get() {
            return getStorage(key);
          },
          set(value: any) {
            setStorage(key, value);
          },
          enumerable: true,
          configurable: true,
        });
      }
    }
  }

  setStorage(key: keyof IStorageData, value: any, config: IStorageConfig = {}) {
    setStorage(key, value, config);
  }
  removeStorage(key: keyof IStorageData) {
    key && localStorage.removeItem(key);
  }

  clear() {
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        if (this.whiteList.indexOf(key) === -1) {
          removeStorage(key);
        }
      }
    }
  }
}

export const storage = new DataStorage() as DataStorage & IStorageData;
window.$storage = storage; // 可用于调试
