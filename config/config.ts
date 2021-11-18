/*
 * @Author: linzhihai
 * @Date: 2021-08-26 19:11:49
 * @LastEditTime: 2021-10-08 17:59:09
 * @Description:
 */
import { IceConfig } from './config.i';
import { findSync } from './tools';
import proxy from './proxy';
import customPlugin from './custom.plugin';

const fileNames = findSync('../src/assets/global'); // 拿到global里面的所有文件路径
const cssGlobal = fileNames.map((filename) => `@import "${filename}";`.replace(/\\/g, '/')).join('');
console.log('node_env', process.env.NODE_ENV);
const env = process.env.NODE_ENV; // production development
const isDev = env !== 'production';
const isVite = true; // 是否开启vite模式
console.log('runtime:', isVite ? 'vite' : 'webpack');
const config: IceConfig = {
  publicPath: '/delivery-platform-pc/',
  devServer: {
    host: '0.0.0.0',
    open: false, // 不会直接开启新页面
    client: {
      overlay: {
        // 输出到屏幕上，错误
        warnings: true,
        errors: true,
      },
    },
  },
  hash: true,
  // /** DefinePlugin配置，可以配置全局公共参数 */
  define: {
    BASENAME: 'delivery-platform-pc',
    RUNTIME_TYPE: isVite ? 'vite' : 'webpack',
  },
  // /** 排除打包的文件，多用于cdn */
  externals: {
    // react: 'window.React',
  },
  /** 解决antd 4.17.0-alpha报错问题 */
  lessLoaderOptions: {
    modifyVars: {
      'root-entry-name': 'default',
    },
  },
  sassLoaderOptions: {
    prependData: cssGlobal,
    sourceMap: true,
  },
  // dropLogLevel: 'log', // 日志等级
  postcssrc: true,
  proxy,
  vite: isVite,
  store: false,

  // 是否开启预编译 注：和vue一样会产生大量文件，在http2.0开启
  // remoteRuntime: true,
  // 通过 --mode dbg 来设置不同环境配置
  modeConfig: {
    dbg: {},
    dev: {},
    prod: {
      minify: {
        type: 'esbuild',
        options: {
          compress: {
            target: 'es2016',
            minify: true,
            minifyWhitespace: true, // 去除空格
            minifyIdentifiers: true, // 缩短输出文件中的标识符
            minifySyntax: true, // 在输出文件中使用等效但较短的语法
            css: true, // 是否缩小 CSS 文件
          },
        },
      },
    },
  },
  plugins: [
    // antd优化 https://ice.work/docs/plugin/list/ignore-style
    [
      'build-plugin-ignore-style',
      {
        libraryName: 'antd',
      },
    ],
    // https://ice.work/docs/plugin/list/keep-alive
    'build-plugin-keep-alive',
    // customPlugin,
    /**
     * 自定义属性
     * 插件定制工程能力
     * https://ice.work/docs/plugin/develop/build
     */
    (api) => {
      // api.onGetWebpackConfig((config) => {
      //   config.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, []);
      // });
    },
  ],
};
module.exports = config;
