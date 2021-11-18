import { api_index_homepage_init } from '@/api/index';
import { IUserInfo } from '@/api/index/index.i';
import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import { history } from 'ice';

export const user = createModel<RootModel>()({
  // name: 'user', // 如果设置了name，模块名以name为准
  state: {
    avatar: '',
    name: '',
    menu_tree: [],
  } as IUserInfo.Content,
  reducers: {
    update(prevState, payload: IUserInfo.Content) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    /**
     * @description: 请求用户信息
     * @param {*}
     * @return {*}
     */
    async getUserInfo() {
      const { content } = await api_index_homepage_init().catch((err: any) => {
        throw err;
      });

      const payload = {
        avatar: content.avatar,
        name: content.name,
        menu_tree: content.menu_tree,
      };

      window.localStorage.setItem('user-info', JSON.stringify(payload));
      dispatch.user.update(payload);
      dispatch.route.formatRoute(content.menu_tree);
    },
    /**
     * @description: 注销
     * @param {*}
     * @return {*}
     */
    async logout() {
      dispatch.user.update({
        avatar: '',
        name: '',
        menu_tree: [],
      });

      window.localStorage.removeItem('user-info');
      window.localStorage.removeItem('token');
      history?.replace('/login');
    },
  }),
});
