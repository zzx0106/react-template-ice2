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
