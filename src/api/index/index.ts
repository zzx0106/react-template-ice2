import { get, post, url } from '@/utils/http';
import { ISystemInfo, IUserInfo } from './index.i';

const baseUrl = '/api';

/**
 * @description 获取系统初始化参数
 * @link 文档地址
 */
export const api_index_sys_init = () => {
  return get<ISystemInfo.Data>('/basic/index/sys_init');
};

export const api_index_check_login_user = () => {
  return get('/basic/index/check_login_user');
};

export const api_index_homepage_init = () => {
  return get<IUserInfo.Data>('/basic/index/homepage_init');
};
