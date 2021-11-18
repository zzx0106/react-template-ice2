/**
 * 自定义属性
 * 插件定制工程能力
 * https://ice.work/docs/plugin/develop/build
 */
export default ({ onGetWebpackConfig }: any) => {
  onGetWebpackConfig((config: any) => {
    console.log('进入这');

    // --analyzer 自带了，目前不用，其他差距可以加这里
    // config.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, []);
  });
};
