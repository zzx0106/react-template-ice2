import { IRouterConfig } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';
import { lazyPage } from '../lazy';

const Homelazy = lazyPage(() => import(/* webpackChunkName: 'home' */ '@/pages/Home/index'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/home',
    component: BasicLayout,
    pageConfig: {
      title: '配置页标题',
      // scrollToTop: false, // 默认 false，进入页面时是否要滚动到顶部
      // auth: [], // 进入页面的权限列表
      // errorBoundary: false, // 是否为页面组件包裹 ErrorBoundary
      // keepAlive: false,
      // spm: '',
    },
  },
];

export default routerConfig;
