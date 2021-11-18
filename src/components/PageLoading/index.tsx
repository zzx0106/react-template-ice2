/*
 * @Author: linzhihai
 * @Date: 2021-09-03 14:25:44
 * @LastEditTime: 2021-09-03 14:27:59
 * @Description: 组件Loading
 */
import { CSSModule } from '@/utils/css-module';
import { Spin } from 'antd';
import styles from './index.module.scss';

const PageLoading = () => {
  return (
    <div styleName="loading-container">
      <Spin></Spin>
    </div>
  );
};

export default CSSModule(PageLoading, styles);
