import './utils/polyfill';
import './utils/inject';
import { runApp, IAppConfig, APP_MODE } from 'ice';
import zhCN from 'antd/lib/locale/zh_CN';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store } from '@/store/store';
import PageLoading from './components/PageLoading';

console.log('require', process);

const persistor = getPersistor();
console.log('APP_MODE', APP_MODE);

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    // 自定义添加 Provider
    addProvider: ({ children }) => {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
          </PersistGate>
        </Provider>
      );
    },
    errorBoundary: true, // 是否开启 ErrorBoundary，默认为 false
    // 自定义错误边界的 fallback UI
    ErrorBoundaryFallback: () => <div>页面错误</div>,
    // 自定义错误的处理事件
    onErrorBoundaryHandler: (error: Error, componentStack: string) => {
      // Do something with the error
    },
  },
  router: {
    type: 'browser',
    basename: process.env.NODE_ENV === 'production' ? BASENAME : '',
    fallback: <PageLoading></PageLoading>,
  },
};
runApp(appConfig);
