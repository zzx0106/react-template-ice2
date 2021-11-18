declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare module 'postcss-cssnext';
declare module 'postcss-write-svg';
declare module 'postcss-flexbugs-fixes';
declare module 'postcss-viewport-units';
declare module 'cssnano';

declare const BASENAME: string;
declare const RUNTIME_TYPE: 'vite' | 'webpack';
declare namespace React {
  interface HTMLAttributes {
    // 这里可以给节点添加自定义标签
  }
}

declare namespace globalThis {
  interface Window {
    /** 全局的storage，可以用于调试 */
    $storage: object;
    ActiveXObject: any;
  }
}

/*
 * @Author: linzhihai
 * @Date: 2021-08-31 15:05:44
 * @LastEditTime: 2021-09-01 10:12:28
 * @Description:
 */
declare namespace ModalProps {
  export interface IModalProps {
    /** 可见状态 */
    isModalVisible: boolean;
    /** 控制显隐 */
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    /** 更新事件 */
    updateEvent?: (params?: any) => void;
  }
}
interface IRouterConfig {
  pageConfig: {
    title: string;
  };
}
