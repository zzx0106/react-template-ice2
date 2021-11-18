/*
 * @Author: linzhihai
 * @Date: 2021-08-30 18:14:23
 * @LastEditTime: 2021-09-14 19:04:15
 * @Description:
 */
import { get, post, url } from '@/utils/http';
import { ISystemInfo, IUserInfo } from './index.i';

const baseUrl = '/api';

/**
 * @description 获取系统初始化参数
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#获取系统初始化参数
 */
export const api_index_sys_init = () => {
  return get<ISystemInfo.Data>('/basic/index/sys_init');
};

/**
 * @description 检测登录用户
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#检测登录用户
 */
export const api_index_check_login_user = () => {
  return get('/basic/index/check_login_user');
};

/**
 * @description 主页初始化
 * @link https://gitlab.weike.fm/lh/lh-docs/blob/master/梨花效能平台/效能平台接口文档.md#主页初始化
 */
export const api_index_homepage_init = () => {
  return get<IUserInfo.Data>('/basic/index/homepage_init');
};
