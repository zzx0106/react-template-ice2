/*
 * @Author: linzhihai
 * @Date: 2021-08-26 19:11:50
 * @LastEditTime: 2021-10-30 00:40:39
 * @Description:
 */
import { message } from 'antd';
import Axios, { ResponseType } from 'axios';
import { addPending, removePending, clearPending } from './cancelRequest';
import { history } from 'ice';

let orgin = '';
console.log('env', process.env.NODE_ENV);
const baseEnv = process.env.NODE_ENV;
if (baseEnv === 'production') {
  // https://lh-efficiency-platform.weike.fm
  orgin = 'https://lh-efficiency-platform.weike.fm'; // 生产环境地址
} else if (baseEnv === 'development') {
  // https://lh-efficiency-platform.dev1.weike.fm
  orgin = 'https://lh-efficiency-platform.dev1.weike.fm'; // 测试环境地址
} else if (baseEnv === 'test') {
  orgin = ''; // 测试环境地址
}
export const url = {
  api: `${orgin}`,
};
const axios = Axios.create({
  baseURL: url.api,
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/javascript, */*',
    'Content-Type': 'application/json; charset=UTF-8',
  },
});
// 带cookie请求
// axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const hashmarkIndex = config.url?.indexOf('#');
      if (hashmarkIndex !== -1) {
        config.url = config.url?.slice(0, hashmarkIndex);
      }
      config.url += `${config.url?.indexOf('?') === -1 ? '?' : '&'}token=${token}`;
    }
    // console.log(`%c 发送 ${config.url?.split('/').pop()} `, 'background:#2472C8;color:#fff', config.data, config);
    addPending(config);

    return config;
  },
  (error) => {
    console.error(error.message);
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  (res) => {
    removePending(res);

    const { code } = res.data;
    // console.log(
    //   `%c 接收 ${res.config.url?.split('/').pop()}`,
    //   'background:#1E1E1E;color:#bada55',
    //   JSON.parse(JSON.stringify(res.data)),
    // );

    // 下载文件是blob数据流，没有code
    if (code !== undefined) {
      if (code === 0) {
        return Promise.resolve(res.data.data);
      } else if (code === 40101) {
        window.localStorage.removeItem('token');
        message.warning({
          content: '登录已过期，请重新登录',
          duration: 2,
          onClose: () => {
            history?.replace('/login');
          },
        });
        // 40101后手动取消后续请求，防止触发多次弹窗
        clearPending();
        return new Promise(() => {});
      } else {
        return Promise.reject(res.data.msg);
      }
    } else if (res.data) {
      return Promise.resolve(res);
    }
  },
  (error) => {
    console.log('-----> error', error);
    // 被cancel的error特殊处理，返回pending状态，防止业务端抛出message信息
    if (Axios.isCancel(error)) {
      return new Promise(() => {});
    }
    const res = error.response;

    if (res?.status === 401) {
      window.localStorage.removeItem('token');

      message.warning({
        content: '登录已过期，请重新登录',
        duration: 2,
        onClose: () => {
          history?.replace('/login');
        },
      });
    }
    return Promise.reject(error.message);
  },
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} responseType [定义返回的数据类型，例如excel文件为blob]
 */
export function get<T>(url: string, params?: { [key: string]: any }, responseType?: ResponseType) {
  return axios.get<T, T>(`${url}`, { params, responseType });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post<T>(url: string, params?: { [key: string]: any }) {
  return axios.post<T, T>(`${url}`, params);
}
