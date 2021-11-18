/*
 * @Author: linzhihai
 * @Date: 2021-09-09 16:45:18
 * @LastEditTime: 2021-09-09 17:46:52
 * @Description: 取消重复请求以及路由跳转时的未完成请求
 */
import axios, { AxiosRequestConfig } from 'axios';

// 存储请求
const pending = new Map();

/**
 * @description: 添加请求
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
export const addPending = (config: AxiosRequestConfig) => {
  const url = [config.url, config.method, JSON.stringify(config.params)].join('&');

  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        pending.set(url, cancel);
      }
    });
};

/**
 * @description: 移除请求
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
export const removePending = (config: AxiosRequestConfig) => {
  const url = [config.url, config.method, JSON.stringify(config.params)].join('&');

  if (pending.has(url)) {
    const cancel = pending.get(url);

    cancel(url);
    pending.delete(url);
  }
};

/**
 * @description: 清空 pending 中的请求（在路由跳转时调用）
 * @param {*}
 * @return {*}
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }

  pending.clear();
};
